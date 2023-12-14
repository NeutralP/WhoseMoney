<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function index()
    {
        try {
            $user = auth()->user();
            $categories = $user->categories()->get();

            if ($categories) {
                return response()->json([
                    'data' => $categories,
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
                'limit' => 'numeric|required',
            ]);

            $user = auth()->user();
            $category = $user->categories()->create($data);
            $category->payingLimits()->updateOrCreate([
                'month' => Carbon::now()->month,
                'year' => Carbon::now()->year,
            ], [
                'limit' => $data['limit'],
            ]);

            if ($category) {
                return response()->json([
                    'data' => $category,
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

    public function show($categoryId)
    {
        try {
            $category = Category::find($categoryId);

            if ($category) {
                return response()->json([
                    'data' => $category,
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $categoryId)
    {
        try {
            $category = Category::find($categoryId);

            $data = $request->validate([
                'name' => 'string|required',
            ]);

            if ($category) {
                $category->update($data);

                return response()->json([
                    'data' => $category,
                    'message' => 'Updated',
                ], 200);
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

    public function updatePayLimit(Request $request, $categoryId)
    {
        try {
            $data = $request->validate([
                'limit' => 'numeric|required',
                'month' => 'integer|required',
                'year' => 'integer|required',
            ]);

            $category = Category::find($categoryId);

            if ($category) {
                $category->payingLimits()->updateOrCreate([
                    // 'category_id' => $category->id,
                    'month' => $data['month'],
                    'year' => $data['year'],
                ], [
                    'limit' => $data['limit'],
                ]);

                return response()->json([
                    'data' => $category,
                    'message' => 'Updated',
                ], 200);
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

    public function destroy($categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId);

            if ($category) {
                $category->delete();

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
