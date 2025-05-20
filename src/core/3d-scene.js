"use strict";
/* global $, dat */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

import { SAOPass } from "three/addons/postprocessing/SAOPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

import Stats from "three/addons/libs/stats.module.js";

// import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
//import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
//import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
//import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
//import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
//import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
//import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const TEST_MODE = false;
const DEV_GUI_MODE = false;
const DEV_USE_STATS = false;
let startPosition = new THREE.Vector3(-3.821, 0.246, 6.608);
//var gtaoPass;
// const LOADER = document.getElementById('js-loader');

const correctionFloor = 0;
let floor;
let floorMaterial;

export let scene;
export let sceneWatarmark;
export let renderer;
export let canvas;
export let camera;
export let controls;
export let envMap;
export let composer;
export let renderScale = 0.8;
export let renderAntialias = true;

var renderPass;

export var outputPass;
export var bloomPass;
export var fxaaPass;
export var saoPass;

let stats;

export var params_Bloom = {
  threshold: 1,
  strength: 1,
  radius: 1,
  exposure: 1,
};

export const IMPORTED_MODELS = [];
export const IMPORTED_MODELS_GLTF = [];
export let isModelsLoaded = false;

const scenePropertiesDefault = {
  BACKGROUND_COLOR: 0xffffff,
  MODEL_PATHS: ["./src/models/empty_scene.glb"],
  ENVIRONMENT_MAP: "",
  ENVIRONMENT_MAP_INTENSITY: 0.8,
  SHADOW_TRANSPARENCY: 0.0,
  MODEL_CENTER_POSITION: 0,
};

export function updateBloomSettings(
  threshold = null,
  strength = null,
  radius = null
) {
  if (bloomPass == null) {
    return;
  }

  if (threshold != null) {
    params_Bloom.threshold = threshold;
  }
  if (strength != null) {
    params_Bloom.strength = strength;
  }
  if (radius != null) {
    params_Bloom.radius = radius;
  }

  bloomPass.threshold = params_Bloom.threshold;
  bloomPass.strength = params_Bloom.strength;
  bloomPass.radius = params_Bloom.radius;
}

import { TONE_MAPPING_EXPOSURE } from "./settings.js";
import { initRaycast } from "./raycast.js";
import { currentOS, hotspots, updateHotspots } from "./3d-configurator.js";

export let dirLight;
// let pointLight, pointLight2;
export let pointLightIntensity, dirLightIntencity;

export function Get3DScene() {
  return scene;
}

