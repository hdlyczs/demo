<?php 
	header('Content-type:text/html;charset=utf-8');
	$con = mysql_connect("localhost","root","admin");
	mysql_select_db(info);
	mysql_query('set names utf8');
		$id = $_POST['id'];
		$username = $_POST['username'];
		$search_query = mysql_query("select*from user where username='$username'");
		$result = mysql_fetch_assoc($search_query);
		if($result[type]=='1'){
			mysql_query("delete from user where id='$id'");
			echo "删除成功";
		}else{
			echo "对不起，您不是管理员，没有权限删除账号";
		}
 ?>