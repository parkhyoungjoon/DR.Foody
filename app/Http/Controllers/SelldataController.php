<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelldataController extends Controller
{
    public function pocket(Request $request){
        $user_id = \App\User::select('user_id')->where('id', $request->user_id)->first()->user_id;
        $food_id = $request->food_id;

        $real = \App\Pocket::where([['food_id',$food_id],['user_id',$user_id]])->first();
        // 서은우 수정
        // 안에 있으면 추가 안하고 이미 있다는 bool return
        // true=존재, false=없어서 추가
        $got = false;
        if($real){
            // DB::table('pockets')->where([
            //     ['user_id', '=', $user_id],
            //     ['food_id', '=', $food_id]
            // ])->delete();
            $got = true;
        }else{
            DB::table('pockets')->insert(
                [
                    'food_id'=>$food_id,
                    'user_id'=>$user_id,
                ]
            );
        }
        
        return response()->json([
            'status'=>'success',
            'got' => $got,
        ], 200);
    }
    
    public function pocketList(Request $request){
        $user_id = \App\User::select('user_id')->where('id', $request->user_id)->first()->user_id;

        $reviewCount = DB::table('reviews')
                   ->select(DB::raw('food_id, truncate(avg(review_point),1) as point, count(reviews.food_id) as review_count'))
                   ->groupBy('food_id');
                   
        $foodList = \App\Food::select(DB::raw('foods.food_id, company_codes.company_name , food_name, food_photo, reviewCount.point, reviewCount.review_count'))
        ->leftJoin('company_codes','foods.company_id','=','company_codes.company_id')
        ->leftJoin('pockets','foods.food_id','=','pockets.food_id')
        ->leftJoinSub($reviewCount, 'reviewCount', function ($join) {
            $join->on('foods.food_id', '=', 'reviewCount.food_id');
        })
        ->where('pockets.user_id',$user_id)
        ->groupBy('foods.food_id')
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

    // 서은우 추가
    // 포켓 리스트에 있는 제품을 삭제하는 api
    public function deletePoket(Request $request){
        $user_id = \App\User::select('user_id')->where('id', $request->user_id)->first()->user_id;
        
        $food_id = null;
        $message = 'delete success';
        $result = true;
        // food_id 인자가 없으면 전체 삭제

        // food_id가 있을 경우
        // 해당하는 food_id만 삭제
        if($request->food_id){
            $food_id = $request->food_id;
            $real = \App\Pocket::where([['food_id',$food_id],['user_id',$user_id]])->first();
            if($real){
                DB::table('pockets')->where([
                    ['user_id', '=', $user_id],
                    ['food_id', '=', $food_id]
                ])->delete();
            } else {
                $message = 'fail';
                $result = false;
            }
        } else {
        // 전체 리스트 삭제
            $real = \App\Pocket::where([['user_id',$user_id]])->first();
            if($real){
                DB::table('pockets')->where([
                    ['user_id', '=', $user_id]
                ])->delete();
            } else {
                $message = 'fail';
                $result = false;
            }
        }
        
        return response()->json([
            'status'=> $message, 
            'result' => $result,
        ], 200);
    }

    public function selldata(Request $request){
        $user_id = \App\User::select('user_id')->where('id', $request->user_id)->first()->user_id;
        $order_id = $request->order_id;
        $food_list = $request->food_list;
        $type = \App\SelldataType::select('selldata_type')->where('selldata_type_code',$request->type)->first()->selldata_type;
        $date = date('Y-m-d');
        $order = \App\Order::insert(
            [
                'user_id'=>$user_id,
                'order_code'=>$order_id,
                'selldata_type'=>$type,
                'order_date'=>$date
            ]
        );
        $order_idx = \App\Order::select('order_id')->orderBy('order_id','desc')->first()->order_id;
        if($order){
            foreach($food_list as $key => $val){
                $order = \App\Selldata::insert(
                    [
                        'order_id'=>$order_idx,
                        'selldata_price'=>5000,     
                        'food_id'=>$val
                    ]
                );
                DB::table('pockets')->where([
                    ['user_id', '=', $user_id],
                    ['food_id', '=', $val]
                ])->delete();
            }
            $message = '구매에 성공하셨습니다.';
            $result = true;           
        } else {
            $message = '구매에 실패하셨습니다.';
            $result = false;
        }
        
        return response()->json([
            'status'=> $message,
            'result' => $result,
        ], 200);
    }


    public function selldataList($user_id){
        $user_id = \App\User::select('user_id')->where('id', $user_id)->first()->user_id;

        $reviewCount = DB::table('reviews')
                   ->select(DB::raw('food_id, truncate(avg(review_point),1) as point, count(reviews.food_id) as review_count'))
                   ->groupBy('food_id');
                   
        $foodList = \App\Food::select(DB::raw('foods.food_id, company_codes.company_name , food_name, food_photo, reviewCount.point, reviewCount.review_count'))
        ->leftJoin('company_codes','foods.company_id','=','company_codes.company_id')
        ->leftJoin('selldatas','foods.food_id','=','selldatas.food_id')
        ->leftJoin('orders','selldatas.order_id','=','orders.order_id')
        ->leftJoinSub($reviewCount, 'reviewCount', function ($join) {
            $join->on('foods.food_id', '=', 'reviewCount.food_id');
        })
        ->where('orders.user_id',$user_id)
        ->groupBy('foods.food_id')
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
}