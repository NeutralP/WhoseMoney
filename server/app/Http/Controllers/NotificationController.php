<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        try {
            $notifications = auth()->user()->notifications()->get();
            $notifications->load('notifiable');

            return response()->json([
                'data' => $notifications,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
