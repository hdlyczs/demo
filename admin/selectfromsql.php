<?php 
	header('Content-type:text/html;charset=utf-8');
	$con = mysql_connect("localhost","root","admin");
	mysql_select_db(info);
	mysql_query('set names utf8');
	$text = $_GET['text'];
	$arr = array();
	if($_GET['selectVal']=='all'){
		$select_query = mysql_query("select*from node");
		while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
	}else if($_GET['selectVal']=='0'){
		$select_query = mysql_query("select*from node where style like'%$text%'");
		while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
	}else if($_GET['selectVal']=='1'){
		$select_query = mysql_query("select*from node where updatetime like'%$text%'");
		while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
	}else if($_GET['selectVal']=='2'){
		$select_query = mysql_query("select*from node where username ='$text'");
		while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
	}else if($_GET['selectVal']=='3'){
		$select_query = mysql_query("select*from node where title like'%$text%'");
		while($result = mysql_fetch_assoc($select_query)){
			array_push($arr, $result);
		}
	}
	if(empty($arr)){
		echo "无记录";
	}else{
		echo json_encode($arr);
	}
 ?>