<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CityCode extends Model
{
    protected $fillable = [
        'city_code',
        'country_code',
        'city_name_en',
        'city_name_kr'
    ];
}
