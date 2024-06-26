<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'category_id',
        'category_name'
    ];

    public function material_keyword(){
        return $this->hasMany(MaterialKeyword::class,'category_id','category_id');
    }
}
