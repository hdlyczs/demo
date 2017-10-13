<?php 

 ?>
 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<title>修改/删除</title>
 	<link rel="stylesheet" href="css/updateanddelete.css">
 	<script src="js/updateanddelete.js"></script>
 </head>
 <body>
	<header>
 		<div class="searchbox">
 			<form>
			<select name="" class="searchselect">
				<option value="0">按类型</option>
				<option value="1">按录入时间</option>
				<option value="2">按用户名</option>
				<option value="3">按标题关键字</option>
			</select>
			<input type="text" class="searchinput">
			<input type="button" value="查询" class="searchbutton">
			</form>
		</div>
	</header>
	<div class="content"></div>
	<div class="pager"></div>
	<div class="control">
		<form action="" class="updatewindow" method="">
			<input type="text" name="id" class="id" style="display:none;">
			<h1>修改<span>在这里输入你要修改的内容</span></h1>
			<label for=""><span>类型</span><input type="text" name="style" class="style"></label>
			<label for=""><span>标题</span><input type="text" name="title" class="title"></label>
			<label for=""><span>内容</span><textarea name="content" id="" cols="30" rows="10" class="content"></textarea></label>
			<div class="wap">
				<input type="button" value="提交" class="submit">
				<input type="button" value="关闭" class="close">
			</div>
		</form>
	</div>
 </body>
 </html>