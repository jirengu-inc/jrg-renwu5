function testUsername(){
  if(isLegalName()){
    ajax({
          url:'24-3.php',
          type:'get',
          data:{
            username:usernameInput.value
          },
          success: function(ret) {
                            if (ret == "1") {
                                msgUn.innerText = "用户名已存在";
                            } else {
                                msgUn.innerText = "用户名可用"
                            }
                        },
          error:function(){
            console.log("cuowu");
          }
        })
  }else{
    msgUn.innerText="对不起您输入的用户名无法使用"
  }
}
function isLegalName() {
  var username = usernameInput.value;
  return /\w{3,10}/.test(username);
};
function isLegalPassword(){
  var password=password1Input.value;
  if(password.length<6||password.length>15){
    return false
  }else if(/[^A-Za-z0-9_]+/.test(password)){
    return false
  }else if(/^[A-Z]+$|^[a-z]+$|^[0-9]+$|^_+$/.test(password)){
    return false
  }else{
    return true
  }
}
function testPasswordIpt(){
  if(isLegalPassword()){
    msgPwd1.innerText="密码可用"
    return true
  }else{
    msgPwd1.innerText="密码格式错误，请看懂提示后再试一次"
    return false
  }
}
function testPasswordRpt(){
  if(password2Input.value===password1Input.value){
    msgPwd2.innerText="输入正确"
    return true
  }else{
    msgPwd2.innerText="两次输入不一致"
    return false
  }
}