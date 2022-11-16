import WebGlManager from './webglManager'
import Flor from './entities/Flor'

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
    this.camera = this.webgl.camera
    this.scene = this.webgl.scene

    // Create floor - Instance Meshs
    this.floor =  new Flor(this.scene, this.camera)

  }

  update(){
    // console.log('tick')
    this.floor.update()
  }
}
