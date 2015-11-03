<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['middleware' => 'auth', function () {
    return view('welcome');
}]);

Route::get("/home", ['middleware' => 'auth', function(){
	return view("home");
}]);

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

Route::controllers([
   'password' => 'Auth\PasswordController',
]);

Route::get('Scores', 'GameController@viewAll');

// Route::get('games/create', 'GameController@create');
// Route::post('games/create', 'GameController@postCreate');

Route::get('user/{id}/edit', 'GameController@edit');
Route::post('user/{id}/edit', 'GameController@postEdit');

Route::get('user/{id}/delete', 'GameController@delete');

Route::get('user/{id}', 'GameController@view');
