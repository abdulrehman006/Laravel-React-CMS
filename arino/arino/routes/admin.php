<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CaseStudyCategoriesController;
use App\Http\Controllers\Admin\CaseStudyController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CustomizeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EditorImageUploaderController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PaymentGatewayController;
use App\Http\Controllers\Admin\PaymentHistoryController;
use App\Http\Controllers\Admin\PortfolioCategoryController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PricingPlanController;
use App\Http\Controllers\Admin\RolePermissionController;
use App\Http\Controllers\Admin\SeoController;
use App\Http\Controllers\Admin\ServiceCategoryController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SubscribeController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register Admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "auth" middleware group. Make something great!
|
*/

Route::redirect('/', '/admin/dashboard');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
Route::get('test', [DashboardController::class, 'test'])->name('test');

// admin post routes
Route::resource('posts', PostController::class);
Route::post('posts/bulk/delete', [PostController::class, 'bulkDelete'])->name('posts.bulk.delete');
Route::post('posts/bulk/publish', [PostController::class, 'bulkPublish'])->name('posts.bulk.publish');
Route::post('posts/bulk/unpublish', [PostController::class, 'bulkUnPublish'])->name('posts.bulk.unpublish');
Route::post('posts/status/toggle', [PostController::class, 'statusToggle'])->name('posts.status.toggle');

// admin category routes
Route::resource('categories', CategoryController::class);
Route::delete('categories/bulk/delete', [CategoryController::class, 'bulkDelete'])->name('categories.bulk.delete');

// admin tags route
Route::group(['prefix' => 'tags', 'as' => 'tags.'], function () {
    Route::get('/index', [TagController::class, 'index'])->name('index')->can('post_tags.index');
    Route::get('/search', [TagController::class, 'searchTag'])->name('search');
    Route::post('/store', [TagController::class, 'store'])->name('store')->can('post_tags.create');
    Route::get('/update', [TagController::class, 'update'])->name('update')->can('post_tags.edit');
    Route::delete('/destroy/{tag}', [TagController::class, 'destroy'])->name('destroy')->can('post_tags.delete');
    Route::delete('/bulk-delete', [TagController::class, 'bulkDelete'])->name('bulk.delete')->can('post_tags.delete');
    Route::delete('/edit', [TagController::class, 'edit'])->name('edit')->can('post_tags.edit');
});

// admin comment routes
Route::group(['prefix' => 'comments', 'as' => 'comments.'], function () {
    Route::get('index', [CommentController::class, 'index'])->name('index')->can('comments.index');
    Route::delete('destroy/{comment}', [CommentController::class, 'destroy'])->name('destroy')->can('comments.delete');
    Route::delete('bulk-delete', [CommentController::class, 'bulkDelete'])->name('bulk.delete')->can('comments.delete');
    Route::get('{comment}/approved', [CommentController::class, 'approved'])->name('approved')->can('comments.approve');
    Route::get('{comment}/unApproved', [CommentController::class, 'unApproved'])->name('unApproved')->can('comments.unApprove');
});

// subscribes route
Route::group(['prefix' => 'subscribers', 'as' => 'subscribers.'], function () {
    Route::get('/', [SubscribeController::class, 'index'])->name('index')->can('subscribers.index');
    Route::delete('/destroy/{subscriber}', [SubscribeController::class, 'destroy'])->name('destroy')->can('subscribers.delete');
    Route::delete('/bulk-delete', [SubscribeController::class, 'bulkDelete'])->name('bulk.delete')->can('subscribers.delete');
});

// contacts route
Route::group(['prefix' => 'contacts', 'as' => 'contacts.'], function () {
    Route::get('/', [ContactController::class, 'index'])->name('index')->can('contacts.index');
    Route::delete('/destroy/{contact}', [ContactController::class, 'destroy'])->name('destroy')->can('contacts.delete');
    Route::delete('/bulk-delete', [ContactController::class, 'bulkDelete'])->name('bulk.delete')->can('contacts.delete');
    Route::get('/show/{contact}', [ContactController::class, 'show'])->name('show')->can('contacts.show');
});

