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
                'amount' => 'required|integer|min:1',
                'date' => 'required|date',
                'source' => 'required|string',
            ]);

            $user = auth()->user();

            $prev_balance = $user->balances()->where('name', 'prev_balance')->first();
            $cur_balance = $user->balances()->where('name', 'cur_balance')->first();

            $prev_balance->update([
                'amount' => $cur_balance->amount,
            ]);
            $cur_balance->update([
                'amount' => $cur_balance->amount + $data['amount'],
            ]);

            // Refresh the user's data
            // $user->refresh();

            $data['prev_balance'] = $prev_balance->amount;
            $data['new_balance'] = $cur_balance->amount;

            $new_earning = $user->earningMoney()->create($data);

            if ($new_earning) {
                return response()->json([
                    'data' => $new_earning,
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

    public function update(Request $request, $earningId)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string',
                'amount' => 'required|integer|min:1',
                'date' => 'required|date',
                'source' => 'required|string',
            ]);

            $user = auth()->user();

            $earning = $user->earningMoney()->findOrFail($earningId);

            if ($earning) {
                $old_amount = $earning->amount;
                $new_amount = $request->amount;

                $prev_balance = $user->balances()->where('name', 'prev_balance')->first();
                $cur_balance = $user->balances()->where('name', 'cur_balance')->first();

                $prev_balance->update([
                    'amount' => $cur_balance->amount,
                ]);
                $cur_balance->update([
                    'amount' => $cur_balance->amount - $old_amount + $new_amount,
                ]);

                // Refresh the user's data
                // $user->refresh();

                $data['prev_balance'] = $prev_balance->amount;
                $data['new_balance'] = $cur_balance->amount;

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

    public function delete($earningId)
    {
        try {
            $user = auth()->user();

            $earning = $user->earningMoney()->findOrFail($earningId);

            if ($earning) {
                $prev_balance = $user->balances()->where('name', 'prev_balance')->first();
                $cur_balance = $user->balances()->where('name', 'cur_balance')->first();

                $prev_balance->update([
                    'amount' => $cur_balance->amount,
                ]);
                $cur_balance->update([
                    'amount' => $cur_balance->amount - $earning->amount,
                ]);

                // Refresh the user's data
                // $user->refresh();

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
