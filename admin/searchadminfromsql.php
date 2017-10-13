<?php 
	header('Content-type:text/html;charset=utf-8');
	$con = mysql_connect("localhost","root","admin");
	mysql_select_db(info);
	mysql_query('set names utf8');
	$arr = array();
	if($_POST['value']=='alladmin'){
		$select_query = mysql_query("select*from user");
		while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
		echo json_encode($arr);
	}else if($_POST['renewpassword']){
		$id = $_POST['id'];
		$password = $_POST['renewpassword'];
		$update_query = "update user set password='$password' where id='$id'";
		if(mysql_query($update_query)){
			echo "success";
		}else{
			echo "false";
		}
	}
 ?>