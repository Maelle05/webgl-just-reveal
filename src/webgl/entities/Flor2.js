import * as THREE from "three";
import matcap from "../../assets/textures/matcap/Texture_gris_mat.png";
import fragShader from "../shaders/sample.frag?raw";
import vertShader from "../shaders/sample.vert?raw";

export default class Flor2 {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.amount = 100;
    this.size = 0.9;
    this.offset = (this.amount - 1) / 2;
    this.dummy = new THREE.Object3D();
    this.topDummy = new THREE.Object3D();
    this.color = new THREE.Color();

    const count = Math.pow(this.amount, 2);

    const geometry = new THREE.BoxGeometry(this.size, this.size * 6, this.size);

    this.normalMaterial = new THREE.MeshNormalMaterial();

    
    const material1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    const material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
      uniforms: {
        uOriginX: 15,
        uOriginY: 5
      }
    });

    this.instMesh = new THREE.InstancedMesh(
      geometry,
      material,
      count
    );

    console.log(this.instMesh)

    const topGeometry = new THREE.BoxGeometry(
      this.size + 0.01,
      0.1,
      this.size + 0.01
    );
    const topMaterial = new THREE.MeshBasicMaterial({
      color: 0xafafaf,
      wireframe: false,
    });


    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load(matcap);
    const topMatcapMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    this.topInstMesh = new THREE.InstancedMesh(
      topGeometry,
      topMatcapMaterial,
      count
    );

    this.peaks = [3550, 4465, 4840, 5250, 6350];
    this.colorsPeaks = [0xf72585, 0x7209b7, 0x3a0ca3, 0x4361ee, 0x4cc9f0];
    this.lighthouses = 5470;
    this.peakElevation = 5;
    this.mountSize = 4;
    this.mountPeaks = [];
    this.peaks.forEach((peak) => {
      const mountPeak = [];
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
          circleMountPeak = [];

          for (let m = 0; m < mountPeak[mountPeak.length - 1].length; m++) {
            const upID = mountPeak[mountPeak.length - 1][m];

            const haut = upID - 1;
            const droite = upID + this.amount;
            const bas = upID + 1;
            const gauche = upID - this.amount;

            if (
              !this.peaks.includes(haut) &&
              !mountPeak[mountPeak.length - 1].includes(haut)
            )
              circleMountPeak.push(haut);
            if (
              !this.peaks.includes(droite) &&
              !mountPeak[mountPeak.length - 1].includes(droite)
            )
              circleMountPeak.push(droite);
            if (
              !this.peaks.includes(bas) &&
              !mountPeak[mountPeak.length - 1].includes(bas)
            )
              circleMountPeak.push(bas);
            if (
              !this.peaks.includes(gauche) &&
              !mountPeak[mountPeak.length - 1].includes(gauche)
            )
              circleMountPeak.push(gauche);
          }
        }

        mountPeak.push(circleMountPeak);
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

    for (let x = 0; x < this.amount; x++) {
      for (let z = 0; z < this.amount; z++) {
        matrix.setPosition(this.offset - x, 0, this.offset - z);
        topMatrix.setPosition(this.offset - x, 3.5, this.offset - z);
        this.instMesh.setMatrixAt(i, matrix);
        this.topInstMesh.setMatrixAt(i, topMatrix);

        if (this.isPeak(i)) {
          // this.instMesh.setColorAt(i, this.color.setHex(0x363636));
          console.log(this.instMesh)
          this.topInstMesh.setColorAt(i, this.color.setHex(0x202020));
          peaksStep++;
        } else {
          this.topInstMesh.setColorAt(i, this.color.setHex(0xffffff));
          // this.instMesh.setColorAt(i, this.color.setHex(0x363636));
        }

        i++;
      }
    }

    this.scene.add(this.instMesh, this.topInstMesh);
  }

  update() {
    if (this.instMesh) {
      let i = 0;
      const time = Date.now() * 0.001;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.intersects = this.raycaster.intersectObject(this.instMesh);

      if (this.intersects && this.intersects.length >= 1) {
        this.currentIntersectId = this.intersects[0].instanceId;
      } else {
        this.currentIntersectId = null;
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
            y += this.peakElevation;
          }

          if (i === this.lighthouses) {
            y += this.peakElevation;
          }

          for (let m = 0; m < this.mountPeaks.length; m++) {
            for (let r = 0; r < this.mountPeaks[m].length; r++) {
              if (this.mountPeaks[m][r].includes(i)) {
                y += this.peakElevation * (0.6 / (r + 1));
                this.topInstMesh.setColorAt(i, this.color.setHex(0x202020));
              }
            }
          }

          this.dummy.position.set(this.offset - x, y, this.offset - z);
          this.dummy.updateMatrix();

          this.topDummy.position.set(
            this.offset - x,
            y + 2.75,
            this.offset - z
          );
          this.topDummy.updateMatrix();

          this.topInstMesh.setMatrixAt(i, this.topDummy.matrix);
          this.instMesh.setMatrixAt(i++, this.dummy.matrix);
        }
      }

      this.instMesh.instanceMatrix.needsUpdate = true;
      this.topInstMesh.instanceMatrix.needsUpdate = true;
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
}
