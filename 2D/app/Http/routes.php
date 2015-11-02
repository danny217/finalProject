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

Route::get('/', function () {
    return view('welcome');
});

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

Route::get('game', 'GameController@viewAll');

Route::get('games/create', 'GameController@create');
Route::post('games/create', 'GameController@postCreate');

Route::get('games/{id}/edit', 'GameController@edit');
Route::post('games/{id}/edit', 'GameController@postEdit');

Route::get('games/{id}/delete', 'GameController@delete');

Route::get('games/{id}', 'GameController@view');
