document.querySelector("#btn").addEventListener("click", function(e){
    e.preventDefault();
    ajax({
        url: "getData.php",   //接口地址
        type: "get",               // 类型， post 或者 get,
        data: {
            method:"task24-1",
            username: "xiaoming",
            password: "abcd1234"
        },
        success: function(ret){
            console.log(ret);       // {status: 0}
        },
        error: function(){
           console.log("出错了")
        }
    })
});
//=====================习题2==========================//
document.querySelector("#add-more").addEventListener("click",function(e){
  e.preventDefault();

  var me=this;
  if(me.isloading) return;
  var parent=this.parentElement;
  me.innerHTML='<img src="img/loading.gif" alt="">';
  me.isloading=true;
  ajax({
    url: "getData.php",
    type:"get",
    data:{
      method:"task24-2",
      idx:document.querySelectorAll(".div-wrap>.content").length,
      count:5
    },
    success:function(ret){
     for(var key in ret){
       var newDiv=document.createElement("div");
       newDiv.setAttribute("class","content");
       newDiv.innerText=ret[key];
       parent.insertBefore(newDiv,me);
     }
     me.isloading=false;
     me.innerHTML="加载更多";
    },
    error:function(){
      me.isloading=false;
      me.innerHTML="加载更多";
      console.log("出错了");
    }
  });
});
//=====================习题3============================//
var msgList=document.querySelectorAll(".msg");
for(var i in msgList){
  msgList[i].retMsg=function(status,msg){
    var status=status||false;
    var msg=msg||"";
    this.innerText=msg;
    if(status){
      this.style.color="#aaa";
    }else{
      this.style.color="red";
    }
  }
}
//只能是字母、数字、下划线，3-10个字符
function checkName(el,str,handle){
  if(!el) return;
  var nameValue=username.value||"";
  var reg=/^\w{3,10}$/;
  if(!reg.test(str)) {
    el.retMsg(false,"用户名不符合规则");
    handle&&handle(false);
    return;
  };
  ajax({
    url: "getData.php",
    type: "post",
    data:{
      method: "checkName",
      name: nameValue
    },
    success: function(ret){
      var status=ret.status||"";
      var text=ret.text||"";
      el.retMsg(status,text);
      handle&&handle(status);
    },
    error: function(){
      el.retMsg(false,"出错了");
      handle&&handle(false);
    }
  });
}
//大写字母、小写、数字、下划线最少两种，6-15个字符
function checkPwd(el,str){
  if(!el) return;
  if(!/^\w{6,15}$/.test(str)) {
    el.retMsg(false,"密码不符合规则");
    return false;
  }
  if(/(^[A-Z]+$)|(^[a-z]+$)|(^[0-9]+$)|(^[_]+$)/.test(str)){
    el.retMsg(false,"密码不符合规则");
    return false;
  }
  el.retMsg(true,"密码符合规则")
  return true;
}
var username=document.querySelector("#username");
var password=document.querySelector("#password");
var confirmPwd=document.querySelector("#confirm-pwd");
var btnReg=document.querySelector("#btn-reg");
var nameMsg=document.querySelector("#username-msg");
var pwdMsg=document.querySelector("#pwd-msg");
var confirmMsg=document.querySelector("#confirm-msg");
username.addEventListener("change",function(){
  var username= this.value||"";
  checkName(nameMsg,username);

});

password.addEventListener("change",function(){
  var pwd=this.value||"";
  if(checkPwd(pwdMsg,pwd)){
    this.isvalid=true;
  }else{
    this.isvalid=false;
  }
});
confirmPwd.addEventListener("change",function(){
  if(!password.isvalid) return;
  var pwd=password.value||"";
  var confirm=this.value||"";
  if(pwd!==confirm){
    confirmMsg.retMsg(false,"密码不一致");
  }else{
    confirmMsg.retMsg(true,"密码一致");
  }
});
btnReg.addEventListener("click",function(){
  var me=this;
  if(me.regging) {
    return;
  }
  var pwd=password.value||"";
  var nameValue=username.value||"";
  var confirm=confirmPwd.value||"";

  if((checkPwd(pwdMsg,pwd))&&(pwd==confirm)){
    checkName(nameMsg,nameValue,function(flag){
      if(flag){
        me.value="正在注册";
        me.regging=true;
        ajax({
          url: "getData.php",
          type: "post",
          data:{
            method: "register",
            username: nameValue,
            password:pwd
          },
          success: function(data){
            me.value="注册";
            me.regging=false;
            alert(data.status+":"+data.text);
          },
          error: function(){
            me.value="注册";
            me.regging=false;
            console.log("出错了")
          }
        });
      }
    });
  }
});
