构造函数
```
var S =function(argument){
		this.a='a';
		this.b='b'
		}
    S.prototype.c='c';
    var s=new S();
    console.log(s)
```

如何通过构造函数的方式创建一个拥有属性和方法的对象
```
function Person(name,age){
	this.name=name;
	this.age=age;
	this.say=function(argument){
	console.log(this.a)
}
}
<!-- Person.prototype.slogan=function(){
	console.log('My name is'+this.name);
} -->
var person=new Person('simin',18);
person.slogan();
```