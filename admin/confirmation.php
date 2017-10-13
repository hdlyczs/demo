<?php 
	header('Content-type:text/html;charset=utf-8');
	mysql_connect('localhost','root','admin');
	mysql_select_db(info);
	mysql_query('set names utf8');
	$username = $_POST['username'];
	$password = $_POST['password'];
	$check = mysql_query("select * from user where username='$username'and password='$password'");
	if($result = mysql_fetch_assoc($check)){
		session_start();
		$_SESSION['username'] = $result['username'];
		$_SESSION['password'] =	$result['password'];
		header("location:admin.php");
	}else{
		echo "<script>alert('登录失败，账号密码错误');window.location.href='login.html'</script>";
	}
 ?>