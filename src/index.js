//using OrbitControls for orbit around camera
import './styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

const dataGUI = new dat.GUI()
const canvas = document.querySelector('canvas.webRender')
const scene = new THREE.Scene()
const ambientLight = new THREE.AmbientLight('#ffffff',3)
const loader = new GLTFLoader()//using loader to load the module
loader.load('models/tc_gltf.gltf', (model) => {
  scene.add(model.scene)
})
scene.add(ambientLight)
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
window.addEventListener('resize', () => {
  camera.updateProjectionMatrix()
  size.height = window.innerHeight
  size.width = window.innerWidth
  camera.aspect = size.width / size.height
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const camera = new THREE.PerspectiveCamera(60, size.width / size.height)
camera.position.set(0, 90, 50)
const controls = new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(size.width, size.height) 
const final = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(final)
}
final()
dataGUI.close()
