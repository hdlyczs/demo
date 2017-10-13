<?php 
	header('Content-type:text/html;charset=utf-8');
	session_start();
	if (isset($_SESSION['username'])) {
		$username = $_SESSION['username'];
	}else{
		header("location:login.html");
	}
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>添加</title>
	<link rel="stylesheet" href="css/add.css">
	<script src="js/add.js"></script>
</head>
<body>
	<form action="" id="" class="">
		<label for="">请选择类型</label>
		<select name="value" id="">
			<option value="0">选择类型</option>
			<option value="HTML">HTML</option>
			<option value="CSS">CSS</option>
			<option value="javaScript">javaScript</option>
			<option value="jQuery">jQuery</option>
			<option value="PHP">PHP</option>
		</select>
		<div class="title">
			<label for="">请输入标题</label>
			<input type="text" name="title" class="input">
		</div>
		<div class="area">
			<span>请输入内容</span>
			<textarea name="content" id="" cols="30" rows="10" spellcheck="false"></textarea>
		</div>
		<input type="button" value="提交" class="btn">
		<input type="reset" value="重置" class="btn">
		<div class="div">提交用户：<span class="username"><?php echo $username; ?></span></div>
	</form>
	<div class="response">
		<div class="text">success</div>
		<div class="btn1">
			<button><a href="add.php">继续添加</a></button>
			<button><a href="admin.php">返回首页</a></button>
		</div>
	</div>
</body>
</html>