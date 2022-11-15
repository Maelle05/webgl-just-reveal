import WebGlManager from './webglManager'
import * as THREE from 'three'
import Flor from '../webgl/entities/Flor'

// console.log(data.content)

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

    // Create flor - Instance Meshs
    this.flor =  new Flor(this.scene)

  }

  update(){
    // console.log('tick')
    this.flor.update()
  }
}
