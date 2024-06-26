<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Selldata extends Model
{
    protected $fillable = [
        'food_id',
        'order_id',
        'selldata_price'
    ];
}
