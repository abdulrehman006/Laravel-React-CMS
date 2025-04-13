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
Route::post('subscribe', [SubscribeController::class, 'subscribe'])->name('subscribe');

// contact
Route::post('contact', [ContactController::class, 'submitContact'])->name('contact');


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

Route::post('/appointment', [AppointmentController::class, 'send'])->name('appointment');

Route::get('/proxy/vehicle-verification', function (Request $request) {
    $client = new Client();

    try {
        // Send the GET request to the external API
        $response = $client->get('http://3.79.101.195:22109/api/VehicleVerification', [
            'query' => $request->all(),
            'timeout' => 10, // Set a timeout for the request (10 seconds)
        ]);

        // Get the response body and status code
        $responseBody = $response->getBody()->getContents();
        $statusCode = $response->getStatusCode();

        // Check if the response body is empty or contains no data
        if (empty($responseBody) || json_decode($responseBody) === []) {
            return response()->json([
                'message' => 'No data found for the provided inputs.',
            ], 404);
        }

        // Return the response as it is if data exists
        return response($responseBody, $statusCode)
            ->header('Content-Type', $response->getHeader('Content-Type')[0]);

    } catch (ConnectException $e) {
        // Handle connection-related exceptions
        return response()->json([
            'message' => 'Cannot connect to the server. Please check your network or try again later.',
        ], 503); // Service Unavailable

    } catch (RequestException $e) {
        // Handle Guzzle exceptions
        if ($e->hasResponse()) {
            $errorResponse = $e->getResponse();
            $statusCode = $errorResponse->getStatusCode();
            $message = $errorResponse->getBody()->getContents();

            // Handle specific error codes
            if ($statusCode === 400) {
                return response()->json([
                    'message' => 'Please enter Vehicle Reg. No, Chassis No, or VIR.',
                ], 400);
            } elseif ($statusCode === 404) {
                return response()->json([
                    'message' => 'Data is not found.',
                ], 404);
            }

            // Return the error as is for other status codes
            return response($message, $statusCode)
                ->header('Content-Type', $errorResponse->getHeader('Content-Type')[0]);
        }

        // Handle other exceptions
        return response()->json([
            'message' => 'An unexpected error occurred. Please try again.',
        ], 500); // Internal Server Error

    } catch (\Exception $e) {
        // Handle general exceptions, such as timeouts
        if (str_contains($e->getMessage(), 'Execution Timeout Expired')) {
            return response()->json([
                'message' => 'Execution Timeout Expired. The timeout period elapsed prior to completion of the operation or the server is not responding.',
            ], 504); // Gateway Timeout
        }

        return response()->json([
            'message' => 'An unexpected error occurred. Please try again.',
        ], 500); // Internal Server Error
    }
});