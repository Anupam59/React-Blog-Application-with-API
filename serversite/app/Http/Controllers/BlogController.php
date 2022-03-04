<?php

namespace App\Http\Controllers;

use App\Models\BlogModel;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    function AllBlogSelect(){
        $result = BlogModel::orderBy('id','desc')->get();
        return $result;
    }

    function BlogDetails($blogId){
        $id = $blogId;
        $result = BlogModel::where(['id'=>$id])->get();
        return $result;
    }

    function BlogSelectCategory(Request $request){
        $category = urldecode($request->category);
        $result = BlogModel::where(['category'=>$category])->get();
        return $result;
    }
}
