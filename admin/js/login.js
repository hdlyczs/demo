window.onload = function(){
	var openregisterbox = document.getElementById('register');
	var registerbox = document.getElementsByClassName('registerbox')[0];
	var closeregisterbox = document.getElementsByClassName('close')[0];
	openregisterbox.onclick = function(){
		registerbox.style.opacity = '.7';
		registerbox.style.transform = 'scale(1.00,1.00)';

	};
	closeregisterbox.onclick = function(){
		registerbox.style.opacity = '0';
		registerbox.style.transform = 'scale(0.00,0.00)';
	};
	var password = document.getElementsByClassName('password')[0];
	var repassword = document.getElementsByClassName('repassword')[0];
	repassword.onblur = function(){
		if(repassword.value!=password.value){
			alert('两次输入的密码不一致');
		};
	};
}