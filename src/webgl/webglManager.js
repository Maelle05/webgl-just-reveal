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
      this.gui = new Debug()


      this.scene = new THREE.Scene()
      this.scene.background = 'black'
      // this.scene.fog = new THREE.FogExp2( 0xff0000, 0.003 )

      // My Scene object
      this.world = new Scene()

      // Camera
      // this.camera = new THREE.OrthographicCamera( - 10 * this.sizes.width / this.sizes.height, 10 * this.sizes.width / this.sizes.height, 10, - 1, 0.1, 1000 )
      this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.5, 700)
      this.camera.position.set(-34, 26, 30)
      console.log(this.camera)
      this.cameraFolder = this.gui.ui.addFolder('Camera')
      this.cameraFolder.add(this.camera.position, 'x', -100, 150, 0.1)
      this.cameraFolder.add(this.camera.position, 'y', 0, 150, 0.1)
      this.cameraFolder.add(this.camera.position, 'z', -100, 150, 0.1)
      // this.cameraFolder.add(this.camera, 'bottom', 0, 100, 0.1)
      // this.cameraFolder.add(this.camera, 'top', 0, 100, 0.1)
      // this.cameraFolder.add(this.camera, 'right', 0, 100, 0.1)
      // this.cameraFolder.add(this.camera, 'left', 0, 100, 0.1)
      // this.camera.lookAt(0,0,0)
      this.scene.add(this.camera)

      // OrbitControls
      this.controls = new OrbitControls(this.camera, this.canvas)
      this.controls.enableDamping = true
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
      // this.camera.lookAt(0,0,0)

      this.controls.update()
      this.world.update()
      this.renderer.render(this.scene, this.camera)
    }
}
