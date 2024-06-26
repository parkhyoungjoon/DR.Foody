<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FoodWord extends Model
{
    protected $fillable = [
        'word_id',
        'food_id',
        'nickname',
        'food_word',
        'sex',
        'country_code',
        'source_code',
    ];
}
