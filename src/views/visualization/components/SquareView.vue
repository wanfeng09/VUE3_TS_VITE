<template>
  <div ref="threeRef"></div>
</template>

<script setup lang="ts">
import {
  BoxGeometry,
  CubeTextureLoader,
  Fog,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
// 如果已经导入 @types/three 更换以下方式引入
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ref } from "vue";
const threeRef = ref()

defineExpose({
  init
})

function init(w:number,h:number) {
  // 创建场景
  const scene = new Scene();
  // 修改背景颜色
  // scene.background = new Color(0xffffff)

  // 添加背景图片
  const textureCube2 = new CubeTextureLoader().setPath('/').load(['threejs/02.jpg','threejs/02.jpg','threejs/02.jpg','threejs/02.jpg','threejs/02.jpg','threejs/02.jpg'])
  const textureCube = new CubeTextureLoader().setPath('/').load(['threejs/01.jpg','threejs/01.jpg','threejs/01.jpg','threejs/01.jpg','threejs/01.jpg','threejs/01.jpg'])

  scene.background = textureCube2

  // 添加雾
 scene.fog = new Fog(0xcccccc,10,15)
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ); // 创建相机(视野角度,长宽比,近截面,远截面)
  // 拍摄坐标轴
  camera.position.z = 5;
  camera.position.y = 1.2;

  const geometry = new BoxGeometry(1, 1, 1); // 创建立方体

  const material = new MeshBasicMaterial({ envMap: textureCube }); // 绿色

  // 网格
  const cube = new Mesh(geometry, material);
  cube.position.set(0, 2, 0);
  scene.add(cube);

  // 添加网格地面
  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);

  // 创建渲染器
  const renderer = new WebGLRenderer();
  renderer.setSize(w,h);
  // 在页面中添加元素
  threeRef.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  const controls = new OrbitControls(camera,renderer.domElement)
  controls.addEventListener('change',() => {
    console.log("监听鼠标事件");
  })

  // 阻尼
  // controls.enableDamping = true
  // controls.dampingFactor = 0.01

  // 自动旋转
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 3
  // 进行渲染
  // renderer.render(scene, camera);

  // 动画[60次/秒]
  function animate() {
    // 旋转
    // cube.rotation.x += 0.1
    requestAnimationFrame(animate);
    // 更新视角位置[轨道控制器]
    // controls.update()
    renderer.render(scene, camera);
  }
  animate();
}


</script>
