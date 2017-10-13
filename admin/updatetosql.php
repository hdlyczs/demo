<?php 
	header('Content-type:text/html;charset=utf-8');
	mysql_connect('localhost','root','admin');
	mysql_select_db(info);
	mysql_query('set names utf8');
	$id = $_POST['id'];
	$style = $_POST['style'];
	$title = $_POST['title'];
	$content = $_POST['content'];
	// echo $id;
	// echo $style;
	// echo $title;
	// echo $content;
	$update_query = "update node set style='$style',title='$title',content='$content' where id='$id'";
	if(mysql_query($update_query)){
		echo "success";
	}else{
		echo "false";
	}
 ?>