// admin pages routes
Route::group(['prefix' => 'pages', 'as' => 'pages.'], function () {
    Route::get('index', [PageController::class, 'index'])->name('index')->can('pages.index');
    Route::get('create', [PageController::class, 'create'])->name('create')->can('pages.create');
    Route::post('store', [PageController::class, 'store'])->name('store')->can('pages.create');
    Route::put('update/{page}', [PageController::class, 'update'])->name('update')->can('pages.edit');
    Route::get('edit/{page}', [PageController::class, 'edit'])->name('edit')->can('pages.edit');
    Route::delete('destroy/{page}', [PageController::class, 'destroy'])->name('destroy')->can('pages.delete');
    Route::delete('bulk-delete', [PageController::class, 'bulkDelete'])->name('bulk.delete')->can('pages.delete');
    Route::post('upload/file', [PageController::class, 'uploadFile'])->name('upload.file');
});

// themes pages routes
Route::group(['prefix' => 'themes', 'as' => 'themes.'], function () {
    Route::get('/', [ThemeController::class, 'index'])->name('index')->can('appearance.themes');
    Route::get('activate/{theme}', [ThemeController::class, 'activate'])->name('activate')->can('appearance.themes');
});

// customize pages routes
Route::group(['prefix' => 'customize', 'as' => 'customize.'], function () {
    Route::get('/', [CustomizeController::class, 'customize'])->name('customize')->can('appearance.customize');
    Route::put('/', [CustomizeController::class, 'update'])->name('update')->can('appearance.customize');
});

// portfolio page route
Route::group(['prefix' => 'portfolios', 'as' => 'portfolios.'], function () {
    Route::get('/', [PortfolioController::class, 'index'])->name('index')->can('portfolios.index');
    Route::get('/create', [PortfolioController::class, 'create'])->name('create')->can('portfolios.create');
    Route::post('/store', [PortfolioController::class, 'store'])->name('store')->can('portfolios.create');
    Route::get('/edit/{portfolio}', [PortfolioController::class, 'edit'])->name('edit')->can('portfolios.edit');
    Route::put('/update/{portfolio}', [PortfolioController::class, 'update'])->name('update')->can('portfolios.edit');
    Route::delete('/bulk-delete', [PortfolioController::class, 'bulkDelete'])->name('bulk.delete')->can('portfolios.delete');
    Route::delete('/destroy/{portfolio}', [PortfolioController::class, 'destroy'])->name('destroy')->can('portfolios.delete');

    // portfolio category
    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function () {
        Route::get('/', [PortfolioCategoryController::class, 'index'])->name('index')->can('portfolio_categories.index');
        Route::post('/', [PortfolioCategoryController::class, 'store'])->name('store')->can('portfolio_categories.create');
        Route::delete('/destroy/{portfolio_category}', [PortfolioCategoryController::class, 'destroy'])->name('destroy')->can('portfolio_categories.delete');
        Route::get('/edit/{portfolio_category}', [PortfolioCategoryController::class, 'edit'])->name('edit')->can('portfolio_categories.edit');
        Route::get('/create', [PortfolioCategoryController::class, 'create'])->name('create')->can('portfolio_categories.create');
        Route::put('/update/{portfolio_category}', [PortfolioCategoryController::class, 'update'])->name('update')->can('portfolio_categories.edit');
        Route::delete('/bulk-delete', [PortfolioCategoryController::class, 'bulkDelete'])->name('bulk.delete')->can('portfolio_categories.delete');
    });
});

// services page route
Route::group(['prefix' => 'services', 'as' => 'services.'], function () {
    Route::get('/', [ServiceController::class, 'index'])->name('index')->can('services.index');
    Route::get('/create', [ServiceController::class, 'create'])->name('create')->can('services.create');
    Route::post('/', [ServiceController::class, 'store'])->name('store')->can('services.create');
    Route::get('/edit/{service}', [ServiceController::class, 'edit'])->name('edit')->can('services.edit');
    Route::put('/update/{service}', [ServiceController::class, 'update'])->name('update')->can('services.edit');
    Route::delete('/destroy/{service}', [ServiceController::class, 'destroy'])->name('destroy')->can('services.delete');
    Route::delete('/bulk-delete', [ServiceController::class, 'bulkDelete'])->name('bulk.delete')->can('services.delete');

    // service category route
    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function () {
        Route::get('/', [ServiceCategoryController::class, 'index'])->name('index')->can('service_categories.index');
        Route::post('/', [ServiceCategoryController::class, 'store'])->name('store')->can('service_categories.create');
        Route::get('/create', [ServiceCategoryController::class, 'create'])->name('create')->can('service_categories.create');
        Route::put('/update/{service_category}', [ServiceCategoryController::class, 'update'])->name('update')->can('service_categories.edit');
        Route::get('/edit/{service_category}', [ServiceCategoryController::class, 'edit'])->name('edit')->can('service_categories.edit');
        Route::delete('/destroy/{service_category}', [ServiceCategoryController::class, 'destroy'])->name('destroy')->can('service_categories.delete');
        Route::delete('/bulk-delete', [ServiceCategoryController::class, 'bulkDelete'])->name('bulk.delete')->can('service_categories.delete');
    });
});

