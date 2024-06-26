<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pocket extends Model
{
    protected $fillable = [
        'user_id',
        'food_id'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id','user_id');
    }
}
