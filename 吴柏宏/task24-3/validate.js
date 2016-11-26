//用户名 只能是字母、数字、下划线，3-10个字符
function isValidUsername(str){
  return /^[A-Za-z_0-9]{3,10}$/.test(str);
}

//密码 大写字母、小写、数字、下划线最少两种，6-15个字符
function isValidPassword(str){ //排除法
  if(/(^[a-z]+$)|(^[A-Z]+$)|(^[0-9]+$)|(^[_]+$)|(^\w{16,}$)|(^\w{0,5}$)/.test(str)){
    return false;
  }
  if(/[^a-zA-Z0-9_]/.test(str)){
    return false;
  }
  return true;
}
