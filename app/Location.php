<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'location_code',
        'city_code',
        'location_kr',
        'location_en',
    ];
}
