<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartController extends Controller
{

    public function chartMake(Request $request){
        $source = $request->source;
        $category = $request->category;
        $food_id = $request->food_id;
        $sdate = $request->sdate;
        $edate = $request->edate;

        if($source) $sdate = $sdate.' 00:00:00';
        if($source) $sdate = $sdate.' 23:59:59';
        
        $table = ($source) ? 'search' : 'review';
        $end = ($source) ? 'es' : 's';

        switch($category){
            case 1:
                case 2:
                    $table = ($source) ? 'search' : 'review' ;
                    $end = ($source) ? 'es' : 's' ;
                    if($source) $sdate = $sdate.' 00:00:00';
                    if($source) $edate = $edate.' 23:59:59';
                    $val = ($category - 1) ? 'visits' : 'litres';
                    $col = ($category - 1) ? 'concat(truncate(floor((TO_DAYS(NOW())-(TO_DAYS(users.user_birth)))/365),-1),"대")' : 'if(users.user_sex = 0, "여자", "남자")';
                    $raw = ($source) ? 'count(search_id)' : 'truncate(avg(review_point),1)' ;
                    $raw2 = ($source) ? 'count(search_id)' : 'truncate(avg(review_point),1)' ;

                    $data = DB::table($table.$end)
                    ->select(DB::raw($col.' as country, '.$raw.' as  '.$val))
                    ->leftJoin('users','users.user_id','=',$table.$end.'.user_id')
                    ->groupBy(DB::raw('country'))
                    ->where([['food_id',$food_id],[$table.'_date','>=',$sdate],[$table.'_date','<=',$edate]])
                    ->get();
                    if($category == 1){
                        $plus = DB::table($table.$end)
                        ->select(DB::raw($col.' as country, '.$raw2.' as  '.$val))
                        ->leftJoin('users','users.user_id','=',$table.$end.'.user_id');
                    }

            break;
            case 3:
                if($source) $sdate = $sdate.' 00:00:00';
                if($source) $edate = $edate.' 23:59:59';
                $raw = ($source) ? 'count(search_id)' : 'truncate(avg(review_point),1)' ;

                $data = DB::table($table.$end)
                ->select(DB::raw('country_codes.country_code, country_codes.country_keyword as id, country_codes.country_name_en as name, '.$raw.' as value'));

                if($source){
                    $data = $data->leftJoin('locations','locations.location_code','=','searches.location_code')
                    ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
                    ->leftJoin('country_codes','city_codes.country_code','=','country_codes.country_code')
                    ->groupBy('country_codes.country_code');
                }else{
                    $data = $data->leftJoin('users','users.user_id','=','reviews.user_id')
                    ->leftJoin('country_codes','users.country_code','=','country_codes.country_code')
                    ->groupBy('country_codes.country_code');
                }
                $data = $data->where([['food_id',$food_id],[$table.'_date','>=',$sdate],[$table.'_date','<=',$edate]])
                ->get();
            break;
            case 4:
                case 5:
                    $data = array();
                    $sdatet = str_replace("-","", substr($sdate, 0, 10));
                    $edatet = str_replace("-","", substr($edate, 0, 10));

                    $col = ($category - 4) ? 'DATE_FORMAT('.$table.'_date,"%H:%i")' :'date('.$table.'_date)' ;
                    $raw = ($source) ? 'count(search_id)' : 'truncate(avg(review_point),1)' ;

                    $search = DB::table($table.$end)->select(DB::raw($col.' as date, '.$raw.'as count'))
                    ->groupBy(DB::raw('date'))
                    ->where([['food_id',$food_id],[$table.'_date','>=',$sdate],[$table.'_date','<=',$edate]])
                    ->pluck('count','date');
                    if($category - 4){
                        for($hour = 0; $hour < 24; $hour++){
                            for($minute = 0; $minute < 60; $minute++){
                                $thour = ($hour > 9) ? $hour : '0'.$hour ;
                                $tminute = ($minute > 9) ? $minute : '0'.$minute ;
                                $date = date('Y-m-d').' '.$thour.':'.$tminute;
                                $time = $thour.':'.$tminute;

                                $visits = (isset($search[$time])) ? $search[$time] : 0;
                                array_push($data,['date'=>$date.':00','visits'=>$visits]);
                            }
                        }
                        
                    }else{
                        for($i=$sdatet;$i<=$edatet;$i++){
                            $year=substr($i,0,4);
                            $month=substr($i,4,2);
                            $day=substr($i,6,2);
                            if(checkdate($month,$day,$year)){
                                $date = $year."-".$month."-".$day;
                                $step = (isset($search[$date])) ? $search[$date] : 0;
                                array_push($data,['date'=>$date,'value'=>$step]);
                            }else{
                                $day = '00';
                                $month++;
                                if($month < 10 ){
                                    $month = '0'.$month;
                                }else if($month > 12){
                                    $month = '01';
                                    $year++;
                                }
                                $i = $year.$month.$day;
                            }
                        }
                    }
            break;
        }
        return $data;
    }
    public function dateChart($food_id,$source,$sdate=0,$edate=0){
        $data = array();
        $sdate = ($sdate) ? $sdate : date("Y-m-d",strtotime ("-1 years"));
        $edate = ($edate) ? $edate : date('Y-m-d');
        if($source) $sdate = $sdate.' 00:00:00';
        if($source) $sdate = $sdate.' 23:59:59';

        $sdatet = str_replace("-","", $sdate);
        $edatet = str_replace("-","", $edate);
        
        $col = ($source) ? 'date(search_date)' : 'review_date';
        
        $search = DB::table($table.$end)->select(DB::raw($col.' as date, count('.$table.'_id) as count'))
        ->groupBy(DB::raw('date'))
        ->where([['food_id',$food_id],[$table.'_date','>=',$sdate],[$table.'_date','<=',$edate]])
        ->pluck('count','date');
        for($i=$sdatet;$i<=$edatet;$i++){
            $year=substr($i,0,4);
            $month=substr($i,4,2);
            $day=substr($i,6,2);
            if(checkdate($month,$day,$year)){
                $date = $year."-".$month."-".$day;
                $step = (isset($search[$date])) ? $search[$date] : 0;
                array_push($data,['date'=>$date,'value'=>$step]);
            }else{
                $day = '00';
                $month++;
                if($month < 10 ){
                    $month = '0'.$month;
                }else if($month > 12){
                    $month = '01';
                    $year++;
                }
                $i = $year.$month.$day;
            }
        }
        
        return $data;
    }

    public function timeChart($food_id,$sdate=0,$edate=0){
        if(!$sdate) $sdate = date("Y-m-d",strtotime ("-1 years"));
        if(!$edate) $edate = date("Y-m-d");
        $data = array();
        $search = \App\Search::select(DB::raw('DATE_FORMAT(search_date,"%H:%i") as time, count(search_id) as count'))
        ->groupBy(DB::raw('time'))
        ->where([['food_id',$food_id],['search_date','>=',$sdate.' 00:00:00'],['search_date','<=',$edate.' 23:59:59']])
        ->pluck('count','time');
        for($hour = 0; $hour < 24; $hour++){
            for($minute = 0; $minute < 60; $minute++){
                $thour = ($hour > 9) ? $hour : '0'.$hour ;
                $tminute = ($minute > 9) ? $minute : '0'.$minute ;
                $date = date('Y-m-d').' '.$thour.':'.$tminute;
                $time = $thour.':'.$tminute;

                $visits = (isset($search[$time])) ? $search[$time] : 0;
                array_push($data,['date'=>$date.':00','visits'=>$visits]);
            }
        }
        return view('test',compact(['data']));  
    }
    public function countryChart($food_id,$source=1,$sdate=0,$edate=0){
        if(!$sdate) $sdate = date("Y-m-d",strtotime ("-1 years"));
        if(!$edate) $edate = date("Y-m-d");
        if($source){
            $data = DB::table('searches')
            ->select(DB::raw('country_codes.country_code, country_codes.country_keyword as id, country_codes.country_name_en as name, count(searches.search_id) as value'))
            ->leftJoin('locations','locations.location_code','=','searches.location_code')
            ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
            ->leftJoin('country_codes','city_codes.country_code','=','country_codes.country_code')
            ->groupBy('country_codes.country_code')
            ->where([['food_id',$food_id],['search_date','>=',$sdate.' 00:00:00'],['search_date','<=',$edate.' 23:59:59']])
            ->get();
        }else{
            $data = DB::table('searches')
            ->select(DB::raw('country_codes.country_code, country_codes.country_keyword as id, country_codes.country_name_en as name, count(reviews.review_id) as value'))
            ->leftJoin('users','users.user_id','=','reviews.user_id')
            ->leftJoin('country_codes','users.country_code','=','country_codes.country_code')
            ->groupBy('country_codes.country_code')
            ->where([['food_id',$food_id],['search_date','>=',$sdate],['search_date','<=',$edate]])
            ->get();
        }
        return $data;
    }
    public function pieChart($food_id,$source,$type,$sdate=0,$edate=0){
        if(!$sdate) $sdate = date("Y-m-d",strtotime ("-1 years"));
        if(!$edate) $edate = date("Y-m-d");
        $table = ($source) ? 'search' : 'review' ;
        $end = ($source) ? 'es' : 's' ;
        if($source) $sdate = $sdate.' 00:00:00';
        if($source) $edate = $edate.' 23:59:59';
        $col = ($type) ? 'if(users.user_sex = 0, "여자", "남자")' : 'concat(truncate(floor((TO_DAYS(NOW())-(TO_DAYS(users.user_birth)))/365),-1),"대")';

        $data = DB::table($table.$end)
        ->select(DB::raw($col.' as country, count('.$table.'_id) as litres '))
        ->leftJoin('users','users.user_id','=',$table.$end.'.user_id')
        ->groupBy(DB::raw('country'))
        ->where([['food_id',$food_id],[$table.'_date','>=',$sdate],[$table.'_date','<=',$edate]])
        ->get();
        return $data;
    }
    public function chartDown($food_id,$source,$sdate,$edate){
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
        ->leftJoinSub($avoid, 'avoid', function ($join) {
            $join->on('users.user_id', '=', 'avoid.user_id');
        })
        ->leftJoin('country_codes','country_codes.country_code','=','users.country_code');
       
        if($source){
            $location = DB::table('locations')
            ->select(DB::raw('location_code, concat(country_name_en," ",city_name_en," ",location_name_en) as place'))
            ->leftJoin('city_codes','city_codes.city_code','=','locations.city_code')
            ->leftJoin('country_codes','country_codes.country_code','=','city_codes.country_code');

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
            ->leftJoinSub($user, 'user', function ($join) {
                $join->on('searches.user_id', '=', 'user.user_id');
            })->leftJoinSub($location, 'location', function ($join) {
                $join->on('searches.location_code', '=', 'location.location_code');
            })->where([['food_id',$food_id],['search_date','>=',$sdate.' 00:00:00'],['search_date','<=',$edate.' 23:59:59']])
            ->limit(500)
            ->get();
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
                    review_date as date,
                    review_type as type'
                )
            )
            ->leftJoinSub($user, 'user', function ($join) {
                $join->on('reviews.user_id', '=', 'user.user_id');
            })->where([['food_id',$food_id],['review_date','>=',$sdate],['review_date','<=',$edate]])
            ->limit(500)
            ->get();
        }
        return $data;
    }
}
