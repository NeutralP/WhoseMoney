<?php

namespace App\Http\Controllers;

use App\Models\EarningMoney;
use Exception;
use Illuminate\Http\Request;

class EarningMoneyController extends Controller
{
    //
    public function index()
    {
        try {
            $user = auth()->user();
            $earnings = $user->earningMoney()->get();

            if ($earnings) {
                return response()->json([
                    'data' => $earnings,
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
                'name' => 'required|string',
                'amount' => 'required|integer',
                'date' => 'required|date',
                'source' => 'required|string',
            ]);

            $user = auth()->user();

            $new_earning = $user->earningMoney()->create($data);

            if ($new_earning) {
                return response()->json([
                    'data' => $new_earning,
                    'message' => 'Created',
                ], 201);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $earningId)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string',
                'amount' => 'required|integer',
                'date' => 'required|date',
                'source' => 'required|string',
            ]);

            $user = auth()->user();

            $earning = $user->earningMoney()->findOrFail($earningId);

            if ($earning) {
                $earning->update($data);

                return response()->json([
                    'data' => $earning,
                    'message' => 'Updated',
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

    public function delete($earningId)
    {
        try {
            $user = auth()->user();

            $earning = $user->earningMoney()->findOrFail($earningId);

            if ($earning) {
                $earning->delete();

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
