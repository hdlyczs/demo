<?php 
	header('Content-type:text/html;charset=utf-8');
	$con = mysql_connect("localhost","root","admin");
	mysql_select_db(info);
	mysql_query('set names utf8');
	$value = $_GET['value'];
	$arr = array();
	$select_query = mysql_query("select*from node where style ='$value'");
	while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
	echo json_encode($arr);
 ?>