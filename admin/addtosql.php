<?php 
	header('Content-type:text/html;charset=utf-8');
	$con = mysql_connect("localhost","root","admin");
	mysql_select_db(info);
	mysql_query('set names utf8');
	$style=$_GET['selectVal'];
	$title=$_GET['titleVal'];
	$content=$_GET['content'];
	$updatetime=$_GET['time'];
	$username=$_GET['username'];
	$sql = "insert into node(style,title,content,updatetime,username) values('$style','$title','$content','$updatetime','$username')";
	if (mysql_query($sql)) {
		echo "success";
	}else{
		echo "false";
	}
 ?>