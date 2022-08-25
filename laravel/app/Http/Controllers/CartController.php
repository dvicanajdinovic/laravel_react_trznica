<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class CartController extends Controller
{
    public function addProduct(Request $request) {
        $data = $request->all();
        
        if (auth('sanctum')->check()) {
            $data['user_id'] = auth('sanctum')->user()->id;

            $product = Product::find($data['product_id']);

            if ($product['quantity'] < $data['quantity']) {
                return response()->json([
                    'message' => "Quantity error.",
                    'status' => 409
                ]);   
            } else {
                Cart::create($data);
                return response()->json([
                    'message' => "Product added to cart.",
                    'status' => 201
                ]);
            }
        } else {
            return response()->json([
                'message' => "Not logged in.",
                'status' => 401
            ]);
        }
    }

    public function getShoppingList() {
        if (auth('sanctum')->check()) {
            $currentUserId = auth('sanctum')->user()->id;

            $list = Cart::where('user_id', $currentUserId)->get();

            return response()->json([
                'list' => $list,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => "Not logged in.",
                'status' => 401
            ]);
        }
    }

    public function updateProductQuantity($id, $s) {
        if (auth('sanctum')->check()) {
            $currentUserId = auth('sanctum')->user()->id;

            $item = Cart::where('id', $id)->where('user_id', $currentUserId)->first();

            if ($s == '-') {
                $item['quantity'] -= 1;
            } else if ($s == '+') {
                $item['quantity'] += 1;
            }

            $item->update();

            return response()->json([
                'message' => 'Product quantity updated.',
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => "Not logged in.",
                'status' => 401
            ]);
        }
    }

    public function delete($id) {
        if (auth('sanctum')->check()) {
            $currentUserId = auth('sanctum')->user()->id;

            $item = Cart::where('id', $id)->where('user_id', $currentUserId)->first();

            if ($item) {
                $item->delete();

                return response()->json([
                    'message' => 'Product removed from cart.',
                    'status' => 200
                ]);
            } else {
                return response()->json([
                    'message' => 'Product not found.',
                    'status' => 404
                ]);
            }
        } else {
            return response()->json([
                'message' => "Not logged in.",
                'status' => 401
            ]);
        }
    }
}
