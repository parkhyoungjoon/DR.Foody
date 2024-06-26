<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FoodMaterial extends Model
{
    protected $fillable = [
        'food_id',
        'material_code',
    ];
    public function material_code(){
        return $this->belongsTo(Material::class,'material_code','material_code');
    }
}