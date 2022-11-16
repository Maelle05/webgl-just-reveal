import * as THREE from 'three'

export default class Flor {
  constructor(scene){
    this.scene = scene

    this.amount = 100;
    this.size = 0.9;
    this.offset = ( this.amount - 1 ) / 2;
    this.dummy =  new THREE.Object3D();
    this.color = new THREE.Color()
    
		const count = Math.pow( this.amount, 2 );
    const geometry = new THREE.BoxGeometry( this.size, this.size * 6, this.size  );
    // const geometry = new THREE.BoxGeometry( this.size, this.size - (this.size + 0.02), this.size  );
    const material = new THREE.MeshPhysicalMaterial( { color: 0xffffff, wireframe: false } );
    this.instMesh = new THREE.InstancedMesh( geometry, material, count );


    this.peaks = [3550, 4465, 4840, 5250, 6350]
    this.peakElevation = 3
    this.mountSize = 4
    this.mountPeaks = []
    this.peaks.forEach(peak => {
      const mountPeak = []
      for (let i = 1; i <= this.mountSize; i++) {
        let circleMountPeak
        if(mountPeak.length === 0){
          circleMountPeak = [
            peak - i,
            peak + this.amount * i,
            peak + i,
            peak - this.amount * i,
          ];
        } else {
          circleMountPeak = []

          for (let m = 0;  m < mountPeak[mountPeak.length-1].length; m++) {
            const upID = mountPeak[mountPeak.length-1][m]
            
            const haut = upID - 1
            const droite = upID + this.amount
            const bas = upID + 1
            const gauche = upID - this.amount

            if(!this.peaks.includes(haut) && !mountPeak[mountPeak.length-1].includes(haut)) circleMountPeak.push(haut)
            if(!this.peaks.includes(droite) && !mountPeak[mountPeak.length-1].includes(droite)) circleMountPeak.push(droite)
            if(!this.peaks.includes(bas) && !mountPeak[mountPeak.length-1].includes(bas)) circleMountPeak.push(bas)
            if(!this.peaks.includes(gauche) && !mountPeak[mountPeak.length-1].includes(gauche)) circleMountPeak.push(gauche)
          }
        }
        
        mountPeak.push(circleMountPeak)
      }
      this.mountPeaks.push(mountPeak)
    });

    this.init()
  }

  init(){
    let i = 0;
    const matrix = new THREE.Matrix4();

    for ( let x = 0; x < this.amount; x ++ ) {
        for ( let z = 0; z < this.amount; z ++ ) {
          matrix.setPosition( this.offset - x, 0, this.offset - z );
          this.instMesh.setMatrixAt( i, matrix );
          
          if (this.isPeak(i)) {
            this.instMesh.setColorAt( i, this.color.setHex( Math.random() * 0xffffff ) );
          } else {
            this.instMesh.setColorAt( i, this.color.setHex( 0x363636 ) );
          }
          
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
          let y = (Math.sin( x / 4 + time ) + Math.sin( z / 4 + time )) * 0.2;

          if (this.isPeak(i)) {
            y += this.peakElevation;
          }
          
          for (let m = 0; m < this.mountPeaks.length; m++) {
            for (let r = 0; r < this.mountPeaks[m].length; r++) {
              if(this.mountPeaks[m][r].includes(i)){
                y += this.peakElevation*(0.6/(r+1));
              }
            }
          }
          
          
          this.dummy.position.set( this.offset - x, y, this.offset - z );
          this.dummy.updateMatrix();

          this.instMesh.setMatrixAt( i ++, this.dummy.matrix );
        }
      }

      this.instMesh.instanceMatrix.needsUpdate = true;
    }
  }

  isPeak(i){
    if (i === this.peaks[0] || i === this.peaks[1] || i === this.peaks[2] || i === this.peaks[3] || i === this.peaks[4]) {
      return true
    } else {
      return false
    }
  }
}