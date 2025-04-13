<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\MapMarkerController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'map', 'as' => 'map.'], function () {
    Route::get('/index', [MapMarkerController::class, 'index']);
    Route::post('/store', [MapMarkerController::class, 'store'])->name('store')->can('map-markers.create');
    Route::get('/update/{id}', [MapMarkerController::class, 'update'])->name('update')->can('map-markers.edit');
    Route::delete('/destroy/{id}', [MapMarkerController::class, 'destroy'])->name('destroy')->can('map-markers.delete');
    Route::delete('/bulk-delete', [MapMarkerController::class, 'bulkDelete'])->name('bulk.delete')->can('map-markers.delete');
});
