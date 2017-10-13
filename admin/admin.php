<?php 
	header('Content-type:text/html;charset=utf-8');
	session_start();
	if (isset($_SESSION['username'])) {
		$username = $_SESSION['username'];
	}else{
		header("location:login.html");
	}
	// $username = $_SESSION['username'];
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>^.^</title>
	<link rel="stylesheet" href="css/admin.css">
</head>
<body>
	<header>
		<div class="logo">
			<h3>学习笔记后台管理系统</h3>
		</div>
		<div class="app_list">
			<ul>
				<li>欢迎您 <?php echo $username; ?></li>
				<li><a href="../index.html"><span class="icon icon_index"></span>首页</a></li>
				<li><a href="" onclick="javascript:history.go(-1);"><span class="icon icon_pre"></span>后退</a></li>
				<li><a href="" onclick="javascript:history.go(1);"><span class="icon icon_next"></span>前进</a></li>				
				<li><a href="" onclick="javascript:location.reload()"><span class="icon icon_refresh"></span>刷新</a></li>
				<li><a href="sessiondelete.php"><span class="icon icon_exit"></span>退出</a></li>
			</ul>
		</div>
	</header>
	<nav>
		<ul>
			<li><a href="add.php" target="mainFrame">添加新笔记</a></li>
			<li><a href="updateanddelete.php" target="mainFrame">修改/删除记录</a></li>
			<li><a href="controladmin.php" target="mainFrame">账号管理</a></li>
		</ul>
	</nav>
	<div class="content">
		<iframe src="add.php"  frameborder="0" name="mainFrame"></iframe>
	</div>
	<script>
	window.onload = function(){
		var w = window.innerWidth;
		var h = window.innerHeight;
		console.log(w);
		var nav = document.querySelector('nav');
		var content = document.querySelector('.content');
		nav.style.height = h-90+'px';
		content.style.height = h-90+'px';
		content.style.width = w-220+'px';
		console.log(nav.offsetHeight);
	}
	</script>
</body>
</html>