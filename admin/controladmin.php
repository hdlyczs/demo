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
 	<title>账号管理</title>
 	<script src="js/md5.js"></script>
 	<style>
		table{width: 70%;height: 100px;margin: 0 auto;border: 2px solid #cfcfcf;margin-top: 20px;border-collapse:collapse;text-align: center;}
		table tr:first-child{background: #E9EAEC;height: 40%;}
		table tr:last-child td{border: 1px solid #E4E4E4;font-size: 14px;}
		table tr td:nth-child(1){width: 5%;}
		table tr td:nth-child(2){width: 20%;}
		table tr td:nth-child(3){width: 20%;}
		table tr td:nth-child(4){width: 20%;}
		table tr td:nth-child(5){width: 35%;}
		.delete{margin-left: 5px;}
		.updatepassword{display: none; position: fixed; max-width: 500px;max-height: 300px; top: 0;right: 0;bottom: 0;left: 0;margin:auto;background: #DCDCDC;border-radius: 10px;}
		.updatepassword>div{position: absolute;height: 155px;top: 0;right: 0;bottom: 0;left: 0;margin:auto;}
		.updatepassword label {display: block;margin: 0px 0px 5px;text-align: center;}
		.updatepassword label>span {width: 20%;text-align: right;padding-right: 10px;margin-top: 10px;color: #333;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-weight: bold;}
		.updatepassword input[type="password"],textarea{border: 1px solid #CCC;color: #888;height: 20px;line-height:15px;margin-bottom: 16px;margin-right: 6px;margin-top: 2px;outline: 0 none;padding: 5px 0px 5px 5px;width: 50%;border-radius: 4px;box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);}
		.wap{width:50%;height: 30px;position: relative;margin: 0 auto;margin-top: 20px;}
		.wap>input{background: #FFF;border: 1px solid #CCC;color: #333;border-radius: 4px;cursor: pointer;}
		.wap>input:hover{color: #333;background-color: #EBEBEB;border-color: #ADADAD;}
		.wap input:nth-child(1){position: absolute;width: 25%;height: 100%;left: 0;}
		.wap input:nth-child(2){position: absolute;width: 25%;height: 100%;right: 0;}
		.text{margin: 50px auto;text-align: center; color: red;}
 	</style>
 </head>
 <body>
 	<span style="display:none;"><?php echo $username; ?></span>
 	<div class="content"></div>
 	<div class="text">注：用户只能修改自己的账号密码.不能修改和删除其他账号.<br>要删除账号请登陆:账号admin密码admin.</div>
 	<div class="updatepassword">
 		<div>	
			<label for=""><span>输入新密码</span><input type="password" class="newpassword"></label>
			<label for=""><span>新密码确认</span><input type="password" class="renewpassword"></label>
			<div class="wap">
					<input type="button" value="提交" class="submit">
					<input type="button" value="关闭" class="close">
			</div>
		</div>
 	</div>
 </body>
 	<script>
 	window.onload = function(){
 		//Ajax函数
 		if(window.XMLHttpRequest === undefined){
			window.XMLHttpRequest = function(){
				try{
					return new ActiveXObject("Msxml2.XMLHTTP.6.0");
				}catch(e){
					throw new Error('请更换浏览器');
				}
			}
		}
		function sendAjax(object){
			var ajax = new XMLHttpRequest();
			if(object.method == 'get'){
				ajax.open(object.method,object.url+'?'+object.data);
				ajax.send();
				ajax.onreadystatechange = function(){
					if(ajax.readyState==4&&ajax.status==200){
						object.success(ajax.responseText)
					}
				}
			}else{
				ajax.open(object.method,object.url);
				ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				ajax.send(object.data);
				ajax.onreadystatechange = function(){
					if(ajax.readyState==4&&ajax.status==200){
						object.success(ajax.responseText);
					}
				}
			}
		}
		//检查权限
		function check(a,b){
			var username1 = document.querySelector('body span').innerText;
			if(a==username1){
				document.querySelector('.updatepassword').style.display = 'block';
				var newpassword = document.querySelector('.newpassword');
				var renewpassword = document.querySelector('.renewpassword');
				var submit = document.querySelector('.submit');
				var close = document.querySelector('.close');
				close.onclick = function(){
					document.querySelector('.updatepassword').style.display = 'none';
				}
				submit.onclick = function(){
					//检查两次密码输入是否一致
					if(renewpassword.value!=newpassword.value){
						alert('两次输入的密码不一致');
						renewpassword.value = '';
						newpassword.value = '';
					}else{
						sendAjax({
							method:'post',
							url:'searchadminfromsql.php',
							data:'renewpassword='+renewpassword.value+'&'+'id='+b,
							success:function(data){
								alert(data);
								document.querySelector('.updatepassword').style.display = 'none';
								// 将修改后的内容显示在页面上
								var alltable = document.querySelectorAll('table');
								for(var k=0;k<alltable.length;k++){
									if(alltable[k].children[0].children[1].children[0].innerText == b){
										alltable[k].children[0].children[1].children[2].innerText = hex_md5(renewpassword.value);
									}
								}
							}
						});
					}
				}
			}else{
				alert('对不起，您没有权限修改其他账号');
			}
		}
		//显示内容
		sendAjax({
			method:'post',
			url:'searchadminfromsql.php',
			data:'value=alladmin',
			success:function(data){
				var data = JSON.parse(data);
				var str= '';
				for(var i=0;i<data.length;i++){
					str+= '<table cellspacing="0"><tr><td>id</td><td>用户名</td><td>密码</td><td>type</td><td>操作</td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].username+'</td><td>'+hex_md5(data[i].password)+'</td><td>'+data[i].type+'</td><td><input type="button" class="update" value="修改"><input type="button" class="delete" value="删除"></td></tr></table>';
				}
				document.getElementsByClassName('content')[0].innerHTML = str;
				//修改密码
				var allupdate = document.querySelectorAll('.update');
				for(var i=0;i<allupdate.length;i++){
					allupdate[i].onclick = function(){
						var id = this.parentNode.parentNode.children[0].innerText;
						var username = this.parentNode.parentNode.children[1].innerText;
						check(username,id);
					}
				}
				//删除账号
				var alldelete = document.querySelectorAll('.delete');
				for(var i=0;i<alldelete.length;i++){
					alldelete[i].onclick = function(){
						var username = document.querySelector('body span').innerText;
						var id = this.parentNode.parentNode.children[0].innerText;
						sendAjax({
							method:'post',
							url:'checkadmin.php',
							data:'username='+username+'&'+'id='+id,
							success:function(data){
								alert(data);
								//页面上删除记录
								if(data=="删除成功"){
									var alltable = document.querySelectorAll('table');
									for(var n=0;n<alltable.length;n++){
										if(alltable[n].children[0].children[1].children[0].innerText == id){
											// this.parentNode.removeChild(this);
											var a = alltable[n];
											var b = a.parentNode;
											b.removeChild(a);
										}
									}
								}
							}
						})
					}
				}
			}
		})
 	}		
 	</script>
 </html>
