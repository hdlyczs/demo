<?php
	$con = mysql_connect("localhost","root","admin");
	mysql_select_db(info);
	mysql_query('set names utf8');
	$regname = $_POST['registername'];
	$regpassword = $_POST['registerpassword'];
	$sql = "insert into user(username,password) values('$regname','$regpassword')";
	if($regname == ""||$regpassword == ""){
		echo "<script>alert('注册失败');window.location.href='login.html'</script>";
	}else{
		mysql_query($sql);
		echo "<script>alert('注册成功');window.location.href='login.html'</script>";
	}
 ?>