<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
// use App\model_name

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return view('app');
        return response()->json('드래곤');

    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);
    
        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'messages' => $validator->messages()
            ], 200);
        }
    
        if (! $token = Auth::guard('api')->attempt(['id' => $request->id, 'password' => $request->password])) {
        // if (! $token = auth('api')->attempt(['id' => $request->id, 'password' => $request->password])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        return $this->respondWithToken($token);
    }
    
    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60
        ]);
    }
    public function user() {
        return response()->json(Auth::guard('api')->user());
    }   

    public function refresh() {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    public function country_list(){
        $countryList = \App\CountryCode::get();   
        return $countryList;
    }

    public function logout() {
        Auth::guard('api')->logout();
    
        return response()->json([
            'status' => 'success',
            'message' => 'logout'
        ], 200);
    }
}