export function updateRenderSize() {
  if (renderer == null) {
    return;
  }

  const canvasContainer = document.getElementById("ar_model_viewer");
  const rect = canvasContainer.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  renderer.setSize(width, height, false);
  if (
    composer != undefined &&
    composer != null &&
    scene != null &&
    camera != null
  ) {
    composer.setSize(width, height);
  }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.update();

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

// eslint-disable-next-line no-unused-vars
export function updateEnvMap(
  path,
  intensity,
  onlyMap = false,
  updateSceneBackground = false
) {
  if (path == null) {
    return;
  }

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(path, function (texture) {
    envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    if (updateSceneBackground) {
      scene.background = envMap;
    }

    /*
    if(IMPORTED_MODELS != null || IMPORTED_MODELS.length > 0){
      for (let index = 0; index < IMPORTED_MODELS.length; index++) {
        const model = IMPORTED_MODELS[index];
        
        model.traverse((o) => {
          if (o.isMesh) {
            if (o.material.envMap) {
              o.material.envMap = onlyMap == true ? null : scene.environment;
              o.material.envMapIntensity = onlyMap == true ? 1 : intensity;
            }
          }
        });
      }
    }
    */
    texture.dispose();
    pmremGenerator.dispose();
  });
}

export function create3DScene(
  properties = scenePropertiesDefault,
  loadFunction
) {
  if (!properties) {
    properties = scenePropertiesDefault;
  }

  const {
    MODEL_PATHS,
    BACKGROUND_COLOR,
    ENVIRONMENT_MAP,
    SHADOW_TRANSPARENCY,
    ENVIRONMENT_MAP_INTENSITY,
    MODEL_CENTER_POSITION,
  } = properties;

  // ********************************************
  //      Init SCENE, canvas, RENDERER
  // ********************************************
  scene = new THREE.Scene();

  scene.background = new THREE.Color(BACKGROUND_COLOR);
  //scene.background = null;
  canvas = document.getElementById("ar_model_view");

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: renderAntialias,
    preserveDrawingBuffer: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setPixelRatio(
    (window.devicePixelRatio ? window.devicePixelRatio : 1) * renderScale
  );
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = TONE_MAPPING_EXPOSURE;
  // renderer.outputEncoding = THREE.sRGBEncoding;

  if (ENVIRONMENT_MAP != "") {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(ENVIRONMENT_MAP, function (texture) {
      envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });
  }

  // ********************************************
  //              IMPORT MODELS
  // ********************************************
  async function importAllModels(array, callback) {
    const loader = new GLTFLoader();

    for (const element of array) {
      const model = await loader.loadAsync(element);
      IMPORTED_MODELS_GLTF.push(model);
      onLoadModel(model);
    }

    if (callback != null) {
      callback();
    }
  }

  function onLoadModel(gltf) {
    const model = gltf.scene;

    model.traverse((o) => {
      o.layers.enable(1);
      if (o.isMesh) {
        o.visible = false;
        o.castShadow = true;
        o.receiveShadow = true;
        if (o.material.map) {
          o.material.map.anisotropy = 16;
          o.material.map.needsUpdate = true;
          o.material.needsUpdate = true;
        }

        // if (ENVIRONMENT_MAP != '') {
        //   if (!o.material.envMap) {
        //     o.material.envMap = scene.environment;
        //     o.material.envMapIntensity = ENVIRONMENT_MAP_INTENSITY;
        //   }
        // }
      }
    });

    const scale = 1;
    model.scale.set(scale, scale, scale);
    model.position.y = MODEL_CENTER_POSITION;
    IMPORTED_MODELS.push(model);
  }

  function onImportModelSuccessful() {
    for (let i = 0; i < IMPORTED_MODELS.length; i++) {
      IMPORTED_MODELS[i].visible = false;
      scene.add(IMPORTED_MODELS[i]);
    }
    // LOADER.classList.add('invisible');
    // $('.summary.entry-summary').removeClass('hidden');
    isModelsLoaded = true;

    //const box = new THREE.Box3().setFromObject( scene );
    //if(gtaoPass != null){
    //  gtaoPass.setSceneClipBox( box );
    //}

    // initDatGui(
    //   SHADOW_TRANSPARENCY,
    //   TONE_MAPPING_EXPOSURE,
    //   IMPORTED_MODELS[0],
    // );

    loadFunction();
  }

  importAllModels(MODEL_PATHS, onImportModelSuccessful);

  // ********************************************
  //                   LIGHTS
  // ********************************************
  if (ENVIRONMENT_MAP == "") {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1.2);
    hemiLight.position.set(0, 0, 0);
    scene.add(hemiLight);
  }
  //const cameraSize = 18;
  const cameraSize = 18;
  // pointLightIntensity = 3;

  // pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, 20);
  // pointLight.position.set(0, -2, 0);
  // scene.add(pointLight);
  // pointLight2 = new THREE.PointLight(0xffffff, pointLightIntensity, 20);
  // pointLight2.position.set(2, 0.1, 0);
  // scene.add(pointLight2);

  dirLightIntencity = 1.3;
  dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntencity);
  dirLight.position.set(0, 8, 0.000001);
  dirLight.castShadow = true;
  dirLight.shadow.bias = -0.0005;
  dirLight.shadow.radius = 4;
  dirLight.shadow.camera.left = -cameraSize;
  dirLight.shadow.camera.right = cameraSize;
  dirLight.shadow.camera.top = cameraSize;
  dirLight.shadow.camera.bottom = -cameraSize;
  dirLight.shadow.camera.near = 0.125;
  dirLight.shadow.camera.far = 9;

  switch (currentOS) {
    case "Android":
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      // dirLight.shadow.radius = 2;
      dirLight.shadow.blurSamples = 10;
      break;
    case "iOS":
      dirLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
      // dirLight.shadow.radius = 2;
      dirLight.shadow.blurSamples = 10;
      break;
    case "Windows":
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      // dirLight.shadow.radius = 2;
      dirLight.shadow.blurSamples = 10;
      break;
    case "Macintosh":
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      // dirLight.shadow.radius = 2;
      dirLight.shadow.blurSamples = 10;
      break;
    default:
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      // dirLight.shadow.radius = 2;
      dirLight.shadow.blurSamples = 10;
      break;
  }

  scene.add(dirLight);

  // **** RectAreaLights *******

  RectAreaLightUniformsLib.init();

  // const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 6.03, 3.9 );
  // rectLight1.position.set( 0, 1.35, 0 );
  // rectLight1.lookAt( 0, 10, 0 );
  // scene.add( rectLight1 );
  // scene.add( new RectAreaLightHelper( rectLight1 ) );

  // **** HELPERS *******

  if (TEST_MODE) {
    const helperDir = new THREE.DirectionalLightHelper(dirLight, 2, 0xff0000);
    scene.add(helperDir);
  }

  if (TEST_MODE) {
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
  }

  // ********************************************
  //                  FLOOR
  // ********************************************
  const floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  floorMaterial = new THREE.ShadowMaterial();
  floorMaterial.opacity = SHADOW_TRANSPARENCY;

  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  floor.position.y = MODEL_CENTER_POSITION + correctionFloor;

  scene.add(floor);

  // ********************************************
  //                 CONTROLS
  // ********************************************
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2; // 2.29
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.dampingFactor = 0.2; // 0.1
  controls.autoRotateSpeed = -0.5;
  controls.maxDistance = 40;
  controls.minDistance = 1;
  controls.autoRotate = false;
  controls.enableZoom = true;

  startPosition && camera.position.copy(startPosition);
  controls.target.set(0, 0, 0);

  if (TEST_MODE) {
    controls.enablePan = true;
    controls.minDistance = 0.01;
  }

  controls.addEventListener("end", () => {
    controls.autoRotate = false;

    if (TEST_MODE) {
      consoleLogPosition("camera", camera.position, 3);
      consoleLogPosition("target", controls.target, 3);
    }
  });

  composer = new EffectComposer(renderer);

  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = params_Bloom.threshold;
  bloomPass.strength = params_Bloom.strength;
  bloomPass.radius = params_Bloom.radius;

  saoPass = new SAOPass(scene, camera, false, true);
  saoPass.params.output = SAOPass.OUTPUT.Default;
  saoPass.params.saoBias = 0.5;
  saoPass.params.saoIntensity = 0.37;
  saoPass.params.saoScale = 150.0;
  saoPass.params.saoKernelRadius = 10;
  saoPass.params.saoMinResolution = 0;
  saoPass.params.saoBlur = true;
  saoPass.params.saoBlurRadius = 8;
  saoPass.params.saoBlurStdDev = 4;
  saoPass.params.saoBlurDepthCutoff = 0.01;
  saoPass.enabled = true;
  outputPass = new OutputPass();

  fxaaPass = new ShaderPass(FXAAShader);

  composer.addPass(bloomPass);
  composer.addPass(saoPass);
  composer.addPass(outputPass);
  composer.addPass(fxaaPass);

  if (DEV_USE_STATS) {
    stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.domElement.style.cssText = "";
    stats.domElement.setAttribute("class", "statsClass");
  }

  // ********************************************
  //      ANIMATE
  // ********************************************
  let lastTime = 0;
  const fps = 30;
  const interval = 1000 / fps;

  function animate(time) {
    requestAnimationFrame(animate);

    const delta = time - lastTime;
    if (delta < interval) return;
    lastTime = time;

    if (controls.enabled) {
      controls.update();
    }

    //CUSTOM
    updateHotspots(hotspots);

    renderer.render(scene, camera);

    if (
      composer != undefined &&
      composer != null &&
      scene != null &&
      camera != null
    ) {
      composer.render();
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    if (DEV_USE_STATS) {
      stats.update();
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvasContainer = document.getElementById("ar_model_viewer");
    const rect = canvasContainer.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const needResize =
      renderer.domElement.width !== width ||
      renderer.domElement.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
      if (
        composer != undefined &&
        composer != null &&
        scene != null &&
        camera != null
      ) {
        composer.setSize(width, height);
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      controls.update();
    }
    return needResize;
  }

  animate();
  console.log(scene);
}

// ********************************************
//      Additional functions
// ********************************************
// export function getMobileOperatingSystem() {
//   const userAgent = navigator.userAgent || navigator.vendor || window.opera;

//   if (/Macintosh/i.test(userAgent)) {
//     return "Macintosh";
//   }

//   if (/Windows/i.test(userAgent) || /Win/i.test(userAgent)) {
//     return "Windows";
//   }

//   if (/windows phone/i.test(userAgent)) {
//     return "Windows Phone";
//   }

//   if (/android/i.test(userAgent)) {
//     return "Android";
//   }

//   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//     return "iOS";
//   }

//   return "unknown";
// }

//new
export async function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
  if (/visionOS|VisionPro/i.test(userAgent)) return "VisionPro";

  if (/Macintosh/i.test(userAgent) && navigator.xr) {
    try {
      const isVRSupported = await navigator.xr.isSessionSupported(
        "immersive-vr"
      );
      if (isVRSupported) {
        return "VisionPro";
      }
    } catch (error) {
      console.warn("WebXR check failed:", error);
    }
  }

  if (/android/i.test(userAgent)) return "Android";
  if (/Windows/i.test(userAgent) || /Win/i.test(userAgent)) return "Windows";
  if (/Linux/i.test(userAgent) && !/android/i.test(userAgent)) return "Linux";
  if (/Macintosh/i.test(userAgent)) return "Macintosh";

  if (isTouchDevice) return "TouchScreenDevice";
  return "unknown";
}

