<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>All Games</title>
</head>
<body>

	<div class="background">
        <div class="container">
			<div>
				<img class="sign_user" src="<?php echo asset('assets/wooden-board.png')?>">
				<div class="container_user">
					<h1>Edit Game!!!!</h1>
					<a href="/games">Home</a><br><br>
					<div>
						<form method="post">
							<input type="hidden" name="_token" value="{{ csrf_token() }}">
							<label>Username:<input type="text" name="name" value="{{$user->name}}"></label>
							<div class="errors">
					        @if( count($errors) > 0 )

					            @if(count($errors->getBags()["default"]->get("unique")) > 0)
					            <span>
					                {{$errors->getBags()["default"]->get("unique")[0]}}
					            </span>
					            @endif
					        @endif
					        </div>
							<label>email:<input type="email" name="email" value="{{$user->email}}"></label>
							<div class="errors">
					        @if( count($errors) > 0 )
					            @if(count($errors->getBags()["default"]->get("email")) > 0)
					            <span>
					                {{$errors->getBags()["default"]->get("email")[0]}}
					            </span>
					            @endif
					        @endif
					        </div>
							<button>Submit Edit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>