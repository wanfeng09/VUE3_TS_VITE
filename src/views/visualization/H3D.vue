
  
  <script setup lang="ts">
  import { ref,onMounted } from 'vue';
  import SquareView from "./components/SquareView.vue"
  const contain = ref()
  const squareRef = ref()
   onMounted(() => {
    squareRef.value.init(contain.value.clientWidth,contain.value.clientHeight)
   })
  </script>
  <template>
    <div class="contain" ref="contain">
      <square-view ref="squareRef"/>
    </div>
  </template>
  
  <style scoped lang="scss">
  .contain{
    @include bfc;
  } 
  </style>