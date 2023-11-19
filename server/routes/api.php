<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NoteCommentController;
use App\Http\Controllers\NoteHistoryController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserProfileController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
