<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class SavingTargetController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            $targets = $user->savingTargets()->get();

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
                'target' => 'numeric|required',
                'month' => 'integer|required',
                'year' => 'integer|required',
            ]);

            $user = auth()->user();
            $target = $user->savingTargets()->create($data);

            if ($target) {
                return response()->json([
                    'data' => $target,
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

    public function update(Request $request, $targetId)
    {
        try {
            $data = $request->validate([
                'target' => 'required|numeric',
                'month' => 'required|integer',
                'year' => 'required|integer'
            ]);

            $user = auth()->user();
            $target = $user->savingTargets()->findOrFail($targetId);

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

    public function delete($targetId)
    {
        try {
            $user = auth()->user();
            $target = $user->savingTargets()->findOrFail($targetId);

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
