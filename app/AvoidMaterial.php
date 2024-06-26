<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AvoidMaterial extends Model
{
    protected $fillable = [
        'user_id',
        'keyword_id'
    ];

    public function keyword(){
        return $this->belongsTo(MaterialKeyword::class,'keyword_id','keyword_id');
    }


}