// case study page route
Route::group(['prefix' => 'case-study', 'as' => 'case.study.'], function () {
    Route::get('/', [CaseStudyController::class, 'index'])->name('index')->can('case_study.index');
    Route::get('/create', [CaseStudyController::class, 'create'])->name('create')->can('case_study.create');
    Route::post('/', [CaseStudyController::class, 'store'])->name('store')->can('case_study.create');
    Route::get('/edit/{case_study}', [CaseStudyController::class, 'edit'])->name('edit')->can('case_study.edit');
    Route::put('/update/{case_study}', [CaseStudyController::class, 'update'])->name('update')->can('case_study.edit');
    Route::delete('/destroy/{case_study}', [CaseStudyController::class, 'destroy'])->name('destroy')->can('case_study.delete');
    Route::delete('/bulk-delete', [CaseStudyController::class, 'bulkDelete'])->name('bulk.delete')->can('case_study.delete');

    // service category route
    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function () {
        Route::get('/', [CaseStudyCategoriesController::class, 'index'])->name('index')->can('case_study_categories.index');
        Route::post('/', [CaseStudyCategoriesController::class, 'store'])->name('store')->can('case_study_categories.create');
        Route::get('/create', [CaseStudyCategoriesController::class, 'create'])->name('create')->can('case_study_categories.create');
        Route::put('/update/{case_study_category}', [CaseStudyCategoriesController::class, 'update'])->name('update')->can('case_study_categories.edit');
        Route::get('/edit/{case_study_category}', [CaseStudyCategoriesController::class, 'edit'])->name('edit')->can('case_study_categories.edit');
        Route::delete('/destroy/{case_study_category}', [CaseStudyCategoriesController::class, 'destroy'])->name('destroy')->can('case_study_categories.delete');
        Route::delete('/bulk-delete', [CaseStudyCategoriesController::class, 'bulkDelete'])->name('bulk.delete')->can('case_study_categories.delete');
    });
});

// menu routes
Route::group(['prefix' => 'menus', 'as' => 'menus.'], function () {
    Route::get('/', [MenuController::class, 'index'])->name('index')->can('appearance.menus');
    Route::post('/', [MenuController::class, 'store'])->name('store')->can('appearance.menus');
});

// team routes
Route::group(['prefix' => 'teams', 'as' => 'teams.'], function () {
    Route::get('/', [TeamController::class, 'index'])->name('index')->can('teams.index');
    Route::get('/create', [TeamController::class, 'create'])->name('create')->can('teams.create');
    Route::get('/edit/{team}', [TeamController::class, 'edit'])->name('edit')->can('teams.edit');
    Route::post('/', [TeamController::class, 'store'])->name('store')->can('teams.create');
    Route::delete('/{team}', [TeamController::class, 'destroy'])->name('destroy')->can('teams.delete');
    Route::delete('/bulk/delete', [TeamController::class, 'bulkDelete'])->name('bulk.delete')->can('teams.delete');
    Route::put('/update/{team}', [TeamController::class, 'update'])->name('update')->can('teams.edit');
});

