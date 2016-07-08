function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}
function hasClass(el,cls){
	var re=new RegExp("\\b"+cls+"\\b");
	if (el.className.search(re)===-1){
		return false;
	}
	return true;
}
function addClass(el,cls){
	if(el.length>1){
		var i;
		for(i=0;i<el.length;i++){
			if(!hasClass(el[i],cls)){
				el[i].className+=" "+cls;
			}
		}
	}else{
		if(!hasClass(el,cls)){
			el.className+=" "+cls;
		}
	}
}

function removeClass(el,cls){
	if(el.length>1){
		var i;
		for(i=0;i<el.length;i++){
			if(hasClass(el[i],cls)){
				el[i].className=trim(el[i].className.replace(cls,""));
			}
		}
	}else{
		if(hasClass(el,cls)){
			el.className=trim(el.className.replace(cls,""));
		}
	}
}

function $(selector){
	if(selector[0]==="."){
		return document.getElementsByClassName(selector.slice(1));
	}
	else if(selector[0]==="#"){
		return document.getElementById(selector.slice(1));
	}
	else{
		return document.getElementsByTagName(selector);
	}

}
function ajax(opts){
	var request = new XMLHttpRequest();
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200){

				var json=JSON.parse(request.responseText.match(/{[^{]+}/)[0]);			//其中的正则过滤新浪云未实名认证所添加的数据
				console.log(json);
				opts.success(json);
			}else{
				opts.error();
			}
		}
	};
	var queryString="";
	for(var attr in opts.data){
		queryString+=attr+"="+opts.data[attr]+"&";					//拼装query string
	}
	queryString=queryString.slice(0,-1);
	if(opts.type.toLowerCase()==="get"){
		request.open("GET",opts.url+"?"+queryString);
		request.send();
	}
	if(opts.type.toLowerCase()==="post"){
		request.open("POST",opts.url);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.send(queryString);
	}

}
