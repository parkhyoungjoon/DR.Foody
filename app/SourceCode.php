<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SourceCode extends Model
{
    protected $fillable = [
        'source_code',
        'source_name',
    ];
}
