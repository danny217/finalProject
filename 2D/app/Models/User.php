<?php 
namespace App\Models;


use DB;

class User{

	public $id;
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
    	$sql='INSERT into users(name, password, email)values (:name, :password, :email)';
    	DB::insert($sql, [':name'=>$this->name, ':password'=>$this->password, ':email'=>$this->email ]);
    }

    private function update(){
    	$sql = "UPDATE users set name = :name, email = :email where id = :id";
		DB::update($sql, [":name"=>$this->name, ":email"=>$this->email, ":id"=>$this->id ]);
    }

    public static function delete($id){
    	$sql="DELETE from users where id = :id";
    	DB::delete($sql, [":id" => $id]);
    }

    public static function get($id){
    	$sql = "SELECT * from users, Saves where users.id=Saves.playerId and users.id = :id";

    	$row = DB::selectOne($sql, [":id"=>$id]);

    	$user = new User();
		$user->id = $row->id;
		$user->name = $row->name;
		$user->email = $row->email;
        $user->score = $row->score;
		return $user;

    }

    // public function getScore(){
    //     return $this->score;
    // }

    public static function getAll(){
    	// $sql = "select * from users";
        $sql = "SELECT id, name, score, @i:=@i+1 AS rank   FROM users   ORDER BY score DESC LIMIT 5";

    	$rows = DB::select($sql);

    	$scores = [];

    	foreach($rows as $row){
    		$score = new User();
    		$score->id = $row->id;
    		$score->name = $row->name;
    		$score->score = $row->score;
    		$scores[] = $score;
    	}
    	return $scores;
    }

    public function getId() {
        return $this->id;
    }

    // public static function addItem($id, $levelId, $score){

    //     $sql = 'insert into Saves(playerId, currentLevelId, score) values (:id, :levelId, :score)';

    //     $rows = DB::insert($sql, [":id"=>$id, ":levelId"=>$levelId, ":score"=>$score]);
        
    //     return $rows;
    // }

    public static function saveScore($id, $score){
        $sql = "UPDATE users set score = :score where id = :id";

        $rows = DB::insert($sql, [":id"=>$id, ":score"=>$score]);
        
        return $rows;
    }
}
