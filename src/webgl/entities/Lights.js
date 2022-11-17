import * as THREE from 'three'

export default class Lights{
  constructor(scene, floor){
    this.scene = scene
    this.floor =  floor


  }

  update(){
    // console.log(this.floor.getPeaksPos(), this.floor.getPeaksColors())
  }
}