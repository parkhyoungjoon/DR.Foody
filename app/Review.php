<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'review_id',
        'user_id',
        'food_id',
        'language_code',
        'review_content',
        'review_sweet',
        'review_salty',
        'review_hot',
        'review_sour',
        'review_bitter',
        'review_point',
        'review_date',
        'review_type',
    ];
    public function food(){
        return $this->belongsTo(Food::class,'food_id','food_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id','user_id');
    }
    public function language_code(){
        return $this->belongsTo(LanguageCode::class,'language_code','language_code');
    }
}
