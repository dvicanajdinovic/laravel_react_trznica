<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'street',
        'hn',
        'postcode',
        'city',
        'country',
        'status',
        'cart_content',
        'note',
        'user_id',
        'courier_id',
    ];

    protected $casts = [
        'cart_content' => 'array',
    ];
}
