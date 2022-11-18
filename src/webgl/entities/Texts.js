import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export default class Texts {
  constructor(scene, floor){
    this.scene = scene
    this.floor = floor

    const textData = [
      {
        name: 'Confinement',
        desc: 'Pendant ces années covid, \nles confinements ont rythmés les \nquotidiens des français'
      },
      {
        name: 'Recettes',
        desc: 'Au cours des années covid, \nla cuisine est devenu un passe-temps \ntrès apprécié chez les français'
      },
      {
        name: 'Sport',
        desc: 'Confinés chez eux, \nbeaucoup de français se sont \nmis au sport pendant le confinement'
      },
      {
        name: 'Streaming',
        desc: 'Malgré la fermeture des cinéma, \nl\'audiovisuel a vu exploser \nla demande sur les plateformes \nde streaming'
      },
      {
        name: 'Vaccin',
        desc: 'Très débattu dans l\'actualité, \nles recherches sur le vaccin sont \napparu lors du 2ème confinement'
      },
    ]
  
    this.myTexts = []

    const lighthouseData = [
      {
        name: "Pourquoi ?",
        desc: "\"Pourquoi les tronçonneuses ont été inventées\" \nfait partie des recherches les plus tapées \nsur google en 2021"
      },
      {
        name: "Coiffure",
        desc: "La catégorie coiffure fait \npartie des termes les \nplus recherchés sur \ngoogle en 2020"
      },
      {
        name: "103",
        desc: "103 \nc'est le nombre de \njours de confinement \nen 2020"
      },
      {
        name: "Chasse", 
        desc: "Dérogation pour les \nchasseurs pendant le \ndeuxième confinement"
      },
      {
        name: "Rave party",
        desc: "Rave party à Pont Réan \npour fêter le nouvel an"
      },
      {
        name: "Dauphins",
        desc: "Des dauphins sont \napparus dans le port \nde Cagliari profitant \ndu calme du confinement"
      }
    ]

    this.myLighthouseTexts = []

    const loader = new FontLoader();

    loader.load( 'webgl/fonts/Space_Grotesk_Regular.json', ( font ) => {
      const color = 0xffffff;

      textData.forEach(text => {
        const group = this.createText(text, color, font)
        this.myTexts.push(group)
        this.scene.add(group)
      });

      lighthouseData.forEach(text => {
        const group = this.createText(text, color, font)
        this.myLighthouseTexts.push(group)
        this.scene.add(group)
      })

      
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

        if(peaksPos[index].y < 0.35){
          myText.children[0].material.opacity = THREE.MathUtils.lerp( myText.children[0].material.opacity , 0, 0.2)
          myText.children[2].material.opacity = THREE.MathUtils.lerp( myText.children[2].material.opacity , 0, 0.2)
        } else {
          myText.children[0].material.opacity = THREE.MathUtils.lerp( myText.children[0].material.opacity , 1, 0.2)
          myText.children[2].material.opacity = THREE.MathUtils.lerp( myText.children[2].material.opacity , 1, 0.2)

          if(this.floor.hasBeenClicked && this.floor.currentIdClicked === index && !this.floor.clickedIsLighthouse){
            myText.children[1].material.opacity = THREE.MathUtils.lerp( myText.children[1].material.opacity , 1, 0.2)
          } else {
            myText.children[1].material.opacity = THREE.MathUtils.lerp( myText.children[1].material.opacity , 0, 0.2)
          }
        }
      })
    }

    if(this.myLighthouseTexts.length > 4){
      const lighthousePos = this.floor.getLighthousesPos()

      this.myLighthouseTexts.forEach((myText, index)=>{
        myText.position.x = lighthousePos[index].x
        myText.position.y = lighthousePos[index].y + 4.6
        myText.position.z = lighthousePos[index].z

        if((!this.floor.isLighthouseRayc() && !this.floor.hasBeenClicked && !this.floor.clickedIsLighthouse ) || lighthousePos[index].y < 0.5 || (this.floor.hasBeenClicked && !this.floor.clickedIsLighthouse)){
          myText.children[0].material.opacity = THREE.MathUtils.lerp( myText.children[0].material.opacity , 0, 0.1)
          myText.children[1].material.opacity = THREE.MathUtils.lerp( myText.children[1].material.opacity , 0, 0.1)
          myText.children[2].material.opacity = THREE.MathUtils.lerp( myText.children[2].material.opacity , 0, 0.1)
        } else {
          myText.children[0].material.opacity = THREE.MathUtils.lerp( myText.children[0].material.opacity , 1, 0.1)
          myText.children[1].material.opacity = THREE.MathUtils.lerp( myText.children[1].material.opacity , 1, 0.1)
          myText.children[2].material.opacity = THREE.MathUtils.lerp( myText.children[2].material.opacity , 1, 0.1)
        }
      })
    }
  }

  createText(text, color, font){
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
    mytextdesc.position.x = geometry.boundingBox.max.x + 2
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

    return group
  }
}