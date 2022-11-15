import WebGlManager from "./webglManager"
import * as THREE from 'three'

let sceneInstance

export default class Scene {
  constructor(){

    // Singleton
    if(sceneInstance) return sceneInstance
    sceneInstance = this


    this.webgl = new WebGlManager()
    this.setup()
  }

  setup(){
    this.canvas = this.webgl.canvas
    this.scene = this.webgl.scene

    /**
     * Test cube
     */
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: true })
    )
    
    this.scene.add(this.cube)
  }

  update(){
    // console.log('tick')
  }
}