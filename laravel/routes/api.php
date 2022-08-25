<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('get-categories', [CategoryController::class, 'index']);
Route::get('get-shops', [ShopController::class, 'index']);
Route::get('display-products-by-shop/{shopKeyname}', [ProductController::class, 'getByShop']);
Route::get('display-products-by-category/{categoryKeyname}', [ProductController::class, 'getByCategory']);
Route::get('display-product/{productKeyname}', [ProductController::class, 'displayProduct']);
Route::post('add-to-cart', [CartController::class, 'addProduct']);
Route::get('my-shopping-cart', [CartController::class, 'getShoppingList']);
Route::put('update-product-quantity/{id}/{s}', [CartController::class, 'updateProductQuantity']);
Route::delete('remove-product-from-cart/{id}', [CartController::class, 'delete']);
Route::post('place-order', [OrderController::class, 'create']);

//Protected routes
Route::middleware(['auth:sanctum', 'checkForAdmin'])->group(function () {
    Route::get('/checkUser', function () { 
        return response()->json(['message' => 'Success!', 'status' => 200], 200);
    });

    Route::post('add-category', [CategoryController::class, 'create']);
    Route::get('get-category/{id}', [CategoryController::class, 'get']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'delete']);
    Route::get('select-category', [CategoryController::class, 'select']);

    Route::post('add-shop', [ShopController::class, 'create']);
    Route::get('get-shop/{id}', [ShopController::class, 'get']);
    Route::put('update-shop/{id}', [ShopController::class, 'update']);
    Route::get('select-shop', [ShopController::class, 'select']);
    Route::get('select-owner', [ShopController::class, 'selectOwner']);

    Route::post('add-product', [ProductController::class, 'create']);
    Route::get('get-products', [ProductController::class, 'index']);
    Route::get('get-product/{id}', [ProductController::class, 'get']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'delete']);
    Route::get('select-product', [ProductController::class, 'select']);

    Route::get('get-all-orders', [OrderController::class, 'index']);
    Route::get('get-order/{id}', [OrderController::class, 'get']);
    Route::put('update-order/{id}', [OrderController::class, 'update']);
    Route::get('select-status', [OrderController::class, 'selectStatus']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});