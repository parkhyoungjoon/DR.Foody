<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SelldataType extends Model
{
    protected $fillable = [
        'selldata_type',
        'selldata_type_name',
        'selldata_date_code'
    ];
}