function consoleLogPosition(text = "", pos, num = 2) {
  let k = 1;

  for (let i = 0; i < num; i++) {
    k = k * 10;
  }

  const x = Math.round(pos.x * k) / k;
  const y = Math.round(pos.y * k) / k;
  const z = Math.round(pos.z * k) / k;

  console.log("🚀 " + text + ": [" + x + ", " + y + ", " + z + "],");
}

export function isEqualVector(vector1, vector2) {
  const precision = 3;
  console.log("🚀", vector1.x.toFixed(3), vector2.x.toFixed(3));
  console.log("🚀", vector1.y.toFixed(3), vector2.y.toFixed(3));
  console.log("🚀", vector1.z.toFixed(3), vector2.z.toFixed(3));
  return (
    vector1.x.toFixed(precision) === vector2.x.toFixed(precision) &&
    vector1.y.toFixed(precision) === vector2.y.toFixed(precision) &&
    vector1.z.toFixed(precision) === vector2.z.toFixed(precision)
  );
}

// ********************************************
//      Animation functions
// ********************************************

// ANIMATION OF MODEL - "SCALE" - appearing or disappearing
export function animateScale(
  model,
  duration = 500,
  startScale = 0,
  endScale = 1,
  timingKeyword = "ease-in",
  callback = () => springScale(model)
) {
  function timingFunction(progress) {
    switch (timingKeyword) {
      case "ease-in":
        return progress * progress;
      case "ease-out":
        return 1 - Math.pow(1 - progress, 2);
      case "ease-in-out":
        return progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      default:
        return progress;
    }
  }

  let startTime = null;

  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = timingFunction(progress);
    const interpolatedScale =
      startScale + (endScale - startScale) * easedProgress;
    model.scale.set(interpolatedScale, interpolatedScale, interpolatedScale);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      model.scale.set(endScale, endScale, endScale);
      callback();
    }
  }

  requestAnimationFrame(animate);
}

