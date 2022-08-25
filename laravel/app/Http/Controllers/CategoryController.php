<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
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
            $data['active'] = $data['active'] == true ? '1' : '0';
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $extension = $file->getClientOriginalExtension();
                $name = time() . '.' . $extension;

                $file->move('photos/categories/', $name);
                $data['photo'] = 'photos/categories/' . $name;
            }

            Category::create($data);
    
            return response()->json([
                'message' => 'Success',
                'status' => 200
            ]);
        }
    }

    public function index() {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories,
            'status' => 200
        ]);
    }

    public function get($id) {
        $category = Category::find($id);

        if ($category) {
            return response()->json([
                'category' => $category,
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
            $category = Category::find($id);

            if ($category) {
                $data['keyname'] = strtolower(Str::ascii(str_replace(' ', '-', $data['name'])));
                if ($request->hasFile('photo')) {
                    $path = $category->photo;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('photo');
                    $extension = $file->getClientOriginalExtension();
                    $name = time() . '.' . $extension;
                    $file->move('photos/categories/', $name);
                    $data['photo'] = 'photos/categories/' . $name;
                }
    
                $category->update($data);
        
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
        $category = Category::find($id);

        if ($category) {
            $category->delete();
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
        $categories = Category::where('active', 1)->get();

        return response()->json([
            'categories' => $categories,
            'status' => 200
        ]);      
    }

}
