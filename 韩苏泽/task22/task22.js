var list1=document.querySelector(".ct1");
list1.addEventListener("click",function(e){
 e.stopPropagation();
 console.log(e.target.innerText);
});

//
var list2=document.querySelector(".ct2");
var input=document.querySelector(".ipt-add-content");
var addStart=document.querySelector("#btn-add-start");
var addEnd=document.querySelector("#btn-add-end");

list2.addEventListener("click",function(e){
  console.log(e.target.innerText);
});
addStart.addEventListener("click",function(e){
  var innerText=(input&&input.value)||"";
  if(innerText=="") return;
  var newChild=document.createElement("li")
  newChild.innerText=innerText;
  var firstChild=list2.firstChild||null;
  if(firstChild==null){
    list2.appendChild(newChild);
  }else{
    list2.insertBefore(newChild,firstChild);
  }
});
addEnd.addEventListener("click",function(e){
  var innerText=(input&&input.value)||"";
  if (innerText=="") return;
  var newChild=document.createElement("li");
  newChild.innerText=innerText;
  list2.appendChild(newChild);
})

//
var list3=document.querySelector(".ct3");
var preview=document.querySelector(".img-preview");
list3.addEventListener("mouseenter",function(e){
  var dataImg=e.target.getAttribute("data-img")||null;
  if(!dataImg) return;
  preview.innerHTML = '<img src="'+ dataImg + '">'
},true);
list3.addEventListener("mouseleave",function(e){
  preview.innerHTML = "";
},true);

//
var tabs=document.querySelector(".tabs");
tabs.addEventListener("click",function(e){
  var activeTab=e.target;
  e.stopPropagation();
  var tabList=this.querySelectorAll("li")
  var pannelList=document.querySelectorAll(".pannel")
  for(var i=0;i<tabList.length;i++){
    if(activeTab===tabList[i]){
        addClass(activeTab,"active");
        addClass(pannelList[i],"active");
    }else{
      removeClass(tabList[i],"active");
      removeClass(pannelList[i],"active");
    }
  }
});

function trim(str){
  if(!str) return "";
  if( typeof(str!=="string")){
      str+="";
    }
  if(str==="") return "";
  return str.replace(/^\s+/,"").replace(/\s+$/,"");
}
function addClass(el,cls){
    var flag=hasClass(el,cls);
    if(flag===undefined) return;
    if(!flag){
      el.className=trim((el.className+" "+cls).replace(/\s{2,}/g," "));
    }
}
function removeClass(el,cls){
  var flag=hasClass(el,cls);
  if(flag===undefined) return;
  if(flag){
    //这里要排除\b匹配前后有"-"的情况,还要使用全局匹配
    var reg=new RegExp("(^|[^-])\\b"+cls+"\\b($|[^-])","g");
    el.className=trim(el.className.replace(reg,"").replace(/\s{2,}/g," "));
  }
}
function hasClass(el,cls){
  if(el&&el.className!=null&&cls!=null){
    var className=el.className;
    if(typeof className==="string"){
      className+="";
    }
    if(cls==="")  return true;
    if(className==="") return false;
    if(className===cls) return true;
    //这里要排除\b匹配前后有"-"的情况
     var reg=new RegExp("(^|[^-])\\b"+cls+"\\b($|[^-])");
     return reg.test(className);
  }
}

var container=document.querySelector(".container");
var conver=document.querySelector(".cover");
var content=document.querySelector(".content");
container.addEventListener("click",function(e){
  e.stopPropagation();
  e.preventDefault();
  if(hasClass(e.target,"btn-click")){
    conver.style.backgroundColor="#ccc";
    content.style.display="block";
  }
  if(hasClass(e.target,"btn-cancel")||hasClass(e.target,"btn-close")){
    conver.style.backgroundColor="transparent";
    content.style.display="none";
  }
});
