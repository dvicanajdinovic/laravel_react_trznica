<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Cart;

class OrderController extends Controller
{
    public function create(Request $request) {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required',
                'phone' => 'required',
                'street' => 'required',
                'hn' => 'required',
                'postcode' => 'required',
                'city' => 'required',
                'country' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->messages(),
                    'status' => 422
                ]);                
            } else {
                $order = $request->all();
                $order['status'] = 'pending';
                $order['user_id'] = auth('sanctum')->user()->id;

                $cartItems = Cart::where('user_id', auth('sanctum')->user()->id)->get();
                $orderContent = [];

                foreach ($cartItems as $item) {
                    $orderContent[] = [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->price,
                    ];
                }

                $order['cart_content'] = $orderContent;

                Order::create($order);

                Cart::destroy($cartItems);

                return response()->json([
                    'message' => 'Order is placed.',
                    'status' => 200
                ]);
            }
        } else {
            return response()->json([
                'message' => "Not logged in.",
                'status' => 401
            ]);
        }
    }

    public function index() {
        $orders = Order::all();

        return response()->json([
            'orders' => $orders,
            'status' => 200
        ]);
    }

    public function get($id) {
        $order = Order::find($id);

        if ($order) {
            return response()->json([
                'order' => $order,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => 'Not found.',
                'status' => 404
            ]);            
        }
    }

    public function update(Request $request, $id) {
        $data = $request->all(); 

        $validator = Validator::make($data, [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
                'status' => 422,
            ]);
        } else {
            $order = Order::find($id);

            if ($order) {    
                $order->update($data);
        
                return response()->json([
                    'message' => 'Success',
                    'status' => 200
                ]);
            } else {
                return response()->json([
                    'message' => 'Not found.',
                    'status' => 404
                ]);               
            }
        }
    }

    public function selectStatus() {
        $statuses = OrderStatus::all();

        return response()->json([
            'statuses' => $statuses,
            'status' => 200
        ]);      
    }
}
