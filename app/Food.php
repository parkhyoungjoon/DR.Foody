<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'food_id',
        'company_id',
        'food_name',
        'food_photo',
        'food_word',
    ];

    public function search(){
        return $this->hasMany(Search::class,'food_id','food_id');
    }

    public function company(){
        return $this->belongsto(CompanyCode::class,'company_id','company_id');
    }
}
