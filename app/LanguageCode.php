<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LanguageCode extends Model
{
    protected $fillable = [
        'language_code',
        'language_name',
        'language_keyword',
    ];
}
