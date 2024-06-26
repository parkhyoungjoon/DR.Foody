<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request){
        // $search_id = $request->get('id');
        // $search = DB::table('food')->where('name','like', '%'+$search_id+'%')->get();
        // $users = DB::table('users')->select('name', 'email as user_email')->get();
        

        // food_name = {prod.food_name}
        //                             imageUrl ={prod.food_photo}  
        //                             rating= {prod.food_rating} 
        //                             materiial= {prod.materiial}
        $search = $request->get('search_id');
        $result = ['food_name'=>$search, 'food_photo'=>null, 'food_rating'=>10, 'material'=>'material'];
        return response()->json([
            'status'=>'success',
            'search_data'=>$search,
            'result'=> $result
        ], 200);
    }
/*
    public function product(Request $request){
        $search = $request->get('id');
        $result = ['food_name'=>$search, 'food_photo'=>null, 'food_rating'=>10, 'material'=>'material'];
        return response()->json([
            'status'=>'success',
            'search_data'=>$search,
            'result'=> $result,
            'function'=> 'product',
        ], 200);

       
        // return response()->json($search);
        // return response()->json('드래곤');
    }
*/
    public function material($food_id,$user_id){
        $date = date("Y-m-d H:i:s");
        $user = \App\User::where("user_id","=",$user_id)->first();
        $birth_time = strtotime($user->user_birth);
        $birthday = date('Ymd' , $birth_time);
        $age = floor((date('Ymd') - $birthday) / 10000);
        if(isset($user_id)){
            DB::table('searches')->insert(
                [
                    'food_id'=>$food_id,
                    'search_date'=>$date,
                    'location_code'=>46,
                    'search_sex'=>$user->user_sex,
                    'search_age'=>$age,
                    'user_id'=>$user_id
                ]
            );
        }

        $material = \App\FoodMaterial::select(DB::raw('material_name, if( materials.keyword_id IN (SELECT keyword_id FROM avoid_materials WHERE user_id = '.$user_id.'), 1, 0) as type'))
        ->leftJoin('materials','food_materials.material_code','=','materials.material_code')
        ->where("food_id","=",$food_id)
        ->orderBy('type','desc')
        ->get();
        return $material;
    }

    public function searchFood($searchText, $user_id = false){
        $user_id = \App\User::select('user_id')->where('id', $user_id)->first()->user_id;
        $selldata = \App\Selldata::select(DB::raw('orders.order_id as order_id, food_id'))
        ->leftJoin('orders','orders.order_id','=','selldatas.order_id')
        ->where('orders.user_id',$user_id);

        $reviewdata = \App\Review::select(DB::raw('food_id, truncate(avg(review_point),1) as point, count(reviews.food_id) as review_count'))
        ->groupBy('food_id');

        $foodList = \App\Food::select(DB::raw('foods.food_id, ifnull(selldata.order_id, 0) as bought, reviewdata.point, reviewdata.review_count, company_codes.company_name , food_name, food_photo'))
        ->leftJoin('company_codes','foods.company_id','=','company_codes.company_id')
        ->leftJoinSub($selldata, 'selldata', function ($join) {
            $join->on('foods.food_id', '=', 'selldata.food_id');
        })
        ->leftJoinSub($reviewdata, 'reviewdata', function ($join) {
            $join->on('foods.food_id', '=', 'reviewdata.food_id');
        })
        ->where('food_name','like','%'.$searchText.'%')
        ->get();

        
        
        foreach($foodList as $key => $food){
            $sex = $foodList[$key]->search()->avg('search_sex');
            if($sex){
                $sex = ($sex == 0.5) ? "동일" : (round($sex) == 0) ? "여자" : "남자" ;
            }
            $country = \App\Search::select(DB::raw('count(search_id) as country_count,country_codes.country_code, country_codes.country_name_kr'))
            ->leftJoin('locations','locations.location_code','=','searches.location_code')
            ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
            ->leftJoin('country_codes','country_codes.country_code','=','city_codes.country_code')
            ->where('food_id',$food->food_id)
            ->groupBy('country_codes.country_code')
            ->orderBy('country_count','desc')
            ->value('country_name_kr');
            $foodList[$key]->search_count = $food->search()->count();
            $foodList[$key]->country = $country;
            $foodList[$key]->sex = $sex;
        }
        return $foodList;
    }

    public function detailFood2($food_id){
        $reviewdata = \App\Review::select(DB::raw('food_id, truncate(avg(review_point),1) as point, count(reviews.food_id) as review_count'))
        ->groupBy('food_id');

        $food = \App\Food::select(DB::raw('foods.food_id, reviewdata.point, reviewdata.review_count, company_codes.company_name , food_name, food_photo'))
        ->leftJoin('company_codes','foods.company_id','=','company_codes.company_id')
        ->leftJoinSub($reviewdata, 'reviewdata', function ($join) {
            $join->on('foods.food_id', '=', 'reviewdata.food_id');
        })
        ->where('foods.food_id',$food_id)
        ->first();
        $sex = $food->search()->avg('search_sex');
        if($sex){
            $sex = ($sex == 0.5) ? "동일" : (round($sex) == 0) ? "여자" : "남자" ;
        }
        $country = \App\Search::select(DB::raw('count(search_id) as country_count,country_codes.country_code, country_codes.country_name_kr'))
        ->leftJoin('locations','locations.location_code','=','searches.location_code')
        ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
        ->leftJoin('country_codes','country_codes.country_code','=','city_codes.country_code')
        ->where('food_id',$food->food_id)
        ->groupBy('country_codes.country_code')
        ->orderBy('country_count','desc')
        ->value('country_name_kr');
        $food->search_count = $food->search()->count();
        $food->country = $country;
        $food->sex = $sex;
        return $food;
    }

    public function detailFood($food_id,$user_id = 0){
        $food = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo, foods.company_id,company_codes.company_name,truncate(avg(review_point),1) as point'))
        ->leftJoin('reviews','reviews.food_id','=','foods.food_id')
        ->leftJoin('company_codes','company_codes.company_id','=','foods.company_id')
        ->groupBy('foods.food_id')
        ->where('foods.food_id',$food_id)
        ->first();
        
        $materials = \App\FoodMaterial::select('material_name')->leftJoin('materials','food_materials.material_code','=','materials.material_code')
        ->where("food_id","=",$food_id)
        ->get();

        $len = count($materials);
        $i=1;
        foreach($materials as $material){
            $food->material .= $material->material_name;
            if ($i !== $len)
                $food->material .= ', ';
            $i++;
        }
        $food->avoid = '';

        if($user_id){
            $user_id = DB::table('users')->where('id',$user_id)->value('user_id');

            $avoids = DB::table('food_materials')->select(DB::raw('avoid_materials.keyword_id, material_keywords.keyword_name'))
            ->leftJoin('materials','food_materials.material_code','=','materials.material_code')
            ->leftJoin('avoid_materials','materials.keyword_id','=','avoid_materials.keyword_id')
            ->leftJoin('material_keywords','material_keywords.keyword_id','=','avoid_materials.keyword_id')
            ->where("food_id","=",$food_id)
            ->where("avoid_materials.user_id","=",$user_id)
            ->groupBy('avoid_materials.keyword_id')->get();
            $len2 = count($avoids);
            $l=1;
            foreach($avoids as $avoid){
                $food->avoid .= $avoid->keyword_name;
                if ($l !== $len2)
                    $food->avoid .= ', ';
                $l++;
            }

        }

        // 기피 원재료 명

       

        if ($food) {
            return $food;
        } else {
            return "No Results Found.";
        }
    }
    
    public function wordCloud($food_id){
        $texts = DB::table('food_words')->select('food_text')->where('food_id',$food_id)->orderBy('word_id','desc')->limit(100)->get();
        $cloudText = '';
        foreach($texts as $text){
            $cloudText .= $text->food_text;
        }
        return $cloudText;
    }
    

    public function countryData($food_id){
        $country = \App\Search::select(DB::raw('count(search_id) as count , country_codes.country_name_en as country_name'))
            ->leftJoin('locations','locations.location_code','=','searches.location_code')
            ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
            ->leftJoin('country_codes','country_codes.country_code','=','city_codes.country_code')
            ->where('food_id',$food_id)
            ->groupBy('country_codes.country_code')
            ->orderBy('count','desc')
            ->get();
        
        return $country;
    }
}
