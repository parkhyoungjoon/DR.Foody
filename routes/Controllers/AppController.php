<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppController extends Controller
{
    public function login(Request $request)
    {        
        //  var_dump($obj);
        
        // Populate User id from JSON $obj array and store into $id.
        $id = $request->id;
        // Populate Password from JSON $obj array and store into $password.
        $password = $request->password;
        
        $check = \App\User::where("id","=",$id)->where("password","=",$password)->first();
        if(isset($check)){
        $SuccessLoginMsg = 'Data Matched';
            return $SuccessLoginMsg ;
        }else{
        $InvalidMSG = 'Invalid Username or Password Please Try Again' ;
            return $InvalidMSG ;
        }
        return 0;

    }
    public function userList(Request $request){
        $id = $request->id;
        $user = \App\User::where("id","=",$id)->first();
        if ($user) {
            $avoid_materials = \App\AvoidMaterial::where("user_id",$user->user_id)
            ->get();

            $len = count($avoid_materials);
            $i=1;
            foreach($avoid_materials as $avoid_material){
                $user->keyword .= $avoid_material->keyword->keyword_name;
                if ($i !== $len)
                    $user->keyword .= ', ';
                $i++;
            }
            return $user;
        } else {
            return "No Results Found.";
        }
    }
    public function searchFood(Request $request){

        $searchText = $request->searchText;
        $foodList = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo, truncate(avg(review_point),1) as point'))
        ->leftJoin('reviews','reviews.food_id','=','foods.food_id')
        ->where("food_name","like","%".$searchText."%")
        ->groupBy('foods.food_id')
        ->get();

        
        if ($foodList) {
            return $foodList;
        } else {
            return "No Results Found.";
        }
    }
    public function regist(Request $request){
        $user=new User; //User 모델로 객체생성
        $user->fill($regist->all()); // User 모델을 request 객체의 키와 값으로 구성
        $user->save(); // 데이터베이스에 값 생성 
        
        return '가입 완료';
    }

    public function foodList(){
        $foodList = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo, truncate(avg(review_point),1) as point'))
        ->leftJoin('reviews','reviews.food_id','=','foods.food_id')
        ->groupBy('foods.food_id')
        ->get();
        if ($foodList) {        
            return $foodList;
        }else{
            return "No Results Found.";
        }
    }
    public function detailFood(Request $request){

        $food_id = $request->food_id;

        $food = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo, foods.company_id,company_codes.company_name,truncate(avg(review_point),1) as point'))
        ->leftJoin('reviews','reviews.food_id','=','foods.food_id')
        ->leftJoin('company_codes','company_codes.company_id','=','foods.company_id')
        ->groupBy('foods.food_id')
        ->where('foods.food_id',$food_id)
        ->get();
        
        if ($food) {
            return $food;
        } else {
            return "No Results Found.";
        }
    }
    public function dibsFood(Request $request){
        $user_id = $request->user_id;
        $food_id = $request->food_id;
        $heart = $request->heart;
        if($heart){
            DB::table('dibs_foods')->insert(['user_id' => $user_id, 'food_id' => $food_id]); 
            return "heart create";
        }else{
            DB::table('dibs_foods')->where([
                ['user_id', '=', $user_id],
                ['food_id', '=', $food_id]
            ])->delete();
            return "heart destory";
        }
    }
    public function heartList(Request $request){
        $user_id = $request->user_id;
        $food_id = $request->food_id;

        $heartList = \App\DibsFood::where('user_id','=',$user_id)->where('food_id','=',$food_id)->first();
        if ($heartList) {        
            return 'OK';
        }else{
            return 'Try Again';
        }
    }
    
    public function avoidMaterial(Request $request){
        $user_id = $request->user_id;
        $food_id = $request->food_id;
           
        $avoid = DB::table('food_materials')->select(DB::raw('avoid_materials.keyword_id, material_keywords.keyword_name'))
        ->leftJoin('materials','food_materials.material_code','=','materials.material_code')
        ->leftJoin('avoid_materials','materials.keyword_id','=','avoid_materials.keyword_id')
        ->leftJoin('material_keywords','material_keywords.keyword_id','=','avoid_materials.keyword_id')
        ->where("food_id","=",$food_id)
        ->where("avoid_materials.user_id","=",$user_id)
        ->groupBy('avoid_materials.keyword_id')->get();
        return $avoid;
    }

    public function material(Request $request){
        $food_id = $request->food_id;
        $user_id = $request->user_id;
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

    public function reviewDelete(Request $request){
        $review_id = $request->review_id;

        DB::table('reviews')->where('review_id','=',$review_id)->delete();

        return response()->json([
            'status'=>'success',
            'result'=>true
        ], 200);
    }

    public function reviewUpdate(Request $request){
        $content = $request->content;
        $review_id = $request->review_id;
        $point = $request->point;
        $taste= $request->taste;

        DB::table('reviews')
        ->where('review_id','=',$review_id)->update(
            [
                'review_content'=>$content,
                'review_point'=>$point,
                'review_type'=>$taste
            ]
        );

        return response()->json([
            'status'=>'success',
            'result'=>true
        ], 200);
    }

    public function reviewWrite(Request $request){
        $user_id = $request->user_id;
        $food_id = $request->food_id;
        $language_code = $request->language_code;
        $content = $request->content;
        $taste = $request->taste;
        $point = $request->point;
        $sweet = empty($request->sweet) ? 0 : $request->sweet;
        $hot = empty($request->hot) ? 0 : $request->hot;
        $salty = empty($request->salty) ? 0 : $request->salty;
        $bitter = empty($request->bitter) ? 0 : $request->bitter;
        $sour = empty($request->sour) ? 0 : $request->sour;
        $date= date("Y-m-d");

        DB::table('reviews')->insert(
            [
                'user_id' => $user_id, 
                'food_id' => $food_id,
                'language_code' => $language_code, 
                'review_content' => $content,
                'review_date' => $date,
                'review_type' => $taste, 
                'review_point' => $point,
                'review_sweet' => $sweet, 
                'review_hot' => $hot, 
                'review_salty' => $salty, 
                'review_bitter' => $bitter, 
                'review_sour' => $sour, 
            ]
        ); 

        return response()->json([
            'status'=>'success',
            'result'=>true
        ], 200);
    }

    public function reviewList(Request $request){
        $food_id = $request->food_id;
        $page = ($request->page - 1) * 10;
        $review = DB::table('reviews')
        ->leftJoin('users','reviews.user_id','=','users.user_id')
        ->where('food_id',$food_id)
        ->skip($page)->take(10)
        ->orderByDesc('review_id')
        ->get();

        $reviewPoint = [];
        for($i = 1; $i <=5; $i++){
            $point = DB::table('reviews')
            ->where([['food_id',$food_id],['review_point',$i]])
            ->count();
            array_push($reviewPoint,$point);
        }

        return response()->json([
            'review'=> $review,
            'point' => $reviewPoint,
        ], 200);
    }

    public function dibsList(Request $request){
        $user_id = $request->user_id;
        $dibslist = \App\DibsFood::where('user_id',$user_id)->get();
        foreach($dibslist as $key => $dibs){
            $dibs->food = $dibslist[$key]->food;
            $dibs->point = DB::table('reviews')->select(DB::raw('truncate(avg(review_point),1) as point, food_id'))
            ->groupBy('food_id')
            ->where('food_id',$dibs->food_id)
            ->value('point');
        }
        return $dibslist;

    }

    public function searchList(Request $request){
        $user_id = $request->user_id;
        $searchList = \App\SearchHistory::where('user_id',$user_id)->get();
        foreach($searchList as $key => $search){
            $search->food = $searchList[$key]->food;
            $search->point = DB::table('reviews')->select(DB::raw('truncate(avg(review_point),1) as point, food_id'))
            ->groupBy('food_id')
            ->where('food_id',$search->food_id)
            ->value('point');
        }
        return $searchList;

    }

    public function searchHistory(Request $request){
        $user_id = $request->user_id;
        $food_id = $request->food_id;
        $date = date("Y-m-d", strtotime("+2 week"));
        $history = \App\SearchHistory::where('user_id',$user_id)->where('food_id',$food_id)->first();
        if(!$history){
            DB::table('search_histories')->insert(['user_id' => $user_id, 'food_id' => $food_id, 'date' => $date]);
            return '완료';
        }else{
            return '이미 존재';
        }
    }
    

    public function rankList(Request $request){
        $category = $request->category;
        $sex = $request->sex;
        $age = $request->age;
        $country = $request->country;
        $date = $request->date;

        switch($date){
            case 1: $datekey = date("Y-m-d",strtotime ("-1 days")); break;
            case 2: $datekey = date("Y-m-d",strtotime ("-1 weeks")); break;
            case 3: $datekey = date("Y-m-d",strtotime ("-1 months")); break;
            case 4: $datekey = date("Y-m-d",strtotime ("-1 years")); break;
        }

        $raw = ($category == 2) ? 'P' : 'C';

        $whereIF = array(['review_date', '>=', $datekey]);
        
        if($sex != 2) array_push($whereIF,['users.user_sex','=', $sex]);
            
        if($country != 0) array_push($whereIF,['users.country_code', '=', $country]);
            
        if($age != 0){
            array_push($whereIF,['user_birth', '<=', date("Y-m-d",strtotime ((string)($age*-10)." years"))]);
            if($age != 5) array_push($whereIF,['user_birth', '>', date("Y-m-d",strtotime ((string)($age*-20)." years"))]);
        }

        $reviewUser = DB::table('reviews')
        ->select(DB::raw('reviews.food_id, truncate(avg(review_point),1) as P, count(reviews.review_id) as C'))
        ->leftJoin('users', 'users.user_id','=','reviews.user_id')
        ->groupBy('reviews.food_id')
        ->where($whereIF);
        

        if($category){

            $rankList = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo, ifnull(reviewUser.'.$raw.',0) as order_point'))
            ->leftJoinSub($reviewUser, 'reviewUser', function ($join) {
                $join->on('foods.food_id', '=', 'reviewUser.food_id');
            })
            ->orderBy('order_point','desc')
            ->get();
        
        }else{    

            $whereIF2 = array(['search_date', '>=', $datekey]);
            if($sex != 2) array_push($whereIF2,['searches.search_sex','=', $sex]);
            if($country != 0) array_push($whereIF2,['city_codes.country_code', '=', $country]);
            if($age != 0){
                array_push($whereIF2,['search_age', '>=', $age*10]);
                if($age != 5) array_push($whereIF2,['search_age', '<', $age*10+10]);
            }       

            $searchLocation = DB::table('searches')
            ->select(DB::raw('searches.food_id, count(searches.food_id) as S'))
            ->leftJoin('locations','locations.location_code','=','searches.location_code')
            ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
            ->groupBy('searches.food_id')
            ->where($whereIF2);

            $rankList = \App\Food::select(DB::raw('foods.food_id, food_name, food_photo , ifnull(searchLocation.S,0) as order_point , ifnull(reviewUser.C,0) as rCount, ifnull(reviewUser.P,0) as rPoint'))
            ->leftJoinSub($searchLocation, 'searchLocation', function ($join) {
                $join->on('foods.food_id', '=', 'searchLocation.food_id');
            })
            ->leftJoinSub($reviewUser, 'reviewUser', function ($join) {
                $join->on('foods.food_id', '=', 'reviewUser.food_id');
            })
            ->orderBy('order_point','desc')
            ->get();
        }
        return $rankList;
    }

    public function dbtest(){
        $avoid = DB::table('avoid_materials')
        ->select(DB::raw('user_id, group_concat(material_keywords.keyword_name) as material'))
        ->leftJoin('material_keywords','material_keywords.keyword_id','=','avoid_materials.keyword_id')
        ->groupBy('user_id');

        
        $user = DB::table('users')
        ->select(DB::raw(
            'users.user_id, 
            country_name_en, 
            user_sex, 
            user_sweet, 
            user_hot,
            user_sour,
            user_salty,
            user_bitter, 
            floor((TO_DAYS(NOW())-(TO_DAYS(user_birth)))/365) as age,
            avoid.material
           '))
        ->joinSub($avoid, 'avoid', function ($join) {
            $join->on('users.user_id', '=', 'avoid.user_id');
        })
        ->leftJoin('country_codes','country_codes.country_code','=','users.country_code');

        $location = DB::table('locations')
        ->select(DB::raw('location_code, concat(country_name_en,city_name_en,location_name_en) as place'))
        ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
        ->leftJoin('country_codes','country_codes.country_code','=','city_codes.country_code');
       
        if($source){
            $data = \App\Search::select(
                DB::raw('
                    user_sex as gender, 
                    country_name_en as country,
                    age,
                    user_sweet as sweet,
                    user_salty as salty,
                    user_hot as hot,
                    user_sour as sour,
                    user_bitter as bitter,
                    material,
                    search_date as date,
                    location.place'
                )
            )
            ->joinSub($user, 'user', function ($join) {
                $join->on('searches.user_id', '=', 'user.user_id');
            })->joinSub($location, 'location', function ($join) {
                $join->on('searches.location_code', '=', 'location.location_code');
            })->get();
        }else{
            $data = \App\Review::select(
                DB::raw('
                    user_sex as gender, 
                    country_name_en as country,
                    age,
                    user_sweet as sweet,
                    user_salty as salty,
                    user_hot as hot,
                    user_sour as sour,
                    user_bitter as bitter,
                    material,
                    review_point as point,
                    review_content as content,
                    review_type as type'
                )
            )
            ->joinSub($user, 'user', function ($join) {
                $join->on('reviews.user_id', '=', 'user.user_id');
            })->get();
        }
        return $data;
    }

    public function chartDown($source){
        $avoid = DB::table('avoid_materials')
        ->select(DB::raw('user_id, group_concat(material_keywords.keyword_name) as material'))
        ->leftJoin('material_keywords','material_keywords.keyword_id','=','avoid_materials.keyword_id')
        ->groupBy('user_id');

        
        $user = DB::table('users')
        ->select(DB::raw(
            'users.user_id, 
            country_name_en, 
            user_sex, 
            user_sweet, 
            user_hot,
            user_sour,
            user_salty,
            user_bitter, 
            floor((TO_DAYS(NOW())-(TO_DAYS(user_birth)))/365) as age,
            avoid.material
           '))
        ->joinSub($avoid, 'avoid', function ($join) {
            $join->on('users.user_id', '=', 'avoid.user_id');
        })
        ->leftJoin('country_codes','country_codes.country_code','=','users.country_code');

        $location = DB::table('locations')
        ->select(DB::raw('location_code, concat(country_name_en,city_name_en,location_name_en) as place'))
        ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
        ->leftJoin('country_codes','country_codes.country_code','=','city_codes.country_code');
       
        if($source){
            $data = \App\Search::select(
                DB::raw('
                    user_sex as gender, 
                    country_name_en as country,
                    age,
                    user_sweet as sweet,
                    user_salty as salty,
                    user_hot as hot,
                    user_sour as sour,
                    user_bitter as bitter,
                    material,
                    search_date as date,
                    location.place'
                )
            )
            ->joinSub($user, 'user', function ($join) {
                $join->on('searches.user_id', '=', 'user.user_id');
            })->joinSub($location, 'location', function ($join) {
                $join->on('searches.location_code', '=', 'location.location_code');
            })->get();
        }else{
            $data = \App\Review::select(
                DB::raw('
                    user_sex as gender, 
                    country_name_en as country,
                    age,
                    user_sweet as sweet,
                    user_salty as salty,
                    user_hot as hot,
                    user_sour as sour,
                    user_bitter as bitter,
                    material,
                    review_point as point,
                    review_content as content,
                    review_type as type'
                )
            )
            ->joinSub($user, 'user', function ($join) {
                $join->on('reviews.user_id', '=', 'user.user_id');
            })->get();
        }
        return $data;
    }

    public function pageTest() 
    {
        $data = DB::table('searches')
            ->select(DB::raw('country_codes.country_code, country_codes.country_keyword as id, country_codes.country_name_en as name, count(searches.food_id) as value'))
            ->leftJoin('locations','locations.location_code','=','searches.location_code')
            ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
            ->leftJoin('country_codes','city_codes.country_code','=','country_codes.country_code')
            ->groupBy('country_codes.country_code')
            ->where('food_id',1)
            ->get();
        return view('test',compact(['data']));  
    }
    public function raderChart($food_id,$source=1,$sdate=0,$edate=0){
        if($sdate) $sdate = str_replace("-","",$sdate);
        if($edate) $edate = str_replace("-","",$edate);
        $graphData = [];
        $tasteDatas = \App\Taste::select(DB::raw('tastes.taste_code, taste_lv, taste_name as category, taste_count '))
        ->leftJoin('taste_codes','taste_codes.taste_code','=','tastes.taste_code')
        ->where('food_id',$food_id)
        ->get();
        $codeDatas = \App\TasteCode::get();
        foreach($codeDatas as $key=>$data){
            $graphData[$key]['category'] =$data->taste_name;
        }
        foreach($tasteDatas as $key=>$data){
            $graphData[$data->taste_code-1]['value'.$data->taste_lv] = $data->taste_count;
        }

        /*
        $graphData = \App\Taste::select(DB::raw('tastes.taste_code, taste_name as country, ifnull(truncate(SUM(taste_lv * taste_count) / SUM(taste_count),2),0) as litres '))
        ->leftJoin('taste_codes','taste_codes.taste_code','=','tastes.taste_code')
        ->where('food_id',$food_id)
        ->groupBy('tastes.taste_code')
        ->get();*/

        $tableData = \App\Taste::select(DB::raw('taste_codes.taste_code, taste_name, taste_lv, taste_count '))
        ->leftJoin('taste_codes','taste_codes.taste_code','=','tastes.taste_code')
        ->where('food_id',$food_id)
        ->orderBy('tastes.taste_code','asc')
        ->orderBy('taste_lv','asc')
        ->get();

        return view('test',compact(['graphData','tableData']));  

    }
}
