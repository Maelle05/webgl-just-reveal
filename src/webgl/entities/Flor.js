import * as THREE from 'three'

export default class Flor {
  constructor(scene){
    this.scene = scene

    this.amount = 15;
    this.size = 0.9;
    this.offset = ( this.amount - 1 ) / 2;
    this.dummy =  new THREE.Object3D();

    
		const count = Math.pow( this.amount, 2 );
    const geometry = new THREE.BoxGeometry( this.size, this.size - (this.size + 0.02), this.size  );
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } );
    this.instMesh = new THREE.InstancedMesh( geometry, material, count );

    this.init()
  }

  init(){
    let i = 0;
    const matrix = new THREE.Matrix4();

    for ( let x = 0; x < this.amount; x ++ ) {
        for ( let z = 0; z < this.amount; z ++ ) {
          matrix.setPosition( this.offset - x, 0, this.offset - z );
          this.instMesh.setMatrixAt( i, matrix );
          i ++;
        }
    }

    this.scene.add( this.instMesh );
  }

  update(){
    if(this.instMesh){
      let i = 0;
      const time = Date.now() * 0.001;

      for ( let x = 0; x < this.amount; x ++ ) {
        for ( let z = 0; z < this.amount; z ++ ) {
          const y = (Math.sin( x / 4 + time ) + Math.sin( z / 4 + time )) * 0.3;
          this.dummy.position.set( this.offset - x, y, this.offset - z );
          this.dummy.updateMatrix();

          this.instMesh.setMatrixAt( i ++, this.dummy.matrix );
        }
      }

      this.instMesh.instanceMatrix.needsUpdate = true;
    }
  }

}