// testimonial routes
Route::group(['prefix' => 'testimonials', 'as' => 'testimonials.'], function () {
    Route::get('/', [TestimonialController::class, 'index'])->name('index')->can('testimonials.index');
    Route::get('/create', [TestimonialController::class, 'create'])->name('create')->can('testimonials.create');
    Route::get('/edit/{testimonial}', [TestimonialController::class, 'edit'])->name('edit')->can('testimonials.edit');
    Route::post('/', [TestimonialController::class, 'store'])->name('store')->can('testimonials.create');
    Route::delete('/{testimonial}', [TestimonialController::class, 'destroy'])->name('destroy')->can('testimonials.delete');
    Route::delete('/bulk/delete', [TestimonialController::class, 'bulkDelete'])->name('bulk.delete')->can('testimonials.delete');
    Route::put('/update/{testimonial}', [TestimonialController::class, 'update'])->name('update')->can('testimonials.edit');
});

// users route
Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
    Route::get('/', [UserController::class, 'index'])->name('index')->can('users.index');
    Route::get('/create', [UserController::class, 'create'])->name('create')->can('users.create');
    Route::get('/edit/{user}', [UserController::class, 'edit'])->name('edit')->can('users.edit');
    Route::delete('/destroy/{user}', [UserController::class, 'destroy'])->name('destroy')->can('users.delete');
    Route::post('/store', [UserController::class, 'store'])->name('store')->can('users.create');
    Route::put('/update/{user}', [UserController::class, 'update'])->name('update')->can('users.edit');
    Route::delete('/bulk-delete', [UserController::class, 'bulkDelete'])->name('bulk.delete')->can('users.delete');
});

// role permission route
Route::group(['prefix' => 'roles-permissions', 'as' => 'roles.permissions.'], function () {
    Route::get('/', [RolePermissionController::class, 'index'])->name('index');
    Route::get('/create', [RolePermissionController::class, 'create'])->name('create');
    Route::post('/store', [RolePermissionController::class, 'store'])->name('store');
    Route::get('/edit/{role}', [RolePermissionController::class, 'edit'])->name('edit');
    Route::put('/update/{role}', [RolePermissionController::class, 'update'])->name('update');
    Route::delete('/destroy/{role}', [RolePermissionController::class, 'destroy'])->name('destroy');
    Route::delete('/bulk-delete', [RolePermissionController::class, 'bulkDelete'])->name('bulk.delete');
});

// pricing plan route
Route::group(['prefix' => 'pricing-plan', 'as' => 'pricing.plans.'], function (){
    Route::get('/', [PricingPlanController::class, 'index'])->name('index');
    Route::get('/create', [PricingPlanController::class, 'create'])->name('create');
    Route::post('/store', [PricingPlanController::class, 'store'])->name('store');
    Route::get('/show/{pricingPlan}', [PricingPlanController::class, 'show'])->name('show');
    Route::get('/edit/{pricingPlan}', [PricingPlanController::class, 'edit'])->name('edit');
    Route::put('/update/{pricingPlan}', [PricingPlanController::class, 'update'])->name('update');
    Route::delete('/destroy/{pricingPlan}', [PricingPlanController::class, 'destroy'])->name('destroy');
    Route::delete('/bulk-delete', [PricingPlanController::class, 'bulkDelete'])->name('bulk.delete');
});

// payment history route
Route::group(['prefix' => 'payment-history', 'as' => 'payment.history.'], function () {
    Route::get('/', [PaymentHistoryController::class, 'index'])->name('index');
    Route::get('/show/{paymentHistory}', [PaymentHistoryController::class, 'show'])->name('show');
});

// settings route
Route::group(['prefix' => 'settings', 'as' => 'settings.'], function (){
    Route::get('/payment-gateways', [SettingController::class, 'paymentGateway'])->name('payment.gateway');
    Route::put('/payment-gateway/update', [SettingController::class, 'paymentGatewayUpdate'])->name('payment.gateway.update');

    // SMTP Settings
    Route::get('/smtp-setting', [SettingController::class, 'smtpSetting'])->name('smtp.setting');
    Route::put('/smtp-setting/update', [SettingController::class, 'smtpUpdate'])->name('smtp.update');
});


// profile route
Route::get('profile', [AuthController::class, 'profile'])->name('profile');
Route::put('profile', [AuthController::class, 'updateProfile'])->name('update');
Route::put('change-password', [AuthController::class, 'changePassword'])->name('change.password');

// admin editor image upload route
Route::post('editor/image/upload', [EditorImageUploaderController::class, 'upload'])->name('editor.image.upload');

Route::get('generate-sitemap', [SeoController::class, 'generateSitemap'])->name('generate.sitemap');
