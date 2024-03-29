<template>
  <div class="h-contain">
    我是App组件
    <PropEmitBase msg="我是父组件传值" @btnChange="btnChange" @sendMed="sendMed" />
    <BaseGrammar />
    <div>--------------------------------</div>
    <div>
      类型声明文件
      <div>导出type：{{ p.name }}</div>
      老项目js 创建类型声明文件
      <div>{{ count }}-{{ result }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PropEmitBase from './PropEmitBase.vue'
import BaseGrammar from './BaseGrammar.vue'

// ------------------start------------------------------
import { count,fnArrow,fn, position } from '@/types/base/old'
fn(position.bottom)
const result = fnArrow(count,20)
//   // --------------------end----------------------------

function btnChange(val: string) {
  console.log(val)
}

const sendMed = (val: number) => {
  console.log(val)
}
// ------------------start------------------------------
// 'personType' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
// “personType”是一种类型，当启用了“verbatimModuleSyntax”时，必须使用仅类型导入来导入。
import type { personType } from '@/types/index'
let p: personType = {
  name: 'Zz',
  age: 18
}
// --------------------end----------------------------
</script>

<style lang="scss" scoped></style>
