<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class SavingMoneyController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            $saving_money = $user->savingMoney()->get();

            if ($saving_money) {
                return response()->json([
                    'data' => $saving_money,
                    'message' => 'Get data successfully.',
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'amount' => 'required|integer',
                'date' => 'required|date',
                'description' => 'required|string',
            ]);

            $user = auth()->user();
            $new_saving = $user->savingMoney()->create($data);

            if ($new_saving) {
                return response()->json([
                    'data' => $new_saving,
                    'message' => 'Created',
                ], 201);
            }
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

    public function delete($savingId)
    {
        try {
            $user = auth()->user();

            $saving = $user->savingMoney()->findOrFail($savingId);

            if ($saving) {
                $saving->delete();

                return response()->json([
                    'message' => 'Deleted',
                ], 200);
            }

            // Unauthorized | Not found
            return response()->json([
                'message' => 'Unauthorized | Not found',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
