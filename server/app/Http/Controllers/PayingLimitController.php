<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class PayingLimitController extends Controller
{
    //
    public function index($categoryId)
    {
        try {
            // $user = auth()->user();
            // $category = $user->categories()->find($categoryId);
            // $payingLimits = $category->payingLimit()->get();

            // if ($payingLimits) {
            //     return response()->json([
            //         'data' => $payingLimits,
            //     ]);
            // }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($payingLimitId)
    {
        try {
            // $user = auth()->user();

            // $payingLimit = $user->payingLimits()->find($payingLimitId);

            // if ($payingLimit) {
            //     return response()->json([
            //         'data' => $payingLimit,
            //     ], 200);
            // }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $categoryId)
    {
        try {
            // $data = $request->validate([
            //     'limit' => 'numeric|required',
            //     'month' => 'integer|required',
            //     // 'category_id' => 'exists:categories,id|required',
            // ]);

            // $category = auth()->user()->categories()->find($categoryId);
            // $payingLimit = $user->payingLimits()->find($payingLimitId);

            // if ($payingLimit) {
            //     $payingLimit->update($data);

            //     return response()->json([
            //         'data' => $payingLimit,
            //         'message' => 'Updated',
            //     ], 200);
            // }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
