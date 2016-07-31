// 创建一个 Car 对象，拥有属性name、color、status；拥有方法run，stop，getStatus
function Car(name,color,status){
    this.name = name
    this.color = color
    this.status = status
    this.run = function(){
        console.log(this.status)
    }
    this.stop = function(){
        console.log(this.status)
    }
    this.getStatus = function(){
        console.log(this.status)
    }
}

var car = new Car('cl','blue','run')
