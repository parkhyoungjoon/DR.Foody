<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('test');
// });
// Route::view('/{path?}', 'test');
Route::view('/{path?}/{id?}/{idx?}/{idx2?}/{idx3?}', 'app');
// Route::get('/auth/regist', 'RegistController@index');
// Route::post('/auth/regist', 'RegistController@store');

// // 로그인
// Route::get('/auth/login', 'LoginController@index');
// Route::post('/auth/login', 'LoginController@store');