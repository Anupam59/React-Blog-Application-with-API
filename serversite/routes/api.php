<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserBlogController;
use App\Http\Controllers\UserLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/AllBlogSelect', [BlogController::class,'AllBlogSelect']);
Route::get('/BlogDetails/{blogId}', [BlogController::class,'BlogDetails']);
Route::get('/BlogSelectCategory/{category}', [BlogController::class,'BlogSelectCategory']);


Route::get('/AllUserBlog/{author}', [UserBlogController::class, 'AllUserBlog']);
Route::post('/UserBlogDelete', [UserBlogController::class, 'UserBlogDelete']);
Route::post('/UserBlogDetails', [UserBlogController::class, 'UserBlogDetails']);
Route::post('/UserBlogUpdate', [UserBlogController::class, 'UserBlogUpdate']);
Route::post('/AddUserBlog', [UserBlogController::class, 'AddUserBlog']);

Route::post('/UserLogin', [UserLoginController::class, 'UserLogin']);
Route::get('/GetUserData/{author}', [UserLoginController::class,'GetUserData']);
