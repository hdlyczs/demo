<?php 
	header('Content-type:text/html;charset=utf-8');
	mysql_connect('localhost','root','admin');
	mysql_select_db(info);
	mysql_query('set names utf8');
	$id = $_GET['id'];
	$delete_query = "delete from node where id='$id'";
	if(mysql_query($delete_query)){
		echo "删除成功";
	}else{
		echo "删除失败";
	}
 ?>