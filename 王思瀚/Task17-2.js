function sumOfSquares(){
  var sum =0;
  for (var i =0 ; i< arguments.length;i++){
    sum += arguments[i] *arguments[i];
  }
  return sum;
}


function sayName(name){
  console.log('hello' , name);
}

sayName('world');
sayAge(10);
var sayAge = function(age){
  console.log(age);
};


var i,fn;
function fn(){
  var i;
  function fn2(){
    i = 100;
  }
  console.log(i);
  i=99;
  fn2();
  console.log(i);

}
f();
i=10;
fn=20;
console.log(i);
