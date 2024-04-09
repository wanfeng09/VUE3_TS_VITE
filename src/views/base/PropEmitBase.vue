<template>
  <div class="-container">
    子组件: {{ msg }} -- {{ hobby }}
    <button @click="btnChange">子组件button-string</button>
    <button @click="sendMed">子组件button-number</button>
  </div>
</template>

<script lang="ts" setup>
// 可用于直接在＜script setup＞内部声明组件选项，而无需使用单独的＜script＞块
// Only supported in 3.3+.
// 可使用选项式api（Options API）
defineOptions({
  name: 'PropEmitBase', // 默认组件名
  mounted() {}
})

// 非ts语法
// 运行时声明
// const props = defineProps({
//   obj: { type: String, required: true, default: '默认值' }, // 无提示属性，自己打全
//   msg: String
// })
// props.msg

// ts语法
// 基于类型的声明: 通过泛型类型参数定义具有纯类型的 props
type PropsType = {
  msg: string // 必传
  age?: number // 可选
  hobby?: string[]
}
// const props = defineProps<PropsType>()
// 注意解构不是响应式
// const { msg } = defineProps<PropsType>()
// 设置默认值
// const { msg = "默认值" } = defineProps<PropsType>()

// 当使用基于类型的声明时，我们失去了为 props 声明默认值的能力。这可以通过 withDefaults 编译器宏解决
// const props = withDefaults(defineProps<PropsType>(), {
//   msg: 'hello',
//   age: 18,
//   hobby: () => ['one', 'two']
// })
withDefaults(defineProps<PropsType>(), {
  msg: 'hello',
  age: 18,
  hobby: () => ['one', 'two']
})
// -----------------------------

// 非ts语法
// const emit = defineEmits(['btnChange', 'sendMed'])

// ts语法
// 对事件名和参数做约束

// 基于选项
// const emit = defineEmits({
//   sendMed: (val: number) => {
//     // 返回 `true` 或 `false`
//     // 表明验证通过或失败
//     return true
//   },
//   btnChange: (val: string) => {
//     // 返回 `true` 或 `false`
//     // 表明验证通过或失败
//     return true
//   }
// })

// 基于类型
// 语法：(e:事件名,参数1:类型,参数2:类型):void
//  const emit = defineEmits<{
//   (e: 'btnChange',val: string):void
//   (e: 'sendMed',val: number):void
//  }>()

// 3.3+: 可选的、更简洁的语法
const emit = defineEmits<{
  sendMed: [val: number]
  btnChange: [val: string]
}>()

const btnChange = () => {
  emit('btnChange', '子组件点击事件')
}

const sendMed = () => {
  emit('sendMed', 1)
}


</script>

<style lang="scss" scoped></style>
