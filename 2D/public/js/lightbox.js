$(function(){

	$(".lightbox").on("click", function(){
		console.log("click");
		$(".container").toggleClass("on");
	});

	$('.container').on('click', function(){
		$(".container button").removeClass('on');
	});

});


