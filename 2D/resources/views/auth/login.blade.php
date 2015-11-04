<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
        
        <link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
        <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/init.js')?>" ></script>
    </head>
    <body>
    	<div class="background">
	        <div class="container">
		        <div class="shield">
		        	<img id="shield" src="<?php echo asset('assets/wooden_shield_thing.png')?>">
		        	<div class="login_container">
				        <label class="login"><div class="login_label">Login</div>
				        	{{-- <div class="login"> --}}
					       	<form method="POST" action="/auth/login">
						    {!! csrf_field() !!}
						        
						    <div class="email">
						        Email
						        <input class="login" type="text" name="email" value="{{ old('email') }}">
						        <div class="errors">
						        @if( count($errors) > 0 )
						            @if(count($errors->getBags()["default"]->get("email")) > 0)
						            <span>
						                {{$errors->getBags()["default"]->get("email")[0]}}
						            </span>
						            @endif
						        @endif
						        </div>
						    </div>
						    <div class="pw">
						        Password
						        <input class="login" type="password" name="password" id="password">
						        <div class="errors">
						        @if( count($errors) > 0 )
						            @if(count($errors->getBags()["default"]->get("password")) > 0)
						            <span>
						                {{$errors->getBags()["default"]->get("password")[0]}}
						            </span>
						            @endif
						        @endif
						        </div>
						    </div>

						    <div class="remember_me">
						        <input type="checkbox" name="remember"> Remember Me
						    </div>

						    <div class="login_submit">
						    	<button type="submit">Login</button>
						    </div>
							</form>
							{{-- </div> --}}
				        </label>
				    </div>
		        </div>
	        </div>
        </div>
    </body>
</html>
