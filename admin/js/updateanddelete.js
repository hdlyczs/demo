window.onload = function(){
	//AJAX函数
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
			document.getElementsByClassName('pager')[0].innerHTML = str;
		}
		//根据页码显示内容的函数
		function showcontent(index){
			var startItem = (index-1)*pageSize;
			var Str = '';
			for(var i=startItem;i<startItem+8;i++){
					Str += 	'<table><tr><td>id</td><td>类型</td><td>标题</td><td>内容</td><td>录入时间</td><td>用户名</td><td>操作</td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].style+'</td><td>'+data[i].title+'</td><td>'+data[i].content+'</td><td>'+data[i].updatetime+'</td><td>'+data[i].username+'</td><td><input type="button" class="update" value="修改"><input type="button" class="delete" value="删除"></td></tr></table>';
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
					document.querySelector('.control .content').value = content;
					document.querySelector('.close').onclick = function(){
						document.querySelector('.control').style.display = 'none';
					}
					document.querySelector('.submit').onclick = function(){
						var newstyle = document.querySelector('.style').value
						var newtitle = document.querySelector('.title').value 
						var newcontent = document.querySelector('.control .content').value
						sendAjax({
							method:'post',
							url:'updatetosql.php',
							data:'id='+id+'&'+'style='+newstyle+'&'+'title='+newtitle+'&'+'content='+newcontent,
							success:function(data){
								alert(data);
								document.querySelector('.control').style.display = 'none';
								//修改表单页面显示
								var alltable = document.querySelectorAll('table');
								for(var k=0;k<alltable.length;k++){
									if(alltable[k].children[0].children[1].children[0].innerText == id){
										alltable[k].children[0].children[1].children[1].innerText = newstyle;
										alltable[k].children[0].children[1].children[2].innerText = newtitle;
										alltable[k].children[0].children[1].children[3].innerText = newcontent;
									}
								}
							}
						})
					}
				};
			}
			//删除表单
			var alldelete = document.querySelectorAll('.delete');
			for(var m=0;m<alldelete.length;m++){
				alldelete[m].onclick = function(){
					var r = confirm("确定要删除此条吗?");
					if(r==true){
						var id = this.parentNode.parentNode.children[0].innerText;
						sendAjax({
							method:'get',
							url:'delete.php',
							data:'id='+id,
							success:function(data){
								alert(data);
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
						})
					}
				}
			}	
		}	
		makepage();
		showcontent(1);
		//绑定分页点击事件
		var spanarry = document.getElementsByClassName('myspan');
		for(var i=0;i<spanarry.length;i++){
			spanarry[i].onclick = function(){
				var index = this.getAttribute('index');
				currentPage = index;
         		//调用显示内容函数
				showcontent(index);
				document.getElementsByClassName('currentPage')[0].innerText=currentPage;
				updateform();
			}
		}
	}
	// 顶部fixed函数
	// function fixed(){
	// 	window.onscroll = function(){
	// 		var i = window.document.body.scrollTop
	// 		if(i>100){
	// 			document.querySelector('header').style.position = 'fixed';
	// 			document.querySelector('header').style.top = '0';
	// 		}else{
	// 			document.querySelector('header').style.position = 'relative';
	// 			document.querySelector('header').style.top = '';
	// 		}
	// 	}
	// }
	// fixed();
	//查询框
	function inputchange(){
		var searchinput = document.getElementsByClassName('searchinput')[0];
		searchinput.onfocus = function(){
			var searchselect = document.getElementsByClassName('searchselect')[0];
			var index = searchselect.selectedIndex;
			var value = searchselect.options[index].value;
			if(value==0){
				searchinput.setAttribute('placeholder','请输入类型');
			}else if(value==2){
				searchinput.setAttribute('placeholder','请输入用户名');
			}
			else if(value==1){
				searchinput.setAttribute('placeholder','请输入时间,例如：2017-09-10');
			}
			else if(value==3){
				searchinput.setAttribute('placeholder','请输入标题关键字');
			}
		}
	};
	inputchange();
	//默认显示全部信息
	sendAjax({
		method:'get',
		url:'selectfromsql.php',
		data:'selectVal=all',
		success:function(data){
			var data = JSON.parse(data);
			//不分页写法
			// var str = '';
			// for(var i=0;i<data.length;i++){
			// 	// var str = '<table><tr><td>id</td><td>类型</td><td>标题</td><td>内容</td><td>录入时间</td><td>用户名</td><td>操作</td></tr>';
			// 	str+='<table><tr><td>id</td><td>类型</td><td>标题</td><td>内容</td><td>录入时间</td><td>用户名</td><td>操作</td></tr><tr><td>'+data[i].id+'</td><td>'+data[i].style+'</td><td>'+data[i].title+'</td><td>'+data[i].content+'</td><td>'+data[i].updatetime+'</td><td>'+data[i].username+'</td><td><input type="button" class="update" value="修改"><input type="button" class="delete" value="删除"></td></tr></table>';
			// }
			// document.getElementsByClassName('content')[0].innerHTML = str;
			// 开始分页;
			fenye(data.length,8,data);
		}
	});
	//查询框点击事件
	var searchbutton = document.getElementsByClassName('searchbutton')[0];
	searchbutton.onclick = function(){
		//获取select标签的value
		var searchselect = document.getElementsByClassName('searchselect')[0];
		var index = searchselect.selectedIndex;
		var value = searchselect.options[index].value;
		//获取input标签的value
		var searchinput = document.getElementsByClassName('searchinput')[0];
		var text = searchinput.value;
		sendAjax({
			method:'get',
			url:'selectfromsql.php',
			data:'selectVal='+value+'&'+'text='+text,
			success:function(data){
				try{
					var data = JSON.parse(data);
					//分页
					fenye(data.length,8,data);
				}catch(e){
					alert(data)
				}
			}
		})
	}
}