// ANIMATION OF MODEL - "SPRING-SCALE"
export function springScale(
  model,
  duration = 500,
  oscillations = 1,
  callback = () => {}
) {
  const startTime = performance.now();
  const startScale = model.scale.x;
  const dampingFactor = 0.1; // attenuation coefficient
  const maxAmplitude = 0.2 * startScale; // maximum oscillation amplitude (20%)

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const angularFrequency = (oscillations * Math.PI * 2) / duration;
    const amplitude =
      maxAmplitude * Math.pow(dampingFactor, elapsed / duration);
    const phase = angularFrequency * elapsed;
    const currentScale = startScale + amplitude * Math.sin(phase);

    model.scale.set(currentScale, currentScale, currentScale);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      model.scale.set(startScale, startScale, startScale);
      callback();
    }
  }

  requestAnimationFrame(animate);
}

//#region DEVELOPER GUI

// import * as dat from 'dat.gui';
// function initDatGui(SHADOW_TRANSPARENCY, toneMappingExposure, model) {
//   if (!DEV_GUI_MODE) return;

//   const gui = new dat.GUI();
//   const guiContainer = $('#gui-container');
//   guiContainer.append(gui.domElement);

//   // Define parameters
//   const guiParams = {
//     SHADOW_TRANSPARENCY: SHADOW_TRANSPARENCY,
//     toneMappingExposure: toneMappingExposure,
//     pointLightIntensity: pointLightIntensity,
//     dirLightIntencity: dirLightIntencity,
//     // pointLightPosition: [pointLight.position.x, pointLight.position.y, pointLight.position.z],
//     // pointLight2Position: [pointLight2.position.x, pointLight2.position.y, pointLight2.position.z],
//     dirLightPosition: [dirLight.position.x, dirLight.position.y, dirLight.position.z],
//     dirLightShadowNear: dirLight.shadow.camera.near,
//     dirLightShadowFar: dirLight.shadow.camera.far,
//     modelPos: [model.position.x, model.position.y, model.position.z],
//     cameraFov: camera.fov,
//     cameraPos: [camera.position.x, camera.position.y, camera.position.z],
//     controlsMaxPolarAngle: controls.maxPolarAngle,
//     controlsMinPolarAngle: controls.minPolarAngle,
//     controlsMinDistance: controls.minDistance,
//     controlsMaxDistance: controls.maxDistance,
//     controlsMinAzimuthAngle: controls.minAzimuthAngle,
//     controlsMaxAzimuthAngle: controls.maxAzimuthAngle,
//     controlsTarget: [controls.target.x, controls.target.y, controls.target.z],
//   };

