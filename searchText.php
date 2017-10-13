 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<title>Document</title>
 	<link rel="stylesheet" href="css/public.css">
 	<script src="js/public.js"></script>
 </head>
 <body>
 	<div class="content"></div>
	<div class="pager"></div>
	<div class="control">
		<form action="" class="updatewindow" method="">
			<input type="text" name="id" class="id" style="display:none;">
			<h1>详情<span>如果要修改内容请登录</span></h1>
			<label for=""><span>类型</span><input type="text" name="style" class="style"></label>
			<label for=""><span>标题</span><input type="text" name="title" class="title"></label>
			<label for=""><span>内容</span><textarea name="content" id="" cols="30" rows="10" class="text"></textarea></label>
			<div class="wap">
				<input type="button" value="登陆" class="login">
				<input type="button" value="关闭" class="close">
			</div>
		</form>
	</div>
	<script>
		window.onload = function(){
			var msg = parent.window.document.getElementsByClassName('data')[0].innerText;
			try{
				var data = JSON.parse(msg);
				fenye(data.length,8,data);
			}catch(e){
				alert('无记录');
			}
		}
	</script>
 </body>
 </html>