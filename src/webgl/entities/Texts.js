import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export default class Texts {
  constructor(scene, floor){
    this.scene = scene
    this.floor = floor

    const textData = [
      {
        name: 'Confinement',
        desc: 'balabalhab'
      },
      {
        name: 'Recettes',
        desc: 'balabalhab'
      },
      {
        name: 'Sport',
        desc: 'balabalhab'
      },
      {
        name: 'Streaming',
        desc: 'balabalhab'
      },
      {
        name: 'Vaccin',
        desc: 'balabalhab'
      },
    ]
  
    this.myTexts = []

    const loader = new FontLoader();

    loader.load( 'webgl/fonts/Space_Grotesk_Regular.json', ( font ) => {
      const color = 0xffffff;

      const matDark = new THREE.LineBasicMaterial( {
        color: color,
        side: THREE.DoubleSide
      } );

      textData.forEach(text => {
        const message = text.name

        const shapes = font.generateShapes( message, 0.5 );
        const geometry = new THREE.ShapeGeometry( shapes );
        geometry.computeBoundingBox();
        const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 0, 0 );

        const mytext = new THREE.Mesh( geometry, matDark );

        this.myTexts.push(mytext)

        this.scene.add(mytext)
      });
      
      this.init()
    })
  }

  init(){

  }

  update(){
    // console.log(this.floor.getPeaksPos())
    if(this.myTexts.length > 4){
      const peaksPos = this.floor.getPeaksPos()
      this.myTexts.forEach((myText, index) => {
        myText.position.x = peaksPos[index].x
        myText.position.y = peaksPos[index].y + 4.7
        myText.position.z = peaksPos[index].z
      })
    }
    
  }
}