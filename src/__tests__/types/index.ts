const add = 100
console.log(add)
function fnn(this: Window) {
  alert(this)
}

const box = document.getElementById('box')

// if(box !== null){
//     box.addEventListener('click',function(){
//         alert("hello")
//     })
// }
box?.addEventListener('click', function () {
  alert('hello')
})

function myFunction(param: string): string;
function myFunction(param: number): number;
function myFunction(param: any): any {
    // ...
}

// 正确调用
let strResult = myFunction("hello");
let numResult = myFunction(123);

// 错误调用，没有接受 boolean 类型参数的重载
// let boolResult = myFunction(true); // TypeScript 会报错：没有与此调用匹配的重载