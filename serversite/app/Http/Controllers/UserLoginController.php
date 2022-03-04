<?php

namespace App\Http\Controllers;

use App\Models\UserLoginModel;
use Illuminate\Http\Request;

class UserLoginController extends Controller
{
    function UserLogin(Request $request){
        $author_username = $request->input('author_username');
        $author_pass = $request->input('author_pass');
        $Count = UserLoginModel::where('author_username',$author_username)->where('author_pass',$author_pass)->count();
        if ($Count==1){
            return "1";
        }else{
            return "0";
        }
    }


    function GetUserData(Request $request){
        $author_username = urldecode($request->author);
        $result = UserLoginModel::Where('author_username',$author_username)->get();
        return $result;
    }


    function UserProfileUpdate(Request $request){
        $name = $request->input('name');
        $email = $request->input('email');
        $mobile_number = $request->input('mobile_number');
        $password = $request->input('password');
        $address = $request->input('address');

        $result = UserLoginModel::where('mobile_number','=',$mobile_number)->update([
            'name'=>$name,
            'email'=>$email,
            'mobile_number'=>$mobile_number,
            'password'=>$password,
            'address'=>$address,
        ]);
        if($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }


}
