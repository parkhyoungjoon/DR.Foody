<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompanyCode extends Model
{
    protected $fillable = [
        'company_id',
        'company_name',
    ];
}
