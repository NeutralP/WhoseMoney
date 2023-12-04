<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'string|required',
                'amount' => 'numeric|required',
            ]);

            $user = auth()->user();

            return response()->json([
                'data' => $user,
                'message' => 'Created',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $data = $request->validate([
                // 'name' => 'string|required',
                'amount' => 'numeric|required'
            ]);

            $user = auth()->user();
            $prev_balance = $user->balances()
                ->where('name', 'prev_balance')
                ->get();
            $cur_balance = $user->balances()
                ->where('name', 'cur_balance')
                ->get();

            $prev_balance->update([
                'amount' => $cur_balance->amount,
            ]);

            $cur_balance->update($data);

            return response()->json([
                'data' => $user,
                'message' => 'Updated',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
