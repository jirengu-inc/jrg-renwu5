// function ajax(options){
//   console.log(options.url);
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function(){
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       var data = JSON.parse(xmlhttp.responseText);
//       options.success(data);
//     }
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
//       options.error();
//     }
//
//   };
//   var dataStr = '';
//   for(var key in options.data){
//     dataStr += key+'='+options.data[key] + '&';
//   }
//   dataStr = dataStr.substr(0,dataStr.length-1);
//   if (options.type.toLowerCase() == 'get') {
//     var url = options.url + '?' +dataStr;
//     xmlhttp.open(options.type,url,true);
//     xmlhttp.send();
//   }
//
//   if (options.type.toLowerCase() == 'post') {
//     xmlhttp.open(options.type,options.url,true);
//     xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     xmlhttp.send(dataStr);
// }
// }

var btn = document.querySelector('#btn');
var username = document.querySelector('#username');
var password = document.querySelector('#password');
var repassword = document.querySelector('#repassword');
var userSub = document.querySelector('.userSub');
var pwSub   = document.querySelector('.pwSub');
var repwSub = document.querySelector('.repwSub');

function trim(str){
  return str.replace(/^\s+|\s+$/g,'');
}

function checkName(str){
  if (!trim(str) || str === '' ) {
        userSub.innerText = "用户名格式不正确";
        username.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
  if(!/^\w{3,10}$/.test(str)){
        userSub.innerText = "用户名格式不正确";
        username.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
  if (str === "hunger") {
        userSub.innerText = "用户名已存在";
        username.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
        userSub.innerText = "只能是字母、数字、下划线，3-10个字符";
        username.style.borderColor='';
        btn.disabled = false;
        return true;
}
function checkPasswd(str){
  if (!trim(str) || str === '' ) {
        pwSub.innerText = "用户名格式不正确";
        password.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
  if (/^_+$|^\d+$|^[A-Z]+$|^[a-z]$/.test(str)) {
        pwSub.innerText = "用户名格式不正确";
        password.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
  if(str.length<6||str.length>15){
        pwSub.innerText = "用户名格式不正确";
        password.style.borderColor='red';
        btn.disabled = true;
        return false;
    }
        pwSub.innerText = "大写字母、小写、数字、下划线最少两种，6-15个字符";
        password.style.borderColor='';
        btn.disabled = false;
        return true;
}

function recheckPasswd(str){
  if (!trim(str) || str === '' ) {
        repwSub.innerText = "两次输入不一致";
        repassword.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
  if (str != password.value) {
        repwSub.innerText = "两次输入不一致";
        repassword.style.borderColor='red';
        btn.disabled = true;
        return false;
  }
        repwSub.innerText = "可以注册啦！";
        repassword.style.borderColor='';
        btn.disabled = false;
        return true;
}

username.addEventListener('change',function(e){
    console.log(username.value);

    checkName(username.value);
    console.log(btn.disabled);
});

password.addEventListener('change',function(){
    console.log(password.value);
    checkPasswd(password.value);
});

repassword.addEventListener('change',function(){
    console.log(repassword.value);
    recheckPasswd(repassword.value);
});

btn.addEventListener('click',function(){
      if (checkName(username.value) && checkPasswd(password.value) &&recheckPasswd(repassword.value)) {
          alert('正在注册');
      }else {
        alert('您的信息不完整');
      }
});
// btn.addEventListener('click',function(e){
//   e.preventDefault();
// var username = document.querySelector('#username').value;
// var password = document.querySelector('#password').value;
//
//    ajax({
//      url: 'Task24-3.php',
//      type: 'get',
//      data:{
//           name:username.value,
//      },
//      success:function(json){
//           if (status === 1) {
//             alert("正在注册");
//           }
//      },
//      error:function(){
//           console.log('oh..something went wrong..');
//      }
//    });
//
// });
