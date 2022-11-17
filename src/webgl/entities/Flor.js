import * as THREE from "three";
import gsap from "gsap";

export default class Flor {
  constructor(scene, camera, scroll, initialCamera) {
    this.scene = scene;
    this.camera = camera;
    this.initialCamera = initialCamera;
    this.scroll = scroll;

    this.amount = 100;
    this.size = 0.9;
    this.offset = (this.amount - 1) / 2;
    this.dummy = new THREE.Object3D();
    this.topDummy = new THREE.Object3D();
    this.color = new THREE.Color();

    const count = Math.pow(this.amount, 2);

    const geometry = new THREE.BoxGeometry(
      this.size,
      this.size * 10,
      this.size
    );
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    this.instMesh = new THREE.InstancedMesh(geometry, material, count);

    const topGeometry = new THREE.BoxGeometry(
      this.size + 0.01,
      0.1,
      this.size + 0.01
    );
    const topMaterial = new THREE.MeshBasicMaterial({
      color: 0xafafaf,
      wireframe: false,
    });
    this.topInstMesh = new THREE.InstancedMesh(topGeometry, topMaterial, count);

    //Gestion de l'anim camera

    if (this.initialCamera) {
      this.cameraCurrent = this.initialCamera.lookAt;
      this.cameraTarget = this.initialCamera.lookAt;
    }

    this.clicked = false;
    this.isAnimated = false;
    this.isClicked = false;
    this.hasBeenClicked = false;
    this.initialPosition = true;

    window.addEventListener("mousedown", () => {
      if (this.clicked === false) {
        this.clicked = true;
      }

      if (this.hasBeenClicked === true && this.initialPosition === false) {
        this.cameraToPeakAnimation.kill();
        this.cameraToInitialPosition = gsap.to(this.camera.position, {
          x: this.initialCamera.position.x,
          y: this.initialCamera.position.y,
          z: this.initialCamera.position.z,
          duration: 3,
          ease: "power1.inOut",
          autoPlay: false,
          onUpdate: () => {
            if (this.cameraToInitialPosition.time() > 2) {
              this.cameraTarget = {
                x: this.initialCamera.lookAt.x,
                y: this.initialCamera.lookAt.y,
                z: this.initialCamera.lookAt.z,
              };
            }

            const x = THREE.MathUtils.lerp(
              this.cameraCurrent.x,
              this.cameraTarget.x,
              0.05
            );
            const y = THREE.MathUtils.lerp(
              this.cameraCurrent.y,
              this.cameraTarget.y,
              0.05
            );
            const z = THREE.MathUtils.lerp(
              this.cameraCurrent.z,
              this.cameraTarget.z,
              0.05
            );

            this.cameraCurrent = { x: x, y: y, z: z };
            this.camera.lookAt(x, y, z);
            this.camera.updateProjectionMatrix();
          },
        });

        this.hasBeenClicked = false;
        this.initialPosition = true;
      }
    });
    window.addEventListener("mouseup", () => {
      this.clicked = false;
      this.isAnimated = false;
    });

    //confinement - recette - sport - streaming - vaccin
    this.peaks = [3443, 3960, 5136, 5662, 6349]
    this.colorsPeaks = [ 'F72585', '7209B7', '3A0CA3', '4361EE', '4CC9F0' ]
    this.lighthouses = [ 3432, 4234, 4352, 4647, 5153, 5445 ]
    this.lighthousesEl = 0
    this.lastLighthousesElId = null
    this.LighthousesPos = []
    this.lastLighthousesID = 0
    this.peakElevation = [0, 0, 0, 0, 0]
    this.peakTargetElevation = [0, 0, 0, 0, 0]
    this.peaksPosForExport = [{x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0},]
    this.mountSize = 4
    this.mountPeaks = []
    this.peaks.forEach(peak => {
      const mountPeak = []
      for (let i = 1; i <= this.mountSize; i++) {
        let circleMountPeak;
        if (mountPeak.length === 0) {
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
      this.mountPeaks.push(mountPeak);
    });

    // raycaster
    this.raycaster = new THREE.Raycaster();
    this.currentIntersectId = null;
    this.mouse = new THREE.Vector2(-1, 1);

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    this.init();
  }

  init() {
    let i = 0;
    let peaksStep = 0;
    const matrix = new THREE.Matrix4();
    const topMatrix = new THREE.Matrix4();

    for ( let x = 0; x < this.amount; x ++ ) {
        for ( let z = 0; z < this.amount; z ++ ) {
          matrix.setPosition( this.offset - x, 0, this.offset - z );
          topMatrix.setPosition( this.offset - x, 4.3, this.offset - z );
          this.instMesh.setMatrixAt( i, matrix );
          this.topInstMesh.setMatrixAt ( i, topMatrix);

          if (this.isPeak(i)) {
            this.instMesh.setColorAt( i, this.color.setHex( 0x363636 ) );
            this.topInstMesh.setColorAt( i, this.color.setHex( '0x' + this.colorsPeaks[peaksStep] ) );
            peaksStep++
          } else if(this.lighthouses.includes(i)){
            this.topInstMesh.setColorAt( i, this.color.setHex( 0xFFBE0B ) );
            this.instMesh.setColorAt( i, this.color.setHex( 0x363636 ) );

            this.LighthousesPos.push({
              x: this.offset - x,
              y: 0,
              z: this.offset - z
            })
          } else {
            this.topInstMesh.setColorAt( i, this.color.setHex( 0xffffff ) );
            this.instMesh.setColorAt( i, this.color.setHex( 0x363636 ) );
          }

          i ++;
        }
    }

    console.log(this.mountPeaks);
    console.log(this.peaks);

    this.scene.add(this.instMesh, this.topInstMesh);
  }

  update() {
    const data = this.scroll.getDataValue();
    if (data) {
      this.peakTargetElevation = [
        data.confinement ? data.confinement * 0.1 : 0,
        data.recipe ? data.recipe * 0.1 : 0,
        data.sport ? data.sport * 0.1 : 0,
        data.streaming ? data.streaming * 0.1 : 0,
        data.vaccine ? data.vaccine * 0.1 : 0,
      ];
      this.peakElevation = [
        THREE.MathUtils.lerp(this.peakElevation[0], this.peakTargetElevation[0], 0.1),
        THREE.MathUtils.lerp(this.peakElevation[1], this.peakTargetElevation[1], 0.1),
        THREE.MathUtils.lerp(this.peakElevation[2], this.peakTargetElevation[2], 0.1),
        THREE.MathUtils.lerp(this.peakElevation[3], this.peakTargetElevation[3], 0.1),
        THREE.MathUtils.lerp(this.peakElevation[4], this.peakTargetElevation[4], 0.1),
      ]
      this.lighthousesEl = data.event.id ? THREE.MathUtils.lerp(this.lighthousesEl, 4, 0.6) : THREE.MathUtils.lerp(this.lighthousesEl, 0, 0.6)
    }

    let peaksStep = 0
    if(this.instMesh){
      let i = 0;
      const time = Date.now() * 0.001;

      if (this.camera) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersects = this.raycaster.intersectObject(this.instMesh);

        if (this.intersects && this.intersects.length >= 1) {
          this.currentIntersectId = this.intersects[0].instanceId;
        } else {
          this.currentIntersectId = null;
        }
      }

      for (let x = 0; x < this.amount; x++) {
        for (let z = 0; z < this.amount; z++) {
          if (i === this.currentIntersectId) {
            this.instMesh.setColorAt(i, new THREE.Color("#ffffff"));
            this.instMesh.instanceColor.needsUpdate = true;
          } else {
            this.instMesh.setColorAt(i, new THREE.Color("#363636"));
            this.instMesh.instanceColor.needsUpdate = true;
          }

          let y = (Math.sin(x / 4 + time) + Math.sin(z / 4 + time)) * 0.2;

          if (this.isPeak(i)) {
            y += this.peakElevation[peaksStep];

            this.peaksPosForExport[peaksStep].x = this.offset - x;
            this.peaksPosForExport[peaksStep].y = y;
            this.peaksPosForExport[peaksStep].z = this.offset - z;


            peaksStep++;

            //Camera Animation with raycasting on peaks
            if (this.currentIntersectId === i && this.clicked === true) {
              this.currentPeakPosition = this.getPeaksPos()[peaksStep - 1]
              if (
                this.isAnimated === false &&
                this.hasBeenClicked === false
              ) {
                if (this.cameraToInitialPosition) this.cameraToInitialPosition.kill();
                this.cameraToPeakAnimation = gsap.to(this.camera.position, {
                  x: this.currentPeakPosition.x,
                  y: this.currentPeakPosition.y + 5,
                  z: this.currentPeakPosition.z + 15,
                  duration: 3,
                  ease: "power1.inOut",
                  onUpdate: () => {
                    this.cameraTarget = {
                      x: this.currentPeakPosition.x,
                      y: this.currentPeakPosition.y + 5,
                      z: this.currentPeakPosition.z,
                    };
                    const x = THREE.MathUtils.lerp(
                      this.cameraCurrent.x,
                      this.cameraTarget.x,
                      0.1
                    );
                    const y = THREE.MathUtils.lerp(
                      this.cameraCurrent.y,
                      this.cameraTarget.y,
                      0.1
                    );
                    const z = THREE.MathUtils.lerp(
                      this.cameraCurrent.z,
                      this.cameraTarget.z,
                      0.1
                    );

                    this.cameraCurrent = { x: x, y: y, z: z };
                    this.camera.lookAt(x, y, z);
                    this.camera.updateProjectionMatrix();
                  }
                });
              }
              this.initialPosition = false;
              this.hasBeenClicked = true;
              this.isAnimated = true;
            }
          }

          if(data && data.event){
            if(this.lighthouses.includes(i) && data.event.id && data.event.content){
              if(this.lighthouses[data.event.id] === i){
                y += this.lighthousesEl
                this.lastLighthousesElId = i
                this.lastlighthousesEl = 4
                this.lastLighthousesID = data.event.id

                this.LighthousesPos[data.event.id].y = y
              }
            } else if(i === this.lastLighthousesElId){
              this.lastlighthousesEl = THREE.MathUtils.lerp(this.lastlighthousesEl, 0, 0.6)
              y += this.lastlighthousesEl
              this.LighthousesPos[this.lastLighthousesID].y = y
            }
          }

          for (let m = 0; m < this.mountPeaks.length; m++) {
            for (let r = 0; r < this.mountPeaks[m].length; r++) {
              if (this.mountPeaks[m][r].includes(i)) {
                y += this.peakElevation[m] * (0.6 / (r + 1));

                this.topInstMesh.setColorAt(
                  i,
                  this.color.setHex(
                    this.getColorDegrade(this.colorsPeaks[m], r)
                  )
                );

                //Anim camera onclick
                if (this.currentIntersectId === i && this.clicked === true) {
                  if (
                    this.isAnimated === false &&
                    this.hasBeenClicked === false
                  ) {
                    if (this.cameraToInitialPosition) this.cameraToInitialPosition.kill();
                    this.cameraToPeakAnimation = gsap.to(this.camera.position, {
                      x: this.getPeaksPos()[m].x,
                      y: this.getPeaksPos()[m].y + 5,
                      z: this.getPeaksPos()[m].z + 15,
                      duration: 3,
                      ease: "power1.inOut",
                      onUpdate: () => {
                        this.cameraTarget = {
                          x: this.getPeaksPos()[m].x,
                          y: this.getPeaksPos()[m].y + 5,
                          z: this.getPeaksPos()[m].z,
                        };
                        const x = THREE.MathUtils.lerp(
                          this.cameraCurrent.x,
                          this.cameraTarget.x,
                          0.05
                        );
                        const y = THREE.MathUtils.lerp(
                          this.cameraCurrent.y,
                          this.cameraTarget.y,
                          0.05
                        );
                        const z = THREE.MathUtils.lerp(
                          this.cameraCurrent.z,
                          this.cameraTarget.z,
                          0.05
                        );

                        this.cameraCurrent = { x: x, y: y, z: z };
                        this.camera.lookAt(x, y, z);
                        this.camera.updateProjectionMatrix();
                      }
                    });
                  }
                  this.initialPosition = false;
                  this.hasBeenClicked = true;
                  this.isAnimated = true;
                }
              }
            }
          }

          this.dummy.position.set(this.offset - x, y, this.offset - z);
          this.dummy.updateMatrix();

          this.topDummy.position.set(this.offset - x, y + 4.3, this.offset - z);
          this.topDummy.updateMatrix();

          this.topInstMesh.setMatrixAt(i, this.topDummy.matrix);
          this.instMesh.setMatrixAt(i++, this.dummy.matrix);
        }
      }

      this.instMesh.instanceMatrix.needsUpdate = true;
      this.topInstMesh.instanceMatrix.needsUpdate = true;

      peaksStep = 0;
    }
  }

  isPeak(i) {
    if (
      i === this.peaks[0] ||
      i === this.peaks[1] ||
      i === this.peaks[2] ||
      i === this.peaks[3] ||
      i === this.peaks[4]
    ) {
      return true;
    } else {
      return false;
    }
  }

  getColorDegrade(color, idMount) {
    let red = parseInt(color.substring(0, 2), 16);
    let green = parseInt(color.substring(2, 4), 16);
    let blue = parseInt(color.substring(4), 16);

    const deltaR = 255 - red;
    const deltaG = 255 - green;
    const deltaB = 255 - blue;

    red += (deltaR / this.mountSize) * (idMount * 0.7);
    red = Math.min(red, 255);
    red = Math.floor(red).toString(16);
    green += (deltaG / this.mountSize) * (idMount * 0.7);
    green = Math.min(green, 255);
    green = Math.floor(green).toString(16);
    blue += (deltaB / this.mountSize) * (idMount * 0.7);
    blue = Math.min(blue, 255);
    blue = Math.floor(blue).toString(16);

    return "0x" + red + green + blue;
  }

  getPeaksPos() {
    return this.peaksPosForExport;
  }

  getPeaksColors(){
    return this.colorsPeaks
  }

  getLighthousesPos(){
    return this.LighthousesPos
  }

  getLighthousesID(){
    const data = this.scroll.getDataValue()
    if( data && data.event){
      return data.event.id
    }

    return this.lastLighthousesID
  }
}
