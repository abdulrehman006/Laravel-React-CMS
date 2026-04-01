<?php

use App\Http\Controllers\Debug\DebugController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\CaseStudyController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\AppointmentController;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\PortfolioController;
use App\Http\Controllers\Frontend\PricingPlanController;
use App\Http\Controllers\Frontend\ServiceController;
use App\Http\Controllers\Frontend\SubscribeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ConnectException;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [PageController::class, 'home'])->name('home');

// Route::redirect('/admin', '/admin/dashboard');

Route::get('debug', [DebugController::class, 'any']);

// frontend blog routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/comment', [BlogController::class, 'comment'])->name('blog.comment');

// services routes
Route::get('/service/{slug}', [ServiceController::class, 'show'])->name('service.show');

// portfolio route
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');

// case study route
Route::get('/case-study/{slug}', [CaseStudyController::class, 'show'])->name('case.study.show');


// pricing plan
Route::get('/pricing-plans', [PricingPlanController::class, 'index'])->name('pricing.plan.index');
Route::get('/pricing-plan/{pricing_plan}', [PricingPlanController::class, 'show'])->name('pricing.plan');
Route::post('/pricing-plan/{pricing_plan}/pay', [PricingPlanController::class, 'pay'])->name('pricing.pay');

// pages route
Route::get('/{slug}', [PageController::class, 'show'])->name('pages.show');

// subscribe
Route::post('subscribe', [SubscribeController::class, 'subscribe'])->middleware('throttle:5,1')->name('subscribe');

// contact
Route::post('contact', [ContactController::class, 'submitContact'])->middleware('throttle:5,1')->name('contact');


// payment gateway releted route
Route::any('payment/{method}/cancel', [PricingPlanController::class, 'paymentCancel'])->name('payment.cancel');
Route::any('payment/{method}/success', [PricingPlanController::class, 'paymentSuccess'])->name('payment.success');
Route::get('payment/razorpay/pay', [PricingPlanController::class, 'razorpayPay'])->name('payment.razorpay.pay');


// custom css
Route::get('custom/css', function () {
    // Generate the CSS content dynamically
    $cssContent = view('custom-css')->render();
    // Set the content type as CSS
    $response = Response::make($cssContent);
    $response->header('Content-Type', 'text/css');

    return $response;
})->name('custom.css');

Route::post('/appointment', [AppointmentController::class, 'send'])->middleware('throttle:5,1')->name('appointment');

Route::get('/proxy/vehicle-verification', function (Request $request) {

    // Validate input
    $regNo     = trim($request->query('regNo', ''));
    $chassisNo = trim($request->query('chassisNo', ''));
    $vir       = trim($request->query('vir', ''));

    if (empty($regNo) && empty($chassisNo) && empty($vir)) {
        return response()->json([
            'message' => 'Please enter Vehicle Reg. No, Chassis No, or VIR.',
        ], 400);
    }

    // Only pass expected params
    $queryParams = array_filter([
        'regNo'     => $regNo,
        'chassisNo' => $chassisNo,
        'vir'       => $vir,
    ]);

    $client = new Client(['timeout' => 10]);

    try {
        $queryString = http_build_query($queryParams, '', '&', PHP_QUERY_RFC3986);

        $response     = $client->get('http://52.58.102.77:22109/api/VehicleVerification?' . $queryString);
        $responseBody = $response->getBody()->getContents();
        $statusCode   = $response->getStatusCode();
        $decoded      = json_decode($responseBody, true);

        if (empty($responseBody) || empty($decoded)) {
            return response()->json([
                'message' => 'No data found for the provided inputs.',
            ], 404);
        }

        return response($responseBody, $statusCode)
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*');

    } catch (ConnectException $e) {
        return response()->json([
            'message' => 'Cannot connect to the server. Please check your network or try again later.',
        ], 503);

    } catch (RequestException $e) {
        if ($e->hasResponse()) {
            $errorResponse = $e->getResponse();
            $statusCode    = $errorResponse->getStatusCode();
            $message       = $errorResponse->getBody()->getContents();

            if ($statusCode === 400) {
                return response()->json([
                    'message' => 'Please enter Vehicle Reg. No, Chassis No, or VIR.',
                ], 400);
            }

            if ($statusCode === 404) {
                return response()->json([
                    'message' => 'Data is not found.',
                ], 404);
            }

            return response($message, $statusCode)
                ->header('Content-Type', 'application/json');
        }

        return response()->json([
            'message' => 'An unexpected error occurred. Please try again.',
        ], 500);

    } catch (\Exception $e) {
        $msg = $e->getMessage();

        if (str_contains($msg, 'Execution Timeout Expired') || 
            str_contains($msg, 'cURL error 28')) {
            return response()->json([
                'message' => 'Request timed out. The server is not responding.',
            ], 504);
        }

        return response()->json([
            'message' => 'An unexpected error occurred. Please try again.',
            'debug'   => config('app.debug') ? $msg : null,
        ], 500);
    }
});

Route::get('/clear-all-cache', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    Artisan::call('optimize');
    return 'All caches cleared!';
});


Route::get('/proxy/fee-structure', function (Request $request) {
    $regNo = $request->query('regNo');
    $chassisNo = $request->query('chassisNo');

    // Check if at least one parameter is provided
    if (empty($regNo) && empty($chassisNo)) {
        return response()->json([
            'message' => 'Either registration number or chassis number is required.'
        ], 400);
    }

    $client = new Client();

    try {
        // Determine which parameter to use and normalize it
        $queryParams = [];
       if (!empty($regNo)) {
    $queryParams['regNo'] = trim($regNo); // Keep dashes intact
} else {
    $queryParams['chassisNo'] = trim($chassisNo);
}

        // Encode query params with %20 for spaces
        $queryString = http_build_query($queryParams, '', '&', PHP_QUERY_RFC3986);
        $response = $client->get('http://52.58.102.77:22110/api/FeeStructure?' . $queryString, [
            'timeout' => 30,
        ]);

        $responseBody = $response->getBody()->getContents();
        $statusCode = $response->getStatusCode();

        if (empty($responseBody) || json_decode($responseBody) === []) {
            return response()->json([
                'message' => 'No data found for the provided ' . (!empty($regNo) ? 'registration number' : 'chassis number') . '.'
            ], 404);
        }

        return response($responseBody, $statusCode)
            ->header('Content-Type', $response->getHeader('Content-Type')[0]);

    } catch (ConnectException $e) {
        return response()->json([
            'message' => 'Cannot connect to the fee calculation server. Please try again later.'
        ], 503);

    } catch (RequestException $e) {
        if ($e->hasResponse()) {
            $errorResponse = $e->getResponse();
            $statusCode = $errorResponse->getStatusCode();
            $message = $errorResponse->getBody()->getContents();

            if ($statusCode === 404) {
                return response()->json([
                    'message' => 'No fee data found for the provided ' . (!empty($regNo) ? 'registration number' : 'chassis number') . '.'
                ], 404);
            }

            if ($statusCode === 400) {
                return response()->json([
                    'message' => 'Invalid ' . (!empty($regNo) ? 'registration number' : 'chassis number') . '. Please check the format and try again.'
                ], 400);
            }

            return response($message, $statusCode)
                ->header('Content-Type', $errorResponse->getHeader('Content-Type')[0]);
        }

        return response()->json([
            'message' => 'A request error occurred. Please try again.'
        ], 500);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'An unexpected error occurred. Please try again later.'
        ], 500);
    }
});