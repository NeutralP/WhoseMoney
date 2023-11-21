<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EarningMoneyController;
use App\Http\Controllers\EarningTargetController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// OAuth
Route::controller(SocialiteController::class)->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/google/redirect', 'googleRedirect');
        Route::get('/google/callback', 'googleCallback');
        Route::get('/facebook/redirect', 'facebookRedirect');
        Route::get('/facebook/callback', 'facebookCallback');
        Route::get('/github/redirect', 'githubRedirect');
        Route::get('/github/callback', 'githubCallback');
    });
});

// Normal auth
Route::controller(AuthController::class)->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('signin', 'signin');
        Route::post('signout', 'signout');
        Route::post('signup', 'signup');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });
});

// EarningMoney handlers
Route::controller(EarningMoneyController::class)->group(function () {
    Route::prefix('earning-money')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::patch('/{targetId}', 'update');
        Route::delete('/{targetId}', 'delete');
    });
});

// EarningTarget handlers
Route::controller(EarningTargetController::class)->group(function () {
    Route::prefix('earning-target')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::patch('/{targetId}', 'update');
        Route::delete('/{targetId}', 'delete');
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
