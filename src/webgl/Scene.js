import WebGlManager from './webglManager'
import * as THREE from 'three'
import data from '../../public/assets/content/data'

console.log(data.content)

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
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    this.scene.add(cube)
  }

  update(){
    // console.log('tick')
  }
}
