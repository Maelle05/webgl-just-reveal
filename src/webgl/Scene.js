import WebGlManager from './webglManager'
import * as THREE from 'three'
import Flor from '../webgl/entities/Flor'
import Texts from './entities/Texts'
import Lights from './entities/Lights'

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
    this.camera = this.webgl.camera

    // Lights
    this.ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    this.pointLight.position.set( 0, 10, 5 );
    this.scene.add( this.ambientLight , this.pointLight );

    // Create flor - Instance Meshs
    this.flor =  new Flor(this.scene , this.camera, this.webgl.scroll, this.webgl.initialCamera)

    // Create 3D Texts
    this.texts = new Texts(this.scene, this.flor)

    // Create lights for peaks
    this.lights = new Lights(this.scene, this.flor)

  }

  update(){
    // console.log('tick')
    this.flor.update()

    this.texts.update()

    this.lights.update()
  }
}
