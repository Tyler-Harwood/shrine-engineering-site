<!--New images on load -->
var images = ['1f404.svg', '1f31d.svg','1f31e.svg','1f404.svg','1f40b.svg','1f68c.svg','1f69b.svg','1f6b4.svg'];
$('<img id="titleEmoji" src=images/' + images[Math.floor(Math.random() * images.length)] + '>').appendTo('#title');

$(document).ready(function() {

	for(var i=1; i<6; i++) {
		var target = '.growAnimation'+i;
		jQuery(target).viewportChecker({
			classToAdd: 'animated',
			offset: 10
		});
	}


	$('.form_error').hide();
	$('#submit').click(function(){
		var name = $('#nameField').val();
		var email = $('#emailField').val();
		if(email== ''){
			$('#email').next().show();
			$("#invalid_email").text("testing");
			$('#invalid_email').show();
			return false;
		}
		if(IsEmail(email)==false){
			$('#invalid_email').show();
			return false;
		}
		//ajax call php page
		$.post("send.php", $("#contactform").serialize(),  function(response) {
		$('#contactform').fadeOut('slow',function(){
			$('#success').html(response);
			$('#success').fadeIn('slow');
		   });
		 });
		 return false;
		});
	});
	function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!regex.test(email)) {
	   return false;
	}else{
	   return true;
	}
}

