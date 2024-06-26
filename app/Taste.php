<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taste extends Model
{
    protected $fillable = [
        'food_id',
        'taste_code',
        'taste_lv',
    ];
}
