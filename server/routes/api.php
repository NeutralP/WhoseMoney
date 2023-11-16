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

// Handle tags
Route::controller(TagController::class)->group(function () {
    Route::prefix('tags')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::patch('/{tagId}', 'update');
        Route::delete('/{tagId}', 'destroy');
    });
});

// Handle note
Route::controller(NoteController::class)->group(function () {
    Route::prefix('note')->group(function () {
        Route::get('/all/no_paginate', 'indexNoPaginate');
        Route::get('/all/starred/no_paginate', 'starredNoPaginate');
        Route::get('/all', 'index'); // returns all notes with recently order
        Route::get('/all/starred', 'starred'); // returns all notes that are starred
        Route::get('/{noteId}', 'show');
        Route::post('/create', 'store');
        Route::patch('/{noteId}', 'update');
        Route::patch('/{noteId}/tags', 'updateTags');
        Route::patch('/{noteId}/content', 'saveNoteContent'); // Update the content of the note
        Route::delete('/{noteId}', 'destroy');
    });
});

// Handle note comments
Route::controller(NoteCommentController::class)->group(function () {
    Route::group(['prefix' => 'note'], function () {
        Route::get('/{noteId}/comments', 'index');
        Route::post('/{noteId}/comment/create', 'store');
        Route::patch('/{noteId}/comment/{commentId}/vote', 'voteComment');
        Route::delete('/{noteId}/comment/{commentId}/delete', 'destroy');
    });
});

// Handle note histories
Route::controller(NoteHistoryController::class)->group(function () {
    Route::group(['prefix' => 'note'], function () {
        Route::get('/{noteId}/histories', 'index');
        Route::delete('/{noteId}/history/{historyId}/delete', 'destroy');
    });
});

// Handle directories
Route::controller(DirectoryController::class)->group(function () {
    Route::prefix('directory')->group(function () {
        Route::get('/', 'index');
        Route::get('/{directoryId}', 'show');
        Route::get('/{directoryId}/children', 'getChildren');
        Route::post('/', 'store');
        Route::patch('/{directoryId}', 'update');
        Route::delete('/{directoryId}', 'destroy');
    });
});

// Handle schedules
Route::controller(ScheduleController::class)->group(function () {
    Route::prefix('schedules')->group(function () {
        Route::get('/', 'index');
        Route::get('/{scheduleId}', 'show');
        Route::post('/', 'store');
        Route::patch('/{scheduleId}', 'update');
        Route::patch('/{scheduleId}/star', 'starAction');
        Route::patch('/{scheduleId}/tags', 'attachTags');
        Route::delete('/{scheduleId}', 'destroy');
    });
});

// Handle events
Route::controller(EventController::class)->group(function () {
    Route::prefix('events')->group(function () {
        Route::get('/', 'index');
        Route::get('/{eventId}', 'show');
        Route::patch('/{eventId}', 'update');
        Route::post('/', 'store');
        Route::delete('/{eventId}', 'destroy');
    });
});

// Handle post
Route::controller(PostController::class)->group(function () {
    Route::prefix('posts')->group(function () {
        Route::get('/', 'index');
        Route::get('/{postId}', 'show');
        Route::post('/', 'store');
        Route::patch('/{postId}', 'update');
        Route::patch('/{postId}/star', 'starPost');
        Route::patch('/{postId}/like', 'likePost');
        Route::delete('/{postId}', 'destroy');
    });
});

// Handle post comment
Route::controller(PostCommentController::class)->group(function () {
    Route::prefix('posts/{postId}/comments')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::patch('/{commentId}/like', 'likeComment');
        Route::delete('/{commentId}', 'destroy');
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('profile/{userId}', [UserProfileController::class, 'show']);
Route::patch('profile/{userId}', [UserProfileController::class, 'update']);
