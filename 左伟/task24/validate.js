//大写字母、小写、数字、下划线最少两种，6-15个字符
function isValidPassword(str){
    var r=/[A-Za-z0-9_]{6,15}/g;
    var r1=/[A-Z]{6,15}/g;
    var r2=/[a-z]{6,15}/g;
    var r3=/[0-9]{6,15}/g;
    var r4=/[_]{6,15}/g;
    if(r.test(str)){
    //排除在满足第一层判断后只有一种字符的情况；剩下的都为满足要求的情况；
        if(r1.test(str)||r2.test(str)||r3.test(str)||r4.test(str)){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }   
}

//判断用户名是否合法
function isValidUsername(str){
	return /^[\w]{3,10}$/.test(str);
}
//判断手机号是否合法；
function isLegalPhone(str){
	return /^1[3-9]\d{9}$/.test(str);
}