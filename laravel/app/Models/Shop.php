<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'keyname',
        'name',
        'description',
        'active',
        'approved',
        'photo',
        'owner_id'
    ];

    protected $with = [
        'owner'
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

}