//   const controllers = {};

//   controllers.shadowTransparency = gui.add(guiParams, 'SHADOW_TRANSPARENCY', 0, 5, 0.05).onChange(value => {
//     floorMaterial.opacity = value;
//   });
//   controllers.toneMappingExposure = gui.add(guiParams, 'toneMappingExposure', 0, 5, 0.05).name('Exposure').onChange(value => {
//     renderer.toneMappingExposure = value;
//   });
//   // -----------------------------------------------------------
//   // const pointLightFolder = gui.addFolder('Point Light 1');
//   // controllers.pointLightIntensity = pointLightFolder.add(guiParams, 'pointLightIntensity', 0, 20, 0.1).onChange(value => {
//   //   pointLight.intensity = value;
//   // });
//   // controllers.pointLightPositionX = pointLightFolder.add(guiParams.pointLightPosition, '0', -10, 10, 0.1).name('X').onChange(value => {
//   //   pointLight.position.x = value;
//   // });
//   // controllers.pointLightPositionY = pointLightFolder.add(guiParams.pointLightPosition, '1', -10, 10, 0.1).name('Y').onChange(value => {
//   //   pointLight.position.y = value;
//   // });
//   // controllers.pointLightPositionZ = pointLightFolder.add(guiParams.pointLightPosition, '2', -10, 10, 0.1).name('Z').onChange(value => {
//   //   pointLight.position.z = value;
//   // });
//   // -----------------------------------------------------------
//   // const pointLight2Folder = gui.addFolder('Point Light 2');
//   // controllers.pointLight2PositionX = pointLight2Folder.add(guiParams.pointLight2Position, '0', -10, 10, 0.1).name('X').onChange(value => {
//   //   pointLight2.position.x = value;
//   // });
//   // controllers.pointLight2PositionY = pointLight2Folder.add(guiParams.pointLight2Position, '1', -10, 10, 0.1).name('Y').onChange(value => {
//   //   pointLight2.position.y = value;
//   // });
//   // controllers.pointLight2PositionZ = pointLight2Folder.add(guiParams.pointLight2Position, '2', -10, 10, 0.1).name('Z').onChange(value => {
//   //   pointLight2.position.z = value;
//   // });
//   // -----------------------------------------------------------
//   const dirLightFolder = gui.addFolder('Directional Light');
//   controllers.dirLightIntencity = dirLightFolder.add(guiParams, 'dirLightIntencity').onChange(value => {
//     dirLight.intensity = value;
//   });
//   controllers.dirLightShadowNear = dirLightFolder.add(guiParams, 'dirLightShadowNear', 0.1, 10, 0.1).name('Dir Light Shadow Near').onChange(value => {
//     dirLight.shadow.camera.near = value;
//   });
//   controllers.dirLightShadowFar = dirLightFolder.add(guiParams, 'dirLightShadowFar', 10, 500, 10).name('Dir Light Shadow Far').onChange(value => {
//     dirLight.shadow.camera.far = value;
//   });
//   controllers.dirLightPositionX = dirLightFolder.add(guiParams.dirLightPosition, '0', -10, 10, 0.1).name('X').onChange(value => {
//     dirLight.position.x = value;
//   });
//   controllers.dirLightPositionY = dirLightFolder.add(guiParams.dirLightPosition, '1', -10, 10, 0.1).name('Y').onChange(value => {
//     dirLight.position.y = value;
//   });
//   controllers.dirLightPositionZ = dirLightFolder.add(guiParams.dirLightPosition, '2', -10, 10, 0.1).name('Z').onChange(value => {
//     dirLight.position.z = value;
//   });
//   // -----------------------------------------------------------
//   const modelPositionController = gui.addFolder('Model Position');
//   modelPositionController.add(model.position, 'x', -1, 1, 0.01).name('Model X');
//   modelPositionController.add(model.position, 'y', -1, 1, 0.01).name('Model Y');
//   modelPositionController.add(model.position, 'z', -1, 1, 0.01).name('Model Z');
//   // -----------------------------------------------------------
//   const cameraFolder = gui.addFolder('Camera');
//   controllers.fov = cameraFolder.add(guiParams, 'cameraFov', 1, 180).name('FOV').onChange(value => {
//     camera.fov = value;
//     camera.updateProjectionMatrix();
//   });
//   // -----------------------------------------------------------
//   const controlsFolder = gui.addFolder('Controls');
//   controllers.controlsMaxPolarAngle = controlsFolder.add(guiParams, 'controlsMaxPolarAngle', -Math.PI, Math.PI).name('MaxPolarAngle').onChange(value => {
//     controls.maxPolarAngle = value;
//   });
//   controllers.controlsMinPolarAngle = controlsFolder.add(guiParams, 'controlsMinPolarAngle', -Math.PI, Math.PI).name('MinPolarAngle').onChange(value => {
//     controls.minPolarAngle = value;
//   });
//   controllers.controlsMinAzimuthAngle = controlsFolder.add(guiParams, 'controlsMinAzimuthAngle', -Math.PI, Math.PI).name('MinAzimuthAngle').onChange(value => {
//     controls.minPolarAngle = value;
//   });
//   controllers.controlsMaxAzimuthAngle = controlsFolder.add(guiParams, 'controlsMaxAzimuthAngle', -Math.PI, Math.PI).name('MaxAzimuthAngle').onChange(value => {
//     controls.minPolarAngle = value;
//   });
//   controllers.controlsMaxDistance = controlsFolder.add(guiParams, 'controlsMaxDistance', 2.2, 6.2, 0.1).name('MaxDistance').onChange(value => {
//     controls.maxDistance = value;
//   });
//   controllers.controlsMinDistance = controlsFolder.add(guiParams, 'controlsMinDistance', 0.1, 2.2, 0.1).name('MinDistance').onChange(value => {
//     controls.minDistance = value;
//   });

//   gui.close();
// }

//#endregion
