var start = 3;
var length = 5;
var i     = 3;
var isloading = false;

function dealWith(){

}

function ajax(opts){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status ==200) {
      var json = JSON.parse(xmlhttp.responseText);
       dealWith(json);
    }
  };
}
document.querySelector('.btn').addEventListener('click',function(e){
    e.preventDefault();
    if (isloading) {
      return;
    }
    isloading = true;
    this.innerHTML = '<img src="loading.gif" >';
    ajax({
        url: 'excuseme.php',
        type: 'get',
        data:{
          start:   start,
          length:  length,
        },
        success:function(json){
          dealWith(json);
        },
        error:function(){
          console.log('oh...something went wrong....');
          isloading =false;
          document.querySelector('.btn').innerText='MORE';
        }
    });



});
