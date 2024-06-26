<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/app/pagetest', 'AppController@pageTest');
Route::get('/chartDown/{food_id}/{source}/{sdate}/{edate}', 'ChartController@chartDown');
Route::get('/dateChart/{food_id}/{source}/{sdate?}/{edate?}', 'ChartController@dateChart');
Route::get('/timeChart/{food_id}/{sdate?}/{edate?}', 'ChartController@timeChart');
//Route::get('/raderChart/{food_id}/{source}/{sdate?}/{edate?}', 'ChartController@raderChart');
Route::get('/countryChart/{food_id}/{source}/{sdate?}/{edate?}', 'ChartController@countryChart'); 
Route::get('/pieChart/{food_id}/{source}/{type}/{sdate?}/{edate?}', 'ChartController@pieChart');
Route::get('/app/qration/{user_id}', 'AppController@qration');
Route::get('/app/dbtest', 'AppController@dbtest'); // 테스트용
Route::post('/app/login', 'AppController@login'); // 로그인
Route::get('/app/foodList', 'AppController@foodList'); // 음식 리스트
Route::post('/app/reviewList', 'AppController@reviewList'); 
Route::post('/app/userList', 'AppController@userList');
Route::post('/app/searchFood', 'AppController@searchFood');
Route::post('/app/regist', 'AppController@regist');
Route::post('/app/detailFood', 'AppController@detailFood');
Route::post('/app/dibsFood', 'AppController@dibsFood');
Route::post('/app/heartList', 'AppController@heartList');
Route::post('/app/avoidMaterial', 'AppController@avoidMaterial');
Route::post('/app/material', 'AppController@material');
Route::post('/app/reviewDelete', 'AppController@reviewDelete');
Route::post('/app/reviewUpdate', 'AppController@reviewUpdate');
Route::post('/app/reviewWrite', 'AppController@reviewWrite');
Route::post('/app/dibsList', 'AppController@dibsList');
Route::post('/app/searchList', 'AppController@searchList');
Route::post('/app/searchHistory', 'AppController@searchHistory');
Route::post('/app/rankList', 'AppController@rankList');

Route::post('/chartMake', 'ChartController@chartMake');

// 회원가입

Route::get('regist', 'RegistController@index');
Route::post('regist', 'RegistController@store');
Route::get('registData', 'RegistController@registData');


// 로그인
Route::get('login', 'LoginController@index');
Route::post('login', 'LoginController@login')->name('api.jwt.login');
// 로그인 사용자 정보 가져오기
Route::get('unauthorized', function() {
    return response()->json([
        'status' => 'error',
        'message' => 'Unauthorized'
    ], 401);
})->name('api.jwt.unauthorized');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user', 'LoginController@user')->name('api.jwt.user');
    Route::get('refresh', 'LoginController@refresh')->name('api.jwt.refresh');
    Route::get('logout', 'LoginController@logout')->name('api.jwt.logout');
});

// 제품 검색
Route::get('searchList/{search_id?}', 'SearchController@search');

// 제품 상세 보기
//Route::get('searchProduct/{id}', 'SearchController@product');

Route::get('searchFood/{searchText}/{user_id?}', 'SearchController@searchFood');

Route::get('detailFood/{food_id}/{user_id?}', 'SearchController@detailFood');

Route::get('detailFood2/{food_id}', 'SearchController@detailFood2');

Route::get('wordCloud/{food_id}', 'SearchController@wordCloud');

Route::get('material/{food_id}/{user_id}', 'SearchController@material');
Route::get('countryData/{food_id}', 'SearchController@countryData');

//
Route::post('pocket', 'SelldataController@pocket');
Route::post('deletePoket', 'SelldataController@deletePoket'); // poket list 삭제

Route::post('pocketList', 'SelldataController@pocketList');

Route::get('dateChart/{food_id?}/{year?}/{month?}', 'SelldataController@dateChart');

Route::get('selldataList/{user_id}', 'SelldataController@selldataList');

Route::post('selldata', 'SelldataController@selldata');
