<!-- resources/views/auth/login.blade.php -->
{{-- $folder = public_path('js');
$folder = public_path('css');
$folder = public_path('assets');
echo public_path(); --}}
<!DOCTYPE html>
<html>
    <head>
        <title>Forms</title>
        
        <link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
        <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
        <!-- <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'> -->
        <script language="javascript" type="text/javascript" src="http://code.createjs.com/createjs-2013.12.12.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/tweenjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/easeljs-0.8.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/preloadjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/soundjs-0.6.1.min.js" ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/fastclick.js')?>"></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/lightbox.js')?>"></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/init.js')?>" ></script>
    </head>
    <body>
    	<button class="lightbox">lightbox</button>
    	<canvas id="myCanvas"></canvas>
{{--         <div class="score">SCORE: <span id="score"></span></div> --}}
        <div class="game-over" id="game-over">GAME OVER<p><span onclick="handleClick()">Click Here To Restart</span></p></div>
    	<div></div>
        <div class="container">
	        <div class="shield">
	        	<img id="shield" src="<?php echo asset('assets/wooden_shield_thing.png')?>">
	        	<div class="login_container">
			        <label class="login">Login:
				       <form method="POST" action="/auth/login">
					    {!! csrf_field() !!}

					    @if( count($errors) > 0 )
					    <div>
					        <h2>Form Errors:</h2>

					        <ul>
					        @foreach($errors->all() as $error)
					            <li>{{ $error }}</li>
					        @endforeach
					        </ul>
					    </div>
					    @endif
					        
					    <div class="email">
					        Email
					        <input class="login" type="email" name="email" value="{{ old('email') }}">
					        @if( count($errors) > 0 )
					            @if(count($errors->getBags()["default"]->get("email")) > 0)
					            <span>
					                {{$errors->getBags()["default"]->get("email")[0]}}
					            </span>
					            @endif
					        @endif
					    </div>
					    <div class="pw">
					        Password
					        <input class="login" type="password" name="password" id="password">
					        @if( count($errors) > 0 )
					            @if(count($errors->getBags()["default"]->get("password")) > 0)
					            <span>
					                {{$errors->getBags()["default"]->get("password")[0]}}
					            </span>
					            @endif
					        @endif
					    </div>

					    <div>
					        <input type="checkbox" name="remember"> Remember Me
					    </div>

					   
					    <button type="submit">Login</button>
					    
					</form>
			        </label>
			    </div>
	        </div>
        </div>
    </body>
</html>
