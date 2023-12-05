<?php

namespace App\Http\Controllers;

use App\Models\PayingMoney;
use Exception;
use Illuminate\Http\Request;

class PayingMoneyController extends Controller
{
    //
    public function index()
    {
        try {
            $user = auth()->user();
            $payingMoney = $user->payingMoney()->with('category')->get();

            if ($payingMoney) {
                return response()->json([
                    'data' => $payingMoney,
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($payingMoneyId)
    {
        try {
            $payingMoney = PayingMoney::with('category')
                ->find($payingMoneyId);

            if ($payingMoney) {
                return response()->json([
                    'data' => $payingMoney,
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
                'name' => 'string|required',
                'amount' => 'integer|required',
                'date' => 'date|required',
                'category_id' => 'exists:categories,id|required',
                'user_id' => 'exists:users,id|required',
            ]);

            $user = auth()->user();
            $prev_balance = $user->balances()->where('name', 'prev_balance')->first();
            $cur_balance = $user->balances()->where('name', 'cur_balance')->first();

            $prev_balance->update([
                'amount' => $cur_balance->amount,
            ]);
            $cur_balance->update([
                'amount' => $cur_balance->amount - $data['amount'],
            ]);

            // Refresh the user's data
            // $user->refresh();

            $data['prev_balance'] = $prev_balance->amount;
            $data['new_balance'] = $cur_balance->amount;

            $payingMoney = PayingMoney::create($data);

            if ($payingMoney) {
                $payingMoney->load('category');

                return response()->json([
                    'data' => $payingMoney,
                    'message' => 'Created',
                ], 201);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $payingMoneyId)
    {
        try {
            $data = $request->validate([
                'name' => 'string|required',
                'amount' => 'integer|required',
                'date' => 'date|required',
            ]);

            $payingMoney = PayingMoney::find($payingMoneyId);

            if ($payingMoney) {
                $user = auth()->user();
                $old_amount = $payingMoney->amount;
                $new_amount = $request->amount;

                $prev_balance = $user->balances()->where('name', 'prev_balance')->first();
                $cur_balance = $user->balances()->where('name', 'cur_balance')->first();

                $prev_balance->update([
                    'amount' => $cur_balance->amount,
                ]);
                $cur_balance->update([
                    'amount' => $cur_balance->amount + $old_amount - $new_amount,
                ]);

                // Refresh the user's data
                // $user->refresh();

                $data['prev_balance'] = $prev_balance->amount;
                $data['new_balance'] = $cur_balance->amount;

                $payingMoney->update($data);

                $payingMoney->load('category');

                return response()->json([
                    'data' => $payingMoney,
                    'message' => 'Updated',
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($payingMoneyId)
    {
        try {
            $payingMoney = PayingMoney::find($payingMoneyId);

            if ($payingMoney) {
                $user = auth()->user();
                $prev_balance = $user->balances()->where('name', 'prev_balance')->first();
                $cur_balance = $user->balances()->where('name', 'cur_balance')->first();

                $prev_balance->update([
                    'amount' => $cur_balance->amount,
                ]);
                $cur_balance->update([
                    'amount' => $cur_balance->amount + $payingMoney->amount,
                ]);

                // Refresh the user's data
                // $user->refresh();

                $payingMoney->delete();

                return response()->json([
                    'message' => 'Deleted',
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
