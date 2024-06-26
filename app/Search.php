<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    protected $fillable = [
        'search_id',
        'food_id',
        'location_code',
        'search_sex',
        'search_date',
        'search_age',
    ];
    
}
