<template>
  <div class="-container">
    <div>使用ref: {{ obj.name }}</div>
    <div>使用reactive: {{ obj2.name }}</div>
    <div>使用computed: {{ computedLength }}</div>
    <button @click="btnClick">点击事件</button>
    <div>
      <img
        ref="myImg"
        src="https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280"
        width="100"
        height="100"
      />
    </div>
    <div>
      <button @click="getImgRef">修改图片-null</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

defineOptions({
  name: 'BaseGrammar'
})
// --------------ref--------------------
// 为ref设置泛型
// const str = ref<string>('hello world')
//   const obj = ref<{
//     name: string,
//     age?:number,
//     bol: boolean
//   }[]>([
//     {name: 'Li',bol:false},
//     {name: 'Z',bol:true,age: 18}
//   ])
type Person = {
  name: string
  age?: number
  bol: boolean
}

const list = ref<Person[]>([
  { name: 'Li', bol: false },
  { name: 'Z', bol: true, age: 18 }
])

let obj: Person = list.value[0]
obj.name = 'Tt'
// console.log(obj.name)
// --------------reactive--------------------

// 建议使用ref定义变量，reactive更新数据时需要注意丢失响应式问题
const obj2 = reactive<Person>({ name: 'Li', bol: false })
// 直接修改
obj2.name = 'Zz' // 没有丢失

// --------------computed--------------------
// 计算属性：不需要特意指定类型，会自动类型推断
const computedLength = computed<number>(() => {
  return list.value.length
})
// console.log(computedLength.value)

// --------------点击事件--------------------

// e默认参数，推断类型技巧
// 第二种在点击事件(写入$event)，鼠标悬浮$event查看推断类型 <button @click="btnClick($event)">点击事件</button>
function btnClick(e: MouseEvent) {
  // 第一种:打印控制台，查看[[Prototype]]
  console.log(e) // PointerEvent -> MouseEvent
  console.log(e.pageX, e.pageY)
}

// --------------Dom Ref--------------------
// 查看类型
// const img = document.createElement('img')
// 类型“never”上不存在属性src 解决：指定具体类型：HTMLImageElement
const myImg = ref<HTMLImageElement | null>(null) // 获取实例
// console.log(myImg.value) // null

const getImgRef = () => {
  console.dir(myImg.value)
  if (myImg.value) {
    myImg.value.src = ''
  }
  // console.log(myImg.value && myImg.value.src);
  console.log('获取地址', myImg.value?.src) // “myImg.value”可能为 “null”。解决：可选链?

  // 非空断言(慎用):百分百确定的值才能使用
  console.log('获取地址', myImg.value!.src) // 解决：非空断言!
}
</script>

<style lang="scss" scoped></style>
