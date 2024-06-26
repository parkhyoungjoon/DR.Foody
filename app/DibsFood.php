<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DibsFood extends Model
{
    protected $fillable = [
        'user_id',
        'food_id',
    ];

    public function food(){
        return $this->belongsTo(Food::class,'food_id','food_id');
    }
}
