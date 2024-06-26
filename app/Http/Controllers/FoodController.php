<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function searchFood(Request $request){

        $searchText = $request->searchText;
        $foodList = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo, truncate(avg(review_point),1) as point'))->leftJoin('reviews','reviews.food_id','=','foods.food_id')->where("food_name","like","%".$searchText."%")->groupBy('foods.food_id')->get();
        
        if ($foodList) {
            return $foodList;
        } else {
            return "No Results Found.";
        }
    }
}
