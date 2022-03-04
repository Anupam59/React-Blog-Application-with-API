<?php

namespace App\Http\Controllers;

use App\Models\BlogModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserBlogController extends Controller
{
    function AllUserBlog(Request $request){
        $author = urldecode($request->author);
        $result = BlogModel::where(['author'=>$author])->orderBy('id','desc')->get();
        return $result;
    }

    function UserBlogDelete(Request $result){
        $id = $result->input('id');

        $blog_image = BlogModel::where('id','=',$id)->get(['blog_image']);
        $blog_image_name = explode('/',$blog_image[0]['blog_image'])[4];
        Storage::delete('public/'.$blog_image_name);

        $result = BlogModel::where('id','=',$id)->delete();
        if($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }

    function UserBlogDetails(Request $result){
        $id = $result->input('id');
        $result = BlogModel::where('id','=',$id)->get();
        return $result;

    }

    function UserBlogUpdate(Request $request){
        $id = $request->input('id');
        $blog_title = $request->input('blog_title');
        $blog_sort_des = $request->input('blog_sort_des');
        $blog_des = $request->input('blog_des');
        $category = $request->input('category');

        $blog_image = $request->file('blog_image')->store('public');
        $photoName = explode('/',$blog_image)[1];
        $photoURL = "http://".$_SERVER['HTTP_HOST']."/storage/".$photoName;

        date_default_timezone_set("Asia/Dhaka");
        $contact_date= date("h:i:sa");
        $date = date("d-m-Y");

        $result = BlogModel::where('id','=',$id)->update([
            'blog_title'=>$blog_title,
            'blog_sort_des'=>$blog_sort_des,
            'blog_des'=>$blog_des,
            'blog_image'=>$photoURL,
            'category'=>$category,
            'date'=>$date,
        ]);
        if($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }


    function AddUserBlog(Request $request){
        $blog_title = $request->input('blog_title');
        $blog_sort_des = $request->input('blog_sort_des');
        $blog_des = $request->input('blog_des');
        $category = $request->input('category');
        $author = $request->input('author');

        $blog_image = $request->file('blog_image')->store('public');
        $photoName = explode('/',$blog_image)[1];
        $photoURL = "http://".$_SERVER['HTTP_HOST']."/storage/".$photoName;


        date_default_timezone_set("Asia/Dhaka");
        $contact_date= date("h:i:sa");
        $date = date("d-m-Y");

        $result = BlogModel::insert([
            'blog_title'=>$blog_title,
            'blog_sort_des'=>$blog_sort_des,
            'blog_des'=>$blog_des,
            'blog_image'=>$photoURL,
            'category'=>$category,
            'author'=>$author,
            'date'=>$date,
        ]);
        if($result==true){
            return 1;
        }
        else{
            return 0;
        }
    }



}
