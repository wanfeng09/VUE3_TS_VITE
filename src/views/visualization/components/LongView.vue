<script setup lang="ts">
import {
  Scene,
  PerspectiveCamera,
  ACESFilmicToneMapping,
  EquirectangularReflectionMapping,
  WebGLRenderer,
  Object3D,
  DataTexture,
  Group,
  Object3DEventMap,
  Material,
} from 'three'

// 问题:“THREE”指 UMD 全局，但当前文件是模块。请考虑改为添加导入。
// 解决：使用 ES modules 的方式引入
// import * as THREE from "three";

import { isMeshType, isMeshPhysicalMaterial } from '@/types/threejs/index'

// import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 如果已经导入 @types/three 更换以下方式引入
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const params = {
  color: 0xffffff,
  transmission: 1,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  attenuationColor: 0xffffff,
  attenuationDistance: 1,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1,
}
let camera: PerspectiveCamera | null = null

type sceneType = {
  add: (val: Group<Object3DEventMap>) => void
  environment: DataTexture
  background: DataTexture
}
let scene: sceneType | null | Scene = null
let renderer: WebGLRenderer | null = null

let mesh = null
let material: Material | Material[] | null = null
const threeRef = ref()
const gui = ref()

defineExpose({
  init,
  clear,
})

function clear() {
  gui.value.destroy()
}

function init(w: number, h: number) {
  const hdrEquirect = new RGBELoader()
    .setPath('/')
    .load('royal_esplanade_1k.hdr', function () {
      hdrEquirect.mapping = EquirectangularReflectionMapping

      new GLTFLoader()
        .setPath('/')
        .load('DragonAttenuation.glb', function (gltf) {
          gltf.scene.traverse(function (child: Object3D) {
            // child.type -> "Group" /"Mesh"
            // child.material.type -> "MeshStandardMaterial" / "MeshPhysicalMaterial"
            if (
              isMeshType(child) &&
              isMeshPhysicalMaterial(child.material) &&
              child.isMesh &&
              child.material.isMeshPhysicalMaterial
            ) {
              mesh = child
              material = mesh.material
            }
          })

          setSize(w, h)

          if (scene) {
            scene.add(gltf.scene)
            scene.environment = hdrEquirect
            scene.background = hdrEquirect
          }
          render()
        })
    })
}
function setSize(w: number, h: number) {
  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  renderer.shadowMap.enabled = true
  threeRef.value.appendChild(renderer.domElement)

  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = params.exposure

  // accommodate CSS table
  //   renderer.domElement.style.position = "absolute";
  //   renderer.domElement.style.top = 0;

  scene = new Scene()

  camera = new PerspectiveCamera(40, w / h, 1, 2000)
  camera.position.set(-5, 0.5, 10)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render) // use if there is no animation loop
  controls.minDistance = 5
  controls.maxDistance = 20
  controls.target.y = 0.5
  controls.update()
  controlStyle()
}
// 控制器
function controlStyle() {
  gui.value = new GUI()
  gui.value.addColor(params, 'color').onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.color.set(params.color)
    }
    render()
  })

  gui.value.add(params, 'transmission', 0, 1, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.transmission = params.transmission
      render()
    }
  })

  gui.value.add(params, 'opacity', 0, 1, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.opacity = params.opacity
      const transparent = params.opacity < 1

      if (transparent !== material.transparent) {
        material.transparent = transparent
        material.needsUpdate = true
      }
      render()
    }
  })

  gui.value.add(params, 'metalness', 0, 1, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.metalness = params.metalness
      render()
    }
  })

  gui.value.add(params, 'roughness', 0, 1, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.roughness = params.roughness
      render()
    }
  })

  gui.value.add(params, 'ior', 1, 2, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.ior = params.ior
      render()
    }
  })

  gui.value.add(params, 'thickness', 0, 5, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.thickness = params.thickness
      render()
    }
  })

  gui.value
    .addColor(params, 'attenuationColor')
    .name('attenuation color')
    .onChange(function () {
      if (material && isMeshPhysicalMaterial(material)) {
        material.attenuationColor.set(params.attenuationColor)
        render()
      }
    })

  gui.value
    .add(params, 'attenuationDistance', 0, 1, 0.01)
    .onChange(function () {
      if (material && isMeshPhysicalMaterial(material)) {
        material.attenuationDistance = params.attenuationDistance
        render()
      }
    })

  gui.value.add(params, 'specularIntensity', 0, 1, 0.01).onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.specularIntensity = params.specularIntensity
      render()
    }
  })

  gui.value.addColor(params, 'specularColor').onChange(function () {
    if (material && isMeshPhysicalMaterial(material)) {
      material.specularColor.set(params.specularColor)
      render()
    }
  })

  gui.value
    .add(params, 'envMapIntensity', 0, 1, 0.01)
    .name('envMap intensity')
    .onChange(function () {
      if (material && isMeshPhysicalMaterial(material)) {
        material.envMapIntensity = params.envMapIntensity
        render()
      }
    })

  gui.value.add(params, 'exposure', 0, 1, 0.01).onChange(function () {
    if (renderer) {
      renderer.toneMappingExposure = params.exposure
      render()
    }
  })
  if (gui.value) {
    // 获取 GUI 的根元素（假设它有一个类名 '.lil-gui'）
    const guiElement: HTMLElement = document.querySelector('.lil-gui')!

    // 应用 CSS 样式来改变位置
    guiElement.style.position = 'absolute'
    guiElement.style.top = '60px'
    guiElement.style.right = '0'
  }
  gui.value.open()

}

// function onWindowResize(w:number,h:number) {
//   camera.aspect = w / h;
//   camera.updateProjectionMatrix();
//   renderer.setSize(w, h);
//   render();
// }

// 进行渲染
function render() {
  if (scene instanceof Scene && camera) {
    renderer?.render(scene, camera)
  }
}
</script>
<template>
  <div ref="threeRef"></div>
</template>
