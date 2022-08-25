<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'products' => $products,
            'status' => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = $request->all(); 

        $validator = Validator::make($data, [
            'category_id' => 'required',
            'name' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'photo' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
                'status' => 422
            ]);
        } else {
            $data['keyname'] = strtolower(Str::ascii(str_replace(' ', '-', $data['name'])));
            $data['shop_id'] = 1;
            $data['active'] = $data['active'] == true ? 1 : 0;
            $data['approved'] = $data['approved'] == true ? 1 : 0;
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $extension = $file->getClientOriginalExtension();
                $name = time() . '.' . $extension;

                $file->move('photos/products/', $name);
                $data['photo'] = 'photos/products/' . $name;
            }

            Product::create($data);
    
            return response()->json([
                'message' => 'Success',
                'status' => 200
            ]);
        }
    }

    public function get($id) {
        $product = Product::find($id);

        if ($product) {
            return response()->json([
                'product' => $product,
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
            $product = Product::find($id);

            if ($product) {
                $data['keyname'] = strtolower(Str::ascii(str_replace(' ', '-', $data['name'])));
                
                if ($request->hasFile('photo')) {
                    $path = $product->photo;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('photo');
                    $extension = $file->getClientOriginalExtension();
                    $name = time() . '.' . $extension;
                    $file->move('photos/products/', $name);
                    $data['photo'] = 'photos/products/' . $name;
                }
    
                $product->update($data);
        
                return response()->json([
                    'message' => 'Success',
                    'status' => 200,
                    'data' => $data
                ]);
            } else {
                return response()->json([
                    'message' => 'Not found.',
                    'status' => 404
                ]);               
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Product::destroy($id);
    }

    /**
     * Search product by name.
     *
     * @param  int  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        return Product::where('name', 'like', '%'.$name.'%')->get();
    }

    public function getByShop($shopKeyname) {
        $shop = Shop::where('keyname', $shopKeyname)->first();

        if ($shop) {
            $products = Product::where('approved', 1)
                                ->where('active', 1)
                                ->with('shop')->whereHas('shop', function($query) use ($categoryKeyname) {
                                    return $query->where('keyname', $shopKeyname)
                                        ->where('active', 1);
                                })
                                ->get();

            if (count($products) > 0) {
                return response()->json([
                    'message' => 'Success',
                    'status' => 200,
                    'products' => $products,
                    'shop' => $shop
                ]);
            } else {
                    return response()->json([
                    'message' => 'U ovoj trgovini trenutno ne postoji ni jedan proizvod.',
                    'status' => 400,
                ]);           
            }
        } else {
            return response()->json([
                'message' => 'Trgovina nije pronađena.',
                'status' => 404,
            ]);
        }
    }

    public function getByCategory($categoryKeyname) {
        $category = Category::where('keyname', $categoryKeyname)->first();

        if ($category) {
            $products = Product::where('approved', 1)
                                ->where('active', 1)
                                ->with('category')->whereHas('category', function($query) use ($categoryKeyname) {
                                    return $query->where('keyname', $categoryKeyname)
                                                ->where('active', 1);
                                })
                                ->get();

            if (count($products) > 0) {
                return response()->json([
                    'message' => 'Success',
                    'status' => 200,
                    'products' => $products,
                    'category' => $category
                ]);
            } else {
                    return response()->json([
                    'message' => 'U ovoj kategoriji trenutno ne postoji ni jedan proizvod.',
                    'status' => 400,
                ]);           
            }
        } else {
            return response()->json([
                'message' => 'Kategorija nije pronađena.',
                'status' => 404,
            ]);
        }
    }

    public function displayProduct($productKeyname) {
        $product = Product::where('keyname', $productKeyname)
                            ->where('approved', 1)
                            ->where('active', 1)
                            ->with('category')->whereHas('category', function($query) {
                                return $query->where('active', 1);
                            })
                            ->first();
        if ($product) {
            return response()->json([
                'product' => $product,
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
