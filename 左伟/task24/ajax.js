/*
  与后台约定的数据：
1)、用户名的验证：1、地址：task3.php 和 ; 2、传入参数：user;3:返回参数stu (0表示用户名存在，1表示不存在); 
2)、提交数据：1、地址：task3_prompt.php; 2、传入参数：user、pw;3、返回参数：stu(0表示注册成功，1表示注册时出错);
*/

function ajax(opt){
	var xml=new XMLHttpRequest();
	xml.onreadystatechange=function(){
		if(xml.readyState===4 && xml.status===200){
			var json=JSON.parse(xml.responseText);
			opt.success(json);
		}
		if(xml.status===404){
			opt.error();
		}
	}
	var optstr='';
	for(k in opt.data){
		optstr += k+"="+opt.data[k]+"&";
	}
	optstr=optstr.substr(0,optstr.length-1);

	if(opt.type==='POST'){
		xml.open(opt.type,opt.url,true);
		xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xml.send(optstr);
	}
	if(opt.type==='GET'){
		xml.open(opt.type,opt.url+"?"+optstr,true);
		xml.send();
	}
}

