<?php 
	header('Content-type:text/html;charset=utf-8');
	session_start();
	unset($_SESSION['username']);
	unset($_SESSION['password']);
	echo "<script>alert('注销成功!');window.location.href='login.html'</script>";
 ?>