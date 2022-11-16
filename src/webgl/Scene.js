import WebGlManager from "./webglManager";
import * as THREE from "three";
import fShader from "./shaders/sample.frag?raw";
import vShader from "./shaders/sample.vert?raw";
import texture from "../assets/textures/matcap/Texture_sombre.png";

let sceneInstance;

export default class Scene {
  constructor() {
    // Singleton
    if (sceneInstance) return sceneInstance;
    sceneInstance = this;

    this.webgl = new WebGlManager();
    this.setup();
  }

  setup(){
    this.canvas = this.webgl.canvas
    this.scene = this.webgl.scene
    this.camera = this.webgl.camera

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // Create flor - Instance Meshs
    this.flor =  new Flor(this.scene , this.camera)

    // const light = new THREE.PointLight(0xff0000, 1, 100);
    // light.position.set(50, 50, 50);
    // scene.add(light);
    this.scene.add(this.ambientLight, this.pointLight);

    /**
     * Test cube
     */
    console.log(vShader);
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: vShader,
      fragmentShader: fShader,
      uniforms: {
        uOriginX: 0,
        uOriginY: 0,
      },
    });

    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load(texture);

    const matcapMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 10, 1),
      shaderMaterial
    );
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 10, 1),
      shaderMaterial
    );
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 10, 1),
      shaderMaterial
    );
    const topCube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      matcapMaterial
    );
    const topCube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      matcapMaterial
    );
    const topCube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      matcapMaterial
    );

    console.log(cube);
    topCube.position.y = cube.geometry.parameters.height / 2 + 0.1;
    topCube1.position.y = cube.geometry.parameters.height / 2 + 0.1;
    topCube2.position.y = cube.geometry.parameters.height / 2 + 0.1;
    topCube1.position.x = -1;
    topCube2.position.x = -2;
    topCube1.position.z = -1;
    topCube2.position.z = -2;
    cube1.position.x = -1;
    cube2.position.x = -2;
    cube1.position.z = -1;
    cube2.position.z = -2;

    console.log(topCube.position.y);

    // cube.rotation.x = 0.5;
    // cube.rotation.z = 0.5;
    console.log(cube.position);
    this.scene.add(topCube);
    this.scene.add(topCube1);
    this.scene.add(topCube2);
    this.scene.add(cube);
    this.scene.add(cube1);
    this.scene.add(cube2);
  }

  update() {}
}
