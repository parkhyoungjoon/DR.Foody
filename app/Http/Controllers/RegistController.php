<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RegistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json('success');
    }



    public function store(Request $request)
    {
        /*
        $validateData = Validator::make($request->all(), [
        // $validateData = $request->validate([
            'id'=> 'required|string|max:255', 
            'email'=> 'required|email|max:255', 
            'password'=> 'required|string|max:255|confirmed', 
            'password_confirmation'=> 'required|string|max:255', 
            'user_mail'=> 'required|email|max:255', 
            'nickname'=> 'required|max:255',
            'country_code'=> 'required|integer', 
            'gender'=> 'required|boolean', 
            'birth'=> 'required|date',
            'material'=> 'required|string', 
            'sweet'=> 'required|integer', 
            'bitter'=> 'required|integer', 
            'hot'=> 'required|integer', 
            'sour'=> 'required|integer', 
            'salty'=> 'required|integer'
        ]);
        if($validateData->fails()){
            return response()->json([
                'status'=> 'error',
                'message'=>$validateData->messages()
            ], 200);
        }
        */
        // $table->bigIncrements('language_code');
        //     $table->string('language');
        //     $table->string('keyword');
        $photo = ' ';
        // 기본 한국어로 지정
        $language_code = 1;
        // language_code
        //      1 한국어 kr
        //      2 영어 en
        //      3 일본어 jp
        //      4 중국어 cn
            
        // country_code 
        //      410 대한민국
        //      392 일본
        //      156 중화인민공화국
        //      840 미국
        /*
        switch($request->country_code){
            case 156: $language_code = 4; break;
            case 392: $language_code = 3; break;
            case 840: $language_code = 2; break;
            default: $language_code = 1;
        }
        */
        // 회원 정보 저장
        $user = User::create([
            'id' => $request->id, 
            'password' => bcrypt($request->password), 
            'user_nickname' => $request->nickname, 
            'user_photo' => $photo, 
            'country_code' => 410, 
            'language_code' => 1, 
            'user_sex' => 1, 
            'user_birth' => '1996-08-15',
            'user_sweet' => 4, 
            'user_bitter' => 2, 
            'user_hot' => 2, 
            'user_sour' => 2, 
            'user_salty' => 3
        ]);
        // 회원 기피 재료 저장

        // 'material' => $validateData['material'], 
        // return redirect('/login');
        return response()->json([
            'status'=>'success',
            'data' => $user
        ], '200');
    }

    public function registData(){
        $countryList = \App\CountryCode::select(DB::raw('country_code, country_name_kr'))->get();   

        $languageCode = \App\LanguageCode::select(DB::raw('language_code, language_name'))->get();   
      return response()->json(['country'=>$countryList]); 
    }

}
