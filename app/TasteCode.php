<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TasteCode extends Model
{
    protected $fillable = [
        'taste_code',
        'taste_name',
    ];
}
