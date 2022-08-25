<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Str;

class ShopController extends Controller
{
    public function create(Request $request) {
        $data = $request->all(); 

        $validator = Validator::make($data, [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
                'status' => 400
            ]);
        } else {
            $data['keyname'] = strtolower(Str::ascii(str_replace(' ', '-', $data['name'])));
            $data['active'] = 1;
            $data['approved'] = 1;
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $extension = $file->getClientOriginalExtension();
                $name = time() . '.' . $extension;

                $file->move('photos/categories/', $name);
                $data['photo'] = 'photos/categories/' . $name;
            }

            Shop::create($data);
    
            return response()->json([
                'message' => 'Success',
                'status' => 200
            ]);
        }
    }

    public function index() {
        $shops = Shop::all();

        return response()->json([
            'shops' => $shops,
            'status' => 200
        ]);
    }

    public function get($id) {
        $shop = Shop::find($id);

        if ($shop) {
            return response()->json([
                'shop' => $shop,
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
            $shop = Shop::find($id);

            if ($shop) {
                $data['keyname'] = strtolower(Str::ascii(str_replace(' ', '-', $data['name'])));
                if ($request->hasFile('photo')) {
                    $path = $shop->photo;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('photo');
                    $extension = $file->getClientOriginalExtension();
                    $name = time() . '.' . $extension;
                    $file->move('photos/categories/', $name);
                    $data['photo'] = 'photos/categories/' . $name;
                }
    
                $shop->update($data);
        
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


    public function delete($id) {
        $shop = Shop::find($id);

        if ($shop) {
            $shop->delete();
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

    public function select() {
        $shops = Shop::all();

        return response()->json([
            'categories' => $shops,
            'status' => 200
        ]);      
    }

    public function selectOwner() {
        $owners = User::all();

        return response()->json([
            'owners' => $owners,
            'status' => 200
        ]);      
    }

}
