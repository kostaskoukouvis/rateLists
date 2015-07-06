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

//API
Route::get('api/myrateLists', 'apiController@myrateLists');
Route::post('api/createrateList', 'apiController@createrateList');
Route::delete('api/deleterateList/{rateList}', 'apiController@deleterateList');
Route::put('api/editrateList/{rateList}', 'apiController@editrateList');
Route::get('api/{rateList}/fetchItems', 'apiController@fetchItems');
Route::post('api/{rateList}/addItem', 'apiController@addItem');
Route::delete('api/deleteItem/{item}', 'apiController@deleteItem');
Route::put('api/editItem/{item}', 'apiController@editItem');
Route::put('api/rateItem/{item}', 'apiController@rateItem');

//Main Controller
Route::get('home', 'ListController@index');
Route::get('rateList/{rateList}', 'ListController@showrateList');

//Auth Controllers Routes
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);