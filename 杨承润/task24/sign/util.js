function isValidUsername(str){
	var reg=/^\w{3,10}$/;
	return reg.test(str);
}
function isValidPassword(str){
	if(str.length<6||str.length>15){
		return false;
	}
	var i=0;
	if(/[a-z]/g.test(str)){
		i++;
	}
	if(/[A-Z]/g.test(str)){
		i++;
	}
	if(/[0-9]/g.test(str)){
		i++;
	}
	if(/_/g.test(str)){
		i++;
	}
	if(i>=2){
		return true;
	}
	return false;
}
function hasClass(el,cls){
	var reg=new RegExp("\\b"+cls+"\\b",'g');
	return reg.test(el.className);
}
function trim(str){
	return str.replace(/^\s+|\s+$/g,'');
}
function addClass(el,cls){
	if (!hasClass(el,cls)) {
		el.className+=' '+cls;
	}
}
function removeClass(el,cls){
	var reg=new RegExp("\\b"+cls+"\\b",'g');
		temp=el.className.replace(reg,'').replace(/\s{2,}/g,' ');
	el.className=trim(temp);
}
function ajax(opts){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var ret = JSON.parse(xmlhttp.responseText);
            opts.success(ret);
        }
        if(xmlhttp.status == 404){
            opts.error();
        }
    };

    var dataStr = '';
    for(var key in opts.data){
        dataStr += key + '=' + opts.data[key] + '&';
    }
    dataStr = dataStr.substr(0,dataStr.length-1);

    if(opts.type.toLowerCase() == 'post'){
        xmlhttp.open(opts.type,opts.url,true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(dataStr);
    }
    if(opts.type.toLowerCase() == 'get'){
        xmlhttp.open(opts.type,opts.url+'?'+dataStr,true);
        xmlhttp.send();
    }

}