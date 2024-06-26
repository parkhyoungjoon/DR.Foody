<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CountryCode extends Model
{
    protected $fillable = [
        'country_code',
        'country_name_kr',
        'country_name_en',
    ];
}
