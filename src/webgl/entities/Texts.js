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

      textData.forEach(text => {

        const matDark = new THREE.LineBasicMaterial( {
          color: color,
          side: THREE.DoubleSide,
          transparent: true
        });
  
        const matDarkDesc = new THREE.LineBasicMaterial( {
          color: color,
          side: THREE.DoubleSide,
          transparent: true
        });

        let shapes = font.generateShapes( text.name, 0.5 );
        let geometry = new THREE.ShapeGeometry( shapes );
        geometry.computeBoundingBox();
        let xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 0, 0 );

        const mytextname = new THREE.Mesh( geometry, matDark );
        mytextname.position.x = geometry.boundingBox.max.x + 1
        mytextname.position.y = 0.5
        mytextname.material.opacity = 0


        shapes = font.generateShapes( text.desc, 0.3 );
        geometry = new THREE.ShapeGeometry( shapes );
        geometry.computeBoundingBox();
        xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 0, 0 );

        const mytextdesc = new THREE.Mesh( geometry, matDarkDesc );
        mytextdesc.position.x = 3.5
        mytextdesc.position.y = -0.3
        mytextdesc.material.opacity = 0

        const lineGeometry = new THREE.PlaneGeometry(1.2,0.07,1,1)
        const lineMaterial = new THREE.MeshBasicMaterial({
          color: color,
          side: 2,
          transparent: true
        })
        const line = new THREE.Mesh(lineGeometry, lineMaterial)
        line.position.x = 1
        line.position.y = 0.2
        line.material.opacity = 0


        const group = new THREE.Group()
        group.add(mytextname, mytextdesc, line)

        this.myTexts.push(group)

        this.scene.add(group)
      });
      
      this.init()
    })
  }

  init(){

  }

  update(){
    if(this.myTexts.length > 4){
      const peaksPos = this.floor.getPeaksPos()
      this.myTexts.forEach((myText, index) => {
        myText.position.x = peaksPos[index].x
        myText.position.y = peaksPos[index].y + 4.6
        myText.position.z = peaksPos[index].z

        // if(index === 2){
        //   myText.children[1].material.opacity = 1
        // }
        if(peaksPos[index].y < 0.25){
          myText.children[0].material.opacity = THREE.MathUtils.lerp( myText.children[0].material.opacity , 0, 0.2)
          myText.children[2].material.opacity = THREE.MathUtils.lerp( myText.children[2].material.opacity , 0, 0.2)
        } else {
          myText.children[0].material.opacity = THREE.MathUtils.lerp( myText.children[0].material.opacity , 1, 0.2)
          myText.children[2].material.opacity = THREE.MathUtils.lerp( myText.children[2].material.opacity , 1, 0.2)
        }
      })
    }
    
  }
}