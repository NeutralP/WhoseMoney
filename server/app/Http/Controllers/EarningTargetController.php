<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class EarningTargetController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            $targets = $user->earningTargets()->get();

            if ($targets) {
                return response()->json([
                    'data' => $targets,
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
                'target' => 'integer|required',
                'month' => 'integer|required',
            ]);

            $user = auth()->user();

            $target = $user->earningTargets()->create($data);

            if ($target) {
                return response()->json([]);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $targetId)
    {
        try {
            $data = $request->validate([
                'target' => 'required|integer',
                'month' => 'required|integer',
            ]);

            $user = auth()->user();

            $target = $user->earningTargets()->findOrFail($targetId);

            if ($target) {
                $target->update($data);

                return response()->json([
                    'data' => $target,
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

    public function delete($targetId)
    {
        try {
            $user = auth()->user();

            $target = $user->earningTargets()->findOrFail($targetId);

            if ($target) {
                $target->delete();

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
