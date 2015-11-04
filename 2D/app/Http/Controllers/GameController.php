<?php

namespace App\Http\Controllers;

use DB;
use Auth;
use Request;
use App\Models\User;

class GameController extends Controller {

	// public function getUser() {
	// 	if(Auth::user()) {
	// 		$user = Auth::user();
	// 	}

	// 	return view('home', ['user' => $user]);
	// }

	public function viewAll(){
		$scores = User::getAll();
		return view("high_scores", ["scores" => $scores]);
	}

	public function view(){
		$user = Auth::user();
		return view("user", ["user" => $user]);
	}

	// public function create($id){

	// 	User::saveScore($id, Request::input('score'));
	// 	// $user = new User;
	// 	// $user->id = $id;
	// 	// $user->save();

	// 	// return redirect("/invoice/" . $user->getId());
	// }

	public function postCreate(){ //this is where I was
		if (Auth::check())
		{
		   $id = Auth::user()->id;

			User::saveScore($id, Request::input('score'));
		}

		// $user = Auth::user();

		// User::saveScore(["id" => $id], Request::input('score'));

		return redirect("user");

	}

	// public function create(){
	// 	return view("auth/register");
	// }

	// public function postCreate(){
	// 	$user = new User();
	// 	$user->username = Request::input('username');
	// 	$user->password = Request::input('password');
	// 	$user->email = Request::input('email');
	// 	$user->save();

	// 	return redirect("/");
	// }

	public function edit(){
		$user = Auth::user();
		$id = Auth::user()->id;
		return view("update", ["user"=>$user, "id"=>$id]);
	} 

	public function postEdit(){
		$user = Auth::user();
		$user->name = Request::input('name');
		$user->email = Request::input('email');
		$user->save();

		return redirect("user");
	}

	public function delete($id){
		Game::delete($id);
		return redirect("games");
	}
}
