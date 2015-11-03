<?php

namespace App\Http\Controllers;

use DB;
use Request;
use App\Models\User;

class GameController extends Controller {

	public function viewAll(){
		$games = Game::getAll();
		return view("all_games", ["games" => $games]);
	}

	public function view($id){
		$user = User::get($id);
		return view("user", ["user" => $user]);
	}

	public function create($id){

		User::saveScore($id, Request::input('score'));
		// $user = new User;
		// $user->id = $id;
		// $user->save();

		// return redirect("/invoice/" . $user->getId());
	}

	public function postCreate($id){ //this is where I was


		User::saveScore($id, Request::input('score'));

		// return redirect("/invoice/" . $id);

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

	public function edit($id){
		$game = Game::get($id);
		return view("update_game", ["game"=>$game, "id"=>$id]);
	} 

	public function postEdit($id){
		$game = Game::get($id);
		$game->name = Request::input('name');
		$game->year = Request::input('year');
		$game->save();

		return redirect("games");
	}

	public function delete($id){
		Game::delete($id);
		return redirect("games");
	}
}
