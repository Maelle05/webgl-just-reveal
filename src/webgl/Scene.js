import WebGlManager from "./webglManager";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import Flor from "../webgl/entities/Flor";
import Flor1 from "../webgl/entities/Flor1";
import Flor2 from "../webgl/entities/Flor2";
import Flor3 from "../webgl/entities/Flor3";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

let sceneInstance;

export default class Scene {
  constructor() {
    // Singleton
    if (sceneInstance) return sceneInstance;
    sceneInstance = this;

    this.webgl = new WebGlManager();
    this.setup();
  }

  setup() {
    this.canvas = this.webgl.canvas;
    this.scene = this.webgl.scene;
    this.camera = this.webgl.camera;
    this.renderer = this.webgl.renderer;
    this.sizes = this.webgl.sizes;

    // Lights
    this.ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.pointLight = new THREE.PointLight(0xffffff, 1, 50);
    this.pointLight.position.set(5, 50, 5);
    this.scene.add(this.ambientLight, this.pointLight);

    // Create flor - Instance Meshs
    this.flor = new Flor(this.scene, this.camera);

    //Create bloom
    this.effectComposer = new EffectComposer(this.renderer);
    this.effectComposer.setSize(this.sizes.width, this.sizes.height);
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer.addPass(renderPass);

    const unrealBloomPass = new UnrealBloomPass();
    unrealBloomPass.strength = .8;
    unrealBloomPass.radius = .8;
    unrealBloomPass.threshold = .5;

    this.effectComposer.addPass(unrealBloomPass);
  }

  update() {
    // console.log('tick')
    this.flor.update();
    this.effectComposer.render();
  }
}
