<!DOCTYPE html>
<html>
    <head>
        <title>Register</title>
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
		        	<div class="login_container register_container">
		        		<label class="register">Register
				        	<form class="register_form" method="POST" action="/auth/register">
						    {!! csrf_field() !!}

						    <div>
						        Username
						        <input type="text" name="name" value="{{ old('name') }}">
						    </div>

						    <div>
						        Email
						        <input type="email" name="email" value="{{ old('email') }}">
						        @if( count($errors) > 0 )
						            @if(count($errors->getBags()["default"]->get("email")) > 0)
						            <span>
						                {{$errors->getBags()["default"]->get("email")[0]}}
						            </span>
						            @endif
						        @endif
						    </div>

						    <div>
						        Password
						        <input type="password" name="password">
						        @if( count($errors) > 0 )
						            @if(count($errors->getBags()["default"]->get("password")) > 0)
						            <span>
						                {{$errors->getBags()["default"]->get("password")[0]}}
						            </span>
						            @endif
						        @endif
						    </div>

						    <div>
						        Confirm Password
						        <input type="password" name="password_confirmation">
						        @if( count($errors) > 0 )
						            @if(count($errors->getBags()["default"]->get("password")) > 0)
						            <span>
						                {{$errors->getBags()["default"]->get("password")[0]}}
						            </span>
						            @endif
						        @endif
						    </div>

						    <div>
						        <button type="submit">Register</button>
						    </div>

							</form>
						</label>
				    </div>
		        </div>
	        </div>
        </div>
    </body>
</html>
