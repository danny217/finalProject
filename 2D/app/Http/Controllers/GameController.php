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
		$user = new User;
		$user->customer_id = $id;
		$user->save();

		return redirect("/invoice/" . $user->getId());
	}

	public function postCreate($invoiceId){


		Invoice::addItem($invoiceId, Request::input('item'), Request::input('quantity'));

		return redirect("/invoice/" . $invoiceId);

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
