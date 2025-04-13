<?php

use App\Http\Controllers\Debug\DebugController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\CaseStudyController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\PortfolioController;
use App\Http\Controllers\Frontend\PricingPlanController;
use App\Http\Controllers\Frontend\ServiceController;
use App\Http\Controllers\Frontend\SubscribeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

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

Route::redirect('/admin', '/admin/dashboard');

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
