window.onload = function(){
	// ajax函数
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
			ajax.send(object.date);
			ajax.onreadystatechange = function(){
				if(ajax.readyState==4&&ajax.status==200){
					object.success(ajax.responseText);
				}
			}
		}
	}
	//获取时间
	function gettime(){
			var date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			var h = date.getHours();
			var mi = date.getMinutes();
			if (m >= 1 && m <= 9) {
        			m = "0" + m;
    			}
    		if (d >= 0 && d <= 9) {
        			d = "0" + d;
    			}
    			if(mi<10){
    				mi = "0" + mi;
    			}
			var time = y+'-'+m+'-'+d+' '+h+':'+mi;
			return time;
	}
	var time = gettime();
	function check(){
		var username = document.getElementsByClassName('username')[0].innerText;
		var select = document.getElementsByTagName('select')[0];
		var index = select.selectedIndex;
		var selectVal = select.options[index].value;
		var titleVal = document.getElementsByClassName('input')[0].value;
		var content = document.getElementsByTagName('textarea')[0].value;
		if(selectVal==0){
			alert('提交失败，类型不能为空');
			return false;
		}else if(titleVal=='') {
			alert('提交失败，标题不能为空');
			return false;
		}else if(content==''){
			alert('提交失败，内容不能为空');
			return false;
		}
		sendAjax({
			method:'get',
			url:'addtosql.php',
			data:'selectVal='+selectVal+'&'+'titleVal='+titleVal+'&'+'content='+content+'&'+'time='+time+'&'+'username='+username,
			success:function(data){
				if (data=='success') {
					test();
				}else{
					alert(data);
				}
			}
		})
	}
	document.getElementsByClassName('btn')[0].onclick = function(){
		check();
	}
	//提交成功提示
	function test(){
		var response = document.getElementsByClassName('response')[0];
		response.style.opacity = '1';
		response.style.right = '0%';
	}
}