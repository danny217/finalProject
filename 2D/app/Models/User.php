<?php 
namespace App\Models;


use DB;

class User{

	protected $id;
	public $name;
	public $email;

	public function save() {
        if (empty($this->id)) {
            $this->insert();
        } else {
            $this->update();
        }
    }

    private function insert(){
    	$sql='INSERT into Users(username, password, email)values (:username, :password, :email)';
    	DB::insert($sql, [':username'=>$this->username, ':password'=>$this->password, ':email'=>$this->email ]);
    }

    private function update(){
    	$sql = "UPDATE Users set username = :username, email = :email where id = :id";
		DB::update($sql, [":username"=>$this->username, ":email"=>$this->email, ":id"=>$this->id ]);
    }

    public static function delete($id){
    	$sql="DELETE from Users where id = :id";
    	DB::delete($sql, [":id" => $id]);
    }

    public static function get($id){
    	$sql = "SELECT * from Users, Saves where Users.id=Saves.playerId and Users.id = :id";

    	$row = DB::selectOne($sql, [":id"=>$id]);

    	$user = new User();
		$user->id = $row->id;
		$user->username = $row->username;
		$user->email = $row->email;
        $user->score = $row->score;
		return $user;

    }

    public static function getAll(){
    	$sql = "SELECT * from Users";
    	$rows = DB::select($sql);

    	$games = [];

    	foreach($rows as $row){
    		$game = new Game();
    		$game->id = $row["id"];
    		$game->name = $row["name"];
    		$game->year = $row["year"];
    		$games[] = $game;
    	}
    	return $games;
    }

    public function getId() {
        return $this->id;
    }
}
