<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaterialKeyword extends Model
{
    protected $fillable = [
        'keywrod_id',
        'keyword_name',
        'keyword_code',
        'category_id',
    ];
}
