	//AJax函数
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
	//分页函数
	//分页函数//参数为数据总长度，每页显示条数，数据内容
	function fenye(length,size,data){
		var currentPage = 1;//当前页码
		var pageSize = size;
		var number = length;
		var page = Math.ceil(number/pageSize);
		//创建分页模板
		function makepage(){
			var str = '';
			for(var i=1;i<page+1;i++){
				str+='<span class="myspan" index='+i+'>'+i+'</span>';
			}
			str+='<span>当前第<span class="currentPage">'+currentPage+'</span>页 共'+page+'页</span>';
			// document.createElement('div');
			document.getElementsByClassName('pager')[0].innerHTML = str;
		}
		//根据页码显示内容的函数
		function showcontent(index){
			var startItem = (index-1)*pageSize;
			var Str = '';
			for(var i=startItem;i<startItem+size;i++){
					Str += 	'<table><tr><td>id</td><td>类型</td><td>标题</td><td>内容</td><td>录入时间</td><td>用户名</td><td>操作</td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].style+'</td><td>'+data[i].title+'</td><td>'+data[i].content+'</td><td>'+data[i].updatetime+'</td><td>'+data[i].username+'</td><td><input type="button" class="update" value="详情"></td></tr></table>';
					if(i>data.length-2){
						break;
					}
			}
			document.getElementsByClassName('content')[0].innerHTML = Str;
			updateform();
		}
		// 修改表单的函数
		function updateform(){
			var allupdate = document.querySelectorAll('.update');
			for(var j=0;j<allupdate.length;j++){
				allupdate[j].onclick = function(){
					var id = this.parentNode.parentNode.children[0].innerText;
					var style = this.parentNode.parentNode.children[1].innerText;
					var title = this.parentNode.parentNode.children[2].innerText;
					var content = this.parentNode.parentNode.children[3].innerText;
					var updatetime = this.parentNode.parentNode.children[4].innerText;
					document.querySelector('.control').style.display = 'block';
					document.querySelector('.id').value = id;
					document.querySelector('.style').value = style;
					document.querySelector('.title').value = title;
					document.querySelector('.control .text').value = content;
					document.querySelector('.close').onclick = function(){
						document.querySelector('.control').style.display = 'none';
					}
					document.querySelector('.login').onclick = function(){
						// window.location.href = 'admin/login.html';
						window.open("admin/login.html")
					}
				};
			}	
		}	
		makepage();
		showcontent(1);
		showList();
		//绑定分页点击事件
		var spanarry = document.getElementsByClassName('myspan');
		for(var i=0;i<spanarry.length;i++){
			spanarry[i].onclick = function(){
				var index = this.getAttribute('index');
				currentPage = index;
         		//调用显示内容函数
				showcontent(index);
				document.getElementsByClassName('currentPage')[0].innerText=currentPage;
				showList();
				updateform();
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
	}
