import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import Debug from './utils/Debug.js'
import Sizes from './utils/Sizes.js'
import Time from './utils/Time'

import Scene from '../webgl/Scene'
import Scroll from './utils/Scroll.js'

import data from '../../public/assets/content/data'


let webglInstance = null

export default class WebGlManager {
    constructor(){
      // Singleton
      if(webglInstance) return webglInstance
      webglInstance = this

      // Options
      this.canvas = document.querySelector('canvas#webgl')

      // Setup
      this.debug = new Debug()
      this.sizes = new Sizes()
      this.time = new Time()
      this.scroll = new Scroll(data.content)


      this.scene = new THREE.Scene()
      this.scene.background = 'black'
      // this.scene.fog = new THREE.FogExp2( 0xff0000, 0.003 )

      // My Scene object
      this.world = new Scene()

      this.zoom = 1.5;

      // Camera
      // this.camera = new THREE.OrthographicCamera( this.sizes.width / - 2, this.sizes.width / 2, this.sizes.height / 2, this.sizes.height / - 2, 1, 1000 )
      this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.5, 700)
      this.camera.position.set(23, 13, 34)
      this.camera.lookAt(5, 2, 0)
      this.scene.add(this.camera)

      this.cameraFolder = this.debug.ui.addFolder('camera')
      this.cameraFolder.add(this.camera.position, 'x', -50, 50, 1)
      this.cameraFolder.add(this.camera.position, 'z', -50, 50, 1)
      this.cameraFolder.add(this.camera.position, 'y', -50, 50, 1)
      this.cameraFolder.add(this, 'zoom', -10, 10, 0.1)

      // OrbitControls
      // this.controls = new OrbitControls(this.camera, this.canvas)
      // this.controls.enableDamping = true
      // this.controls.enabled = false

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

      // Resize event
      this.sizes.on('resize', () =>
      {
        this.resize()
      })

      // Time tick event
      this.time.on('tick', () =>
      {
        this.update()
      })
    }

    resize(){
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update(){
      this.camera.lookAt(5, 2, 0)

      
      // this.controls.update()
      this.world.update()
      this.renderer.render(this.scene, this.camera)
    }
}
