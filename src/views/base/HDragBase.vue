<template>
  <div class="h-contain">
    <div
      class="contain"
      @dragstart="dragstartEvent"
      @dragenter="dragenterEvent"
      @dragover="dragoverEvent"
      @dragend="dragendEvent"
      @drop="releaseDrog"
    >
      <div :class="item.name" :draggable="true" v-for="item in list" :key="item.id">
        {{ item.name }}
      </div>
      <div data-effect="copy" class="targetBox">box2</div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Drag = {
  id: number
  name: string
}

let list = reactive<Drag[]>([
  {
    id: 1,
    name: 'box1'
  },
  {
    id: 2,
    name: 'box2'
  },
  {
    id: 3,
    name: 'box3'
  }
])

let source = ref()

// 用户开始拖动元素时触发
function dragstartEvent(e: DragEvent) {
  // e.dataTransfer.effectAllowed= 'move'
  //   console.log('dragstartEvent',e);
  source.value = e.target // 获取目标节点
}

function dragendEvent() {}

// 在一个拖动过程中，释放鼠标键时触发此事件
function releaseDrog(e: any) {
  //   console.log('releaseDrog', e.target);
  e.target.appendChild(source.value)
  // const copy = source.cloneNode(true)
}

// 当被鼠标拖动的对象进入其容器范围内时触发此事件
function dragenterEvent() {
  // e.preventDefault()
}

// 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
function dragoverEvent(e: DragEvent) {
  e.preventDefault() // 阻止默认事件【解决元素不允许别的元素拖拽放在上面】
}
</script>

<style scoped>
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
.box2 {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(0, 34, 255);
}
.box3 {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(0, 255, 110);
}
.targetBox {
  width: 300px;
  height: 300px;
  border: 1px solid rgb(238, 0, 255);
}
</style>
