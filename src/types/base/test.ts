let a:number;
a=10
a=90
// a="hello" 报错
function sum(a: number,b:number){
    return a+b
}
//m 返回number
function m(a: number,b:number):number{
    return a+b
}
sum(2,8)
// sum('sum',7) 报错

let c: "male" | "female"// 以字面量进行类型声明
c= 'male'
c="female"
// c="hello" 报错

let d:any; //任意类型 let d[any赋值给别人，别人也会变成any  let s:string s=d s的类型变成any] 不建议使用
d=10
d="hello"

let aa:unknown //实际上是一个类型安全的any,不能直接赋值
let s:string = "hello"
//s = aa 报错
if(typeof aa==="string"){
    s=aa
}
//类型断言[告诉编译器变量类型] 语法 变量 as 类型    ｜｜ <类型>变量
s = aa as string
s = <string>aa

//void表示没有返回值 空值undefined
function fn():void{
}
//never 表示没有值
function err():void{
    throw new Error("报错了")
}
let bb:object
bb = {}
let cc:{name:string}
cc= {name: 'cs'}
let dd: {name:string,age?:number}//?可选属性
dd ={ name:'cd'}
dd= {name:'cd',age:18}

//任意属性名
let an:{name:string,[propName:string]:any}
an = {name:'cd',age:18}

let jt:(a:number,b:number)=>number;//箭头函数
let e:string[] //字符串数组
let g: Array<string>
//元组，固定长度的数组tuple
let harr:[string,number]
harr=['1',2]
//枚举enum
enum gender{male,female}
let i: {name: string,gender:gender.male | gender.female}
// & 表示同时
let j: {name: string} & {age:number}
//类型别名
type myType = 1|2|3|4
let mt: myType
mt=1
// mt = 5 报错

