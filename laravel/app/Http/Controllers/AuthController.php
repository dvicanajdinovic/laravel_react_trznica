<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' =>$validator->messages(),
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'user_role_id' => 2,
                'password' => Hash::make($request->password),
            ]);
            $token = $user->createToken('usertoken')->plainTextToken;

            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'You are successfully registered.'
            ]);          
        }
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'The given credentials are invalid.'
                ]);
            } else {
                if ($user->user_role_id == 1) {
                    $userRole = 'admin';
                    $token = $user->createToken('admintoken', ['server:admin'])->plainTextToken;
                } else {
                    $userRole = '';
                    $token = $user->createToken('usertoken', [''])->plainTextToken;
                }

                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'userRole' => $userRole,
                    'token' => $token,
                    'message' => 'Uspješno ste prijavljeni.'
                ]); 
            }
        }
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Uspješno ste odjavljeni.'
        ]);
    }
}
