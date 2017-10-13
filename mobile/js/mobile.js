window.onload = function(){
	//进入页面加载内容
	sendAjax({
				method:'get',
				url:'../public.php',
				data:'value=HTML',
				success:function(data){
					var data = JSON.parse(data);
					var Str = '';
					for(var i=0;i<data.length;i++){
						Str += 	'<table cellspacing="0" cellpadding="0"><tr><td>id</td><td>类型</td><td>标题</td><td style="display:none;">内容</td><td style="display:none;">录入时间</td><td>用户</td><td></td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].style+'</td><td>'+data[i].title+'</td><td style="display:none;">'+data[i].content+'</td><td style="display:none;">'+data[i].updatetime+'</td><td>'+data[i].username+'</td><td class="update">></td></tr></table>';
					}
					document.getElementsByClassName('content')[0].innerHTML = Str;
					xiaoguo();
				}
			})
	//nav滑动效果
	function leftscroll(){
		var moveObject = document.querySelector('.nav ul');
		var parentObject = document.querySelector('.nav');
		scroll(moveObject,parentObject,40);
	}
	leftscroll();
	//nav点击
	lefttouch();
	//right滑动效果
	function rightscroll(){
		var moveObject = document.querySelector('.right .content');
		var parentObject = document.querySelector('.right');
		scroll(moveObject,parentObject);
	}
	rightscroll();
	//查询框
	search();
	//查询页面滑动效果
	function searchscroll(){
		var moveObject = document.querySelector('.search .content');
		var parentObject = document.querySelector('.search');
		scroll(moveObject,parentObject);
	}
	searchscroll();
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
function scroll(moveObject,parentObject,size){
	//移动的元素
	// var moveObject = document.querySelector('.nav ul');
	// fox_tap(moveObject,function(){
	// 	console.log('11')
	// })
	//父元素高度
	// var parentHeight = document.querySelector('.nav').offsetHeight;
	var parentHeight = parentObject.offsetHeight;
	//ul高度
	var childHeight = moveObject.offsetHeight;
	//移动范围 40为此DOM的padding值
	if(childHeight < parentHeight){
		childHeight = parentHeight;
	}
	var minArea = parentHeight - childHeight-size;
	var maxArea = 0;  
	var startY =0;
	//移动值
	var moveY =0;
	//移动距离
	var  distanceY = 0;
	//绑定事件
	moveObject.addEventListener('touchstart',function(event){
		startY = event.touches[0].clientY;
	})
	moveObject.addEventListener('touchmove',function(event){
		moveY = event.touches[0].clientY-startY;
		//做一些限制
		if((moveY+distanceY)>(maxArea+100)){
			moveY = 0;
			distanceY = maxArea+100;
		}else if((moveY+distanceY)<(minArea-100)){
			moveY = 0;
			distanceY = minArea-100;
		}
		moveObject.style.transition = '';
		moveObject.style.transform = 'translateY('+(moveY+distanceY)+'px)';
	})
	moveObject.addEventListener('touchend',function(event){
		distanceY+=moveY;
		if(distanceY>maxArea){
			distanceY = maxArea;
		}else if(distanceY<minArea){
			distanceY = minArea;
		}
		moveObject.style.transition = 'all .5s';
		moveObject.style.transform = 'translateY('+distanceY+'px)';
	})
	startY = 0;
    moveY = 0;
    distanceY = 0;
}
function lefttouch(){
	var li  = document.querySelectorAll('.nav ul li');
	for(var i=0;i<li.length;i++){
		fox_tap(li[i],function(object){
			var style = object.innerHTML;
			//去掉边框的点击效果
			var actives = object.parentNode.children;
			// console.log(actives)
			for(var j=0;j<actives.length;j++){
				if(actives[j].className == 'active'){
					actives[j].className = '';
				}
			}
			object.className = 'active';
			//发送请求
			sendAjax({
				method:'get',
				url:'../public.php',
				data:'value='+style,
				success:function(data){
					var data = JSON.parse(data);
					var Str = '';
					for(var i=0;i<data.length;i++){
						Str += 	'<table cellspacing="0" cellpadding="0"><tr><td>id</td><td>类型</td><td>标题</td><td style="display:none;">内容</td><td style="display:none;">录入时间</td><td>用户</td><td></td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].style+'</td><td>'+data[i].title+'</td><td style="display:none;">'+data[i].content+'</td><td style="display:none;">'+data[i].updatetime+'</td><td>'+data[i].username+'</td><td class="update">></td></tr></table>';
					}
					document.getElementsByClassName('content')[0].innerHTML = Str;
					xiaoguo();
				}
			})
			var moveObject = document.querySelector('.right .content');
			moveObject.style.transform = 'translateY(0px)';
		})
	}
}

//显示效果及查看内容
function xiaoguo(){
		// 查看表单的函数
		function showcontent(){
			var alltable = document.querySelectorAll('table');
			for(var i=0;i<alltable.length;i++){
				fox_tap(alltable[i],function(object){
					document.querySelector('.control').style.left= '0';
					// document.querySelector('header').style.display= 'none';
					var id = object.children[0].children[1].children[0].innerText;
					var style = object.children[0].children[1].children[1].innerText;
					var title = object.children[0].children[1].children[2].innerText;
					var content = object.children[0].children[1].children[3].innerText;
					var updatetime = object.children[0].children[1].children[4].innerText;
					var username = object.children[0].children[1].children[5].innerText;
					document.querySelector('.style').innerText = style;
					document.querySelector('.title').innerText = title;
					document.querySelector('.control .text').innerText = content;
					document.querySelector('.updatetime').innerText = updatetime;
					document.querySelector('.username').innerText = username;
					var back = document.querySelector('.control .back');
					fox_tap(back,function(object){
						document.querySelector('.control').style.left= '100%';
					})
				})
			}
		}	
		function showList(){
			var tables = document.querySelectorAll('table');
			var timer = setInterval(function(){movetable(tables)},100);
			var i = 0;
			function movetable(object){
				if(i==tables.length-1){
					clearInterval(timer);
				}
				object[i].style.transform = 'translateY(0)';
				object[i].style.opacity = 1;
				i++
			// console.log(object[i])
			};
		}
		showList();
		showcontent();
}
function search(){
	var searchimg = document.querySelector('.searchimg');
	fox_tap(searchimg,function(){
		var text = document.querySelector('.searchinput').value;
		sendAjax({
			method:'get',
			url:'../admin/selectfromsql.php',
			data:'selectVal=3&text='+text,
			success:function(data){
				try{
					var data = JSON.parse(data);
					// console.log(data)
					var Str = '';
					for(var i=0;i<data.length;i++){
						Str += 	'<table cellspacing="0" cellpadding="0"><tr><td>id</td><td>类型</td><td>标题</td><td style="display:none;">内容</td><td style="display:none;">录入时间</td><td>用户</td><td></td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].style+'</td><td>'+data[i].title+'</td><td style="display:none;">'+data[i].content+'</td><td style="display:none;">'+data[i].updatetime+'</td><td>'+data[i].username+'</td><td class="update">></td></tr></table>';
					}
					document.getElementsByClassName('content')[1].innerHTML = Str;
					document.querySelector('.search').style.left= '0';
					xiaoguo();
					var back = document.querySelector('.search .back');
					fox_tap(back,function(object){
						document.querySelector('.search').style.left= '100%';
					})
				}catch(e){
					var Str = '无记录';
					document.getElementsByClassName('content')[1].innerHTML = Str;
					document.querySelector('.search').style.left= '0';
					var back = document.querySelector('.search .back');
					fox_tap(back,function(object){
						document.querySelector('.search').style.left= '100%';
					})
				}
			}
		})
		document.querySelector('.search .content').style.transform = 'translateY(0px)';
	})
}
