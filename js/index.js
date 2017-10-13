function createScriptTag(src){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.src = src;
	document.body.appendChild(script);
}
createScriptTag('http://wthrcdn.etouch.cn/weather_mini?callback=getWeather&city='+"杭州");
function getWeather(msg){
	try{
	var date = new Date;
	var mon = date.getMonth()+1;
	var weather = msg.data;
	var forecast = weather.forecast;
	var con = document.getElementsByClassName('weather');
	for(var i=0;i<3;i++){
		var riqi = '';
		var wenduhigh = '';
		var wendulow = '';
		var	tianqi = '';
		var temp = forecast[i];
		riqi+=temp.date;
		wenduhigh+=temp.high;
		wendulow+=temp.low;
		tianqi+=temp.type;
		con[i].children[0].children[0].innerText = '杭州: '+mon+'月'+riqi;
		con[i].children[0].children[1].style.fontSize = '12px';
		con[i].children[0].children[1].innerText = '最'+wendulow+'~'+'最'+wenduhigh;
		con[i].children[0].children[2].innerText = tianqi;
	}
	}catch(e){}
}
getWeather();
window.onload = function(){
	//展开明天后天的天气
	var next = document.getElementsByClassName('next')[0];
	next.onclick = function(){
		var con = document.getElementsByClassName('weather');
		if(next.innerText==">"){
			con[1].style.display = 'block';
			con[2].style.display = 'block';
			next.innerText = '<';
		}else{
			con[1].style.display = 'none';
			con[2].style.display = 'none';
			next.innerText = '>';
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
	//搜索框变化
	function inputchange(){
		var searchinput = document.getElementsByClassName('searchinput')[0];
		searchinput.onfocus = function(){
			var searchselect = document.getElementsByClassName('searchselect')[0];
			var index = searchselect.selectedIndex;
			var value = searchselect.options[index].value;
			if(value==1){
				searchinput.setAttribute('placeholder','请输入时间,例如：2017-09-14');
			}else if(value==2){
				searchinput.setAttribute('placeholder','请输入用户名');
			}else if(value==3){
				searchinput.setAttribute('placeholder','请输入标题关键字');
			}
		}
	};
	inputchange();
	//搜索框点击
	var searchbutton = document.getElementsByClassName('searchbutton')[0];
	searchbutton.onclick = function(){
		window.mainFrame.location.href = 'searchText.php';
		//获取select标签的value
		var searchselect = document.getElementsByClassName('searchselect')[0];
		var index = searchselect.selectedIndex;
		var value = searchselect.options[index].value;
		//获取input标签的value
		var searchinput = document.getElementsByClassName('searchinput')[0];
		var text = searchinput.value;
		sendAjax({
			method:'get',
			url:'admin/selectfromsql.php',
			data:'selectVal='+value+'&'+'text='+text,
			success:function(data){
				document.getElementsByClassName('data')[0].innerText = data;
			}
		});
	}
	//
	//
	//nav左侧导航栏
		var i=0
		document.getElementsByClassName('classify')[0].children[2].onclick = function(){
			// window.open('test.html','mainFrame');
			window.mainFrame.location.href = 'javaScript.html';
			i++;	
			if(i%2==1){
				document.getElementsByClassName('js')[0].style.display = 'block';
				document.getElementsByClassName('classify')[0].children[2].children[0].style.transform = "rotate(90deg)";
			}else{
				document.getElementsByClassName('js')[0].style.display = 'none';
				document.getElementsByClassName('classify')[0].children[2].children[0].style.transform = "rotate(0deg)";
			}
		}
		document.getElementsByClassName('classify')[0].children[5].onclick = function(){
			i++;	
			if(i%2==1){
				document.getElementsByClassName('demo')[0].style.display = 'block';
				document.getElementsByClassName('classify')[0].children[5].children[0].style.transform = "rotate(90deg)";
			}else{
				document.getElementsByClassName('demo')[0].style.display = 'none';
				document.getElementsByClassName('classify')[0].children[5].children[0].style.transform = "rotate(0deg)";
			}
		}
}
		
