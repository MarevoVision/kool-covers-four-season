/* eslint-disable no-case-declarations */
/* global jQuery, $, PDFLib, fontkit, dat */

/*                                                                                                

          _____                    _____                    _____                    _____                    _____                   _______         
         /\    \                  /\    \                  /\    \                  /\    \                  /\    \                 /::\    \        
        /::\____\                /::\    \                /::\    \                /::\    \                /::\____\               /::::\    \       
       /::::|   |               /::::\    \              /::::\    \              /::::\    \              /:::/    /              /::::::\    \      
      /:::::|   |              /::::::\    \            /::::::\    \            /::::::\    \            /:::/    /              /::::::::\    \     
     /::::::|   |             /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \          /:::/    /              /:::/~~\:::\    \    
    /:::/|::|   |            /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \        /:::/____/              /:::/    \:::\    \   
   /:::/ |::|   |           /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \       |::|    |              /:::/    / \:::\    \  
  /:::/  |::|___|______    /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \      |::|    |     _____   /:::/____/   \:::\____\ 
 /:::/   |::::::::\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \     |::|    |    /\    \ |:::|    |     |:::|    |
/:::/    |:::::::::\____\/:::/  \:::\   \:::\____\/:::/  \:::\   \:::|    |/:::/__\:::\   \:::\____\    |::|    |   /::\____\|:::|____|     |:::|    |
\::/    / ~~~~~/:::/    /\::/    \:::\  /:::/    /\::/   |::::\  /:::|____|\:::\   \:::\   \::/    /    |::|    |  /:::/    / \:::\    \   /:::/    / 
 \/____/      /:::/    /  \/____/ \:::\/:::/    /  \/____|:::::\/:::/    /  \:::\   \:::\   \/____/     |::|    | /:::/    /   \:::\    \ /:::/    /  
             /:::/    /            \::::::/    /         |:::::::::/    /    \:::\   \:::\    \         |::|____|/:::/    /     \:::\    /:::/    /   
            /:::/    /              \::::/    /          |::|\::::/    /      \:::\   \:::\____\        |:::::::::::/    /       \:::\__/:::/    /    
           /:::/    /               /:::/    /           |::| \::/____/        \:::\   \::/    /        \::::::::::/____/         \::::::::/    /     
          /:::/    /               /:::/    /            |::|  ~|               \:::\   \/____/          ~~~~~~~~~~                \::::::/    /      
         /:::/    /               /:::/    /             |::|   |                \:::\    \                                         \::::/    /       
        /:::/    /               /:::/    /              \::|   |                 \:::\____\                                         \::/____/        
        \::/    /                \::/    /                \:|   |                  \::/    /                                          ~~              
         \/____/                  \/____/                  \|___|                   \/____/                                                           
                                                                                                                                                      


   ____  _      _                        _        _______         __                      _           _    
  / __ \| |    | |                      | |      |__   __|       / _|                    | |         | |   
 | |  | | | ___| | _____  __ _ _ __   __| |_ __     | |_ __ ___ | |_ _   _ _ __ ___   ___| |__  _   _| | __
 | |  | | |/ _ \ |/ / __|/ _` | '_ \ / _` | '__|    | | '__/ _ \|  _| | | | '_ ` _ \ / __| '_ \| | | | |/ /
 | |__| | |  __/   <\__ \ (_| | | | | (_| | |       | | | | (_) | | | |_| | | | | | | (__| | | | |_| |   < 
  \____/|_|\___|_|\_\___/\__,_|_| |_|\__,_|_|       |_|_|  \___/|_|  \__, |_| |_| |_|\___|_| |_|\__,_|_|\_\
  _____            _        __      __                   _            __/ |                                
 |  __ \          | |       \ \    / /                  (_)          |___/                                 
 | |__) |_ ___   _| | ___    \ \  / /__  _ __ ___  _ __  _ _ __                                            
 |  ___/ _` \ \ / / |/ _ \    \ \/ / _ \| '__/ _ \| '_ \| | '_ \                                           
 | |  | (_| |\ V /| | (_) |    \  / (_) | | | (_) | | | | | | | |                                          
 |_|   \__,_| \_/ |_|\___/      \/ \___/|_|  \___/|_| |_|_|_| |_|                                          
 
*/

// Created by Marevo (Pavlo Voronin based on Oleksandr Trofymchuk's configurator)
// Welcome to our custom script!

// REMEMBER:
// Theft is wrong not because some ancient text says, 'Thou shalt not steal.'
// It's always bad, robber :)

"use strict";
import $ from "jquery";
import * as THREE from "three";
import "../core/model-viewer.marevo";

// import * as GeometryUtils from 'three/addons/utils/GeometryUtils.js';
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { computeMorphedAttributes } from "three/addons/utils/BufferGeometryUtils.js";

// const { PDFDocument, StandardFonts, rgb } = PDFLib;

// import { updateRangeBackgroundAndLabel } from './app.js';

//#region PUBLIC VALUES
import {
  BACKGROUND_COLOR,
  ENVIRONMENT_MAP,
  ENVIRONMENT_MAP_INTENSITY,
  MODEL_CENTER_POSITION,
  MODEL_PATHS,
  MORPH_DATA,
  MORPH_DATA_SI,
  pdfImg,
  pdfImgTop,
  SHADOW_TRANSPARENCY,
  state,
  WALL_OFFSETS,
} from "./settings";

import { Vec3 } from "cannon-es";
import {
  interfaceComponent,
  stringPostType,
} from "../components/Interface/interface";
import {
  updateMaterialMap,
  updateTextParam,
} from "../components/Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";
import {
  countLeds,
  countVisibleObjectsByName,
} from "../components/summary/summary-page/summaryPage";
import {
  animateScale,
  bloomPass,
  camera,
  canvas,
  create3DScene,
  dirLight,
  fxaaPass,
  getMobileOperatingSystem,
  IMPORTED_MODELS,
  outputPass,
  renderer,
  saoPass,
  scene,
  updateBloomSettings,
  updateEnvMap,
  // params_Bloom,
  updateRenderSize,
} from "./3d-scene";
import { initSubSystem } from "./customFunctions/initiSubSystem";
import { preloadTextures, setMaterialTexture, TEXTURES } from "./utils";

const DEBUG_MODE_VALUES = false;
export let modelForExport = null;
let wallBackZ = null;
let wallRightZ = null;
let wallLeftZ = null;

const sceneProperties = {
  BACKGROUND_COLOR: BACKGROUND_COLOR,
  MODEL_PATHS: MODEL_PATHS,
  MODEL_CENTER_POSITION: MODEL_CENTER_POSITION,
  SHADOW_TRANSPARENCY: SHADOW_TRANSPARENCY,
  ENVIRONMENT_MAP: ENVIRONMENT_MAP,
  ENVIRONMENT_MAP_INTENSITY: ENVIRONMENT_MAP_INTENSITY,
};

export const clickableObjects = [];
export const hotspots = [];
export const labelObjects = {
  addObject: {
    url: "public/img/icons/hotspot.svg",
    obj: null,
  },
  addObjectHover: {
    url: "public/img/icons/hotspot-hover.svg",
    obj: null,
  },
  plusSideBack: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideBack.svg",
    obj: null,
  },
  plusSideBackHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideBackHover.svg",
    obj: null,
  },
  plusSideLeft: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideLeft.svg",
    obj: null,
  },
  plusSideLeftHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideLeftHover.svg",
    obj: null,
  },
  plusSideRight: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideRight.svg",
    obj: null,
  },
  plusSideRightHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideRightHover.svg",
    obj: null,
  },
  subsysSettings: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/SubsysSettings.svg",
    obj: null,
  },
  subsysSettingsHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/SubsysSettingsHover.svg",
    obj: null,
  },
};

var offsetZOverhang = -0.22;
export let currentOS = "unknown";
let delayForWriteURL = false;
let parametersKey = "config";
let parametersValue = "";
let loaded = false;
let paramsLoaded = false;
let isFirstStart = true;
let init = true;
const spanAvatarThickness = 0.1;

let pointsBeamX = [];
let pointsBeamZ = [];

let tblInfo;
let tblInfoItemQr;
let tblInfoItemSharing;
let tblInfoItemLoupe;

let modelViewer;
let qrcode;
let qrScaned = 0;

export let theModel;
export let materialSolid = null;

let isAutoRotate = false;
const autoRotateSpeed = 0.05;
const spanOpacity = 0.15;

// MORPHS & SHADER

let isWorldposVertexShaderEnabled = true;
let morphs = [];
let globalMorphs = [];

var threejs_font_helvetiker_regular;

//#endregion

//#region WIX

var isWIX = false;
var wix_api_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";
var wix_contactForm_Text = "";
var wix_contactForm_name = "test";
var wix_contactForm_email = "at@marevo.vision";
var wix_contactForm_message = "Hello WIX!";

// eslint-disable-next-line no-unused-vars
async function wix_contactForm() {
  // eslint-disable-next-line no-undef
  e.preventDefault();

  try {
    const response = await fetch(
      "https://www.wixapis.com/forms/v1/submissions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + wix_api_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          fields: {
            wix_contactForm_name,
            wix_contactForm_email,
            wix_contactForm_message,
          },
        }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      console.log("Form submitted successfully!");
    } else {
      console.log(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//#endregion

var isRedirectionProject = false;

const PergolaPostHeadtype = {
  single: 0,
  double: 1,
  louvered: 2,
};

const PergolaPostPlace = {
  FL: 0,
  FR: 1,
  RL: 2,
  RR: 3,
  Front: 4,
  Back: 5,
  Left: 6,
  Right: 7,
  Center: 8,
};

const PergolaSide = {
  Front: 0,
  Back: 1,
  Left: 2,
  Right: 3,
  Center: 4,
};

const PergolaRoofRafters = {
  single: 0,
  double: 1,
};

const PergolaRoofSpacing = {
  _2inch: 0,
  _3inch: 1,
  _4inch: 2,
};

const PergolaRoofObjectType = {
  frame: 0,
  roof: 1,
  skylight: 2,
  rails: 3,
  louver: 4,
  gutter: 5,
};

const PergolaRoofPercentage = {
  _50percent: 0,
  _70percent: 1,
};

const PergolaPostSize = {
  _4inch: 0,
  _7inch: 1,
  _8inch: 2,
  _10inch: 3,
  _12inch: 4,
};

const PergolaRoofOverhang = {
  _12inch: 0,
  _16inch: 1,
  _20inch: 2,
  _24inch: 3,
};

const PergolaRoofThickness = {
  _2x2: 0,
  _2x3: 1,
  _3inch: 2,
  _4inch: 3,
  _6inch: 4,
};

const PergolaRoofWrapkit = {
  _2x6: 0,
  _3x8: 1,
};

const PergolaRoofSolidPanels = [
  "_0_plank",
  "_1_plank",
  "_2_plank",
  "_3_plank",
  "_4_plank",
  "_5_plank",
  "_6_plank",
  "_7_plank",
];

export const pergolaConst = {
  structureColorType: {
    // Standard: +structureColorTypeStandard_option.split("-")[1],
    // Wood: +structureColorTypeWood_option.split("-")[1],
  },
  side: {
    Left: 0,
    Right: 1,
    Front: 2,
    Back: 3,
    Center: 4,
  },
  sideString: {
    0: "Left",
    1: "Right",
    2: "Front",
    3: "Back",
    4: "Center",
  },
  corner: {
    RL: 0,
    RR: 1,
    FL: 2,
    FR: 3,
  },
  direction: {
    Straight: 0,
    Perpendicular: 1,
  },
  postPlace: {
    CornerFront: 0,
    CornerBack: 1,
    MiddleFront: 2,
    MiddleBack: 3,
    CornerBackLeft: 4,
    CornerBackRight: 5,
  },
  canopyType: {
    Fixed: 0,
    Moving: 1,
    Handle: 2,
    Led: 3,
  },
  systemType: {
    autoShade: 0,
    privacyWall: 1,
  },
  option: {
    fans: 0,
    LEDRampLight: 1,
    LEDRecessed: 2,
    LEDStrip: 3,
  },
  optionNameString: {
    fans: "Fan",
    LEDRampLight: "LED lights",
    LEDRecessed: "LED Recessed",
    LEDStrip: "LED Strip",
  },
  systemNameString: {
    autoShade: "Auto Screen",
    privacyWall: "Privacy Wall",
  },
};

function setRedirectionProjectSettings(value) {
  isRedirectionProject = value;

  if (!value) {
    $("#wixOverlay").removeClass("active");
    $("#wixOverlay").hide();
    return;
  }

  $("#wixOverlay").addClass("active");
  $("#wixOverlay").show();

  $("#wixContent").on("click", function () {
    PergolaOpenARorQR();
  });

  $("#js-wixBack").on("click", function () {
    window.open(
      "https://www.everydaypatio.com/pergola-configurator" +
        "?config=" +
        GetURLWithParameters("", true),
      "_self"
    );
  });
}

//! #region START APP

loadThreeJSFonts();
// Start();

//#endregion

//#region INITIALIZATION

export async function Start() {
  blockURLWriter = true;
  currentOS = await getMobileOperatingSystem();
  // AssignUI();

  create3DScene(sceneProperties, async () => await startCallback());

  const startCallback = async () => {
    if (loaded) return;
    loaded = true;

    // ReadURLParameters(StartSettings);
    await StartSettings();
    setTimeout(() => {
      toggleLoad(false);
    }, 3000);
  };
}

export const clones = [];

function animateProperty(object, property, targetValue, duration, onUpdate) {
  const startValue = object[property];
  const startTime = performance.now();

  function animate(time) {
    const elapsedTime = time - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    object[property] = startValue + (targetValue - startValue) * progress;

    if (onUpdate) onUpdate();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// #region RAYCAST
function initRaycast() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const canvas = document.getElementById("ar_model_view");

  let isMouseMoved = false;
  let clickThreshold = 5;
  let startX, startY;

  let avatarObject;

  function onMouseDown(event) {
    isMouseMoved = false;
    startX = event.offsetX;
    startY = event.offsetY;
  }

  function onMouseMove(event) {
    mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const visibleClickableObjects =
      getVisibleClickableObjects(clickableObjects);
    const intersects = raycaster.intersectObjects(
      visibleClickableObjects,
      true
    );

    if (intersects.length > 0) {
      canvas.style.cursor = "pointer";
      avatarObject = intersects[0].object;
      visibleClickableObjects.forEach((object) => {
        // pergola && pergola.outlineAvatar(object, false);
      });
      // pergola && pergola.outlineAvatar(avatarObject, true, false);
    } else {
      canvas.style.cursor = "default";
      visibleClickableObjects.forEach((object) => {
        pergola && pergola.outlineAvatar(object, false);
      });
    }

    if (
      Math.abs(event.offsetX - startX) > clickThreshold ||
      Math.abs(event.offsetY - startY) > clickThreshold
    ) {
      isMouseMoved = true;
    }
  }

  function onMouseUp(event) {
    if (!isMouseMoved) {
      mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const visibleClickableObjects =
        getVisibleClickableObjects(clickableObjects);
      const intersects = raycaster.intersectObjects(
        visibleClickableObjects,
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        console.log(
          `CLICKED: ${intersectedObject.parentSpan}, avatar:${intersectedObject.name}`
        );

        state.lastSpan = intersectedObject.parentSpan;

        const clickedSpan = intersectedObject.parentSpan;
        pergola && pergola.editSystem(clickedSpan);
        visibleClickableObjects.forEach((object) => {
          pergola && pergola.outlineAvatar(object, false);
        });
      }
    }
  }

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function getVisibleClickableObjects(objects = []) {
  const visibleObjects = objects.filter(
    (avatar) => avatar.parentSpan.isSystemSet === true
  );

  return visibleObjects;
}

// #endregion

function mirrorObject(object, value = true) {
  if (object) object.scale.x = value ? -1 : 1;
}

export async function toggleBackWall(toggle) {
  const backWall = GetGroup("wall_back");

  // #region turn OFF
  backWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = toggle;
      }
    });
  });
  //  #endregion
}

export async function toggleLeftWall(toggle) {
  const lefWall = GetGroup("wall_L");

  // #region turn OFF
  lefWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = toggle;
      }
    });
  });
  //  #endregion
}

export async function toggleRightWall(toggle) {
  const rightWall = GetGroup("wall_R");

  // #region turn OFF
  rightWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = toggle;
      }
    });
  });
  //  #endregion
}

export function toggleLoad(toggle) {
  toggle
    ? $("#app").addClass("app-loader")
    : $("#app").removeClass("app-loader");
}

export async function getSize(model) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  console.log(size);
}

async function StartSettings() {
  theModel = IMPORTED_MODELS[0];
  console.log("🚀 ~ theModel:", theModel);
  InitMorphModel(theModel);

  getSize(theModel);

  PrepareAR();
  paramsLoaded = true;

  CreatePergola(theModel);

  theModel.scale.set(0, 0, 0);
  theModel.visible = true;
  animateScale(theModel);

  await preloadTextures();

  isFirstStart = false;

  if (["Android", "iOS", "VisionPro"].includes(currentOS)) {
    CheckQRMobile();
  }

  // initLouver(GetMesh("header"), theModel);

  modelForExport = theModel;

  theModel.traverse((object) => {
    if (object.isMesh && object.name === "louver_X") {
      object.visible = false;
    }
  });

  //UI ADD
  interfaceComponent($("#content"));

  // setSpansScreen();
  // setSpansHeaters();

  setAllHotspotsVisibility(false);
  //#endregion

  // console.log(pergola);

  pergola.changeDimensions(state.width, state.length, state.height);

  initSubSystem();

  initRaycast();

  // listenerChangeForUrl();
}

//#endregion

//#region MESH / MATERIAL utils

export function GetMesh(name, model = theModel) {
  var object = null;
  model?.traverse((o) => {
    if (o.isMesh) {
      if (name == o.name) {
        object = o;
      }
    }
  });

  return object;
}

export function GetGroup(name, model = theModel) {
  var group = null;
  model.traverse((o) => {
    if (o.isGroup) {
      if (name == o.name) {
        group = o;
      }
    }
  });

  return group;
}

//#region HOTSPOTS
function createHotspot(id, normalUrl, hoverUrl, position, groupName = "") {
  const hotspotContainer = document.getElementById("ar_model_viewer");
  if (!hotspotContainer) {
    return;
  }

  const hotspot = document.createElement("div");
  hotspot.classList.add("hotspot");
  hotspot.id = id;
  hotspot.dataset.id = id;
  hotspot.style.backgroundImage = `url(${normalUrl})`;
  hotspot.groupName = groupName;
  hotspot.dataset.group = groupName;

  hotspot.hoverFunction = () => {};
  hotspot.normalFunction = () => {};
  hotspot.clickFunction = () => {};

  hotspot.addEventListener("mouseenter", () => {
    hotspot.style.backgroundImage = `url(${hoverUrl})`;
    hotspot.hoverFunction();
  });

  hotspot.addEventListener("mouseleave", () => {
    hotspot.style.backgroundImage = `url(${normalUrl})`;
    hotspot.normalFunction();
  });

  hotspot.addEventListener("click", () => {
    // console.log(`Hotspot ${id} clicked`);
    hotspot.clickFunction();
  });

  hotspotContainer.appendChild(hotspot);

  return {
    element: hotspot,
    position: position,
    setHoverFunction: (newFunction) => {
      hotspot.hoverFunction = newFunction;
    },
    setNormalFunction: (newFunction) => {
      hotspot.normalFunction = newFunction;
    },
    setClickFunction: (newFunction) => {
      hotspot.clickFunction = newFunction;
    },
  };
}

export function updateHotspots(hotspots) {
  const $canvasContainer = $("#ar_model_viewer");

  hotspots.forEach(({ element, position }) => {
    if (position) {
      const screenPosition = position.clone();
      screenPosition.project(camera);

      const x = (screenPosition.x * 0.5 + 0.5) * $canvasContainer.width();
      const y = (screenPosition.y * -0.5 + 0.5) * $canvasContainer.height();

      $(element).css({
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        "-webkit-transform": "translate(-50%, -50%)",
      });
    }
  });
}

function setHotspotVisibility(hotspot, visible) {
  if (!hotspot || !hotspot.element) {
    return;
  }

  if (!visible) console.log("DISABLE SHOW HOTSHOP");
  // if (visible) console.log("ENABLE SHOW HOTSHOP", sta);
  // console.log(hotspot, "hotspot !");
  hotspot.element.style.display = visible ? "block" : "none";
}

export function setAllHotspotsVisibility(visible) {
  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach((hotspot) => {
    setHotspotVisibility(hotspot, visible);
    // console.log(hotspot);
  });
}

function setHotspotsByGroupVisibility(groupName, visible) {
  const hotspots = document.querySelectorAll(
    `.hotspot[data-group="${groupName}"]`
  );
  hotspots?.forEach((hotspot) => {
    hotspot.style.display = visible ? "block" : "none";
  });
}

window.addEventListener("resize", () => {
  updateHotspots(hotspots);
  // setAllHotspotsVisibility(true);

  // console.log("RESIZE");
  // adaptiveMobile();

  // $(".rgb_icon_img, #shade-sys, #slide-sys, #gul-sys, #rgbIcon").each(
  //   function () {
  //     moveCanvasMenu({ target: this });
  //   }
  // );
});

window.addEventListener("orientationchange", function (event) {
  window.orientation = 0;
});

//#endregion

// eslint-disable-next-line no-unused-vars
function CloneMesh(name, model = theModel) {
  const originalMesh = GetMesh(name, model);
  if (originalMesh) {
    const clonedMesh = originalMesh.clone();
    return clonedMesh;
  } else {
    console.warn(`Mesh with name ${name} not found.`);
    return null;
  }
}

const subSystems_options = {
  BifoldDoor: {
    limitHeightInch: 110,
    limitWidthInch: null,
    elementMaxWidthMM: 700,
    shapekeys_straight: {
      frame: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "width_bi-doors_frame",
          min: 879,
          max: 5999,
        },
      },
      element: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "width_bi-door",
          min: 350,
          max: 700,
        },
        thickness: 0.029174,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        depth: {
          key: "length_bi-doors_frame",
          min: 879,
          max: 5999,
        },
      },
      element: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "length_bi-door_side",
          min: 350,
          max: 700,
        },
        thickness: 0.029174,
      },
    },
  },
  BifoldDoorShatters: {
    limitHeightInch: 110,
    limitWidthInch: null,
    elementMaxWidthMM: 1350,
    shapekeys_straight: {
      frame: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "width_bifold_shutters_frame",
          min: 879,
          max: 5999,
        },
      },
      element: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "width_bifold_shutter",
          keyBlade: "width_blabe_bifold_shutters",
          min: 400,
          max: 1350,
        },
        thickness: 0.029174,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        depth: {
          key: "length_bi-doors_frame",
          min: 879,
          max: 5999,
        },
      },
      element: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "length_bifold_shutter",
          keyBlade: "length_blabe_bifold_shutters",
          min: 400,
          max: 1350,
        },
        thickness: 0.029174,
      },
    },
  },
  GuilotineGlass: {
    option: "option_4-1",
    group: "group-19",
    limitHeightInch: null,
    limitWidthInch: 168,
    elementMaxWidthMM: null,
    overlapMM: 50, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_Guillotine",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "length_Guillotine",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win",
          min: 1780,
          max: 4170,
        },
        thickness: 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_Guillotine_side",
          min: 1520,
          max: 3480,
        },
        depth: {
          key: "length_Guillotine_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win_side",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win_side",
          min: 2190,
          max: 8990,
        },
        thickness: 0.0241,
      },
    },
  },
  SlidingGlassDoor: {
    option: "option_4-2",
    group: "group-10",
    limitHeightInch: 120,
    limitWidthInch: null,
    elementMaxWidthMM: 900,
    overlapMM: 16, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_sliding_glass",
          min: 2232,
          max: 3450,
        },
        width: {
          key: "length_sliding_glass",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        height: {
          key: "height_sliding_glass_win",
          min: 1420,
          max: 3560,
        },
        width: {
          key: "length_sliding_glass_win",
          min: 593,
          max: 1060,
        },
        thickness: 0.02, // 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_sliding_glass_side",
          min: 2520,
          max: 4480,
        },
        depth: {
          key: "length_sliding_glass_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        height: {
          key: "height_sliding_glass_win_side",
          min: 1420,
          max: 3380,
        },
        width: {
          key: "length_sliding_glass_win_side",
          min: 593,
          max: 1060,
        },
        thickness: 0.02, // 0.0241,
      },
    },
  },
  LiftSlideDoor: {
    limitHeightInch: 120,
    limitWidthInch: null,
    elementMaxWidthMM: 1350,
    overlapMM: 10, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height",
          min: 2132,
          max: 3350,
        },
        width: {
          key: "width_sl-shutters_frame",
          min: 879,
          max: 6000,
        },
      },
      element: {
        height: {
          key: "height",
          min: 1420,
          max: 2690,
        },
        width: {
          keyFix: "width_fix_shutter",
          key: "width_sl-shutter",
          min: 399,
          max: 1349,
        },
        thickness: 0.029175, // 0.0241,
      },
      shatter: {
        width: {
          keyFix: "width_blabe_fix_shutters",
          key: "width_blabe_sl_shutters",
          min: 399,
          max: 1349,
        },
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height",
          min: 1520,
          max: 2790,
        },
        depth: {
          key: "length_sl-shutters_frame",
          min: 879,
          max: 6000,
        },
      },
      element: {
        height: {
          key: "height",
          min: 1420,
          max: 2690,
        },
        width: {
          keyFix: "length_fix_shutter",
          key: "length_sl-shutter",
          min: 399,
          max: 1349,
        },
        thickness: 0.029175, // 0.0241,
      },
      shatter: {
        width: {
          keyFix: "length_blabe_fix_shutters",
          key: "length_blabe_sl_shutters",
          min: 399,
          max: 1349,
        },
      },
    },
  },
  BlindShade: {
    option: "option_4-4",
    group: "group-12",
    limitHeightInch: null,
    limitWidthInch: null,
    elementMaxWidthMM: null,
    overlapMM: null, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_shades",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "width_shades",
          min: 1880,
          max: 4270,
        },
      },
      element: {
        closing: {
          key: "close_shades",
          min: 1520,
          max: 3660,
        },
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_shades_side",
          min: 1520,
          max: 3660,
        },
        depth: {
          key: "length_shades_side",
          min: 2290,
          max: 9090,
        },
      },
      element: {
        closing: {
          key: "close_shades_side",
          min: 1520,
          max: 2790,
        },
      },
    },
  },
  Window: {
    front: {
      height: {
        key: "height_win_up",
        min: 203,
        max: 914,
      },
      width: {
        key: "length_win_up",
        min: 1880,
        max: 4270,
      },
    },
    back: {
      height: {
        key: "height_win_up_back",
        min: 203,
        max: 2030,
      },
      width: {
        key: "length_win_up",
        min: 1880,
        max: 4270,
      },
    },
    leftRight: {
      heightDelta: {
        key: "height_win_up_side",
        min: 0,
        max: 910,
      },
      heightPos: {
        //! it used in pergola.changeDimensions();
        key: "height_win_up_side.001",
        minInch: 60, // це висота перголи у футах
        maxInch: 144, // це висота перголи у футах
      },
      width: {
        //! it used in pergola.changeDimensions();
        key: "length_win_up_side",
        min: 2290,
        max: 9090,
        minInch: 96,
        maxInch: 360,
      },
    },
  },
  Led: {
    option: "option_4-5",
    group: "group-13",
  },
};

// eslint-disable-next-line no-unused-vars
function CloneGroup(name, model = theModel) {
  const originalGroup = GetGroup(name, model);
  if (originalGroup) {
    const clonedGroup = originalGroup.clone();
    return clonedGroup;
  } else {
    console.warn(`Group with name ${name} not found.`);
    return null;
  }
}

// eslint-disable-next-line no-unused-vars
function RemoveMesh(mesh) {
  if (mesh && mesh.parent) {
    mesh.parent.remove(mesh);
  } else {
    console.warn("Mesh not found or it has no parent.");
  }
}

// eslint-disable-next-line no-unused-vars
function RemoveGroup(group) {
  if (group && group.parent) {
    group.parent.remove(group);
  } else {
    console.warn("Group not found or it has no parent.");
  }
}

function changeMaterialColor(name, color) {
  const material = GetMaterial(name);

  if (material) {
    material.color.set(color);
  }
}

// eslint-disable-next-line no-unused-vars
function GetMaterial(name) {
  var material = null;
  theModel.traverse((o) => {
    if (o.isMaterial) {
      if (name == o.material.name) {
        material = o.material;
      }
    }
  });

  return material;
}

function GetMaterialFromScene(name) {
  var material = null;
  scene.traverse((o) => {
    if (o.material) {
      if (name == o.material.name) {
        material = o.material;
      }
    }
  });

  return material;
}

// eslint-disable-next-line no-unused-vars
function setMaterialProperty(materialName, value, propery = "metalness") {
  const materialObject = GetMaterialFromScene(materialName);
  if (materialObject == null) {
    console.error(`ERROR: Material ${materialName} is not found !`);
    return;
  }
  // eslint-disable-next-line no-prototype-builtins
  if (!materialObject.hasOwnProperty(propery)) {
    console.error(
      `ERROR: Material ${materialName} has no property ${propery} !`
    );
    return;
  }

  materialObject[propery] = value;
  console.log(`${propery} for material ${materialName} was set up to ${value}`);
}

// eslint-disable-next-line no-unused-vars
export function ChangeMaterialTilling(materialName, x, y) {
  var materialObject = GetMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  if (materialObject.map != null) {
    materialObject.map.repeat.set(x, y);
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.repeat.set(x, y);
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.repeat.set(x, y);
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.repeat.set(x, y);
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.repeat.set(x, y);
  }
}

// eslint-disable-next-line no-unused-vars
export function ChangeMaterialOffset(materialName, x, y) {
  var materialObject = GetMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  if (materialObject.map != null) {
    materialObject.map.offset.set(x, y);
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.offset.set(x, y);
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.offset.set(x, y);
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.offset.set(x, y);
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.offset.set(x, y);
  }
}

export function triggerIconClick(iconType) {
  const icon = $(`.icon_wrap`).find(`#${iconType}`);
  icon.show();

  if (icon.length) {
    icon.trigger("click");
  } else {
    console.error("Icon not found");
  }
}

export function showIcon(iconType, trigger = false) {
  const icon = $(`.icon_wrap`).find(`#${iconType}`);
  icon.show();

  if (trigger) {
    icon.trigger("click");
  }
}

export function hideIcon(iconType) {
  const icon = $(`.icon_wrap`).find(`#${iconType}`);

  // REMOVE CLASS "active" from icon
  const classesToRemove = icon
    .attr("class")
    ?.split(" ")
    .filter((className) => className.includes("active"));

  if (classesToRemove?.length) {
    icon.removeClass(classesToRemove.join(" "));
  }

  icon.hide();
  $(".portal-container").hide();

  //mobile
  $(".interface-container").removeClass("interface-container-portal");
}

// eslint-disable-next-line no-unused-vars
function setVisibility(model, value, meshArray = [], isInclude = false) {
  if (model) {
    if (value == undefined && value == null) {
      return;
    }

    if (meshArray.length === 0) {
      model.visible = value;
      return;
    }

    for (let i = 0; i < meshArray.length; i++) {
      model.traverse((o) => {
        if (o.name == meshArray[i]) {
          o.visible = value;
        }

        if (isInclude) {
          if (o.name.includes(meshArray[i])) {
            o.visible = value;
          }
        }
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
function setMaterialColor(materialName, color) {
  const materialObject = GetMaterialFromScene(materialName);
  if (materialObject == null) {
    return;
  }
  materialObject.color.set(color);
  materialObject.needsUpdate = true;
}

const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin("anonymous");
const textureCache = {};
const texturePool = {};

function setTexture(id, path, material, materialProp, tilling) {
  if (material == null) {
    return;
  }
  if (materialProp == null) {
    return;
  }

  const value = texturePool[id.toLowerCase()];
  if (value != null) {
    assingTexture(material, materialProp, value, tilling);
    return;
  }

  textureLoader.load(
    path,
    (texture) => {
      // console.log("texture is loading");
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestMipmapNearestFilter;
      texture.anisotropy = 16;
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texturePool[id.toLowerCase()] = texture;

      assingTexture(material, materialProp, texture, tilling);
    },
    undefined,
    () => {
      console.error("An error happened.");
    }
  );

  function assingTexture(material, materialProp, texture, tilling) {
    switch (materialProp) {
      case "map":
        material.map = texture;
        if (tilling != null) {
          texture.repeat.set(tilling.x, tilling.y);
        }
        break;
      default:
        break;
    }
    material.needsUpdate = true;
  }
}

// eslint-disable-next-line no-unused-vars
function loadTexture(textureValue, tilingValue = 1) {
  applyTexture(textureValue, tilingValue);

  function applyTexture(textureValue, tilingValue) {
    const textureProperties = {
      Map: {},
      Normal: {},
      Roughness: {},
      Metalness: {},
      Emission: {},
      AO: {},
      Gloss: {},
    };

    for (const node in textureProperties) {
      const value = textureValue[node.toLowerCase()];
      if (!value || value === "null") continue;

      if (value && !textureCache[value]) {
        textureLoader.load(
          value,
          (texture) => {
            // console.log("texture is loading");
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestMipmapNearestFilter;
            texture.anisotropy = 16;
            texture.flipY = false;
            setTiling(texture, tilingValue);
            textureCache[value] = texture;
          },
          undefined,
          () => {
            console.error("An error happened.");
          }
        );
      }
    }
  }

  function setTiling(texture, tiling) {
    texture.repeat.set(tiling, tiling);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  }
}

// eslint-disable-next-line no-unused-vars
function setObjectTexture(
  materialNames,
  textureValue,
  tilingValue = 1,
  model = theModel
) {
  model?.traverse((o) => {
    if (o.material) {
      for (let i = 0; i < materialNames.length; i++) {
        if (o.material.name == materialNames[i]) {
          applyTexture(o.material, textureValue, tilingValue);
        }
      }
    }
  });

  function applyTexture(material, textureValue, tilingValue) {
    const textureProperties = {
      Map: {
        apply: (material, texture) => {
          texture.encoding = sRGBEncoding;
          material.map = texture;
          if (texture) material.map.needsUpdate = true;
        },
      },
      Normal: {
        apply: (material, texture) => {
          material.normalMap = texture;
          if (texture) material.normalMap.needsUpdate = true;
        },
      },
      Roughness: {
        apply: (material, texture) => {
          material.roughnessMap = texture;
          if (texture) material.roughnessMap.needsUpdate = true;
        },
      },
      Metalness: {
        apply: (material, texture) => {
          material.metalnessMap = texture;
          if (texture) material.metalnessMap.needsUpdate = true;
        },
      },
      Emission: {
        apply: (material, texture) => {
          material.emissiveMap = texture;
          if (texture) material.emissiveMap.needsUpdate = true;
        },
      },
      AO: {
        apply: (material, texture) => {
          material.aoMap = texture;
          if (texture) material.aoMap.needsUpdate = true;
        },
      },
      Gloss: {
        apply: (material) => {
          material.metalness = 1;
          material.roughness = 0.2;
        },
      },
    };

    for (const node in textureProperties) {
      const value = textureValue[node.toLowerCase()];
      if (!value) continue;

      if (value === "null") {
        textureProperties[node].apply(material, null);
        material.needsUpdate = true;
        continue;
      }

      if (!textureCache[value]) {
        textureLoader.load(
          value,
          (texture) => {
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestMipmapNearestFilter;
            texture.anisotropy = 16;
            texture.flipY = false;
            setTiling(texture, tilingValue);
            textureCache[value] = texture;

            textureProperties[node].apply(material, texture);
            material.needsUpdate = true;
          },
          undefined,
          () => {
            console.error("An error happened.");
          }
        );
      } else {
        textureProperties[node].apply(material, textureCache[value]);
        material.needsUpdate = true;
      }
    }
  }

  function setTiling(texture, tiling) {
    texture.repeat.set(tiling, tiling);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  }
}

// eslint-disable-next-line no-unused-vars
function getMeshDimensions(mesh) {
  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject(mesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  const width = size.x;
  const height = size.y;
  const depth = size.z;
  return { width: width, height: height, depth: depth };
}

// eslint-disable-next-line no-unused-vars
function getMaterialsList(parent) {
  const materials = [];
  parent.traverse((o) => {
    if (o.material) {
      materials.push(o.material.name);
    }
  });
  return materials;
}

// eslint-disable-next-line no-unused-vars
function getMeshNamesList(parent) {
  const names = [];
  parent.traverse((o) => {
    if (o.name) {
      names.push(o.name);
    }
  });
  return names;
}

//#endregion

//#region CLIPBOARD

// eslint-disable-next-line no-unused-vars
const copyToClipboard = (infoSharingInput) => {
  var aux = document.createElement("input");
  aux.setAttribute("value", infoSharingInput.value);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};

//#endregion

//#region QR

function CreateQR() {
  var uri = window.location.href;
  var encoded = encodeURIComponent(uri);
  var qrImg = new Image();
  qrImg.src = "https://quickchart.io/qr?text=" + encoded + "&size=200";
  qrImg.addEventListener("load", () => {
    $(qrImg).addClass("ar__bottom__qr");
    $("#qr-container").html(qrImg);
  });
}

async function CheckQRMobile() {
  // eslint-disable-next-line no-unused-vars
  await waitFor((_) => loaded === true);
  // eslint-disable-next-line no-unused-vars
  await waitFor((_) => modelViewer != undefined);
  await new Promise((r) => setTimeout(r, 2000));

  if (qrScaned == 1) {
    if (["Android", "iOS", "VisionPro"].includes(currentOS)) {
      OpenAR();
    }

    qrScaned = 0;

    WriteURLParameters();
  }
}

//#endregion

//#region AR

function PrepareAR() {
  modelViewer = $("#marevo_model");
  const arPromt = $("#ar-prompt");

  modelViewer[0].addEventListener("ar-status", (event) => {
    if (event.detail.status == "session-started") {
      arPromt[0].style.display = "block";
    } else if (event.detail.status == "not-presenting") {
      arPromt[0].style.display = "none";
      modelViewer[0].resetScene();
      init = true;

      if (getMobileOperatingSystem() == "Android") {
        if (pergolaSettings.mountingWall_Back && pergola != null) {
          pergola.changeMountingWallVisibility(
            pergolaSettings.mountingWall_Back,
            PergolaElementOrientSide.Back,
            true
          );
        }

        if (pergolaSettings.mountingWall_Left && pergola != null) {
          pergola.changeMountingWallVisibility(
            pergolaSettings.mountingWall_Left,
            PergolaElementOrientSide.Left,
            true
          );
        }

        if (pergolaSettings.mountingWall_Right && pergola != null) {
          pergola.changeMountingWallVisibility(
            pergolaSettings.mountingWall_Right,
            PergolaElementOrientSide.Right,
            true
          );
        }
      }
    } else {
      arPromt[0].style.display = "none";
    }
  });
}

async function OpenAR() {
  InitMorphModel(theModel);

  ComputeMorphedAttributes();

  await ImportScene(scene);
}

// eslint-disable-next-line no-unused-vars
export function OpenARorQR() {
  if (["Android", "iOS", "VisionPro"].includes(currentOS)) {
    OpenAR();
    return;
  }

  CreateQR();

  $("#ar").show();
}

//IMPORT
async function ImportScene(newScene) {
  await modelViewer[0].importScene(newScene);
  modelViewer[0].activateAR();
}
//#endregion

//#region URL PARAMETERS

function ReadURLParameters(callback, url = null) {
  var queryString = url != null ? url : window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const entries = urlParams.entries();
  let parseParams = "";

  for (const entry of entries) {
    if (entry[0] == parametersKey) {
      parseParams = entry[1];
      continue;
    }

    if (entry[0] == "onlyAR") {
      var parameter = entry[1];

      setRedirectionProjectSettings(parameter == "true" ? true : false);
      continue;
    }
  }

  if (parseParams === "undefined") {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  if (parseParams === undefined || parseParams == null || parseParams == "") {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  if (!parseParams?.trim()) {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  var splitValue = "-";
  parseParams = parseParams.SDecode();

  const paramArray = parseParams.split(splitValue);
  // console.log(paramArray);

  if (paramArray.length == 0) {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  //var pergolaSettings = new PergolaSettings();

  pergolaSettings.width = parseInt(paramArray[0]);
  pergolaSettings.length = parseInt(paramArray[1]);
  pergolaSettings.height = parseInt(paramArray[2]);
  pergolaSettings.postSize = parseInt(paramArray[3]);
  pergolaSettings.colorHex = paramArray[4];
  pergolaSettings.colorLouveredHex = paramArray[5];
  pergolaSettings.colorLedHex = paramArray[6];
  pergolaSettings.colorMoodHex = paramArray[7];
  pergolaSettings.roofType = parseInt(paramArray[8]);
  pergolaSettings.roofLouveredDirection = parseInt(paramArray[9]);
  pergolaSettings.roofLouveredRotate = parseInt(paramArray[10]);
  pergolaSettings.mountingWall_Back =
    parseInt(paramArray[11]) == 1 ? true : false;
  pergolaSettings.mountingWall_Left =
    parseInt(paramArray[12]) == 1 ? true : false;
  pergolaSettings.mountingWall_Right =
    parseInt(paramArray[13]) == 1 ? true : false;
  pergolaSettings.extraOptionLight =
    parseInt(paramArray[14]) == 1 ? true : false;
  pergolaSettings.extraOptionLightSpacing = parseInt(paramArray[15]);
  pergolaSettings.extraOptionFan = parseInt(paramArray[16]) == 1 ? true : false;
  pergolaSettings.extraOptionLed = parseInt(paramArray[17]) == 1 ? true : false;
  pergolaSettings.extraOptionHeaters =
    parseInt(paramArray[18]) == 1 ? true : false;
  pergolaSettings.extraOptionMoodLight =
    parseInt(paramArray[19]) == 1 ? true : false;

  sceneTime = parseInt(paramArray[20]) == 1 ? "Night" : "Day";
  qrScaned = parseInt(paramArray[21]);

  if (callback != null) callback();

  CheckQRMobile();
}

function ReadStringParameters(inputParameters, callback) {
  if (inputParameters == null) {
    if (callback != null) {
      callback();
    }
    return;
  }

  if (
    inputParameters == "" ||
    inputParameters == "null" ||
    inputParameters == "undefined"
  ) {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  if (
    inputParameters == "" ||
    inputParameters == null ||
    inputParameters == undefined
  ) {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  var splitValue = "-";
  var parseParams = inputParameters.SDecode();

  const paramArray = parseParams.split(splitValue);
  console.log(paramArray);

  if (paramArray.length == 0) {
    paramsLoaded = true;
    if (callback != null) {
      callback();
    }
    return;
  }

  //var pergolaSettings = new PergolaSettings();

  pergolaSettings.width = parseInt(paramArray[0]);
  pergolaSettings.length = parseInt(paramArray[1]);
  pergolaSettings.height = parseInt(paramArray[2]);
  pergolaSettings.postSize = parseInt(paramArray[3]);
  pergolaSettings.colorHex = paramArray[4];
  pergolaSettings.colorLouveredHex = paramArray[5];
  pergolaSettings.colorLedHex = paramArray[6];
  pergolaSettings.colorMoodHex = paramArray[7];
  pergolaSettings.roofType = parseInt(paramArray[8]);
  pergolaSettings.roofLouveredDirection = parseInt(paramArray[9]);
  pergolaSettings.roofLouveredRotate = parseInt(paramArray[10]);
  pergolaSettings.mountingWall_Back =
    parseInt(paramArray[11]) == 1 ? true : false;
  pergolaSettings.mountingWall_Left =
    parseInt(paramArray[12]) == 1 ? true : false;
  pergolaSettings.mountingWall_Right =
    parseInt(paramArray[13]) == 1 ? true : false;
  pergolaSettings.extraOptionLight =
    parseInt(paramArray[14]) == 1 ? true : false;
  pergolaSettings.extraOptionLightSpacing = parseInt(paramArray[15]);
  pergolaSettings.extraOptionFan = parseInt(paramArray[16]) == 1 ? true : false;
  pergolaSettings.extraOptionLed = parseInt(paramArray[17]) == 1 ? true : false;
  pergolaSettings.extraOptionHeaters =
    parseInt(paramArray[18]) == 1 ? true : false;
  pergolaSettings.extraOptionMoodLight =
    parseInt(paramArray[19]) == 1 ? true : false;
  sceneTime = parseInt(paramArray[20]) == 1 ? "Night" : "Day";
  qrScaned = parseInt(paramArray[21]);

  if (callback != null) callback();

  //CheckQRMobile();
}

// eslint-disable-next-line no-unused-vars
var wix_url_base = null;
var wix_current_url = null;
var wix_url_load_params = null;

// eslint-disable-next-line no-unused-vars
function PostMassagesListener(event) {
  let receivedMessage = event.data;
  //console.log("Отримано повідомлення з main сайту:", receivedMessage);

  if (receivedMessage == "undefined") {
    return;
  }
  if (receivedMessage == undefined) {
    return;
  }
  if (receivedMessage == null) {
    return;
  }

  if (receivedMessage.includes("WIX_URL_LOAD|")) {
    return;
  }
  if (receivedMessage.includes("WIX_CURRENT_URL|")) {
    wix_current_url = receivedMessage.replace("WIX_CURRENT_URL|", "");
    return;
  }
  if (receivedMessage.includes("WIX_URL_LOAD_Params|")) {
    wix_url_load_params = receivedMessage.replace("WIX_URL_LOAD_Params|", "");
    var url =
      location.protocol + "//" + location.host + location.pathname + "?";
    history.pushState(null, "marevo", url + "config=" + wix_url_load_params);
    return;
  }
  if (receivedMessage.includes("URL_Params|")) {
    return;
  }
  if (receivedMessage.includes("WIX_URL_BASE|")) {
    wix_url_base = receivedMessage.replace("WIX_URL_BASE|", "");
    return;
  }

  if (receivedMessage.includes("WIX_IS_LOADED|")) {
    return;
  }
}

if (window.addEventListener) {
  // window.addEventListener("message", PostMassagesListener); //! for WIX
} else {
  // IE8
  // window.attachEvent("onmessage", PostMassagesListener); //! for WIX
}

function WriteURLParameters() {
  if (!paramsLoaded) {
    return;
  }
  if (blockURLWriter) {
    return;
  }

  if (!delayForWriteURL) {
    delayForWriteURL = true;
    promiseDelay(100, function () {
      history.pushState(null, "marevo", GetURLWithParameters());
      if (isWIX == true) {
        window.parent.postMessage(
          "URL_Params|" + GetURLWithParameters("", true),
          "*"
        );
      }
      delayForWriteURL = false;
    });
  }
}

function GetParametersString() {
  parametersValue = "";

  if (pergolaSettings == null) {
    return parametersValue;
  }

  var splitValue = "-";

  parametersValue += pergolaSettings.width + splitValue;
  parametersValue += pergolaSettings.length + splitValue;
  parametersValue += pergolaSettings.height + splitValue;
  parametersValue += pergolaSettings.postSize + splitValue;
  parametersValue += pergolaSettings.colorHex + splitValue;
  parametersValue += pergolaSettings.colorLouveredHex + splitValue;
  parametersValue += pergolaSettings.colorLedHex + splitValue;
  parametersValue += pergolaSettings.colorMoodHex + splitValue;
  parametersValue += pergolaSettings.roofType + splitValue;
  parametersValue += pergolaSettings.roofLouveredDirection + splitValue;
  parametersValue += pergolaSettings.roofLouveredRotate + splitValue;
  parametersValue +=
    (pergolaSettings.mountingWall_Back == true ? 1 : 0) + splitValue;
  parametersValue +=
    (pergolaSettings.mountingWall_Left == true ? 1 : 0) + splitValue;
  parametersValue +=
    (pergolaSettings.mountingWall_Right == true ? 1 : 0) + splitValue;
  parametersValue +=
    (pergolaSettings.extraOptionLight == true ? 1 : 0) + splitValue;
  parametersValue += pergolaSettings.extraOptionLightSpacing + splitValue;
  parametersValue +=
    (pergolaSettings.extraOptionFan == true ? 1 : 0) + splitValue;
  parametersValue +=
    (pergolaSettings.extraOptionLed == true ? 1 : 0) + splitValue;
  parametersValue +=
    (pergolaSettings.extraOptionHeaters == true ? 1 : 0) + splitValue;
  parametersValue +=
    (pergolaSettings.extraOptionMoodLight == true ? 1 : 0) + splitValue;
  parametersValue += (sceneTime == "Night" ? 1 : 0) + splitValue;
  parametersValue += qrScaned;

  parametersValue = parametersValue.SEncode();

  return parametersValue;
}

function GetURLWithParameters(updateURL = null, withoutKey = false) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const entries = urlParams.entries();

  var url = location.protocol + "//" + location.host + location.pathname + "?";

  if (updateURL != null) {
    url = updateURL + "?";
  }

  var configEmpty = true;

  for (const entry of entries) {
    if (entry[0] == parametersKey) {
      url += parametersKey + "=" + GetParametersString() + "&";
      configEmpty = false;
    } else if (entry[0] == "onlyAR") {
      continue;
    } else {
      url += entry[0] + "=" + entry[1] + "&";
    }
  }

  if (configEmpty) {
    url += parametersKey + "=" + GetParametersString();
  }

  if (withoutKey) {
    url = url.replace("?" + parametersKey + "=", "");
  }

  if (url.endsWith("&")) {
    url = url.substring(0, url.length - 1);
  }

  return url;
}

// eslint-disable-next-line no-unused-vars
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//#endregion

//#region UTILS

function waitFor(conditionFunction) {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    // eslint-disable-next-line no-unused-vars
    else setTimeout((_) => poll(resolve), 400);
  };

  return new Promise(poll);
}

function promiseDelay(time, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      if (callback != null) {
        callback();
      }
    }, time);
  });
}

// eslint-disable-next-line no-unused-vars
async function waitForValueChange(input, result, callback) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (input === result) {
        clearInterval(interval);
        resolve();

        if (callback != null) {
          callback();
        }
      }
    }, 100);
  });
}

//#endregion

//#region SHADER and MORPHS

function Shader_ChangeVertexToWorldpos(object) {
  var vUvSymbol = "vUv";
  var vUvSymbolNormal = "vUv";
  var uvTransformSymbol = "uvTransform";

  // if(THREE.REVISION >= 150){
  vUvSymbol = "vMapUv";
  vUvSymbolNormal = "vNormalMapUv";
  uvTransformSymbol = "mapTransform";
  // }

  promiseDelayShaderSettings(500, object, () => {
    if (object.isMesh) {
      if (isWorldposVertexShaderEnabled) {
        if (object.material) {
          if (object.material.name.includes("_Z")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;
                  `
                );
            };
          } else if (object.material.name.includes("_Y")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;
                  `
                );
            };
          } else if (object.material.name.includes("_X")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;

                    // Поворот текстури на 90 градусів
                    mat2 rotation = mat2(0.0, 1.0, -1.0, 0.0);
                    vec2 rotatedUV = rotation * vec2(worldPosition.y, worldPosition.z);
    
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(rotatedUV, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(rotatedUV, 1)).xy;
                  `
                );
            };
          }
          object.material.needsUpdate = true;
        }
      }
    }
  });
}

function promiseDelayShaderSettings(time, object, callback) {
  if (time == null) {
    time = 2000;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      if (object.material.map == null) {
        promiseDelayShaderSettings(time, object, callback);
      } else {
        if (callback != null) {
          callback();
        }
      }
    }, time);
  });
}

function InitMorphModel(model) {
  //var BufferGeometryUtils_script = document.createElement('script');
  //BufferGeometryUtils_script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/three@0.147/examples/js/utils/BufferGeometryUtils.js');
  //document.body.appendChild(BufferGeometryUtils_script);

  ParseMorphByModel(model);
}

export function ParseMorphByModel(model, callback = null) {
  morphs = [];
  model.traverse((object) => {
    if (object.isMesh) {
      Shader_ChangeVertexToWorldpos(object);

      if (object.morphTargetDictionary != null) {
        for (const [key, value] of Object.entries(
          object.morphTargetDictionary
        )) {
          var morph = {
            name: key,
            object: object,
            key: value,
            value: value,
          };

          if (!morphs.includes(morph)) {
            morphs.push(morph);
          }
        }
      }
    }
  });

  PrepareGlobalMorphs(callback);
}

function PrepareGlobalMorphs(callback = null) {
  globalMorphs = [];

  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];

    var hasMorph = false;

    for (let m = 0; m < globalMorphs.length; m++) {
      const globalMorph = globalMorphs[m];
      if (globalMorph.name != morph.name) {
        continue;
      }
      hasMorph = true;
      break;
    }

    if (!hasMorph) {
      globalMorphs.push(morph);
    }
  }

  if (callback != null) {
    callback();
  }
}

export function ComputeMorphedAttributes() {
  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];
    var computeMorphedAttributesValue = computeMorphedAttributes(morph.object);
    morph.object.geometry.computeMorphedAttributes =
      computeMorphedAttributesValue;
  }

  // console.log(scene);

  scene.traverse((object) => {
    if (object.isMesh) {
      var computeMorphedAttributesValue = computeMorphedAttributes(object);

      console.log(computeMorphedAttributesValue);

      object.geometry.computeMorphedAttributes = computeMorphedAttributesValue;
    }
  });
}

// eslint-disable-next-line no-unused-vars
function ChangeObjectMorph(object, key, inputValue) {
  if (!object) return;

  function processObject(obj) {
    if (obj.isMesh && obj.morphTargetDictionary) {
      const morphIndex = obj.morphTargetDictionary[key];
      if (morphIndex !== undefined && obj.morphTargetInfluences) {
        obj.morphTargetInfluences[morphIndex] = inputValue;
      }
    }

    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((child) => processObject(child));
    }
  }

  processObject(object);
}

// eslint-disable-next-line no-unused-vars
export function ChangeObjectWithMorph(object, key, inputvalue) {
  if (object == null) {
    return;
  }

  if (object.morphTargetInfluences != null) {
    object.morphTargetInfluences[key] = inputvalue;
  }
}

export function ChangeGlobalMorph(morphName, inputvalue) {
  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];

    if (morph.name != morphName) {
      continue;
    }
    if (morph.object == null) {
      continue;
    }
    if (!morph.object.isMesh) {
      continue;
    }
    if (morph.object.morphTargetInfluences == null) {
      continue;
    }

    morph.object.morphTargetInfluences[morph.key] = inputvalue;
  }
}

export function ClipMeshWithDashedEffectAfterMorph(mesh, step = 1, gap = 0.3) {
  if (
    !mesh ||
    !mesh.geometry ||
    !(mesh.geometry instanceof THREE.BufferGeometry)
  ) {
    console.error("Невалідний меш для обрізання.");
    return;
  }

  mesh.geometry.applyMatrix4(mesh.matrixWorld);
  mesh.geometry = mesh.geometry.toNonIndexed(); // Робимо геометрію неіндексованою
  const geometry = mesh.geometry.clone(); // Клонування геометрії для роботи

  const positions = geometry.attributes.position.array; // Масив позицій
  if (!positions) {
    console.error("Геометрія не містить позицій вершин.");
    return;
  }

  const newPositions = [];
  const vertexStepMap = [];

  const totalLength = step; // Довжина одного сегмента (зубчик + прогалина)
  const gapStart = step - gap; // Межа початку прогалини

  // Обробка вершин для створення штрихованого ефекту по осі Z
  for (let i = 0; i < positions.length; i += 3) {
    const zPos = positions[i + 2]; // Координата Z для поточної вершини

    // Округлення для усунення похибок плаваючої точки
    const normalizedPosition =
      zPos - Math.floor(zPos / totalLength) * totalLength;

    // Перевіряємо, чи вершина знаходиться в зоні штриха
    if (normalizedPosition < gapStart) {
      newPositions.push(positions[i], positions[i + 1], positions[i + 2]);
      vertexStepMap.push(newPositions.length / 3 - 1); // Маркуємо як частину штриха
    } else {
      vertexStepMap.push(-1); // Прогалина
    }
  }

  // Створення нових індексів
  const newIndices = [];
  const oldIndices = geometry.index ? geometry.index.array : null;

  if (oldIndices) {
    for (let j = 0; j < oldIndices.length; j += 3) {
      const v1 = vertexStepMap[oldIndices[j]];
      const v2 = vertexStepMap[oldIndices[j + 1]];
      const v3 = vertexStepMap[oldIndices[j + 2]];

      // Додаємо тільки трикутники, які не містять прогалини
      if (v1 >= 0 && v2 >= 0 && v3 >= 0) {
        newIndices.push(v1, v2, v3);
      }
    }
  }

  // Створення фінальної геометрії
  const dashedGeometry = new THREE.BufferGeometry();
  dashedGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(newPositions), 3)
  );

  if (newIndices.length > 0) {
    dashedGeometry.setIndex(newIndices);
  }

  // Оновлення геометрії у меші
  mesh.geometry.dispose(); // Звільнити стару геометрію
  mesh.geometry = dashedGeometry;
  mesh.geometry.computeBoundingBox();
  mesh.geometry.computeBoundingSphere();
}

export function ConvertMorphValue(
  inputval,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  const result =
    destStart +
    ((inputval - srcStart) * (destEnd - destStart)) / (srcEnd - srcStart);
  return result;
}

export function ConvertMorphValueReverse(
  outputVal,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  const result =
    srcStart +
    ((outputVal - destStart) * (srcEnd - srcStart)) / (destEnd - destStart);
  return result;
}

// eslint-disable-next-line no-unused-vars
function animateMorph(
  morphName,
  valueStart,
  valueEnd,
  callback = () => {},
  timeInterval = 200,
  steps = 5
) {
  DEBUG_MODE_VALUES && console.log("🚀 ~ animateMorph ~ ");
  const stepDuration = timeInterval / steps;
  const stepValue = (valueEnd - valueStart) / steps;
  let currentValue = valueStart;
  let completedSteps = 0;

  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      ChangeGlobalMorph(morphName, currentValue);
      currentValue += stepValue;
      completedSteps++;
      if (completedSteps === steps) {
        ChangeGlobalMorph(morphName, valueEnd);
        callback();
      }
    }, i * stepDuration);
  }
}

//#endregion

//#region PROJECT FUNCTIONS PERGOLA

export function generateMidpoints(
  vectorA,
  vectorB,
  numPoints,
  isFirstLastPointAdded = false
) {
  const points = [];

  if (isFirstLastPointAdded) {
    points.push(vectorA.clone());
  }

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    const point = new THREE.Vector3().lerpVectors(vectorA, vectorB, t);

    points.push(point);
  }

  if (isFirstLastPointAdded) {
    points.push(vectorB.clone());
  }

  return points;
}

export function generateCenterMidpoints(
  vectorA,
  vectorB,
  numPoints,
  isFirstLastPointAdded = false,
  divide = 1
) {
  const points = [];

  if (isFirstLastPointAdded) {
    points.push(vectorA);
  }

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    const point = new THREE.Vector3().lerpVectors(vectorA, vectorB, t);
    points.push(point);
  }

  if (isFirstLastPointAdded) {
    points.push(vectorB);
  }

  if (points.length == 1) {
    return points;
  }

  var dividePoints = points;
  for (let index = 0; index < divide; index++) {
    dividePoints = pointDivideProcess(dividePoints);
  }

  return dividePoints;
}

function pointDivideProcess(points) {
  const dividePoint = [];

  for (let i = 0; i < points.length; i++) {
    if (i + 1 >= points.length) {
      continue;
    }

    var point1 = points[i];
    var point2 = points[i + 1];
    const centerPoint = new THREE.Vector3().lerpVectors(point1, point2, 0.5);

    dividePoint.push(centerPoint);
  }

  return dividePoint;
}

function setValueToCoordinates(points, axis, value) {
  for (let i = 0; i < points.length; i++) {
    points[i][axis] = value;
  }
}

var pointLights = [];
var ledLights = [];
var moodLeds = [];

export class PergolaObject {
  constructor(settings) {
    this.productId = "";
    this.name = "";
    this.dimensions = new PergolaDimensions();
    this.post = new PergolaPost();
    this.color = new PergolaColorElement();
    this.span = new PergolaSpan();
    this.roof = new PergolaRoof();
    this.system = new PergolaSystem();
    this.mountingWall = new PergolaMountingWall();
    this.extraOptions = new PergolaExtraOptions();
    this.labelObject = null;
    this.settings = settings;
    this.lastSettings = new PergolaSettings();
    this.theModel = null;
    this.totalWidth = 0;
    this.totalHeight = 0;
    this.totalLength = 0;
    this.heatersFront = [];
    this.heatersBack = [];
    this.fans = [];
    this.fansBeam = [];
    this.fansBeamY = [];
    this.leds = [];
    this.ledsDifSide = [];
    this.pointXforSkylight = [];
  }

  createFrom3DModel(model) {
    pointLights = [];
    ledLights = [];
    moodLeds = [];

    this.theModel = model;
    window.model = model;
    model.traverse((o) => {
      if (o.name.includes("lable")) {
        this.labelObject = o;
      }

      // //POSTS
      if (o.name.includes("post")) {
        if (o.name.includes("post_FR")) {
          this.post.postFR = o;
        } else if (o.name.includes("post_FL")) {
          this.post.postFL = o;
        } else if (o.name.includes("post_BL")) {
          this.post.postBL = o;
        } else if (o.name.includes("post_BR")) {
          this.post.postBR = o;
        }
      }

      // BASE
      if (o.name.includes("header") && !o.name.includes("LED")) {
        this.changeObjectVisibility(o);
        o.visible = true;
      }

      // SOLID MATERIAL
      if (o.name.includes("solid_roof_5_flat")) {
        materialSolid = o.material.normalMap;
      }

      // WALLS
      if (o.name.includes("wall")) {
        var mountingWall = new PergolaMountingWallElement();
        mountingWall.object = o;

        if (o.name.includes("_R")) {
          mountingWall.side = PergolaElementOrientSide.Right;
          o.position.z += 0.05;
        } else if (o.name.includes("_L")) {
          mountingWall.side = PergolaElementOrientSide.Left;
          o.position.z += 0.05;
        } else if (o.name.includes("_back")) {
          mountingWall.side = PergolaElementOrientSide.Back;
          o.position.z += 0.05;
        } else {
          mountingWall.side = PergolaElementOrientSide.Right;
        }

        this.mountingWall.elements.push(mountingWall);
      }

      //* Option Beam
      if (o.name === "beam") {
        const beam = new PergolaExtraOptionElement();

        beam.type = PergolaExtraOptionType.beam;
        beam.object = o;

        this.extraOptions.elements.push(beam);
      }

      //* Fan
      if (o.name.includes("fan")) {
        var fan = new PergolaExtraOptionElement();

        fan.type = PergolaExtraOptionType.fan;
        fan.object = o;

        this.extraOptions.elements.push(fan);
      }

      //* LED
      if (o.name.includes("flushmount_lights")) {
        var light = new PergolaExtraOptionElement();

        light.type = PergolaExtraOptionType.light;
        light.object = o;

        this.extraOptions.elements.push(light);
      }
    });

    // ROOF
    //* SOLID
    const roofTypeSolid = new PergolaRoofTypeSolid();

    model.traverse((o) => {
      if (o.name.includes("solid_roof")) {
        if (o.name.includes("_frame")) {
          const solidObject = new PergolaRoofTypeSolidObject();
          solidObject.name = o.name;
          solidObject.type = PergolaRoofObjectType.frame;
          solidObject.object = o;
          roofTypeSolid.frames.push(solidObject);
        } else {
          var solidObject = new PergolaRoofTypeSolidObject();
          solidObject.name = o.name;
          solidObject.type = PergolaRoofObjectType.roof;
          solidObject.object = o;
          roofTypeSolid.objects.push(solidObject);

          if (o.name.includes("_0,75")) {
            solidObject.planks = 7;
            solidObject.plank8inch = null;
          }
          if (o.name.includes("_0,5")) {
            solidObject.planks = 0;
            solidObject.plank8inch = null;
          }
          if (o.name.includes("_1")) {
            solidObject.planks = 1;
            solidObject.plank8inch = true;
          }
          if (o.name.includes("_2")) {
            solidObject.planks = 2;
            solidObject.plank8inch = true;
          }
          if (o.name.includes("_3")) {
            solidObject.planks = 3;
            solidObject.plank8inch = true;
          }
          if (o.name.includes("_4")) {
            solidObject.planks = 4;
            solidObject.plank8inch = true;
          }
          if (o.name.includes("_5")) {
            solidObject.planks = 5;
            solidObject.plank8inch = true;
          }
          if (o.name.includes("_6")) {
            solidObject.planks = 6;
            solidObject.plank8inch = true;
          }
          if (o.name.includes("_flat")) {
            solidObject.plank8inch = false;
          }
          if (o.name.includes("_L")) {
            solidObject.direction = PergolaSide.Left;
            solidObject.plank8inch = null;
          }
          if (o.name.includes("_R")) {
            solidObject.direction = PergolaSide.Right;
            solidObject.plank8inch = null;
          }
        }
      } else if (o.name.includes("skylight")) {
        const solidObject = new PergolaRoofTypeSolidObject();
        solidObject.name = o.name;
        solidObject.type = PergolaRoofObjectType.skylight;
        solidObject.plank8inch = null;
        solidObject.object = o;
        roofTypeSolid.objects.push(solidObject);
      } else if (o.name.includes("rain_front")) {
        const solidObject = new PergolaRoofTypeSolidObject();
        solidObject.name = o.name;
        solidObject.type = PergolaRoofObjectType.gutter;
        solidObject.side = PergolaSide.Front;
        solidObject.plank8inch = null;
        solidObject.object = o;
        roofTypeSolid.objects.push(solidObject);
      } else if (o.name.includes("rain_back")) {
        const solidObject = new PergolaRoofTypeSolidObject();
        solidObject.name = o.name;
        solidObject.type = PergolaRoofObjectType.gutter;
        solidObject.side = PergolaSide.Back;
        solidObject.plank8inch = null;
        solidObject.object = o;
        roofTypeSolid.objects.push(solidObject);
      }
    });

    this.roof.solid = roofTypeSolid;

    //* SYSTEM
    const systemElements = {
      zip_shade: {
        type: pergolaConst.systemType.autoShade,
        name: pergolaConst.systemNameString.autoShade,
      },
      privacy_wall_frame: {
        type: pergolaConst.systemType.privacyWall,
        name: pergolaConst.systemNameString.privacyWall,
      },
    };

    model.traverse((o) => {
      Object.keys(systemElements).forEach((key) => {
        if (o.name.includes(key)) {
          const systemObject = new PergolaSystemObject();
          systemObject.name = systemElements[key].name;
          systemObject.object = o;
          systemObject.type = systemElements[key].type;
          systemObject.direction = pergolaConst.direction.Straight;
          systemObject.openingside = true;
          systemObject.side = pergolaConst.side.Front;

          if (o.name.includes("_side")) {
            systemObject.direction = pergolaConst.direction.Perpendicular;
            systemObject.side = pergolaConst.side.Left;
          }

          this.system.objects.push(systemObject);
        }
      });
    });

    // this.prepareBeams();
    this.preparePosts();
    this.prepareRoof();
    this.prepareOptions();
    this.prepareSolid();
    // this.prepareFrames();
    // this.prepareLouvereds();
    this.prepareSystems();
    this.prepareSpans();
    this.prepareExtraOptions();
    updateHotspots(hotspots);
    // this.cloneMaterialTexture("wall");
    // this.cloneMaterialTexture("wall_side");
    // this.cloneMaterialTexture("wall_tile");

    ParseMorphByModel(model);

    this.animateFans();

    setTimeout(() => {
      state.currentActiveSystems = null;
      pergola.update();
    }, 500);

    this.update();
  }

  prepareSolid() {
    const roofElementQty = Math.floor(
      this.getMeters(MORPH_DATA.width.max) /
        state.solidRoofElementWidth_m._6_plank
    );
    const skylightQty =
      Math.floor(
        this.getMeters(MORPH_DATA.width.max) /
          (state.solidRoofElementWidth_m._6_plank * 3 +
            state.solidRoofSkylightWidth_m)
      ) - 1;

    this.cloneSolidObject(
      PergolaRoofObjectType.roof,
      6,
      true,
      null,
      roofElementQty
    );
    this.cloneSolidObject(PergolaRoofObjectType.roof, 5, true, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 4, true, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 3, true, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 2, true, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 1, true, null, 1);
    this.cloneSolidObject(
      PergolaRoofObjectType.roof,
      6,
      false,
      null,
      roofElementQty
    );
    this.cloneSolidObject(PergolaRoofObjectType.roof, 5, false, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 4, false, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 3, false, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 2, false, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 1, false, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 0, null, null, 1);
    this.cloneSolidObject(PergolaRoofObjectType.roof, 7, null, null, 1);
    this.cloneSolidObject(
      PergolaRoofObjectType.skylight,
      null,
      null,
      null,
      skylightQty
    );
    this.cloneSolidObject(
      PergolaRoofObjectType.gutter,
      null,
      null,
      PergolaSide.Front,
      1
    );
    this.cloneSolidObject(
      PergolaRoofObjectType.gutter,
      null,
      null,
      PergolaSide.Back,
      1
    );
  }

  cloneSolidObject(type, planks, plank8inch, side, count) {
    const element = this.roof.solid.objects.find(
      (item) =>
        item.type == type &&
        item.planks == planks &&
        item.plank8inch == plank8inch &&
        item.side == side
    );

    if (element == null) {
      return;
    }

    for (let index = 0; index < count; index++) {
      const clonedMesh = element.object.clone();
      clonedMesh.visible = false;

      const parent = scene.getObjectByName("Scene");

      if (parent != null) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      const solidObject = new PergolaRoofTypeSolidObject();
      solidObject.name = element.name;
      solidObject.type = type;
      solidObject.planks = planks;
      solidObject.plank8inch = plank8inch;
      solidObject.side = side;
      solidObject.object = clonedMesh;

      this.roof.solid.objects.push(solidObject);
    }
  }

  preparePosts() {
    const countPosts = 40;

    // const qtyMiddlePostsWidth = Math.floor(
    //   MORPH_DATA.width.max / minInterval
    // );

    this.clonePostObject(countPosts, "post3x3");
    this.clonePostObject(countPosts, "post3x3Left");
    this.clonePostObject(countPosts, "post3x3Right");
    this.clonePostObject(countPosts, "post3x3Back");
    this.clonePostObject(countPosts, "post3x3Front");

    this.clonePostObject(countPosts, "postSquare");
    this.clonePostObject(countPosts, "postSquareLeft");
    this.clonePostObject(countPosts, "postSquareRight");
    this.clonePostObject(countPosts, "postSquareBack");
    this.clonePostObject(countPosts, "postSquareFront");

    this.clonePostObject(countPosts, "postRound");
    this.clonePostObject(countPosts, "postRoundLeft");
    this.clonePostObject(countPosts, "postRoundRight");
    this.clonePostObject(countPosts, "postRoundBack");
    this.clonePostObject(countPosts, "postRoundFront");

    this.clonePostObject(countPosts, "postHeadsOne");
    this.clonePostObject(countPosts, "postHeadsOneLeft");
    this.clonePostObject(countPosts, "postHeadsOneRight");
    this.clonePostObject(countPosts, "postHeadsOneBack");
    this.clonePostObject(countPosts, "postHeadsOneFront");

    this.clonePostObject(countPosts, "postHeadsTwo");
    this.clonePostObject(countPosts, "postHeadsTwoLeft");
    this.clonePostObject(countPosts, "postHeadsTwoRight");
    this.clonePostObject(countPosts, "postHeadsTwoBack");
    this.clonePostObject(countPosts, "postHeadsTwoFront");

    this.clonePostObject(countPosts, "rainFront");
    this.clonePostObject(countPosts, "rainBack");

    this.clonePostObject(2, "rainCornerFront");
    this.clonePostObject(2, "rainCornerBack");
  }

  getMeters(feet) {
    const meters = feet * 0.3048;
    return meters;
  }

  getPostPoints(xOffset, zOffset) {
    const offsetX = 0.075;
    const offsetZ = 0;

    const qtyWidth = Math.floor(state.width / state.postWidthInterval);
    const qtyLength = Math.floor(state.length / state.postDepthInterval);

    const qtyWidthLouver = Math.floor(state.width / state.louverInterval);
    const qtyLengthLouver = Math.floor(state.length / state.louverInterval);

    // Викликаємо з офсетами
    const { FL_point, FR_point, RR_point } = this.getCornerPoints(
      xOffset ?? offsetX,
      zOffset ?? offsetZ
    );

    const point_post_width = generateMidpoints(FL_point, FR_point, qtyWidth);
    const point_louver_width = generateMidpoints(
      FL_point,
      FR_point,
      qtyWidthLouver
    );

    const point_post_length = generateMidpoints(FR_point, RR_point, qtyLength);
    const point_louver_length = generateMidpoints(
      FR_point,
      RR_point,
      qtyLengthLouver
    );

    return {
      point_post_width,
      point_louver_width,
      point_post_length,
      point_louver_length,
    };
  }

  getPostPointsCombo() {
    let offsetX = 0;
    let offsetZ = 0;
    let overhangValue = 0;

    switch (this.settings.roofOverhang) {
      case PergolaRoofOverhang._12inch:
        offsetX = 12 * 0.0254;
        offsetZ = 12 * 0.0254;
        overhangValue = this.interpolateValue(12, 12, 24);
        break;

      case PergolaRoofOverhang._16inch:
        offsetX = 16 * 0.0254;
        offsetZ = 16 * 0.0254;
        overhangValue = this.interpolateValue(16, 12, 24);
        break;

      case PergolaRoofOverhang._20inch:
        offsetX = 20 * 0.0254;
        offsetZ = 20 * 0.0254;
        overhangValue = this.interpolateValue(20, 12, 24);
        break;

      case PergolaRoofOverhang._24inch:
        offsetX = 24 * 0.0254;
        offsetZ = 24 * 0.0254;
        overhangValue = this.interpolateValue(24, 12, 24);
        break;

      default:
        offsetX = 0;
        offsetZ = 0;
        break;
    }

    if (state.roofType === PergolaRoofType.Louvered) {
      offsetX = this.settings.postSize === PergolaPostSize._4inch ? 0.02 : 0.06;
      offsetZ = this.settings.postSize === PergolaPostSize._4inch ? 0.03 : 0.07;
    }

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    const FL_post_point = FL_point.clone().add(
      new THREE.Vector3(offsetX, 0, -offsetZ)
    );
    const FR_post_point = FR_point.clone().add(
      new THREE.Vector3(-offsetX, 0, -offsetZ)
    );
    const RL_post_point = RL_point.clone().add(
      new THREE.Vector3(offsetX, 0, offsetZ)
    );
    const RR_post_point = RR_point.clone().add(
      new THREE.Vector3(-offsetX, 0, offsetZ)
    );

    const widthInterval = state.ab ? 20.5 : 12.5;
    let lengthInterval = 12.5;

    // if (this.settings.postHasSteelInserts && this.settings.hasMiddleBeam) {
    //   lengthInterval = this.settings.postLengthIntervalMiddleBeam;
    // }

    let overhangOffset = 0;

    switch (this.settings.roofOverhang) {
      case PergolaRoofOverhang._12inch:
        overhangOffset = 12 * 0.0254 * 2;
        break;
      case PergolaRoofOverhang._16inch:
        overhangOffset = 16 * 0.0254 * 2;
        break;
      case PergolaRoofOverhang._20inch:
        overhangOffset = 20 * 0.0254 * 2;
        break;
      case PergolaRoofOverhang._24inch:
        overhangOffset = 24 * 0.0254 * 2;
        break;
      default:
        overhangOffset = 0;
        break;
    }

    const front_points = generateMidpoints(
      FL_post_point,
      FR_post_point,
      Math.floor(
        (state.width - this.inchesToMeters(state.overhang)) / widthInterval
      )
    );
    const rear_points = generateMidpoints(
      RL_post_point,
      RR_post_point,
      Math.floor(
        (state.width - this.inchesToMeters(state.overhang)) / widthInterval
      )
    );
    const left_points = generateMidpoints(
      FL_post_point,
      RL_post_point,
      Math.floor(
        (state.length - this.inchesToMeters(state.overhang)) / lengthInterval
      )
    );
    const right_points = generateMidpoints(
      FR_post_point,
      RR_post_point,
      Math.floor(
        (state.length - this.inchesToMeters(state.overhang)) / lengthInterval
      )
    );

    // if (left_points.length % 2 === 1) {
    //   this.settings.isMiddleBeamVisible = true;
    // } else {
    //   this.settings.isMiddleBeamVisible = false;
    // }

    return {
      FL_post_point,
      FR_post_point,
      RL_post_point,
      RR_post_point,
      front_points,
      rear_points,
      left_points,
      right_points,
      offset: offsetX,
    };
  }

  changeRoofVisibility(status, arrayName = null, type = null, reset = false) {
    if (this.roof == null || !arrayName) {
      return;
    }
    if (!this.roof[arrayName]) {
      return;
    }

    for (let i = 0; i < this.roof[arrayName].length; i++) {
      let element = this.roof[arrayName][i];

      if (type != null && element.type !== type) {
        continue;
      }

      if (Array.isArray(element)) {
        element.forEach((item) => {
          if (item.object) {
            item.object.visible = status;

            if (item.object.isGroup) {
              item.object.children.forEach((child) => (child.visible = status));
            }

            if (status === false && reset === true) {
              item.active = false;
            }
          }
        });
      } else if (element.object) {
        element.object.visible = status;

        if (element.object.isGroup) {
          element.object.children.forEach((child) => (child.visible = status));
        }

        if (status === false && reset === true) {
          element.active = false;
        }
      }
    }
  }

  addOffsetWithCorner(target, direction, offset) {
    if (Array.isArray(target)) {
      return target.map((el) => {
        console.log(el, el[direction]);

        return {
          ...el,
          [direction]: el[direction] + offset,
        };
      });
    } else {
      return {
        ...target,
        [direction]: target[direction] + offset,
      };
    }
  }

  addOffset(target, direction, offset) {
    if (Array.isArray(target)) {
      return target.map((el) => {
        const vec = new THREE.Vector3(el.x, el.y, el.z);
        vec[direction] += offset;
        return vec;
      });
    } else {
      const vec = new THREE.Vector3(target.x, target.y, target.z);
      vec[direction] += offset;
      return vec;
    }
  }

  // addOffset(target, direction, offset) {
  //   if (Array.isArray(target)) {
  //     return target.map((el) => {
  //       console.log(el, el[direction]);

  //       return {
  //         ...el,
  //         [direction]: el[direction] + offset,
  //       };
  //     });
  //   } else {
  //     return {
  //       ...target,
  //       [direction]: target[direction] + offset,
  //     };
  //   }
  // }

  generateCenterPoints(points) {
    const centerPoints = [];

    for (let i = 0; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      const midZ = (points[i].z + points[i + 1].z) / 2;

      centerPoints.push(new THREE.Vector3(midX, midY, midZ));
    }

    return centerPoints;
  }

  interpolateValue(inputval, rangeMin, rangeMax, kMin = 0, kMax = 1) {
    return (
      kMin + ((inputval - rangeMin) * (kMax - kMin)) / (rangeMax - rangeMin)
    );
  }

  changeRoofVisibilityRest(
    status,
    arrayName = null,
    type = null,
    reset = false
  ) {
    if (this == null || !arrayName) {
      return;
    }
    if (!this[arrayName]) {
      return;
    }

    for (let i = 0; i < this[arrayName].length; i++) {
      let element = this[arrayName][i];

      if (type != null && element.type !== type) {
        continue;
      }

      if (Array.isArray(element)) {
        element.forEach((item) => {
          if (item.object) {
            item.object.visible = status;

            if (item.object.isGroup) {
              item.object.children.forEach((child) => (child.visible = status));
            }

            if (status === false && reset === true) {
              item.active = false;
            }
          }
        });
      } else if (element.object) {
        element.object.visible = status;

        if (element.object.isGroup) {
          element.object.children.forEach((child) => (child.visible = status));
        }

        if (status === false && reset === true) {
          element.active = false;
        }
      }
    }
  }

  setupLiftSlideDoor(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key, shatter;

    frame = system.object;
    door = system.object.children[0];

    shatter = system.object.children[0].children[0];

    console.log(shatter);

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      // if (!system.openingside) {
      //   system.object.position.z = -span.width + 0;
      // }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      // if (system.openingside) {
      //   system.object.position.z = -span.width + 0;
      // }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);

    const targetValueHeight = ConvertMorphValue(
      state.height,
      MORPH_DATA.height.min,
      MORPH_DATA.height.max
    );

    // ChangeObjectMorph(door, "height", targetValueHeight);
    ChangeGlobalMorph("height", targetValueHeight);

    const frameWidth = system.spanWidth;

    const doorThicknessM =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.LiftSlideDoor.overlapMM;
    const doorMaxWidthMM = subSystems_options.LiftSlideDoor.elementMaxWidthMM;

    let doorCount = Math.ceil(
      (frameWidth * 1000 - overlapMM) / (doorMaxWidthMM - overlapMM)
    );

    system.doorQty = doorCount;

    // if (doorCount > 5) {

    if (doorCount % 2 !== 0) {
      doorCount += 1;
    }
    // }

    const doorWidthMM = (frameWidth * 1000 - overlapMM) / doorCount + overlapMM;

    const doorWidthMorph = this.interpolateValue(
      doorWidthMM,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .max
    );
    const doorWidthKeyName =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .key;
    const doorWidthKeyNameShatter =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].shatter.width
        .key;

    // ChangeObjectMorph(door, doorWidthKeyName, doorWidthMorph);
    // ChangeObjectMorph(shatter, doorWidthKeyNameShatter, doorWidthMorph);

    ChangeGlobalMorph(doorWidthKeyName, doorWidthMorph);
    ChangeGlobalMorph(doorWidthKeyNameShatter, doorWidthMorph);

    const gapShutter = 0;
    const heightShutter = 0.02697;
    const fullShutterHeight = heightShutter + gapShutter;
    const totalHeight = this.getMeters(state.height) - 0.1;
    const countShutter = Math.floor(totalHeight / fullShutterHeight);

    for (let index = door.children.length - 1; index >= 1; index--) {
      const element = door.children[index];
      door.remove(element);
    }

    for (let i = 1; i < countShutter; i++) {
      const newShutter = shatter.clone(); // Клонуємо разом з морфами
      newShutter.position.y = i * fullShutterHeight;

      this.changeObjectVisibility(true, newShutter); // Переключаємо видимість
      let radians = state.slidingShuttersRotate * (Math.PI / 180);

      newShutter.rotation.x = radians;

      door.children.push(newShutter);
    }

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = -0.003;

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      newDoor.scale.z = 0.78;
      newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.06);
      frame.add(newDoor);
    }

    this.openingLiftSlideDoor(span);
  }

  setupFixShutters(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key, shatter;

    frame = system.object;
    door = system.object.children[0];
    shatter = system.object.children[0].children[0];

    console.log(shatter);

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      // if (!system.openingside) {
      //   system.object.position.z = -span.width + 0;
      // }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      // if (system.openingside) {
      //   system.object.position.z = -span.width + 0;
      // }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);

    const targetValueHeight = ConvertMorphValue(
      state.height,
      MORPH_DATA.height.min,
      MORPH_DATA.height.max
    );

    // ChangeObjectMorph(door, "height", targetValueHeight);
    ChangeGlobalMorph("height", targetValueHeight);

    const frameWidth = system.spanWidth;

    const doorThicknessM =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.LiftSlideDoor.overlapMM;
    const doorMaxWidthMM = subSystems_options.LiftSlideDoor.elementMaxWidthMM;

    let doorCount = Math.ceil(
      (frameWidth * 1000 - overlapMM) / (doorMaxWidthMM - overlapMM)
    );

    system.doorQty = doorCount;

    // if (doorCount > 5) {

    if (doorCount % 2 !== 0) {
      doorCount += 1;
    }
    // }

    const doorWidthMM = (frameWidth * 1000 - overlapMM) / doorCount + overlapMM;

    const doorWidthMorph = this.interpolateValue(
      doorWidthMM,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .max
    );
    const doorWidthKeyName =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .keyFix;
    const doorWidthKeyNameShatter =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].shatter.width
        .keyFix;

    // ChangeObjectMorph(door, doorWidthKeyName, doorWidthMorph);
    // ChangeObjectMorph(shatter, doorWidthKeyNameShatter, doorWidthMorph);

    ChangeGlobalMorph(doorWidthKeyName, doorWidthMorph);
    ChangeGlobalMorph(doorWidthKeyNameShatter, doorWidthMorph);

    const gapShutter = 0;
    const heightShutter = 0.02697;
    const fullShutterHeight = heightShutter + gapShutter;
    const totalHeight = this.getMeters(state.height) - 0.1;
    const countShutter = Math.floor(totalHeight / fullShutterHeight);

    for (let index = door.children.length - 1; index >= 1; index--) {
      const element = door.children[index];
      door.remove(element);
    }

    for (let i = 1; i < countShutter; i++) {
      const newShutter = shatter.clone(); // Клонуємо разом з морфами
      newShutter.position.y = i * fullShutterHeight;

      this.changeObjectVisibility(true, newShutter); // Переключаємо видимість
      let radians = state.slidingFixShuttersRotate * (Math.PI / 180);

      newShutter.rotation.x = radians;

      door.children.push(newShutter);
    }

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = -0.001;

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < doorCount / 2; i++) {
        const newDoor = door.clone();
        newDoor.scale.z = 0.78;
        newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
        frame.add(newDoor);
      }
    }

    this.openingFixedShutter(span);
  }

  cloneWithMorphs(doorGroup) {
    const clonedGroup = doorGroup.clone();

    clonedGroup.traverse((child) => {
      if (child.isMesh && child.geometry && child.geometry.morphAttributes) {
        // Клонування геометрії та морфів
        child.geometry = child.geometry.clone();

        if (child.morphTargetInfluences) {
          // Копіюємо всі морфи, щоб вони застосовувались коректно
          child.morphTargetInfluences = [...child.morphTargetInfluences];
        }

        if (child.morphTargetDictionary) {
          // Також копіюємо словник морфів, якщо він є
          child.morphTargetDictionary = { ...child.morphTargetDictionary };
        }

        // Переконайтеся, що всі атрибути морфів копіюються в новий об'єкт
        if (child.geometry.morphAttributes.position) {
          child.geometry.morphAttributes.position = [
            ...child.geometry.morphAttributes.position,
          ];
        }
      }
    });

    return clonedGroup;
  }

  //* LiftSlideDoor
  openingLiftSlideDoor(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergola.interpolateValue(
      state.slidingShuttersInput,
      1,
      100,
      0,
      1
    );

    const frame = system.object;
    const totalDoorsQty = frame.children.length;
    // if (!frame || totalDoorsQty < 2) return;

    let shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    const frameWidth = system.spanWidth;

    const overlap = subSystems_options.LiftSlideDoor.overlapMM / 1000;
    const k = 2;
    const step = (frameWidth - overlap * k) / totalDoorsQty;

    const overlapMM = subSystems_options.LiftSlideDoor.overlapMM;

    const doorWidthMM =
      (frameWidth * 1000 - overlapMM) / totalDoorsQty + overlapMM;

    const doorWidthMorph = this.interpolateValue(
      doorWidthMM,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .max
    );

    // start position (closed)
    const generalOffset = 0.2;
    let doorStartPosX = -doorWidthMorph / 2 - generalOffset;

    // if (totalDoorsQty <= 5) {
    doorStartPosX = frameWidth / 2 - doorWidthMorph / 2 - generalOffset;

    for (let i = 0; i < totalDoorsQty; i++) {
      const door = frame.children[totalDoorsQty - 1 - i];
      door.position.x = doorStartPosX - step * i;
    }

    // opening
    const maxOpening = step * (totalDoorsQty - 1) - 0.0001;
    const currentOpenValue = this.interpolateValue(
      inputValue,
      0,
      1,
      0,
      maxOpening
    );
    const stepQty = Math.floor(currentOpenValue / step);
    const diffValue = currentOpenValue % step;

    for (let i = 0; i < totalDoorsQty - 1; i++) {
      const door = frame.children[totalDoorsQty - 1 - i];

      if (i === stepQty) {
        door.position.x -= diffValue;
      }
      if (i < stepQty) {
        door.position.x -= (stepQty - i) * step + diffValue;
      }
    }
    // } else if

    // (totalDoorsQty > 5) {

    // if (this.originZ === pergolaConst.side.Front) {
    //   doorStartPosX =
    //     span.side === pergolaConst.side.Left ||
    //     span.side === pergolaConst.side.Right
    //       ? 0.892 - frameWidth / 2
    //       : 0;
    // }

    // for (let i = 0; i < totalDoorsQty / 2; i++) {
    //   const door = frame.children[totalDoorsQty / 2 - 1 - i];
    //   door.position.x = doorStartPosX - step * i;
    // }
    // for (let i = totalDoorsQty / 2; i < totalDoorsQty; i++) {
    //   const door = frame.children[i];
    //   door.position.x = doorStartPosX - 0.06 + frameWidth - step * i;
    // }

    // opening
    // const maxOpening = step * (totalDoorsQty / 2 - 1) - 0.0001;
    // const currentOpenValue = this.interpolateValue(
    //   inputValue,
    //   0,
    //   1,
    //   0,
    //   maxOpening
    // );
    // const stepQty = Math.floor(currentOpenValue / step);
    // const diffValue = currentOpenValue % step;

    // for (let i = 0; i < totalDoorsQty - 1; i++) {
    //   const doorLeft = frame.children[totalDoorsQty / 2 - 1 - i];
    //   const doorRight = frame.children[totalDoorsQty - 1 - i];

    //   if (i === stepQty) {
    //     doorLeft.position.x -= diffValue;
    //     doorRight.position.x += diffValue;
    //   }
    //   if (i < stepQty) {
    //     doorLeft.position.x -= (stepQty - i) * step + diffValue;
    //     doorRight.position.x += (stepQty - i) * step + diffValue;
    //   }
    // }
    // }
  }

  openingFixedShutter(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = 0;

    const frame = system.object;
    const totalDoorsQty = frame.children.length;
    // if (!frame || totalDoorsQty < 2) return;

    let shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    const frameWidth = system.spanWidth;

    const overlap = subSystems_options.LiftSlideDoor.overlapMM / 1000;
    const k = 2;
    const step = (frameWidth - overlap * k) / totalDoorsQty;

    const overlapMM = subSystems_options.LiftSlideDoor.overlapMM;

    const doorWidthMM =
      (frameWidth * 1000 - overlapMM) / totalDoorsQty + overlapMM;

    const doorWidthMorph = this.interpolateValue(doorWidthMM, 400, 1350);

    // start position (closed)
    const generalOffset = 0.2;
    let doorStartPosX = -doorWidthMorph / 2 - generalOffset;

    for (let i = 0; i < totalDoorsQty / 2; i++) {
      const door = frame.children[totalDoorsQty / 2 - 1 - i];
      door.position.x = doorStartPosX - step * i;
    }
    for (let i = totalDoorsQty / 2; i < totalDoorsQty; i++) {
      const door = frame.children[i];
      door.position.x = doorStartPosX - 0.06 + frameWidth - step * i;
    }

    // opening
    const maxOpening = step * (totalDoorsQty / 2 - 1) - 0.0001;
    const currentOpenValue = this.interpolateValue(
      inputValue,
      0,
      1,
      0,
      maxOpening
    );
    const stepQty = Math.floor(currentOpenValue / step);
    const diffValue = currentOpenValue % step;

    for (let i = 0; i < totalDoorsQty - 1; i++) {
      const doorLeft = frame.children[totalDoorsQty / 2 - 1 - i];
      const doorRight = frame.children[totalDoorsQty - 1 - i];

      if (i === stepQty) {
        doorLeft.position.x -= diffValue;
        doorRight.position.x += diffValue;
      }
      if (i < stepQty) {
        doorLeft.position.x -= (stepQty - i) * step + diffValue;
        doorRight.position.x += (stepQty - i) * step + diffValue;
      }
    }
    // }
  }

  setupBifoldDoors(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    // mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    // frame = system.object;
    // door = system.object.children[0];

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("bifold_doors_side");
      door = system.object.getObjectByName("bi_door_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("bifold_doors");
      door = system.object.getObjectByName("bi_door");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    // if (
    //   span.side === pergolaConst.side.Left ||
    //   span.side === pergolaConst.side.Right
    // ) {
    //   shapekeys_orientation_key = "shapekeys_perpendicular";
    // } else {
    //   shapekeys_orientation_key = "shapekeys_straight";
    // }

    // if (span.side === pergolaConst.side.Left) {
    //   mirrorObject(system.object, !system.openingside);
    //   system.object.position.x = span.posX;

    //   if (!system.openingside) {
    //     system.object.position.z = -span.width;
    //   }
    // }
    // if (span.side === pergolaConst.side.Right) {
    //   mirrorObject(system.object, system.openingside);
    //   system.object.position.x = span.posX;

    //   if (system.openingside) {
    //     system.object.position.z = -span.width;
    //   }
    // }
    // if (span.side === pergolaConst.side.Front) {
    //   mirrorObject(system.object, !system.openingside);
    // }
    // if (span.side === pergolaConst.side.Back) {
    //   mirrorObject(system.object, system.openingside);
    // }
    if (!frame || !door) {
      return;
    }

    door.rotation.y = 0;
    this.changeObjectVisibility(true, door);

    const targetValueHeight = ConvertMorphValue(
      state.height - 0.1,
      MORPH_DATA.height.min,
      MORPH_DATA.height.max
    );

    const doorHeightKeyName =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .key;

    // ChangeObjectMorph(door, doorHeightKeyName, targetValueHeight);
    ChangeGlobalMorph(doorHeightKeyName, targetValueHeight);

    const frameWidth = system.spanWidth;

    const doorMaxWidth = subSystems_options.BifoldDoor.elementMaxWidthMM;
    const doorCount = Math.ceil(frameWidth / (doorMaxWidth / 1000));
    const doorWidth = frameWidth / doorCount;
    const doorThickness =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element
        .thickness;
    const doorWidthMorph = this.interpolateValue(
      doorWidth * 1000,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width.max
    );
    const doorWidthKeyName =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width
        .key;
    // ChangeObjectMorph(door, doorWidthKeyName, doorWidthMorph);
    ChangeGlobalMorph(doorWidthKeyName, doorWidthMorph);

    const shouldRebuild =
      !system.bifoldDoorPivots || system.bifoldDoorPivots.length !== doorCount;

    // if (shouldRebuild) {
    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    system.bifoldDoorPivots = [];

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      const pivot = new THREE.Group();

      newDoor.rotation.y = i % 2 === 0 ? Math.PI : 0;
      newDoor.position.set(0, 0, -doorThickness / 2);

      pivot.add(newDoor);
      frame.add(pivot);
      system.bifoldDoorPivots.push(pivot);
    }
    // }

    // ===> APPLY MORPHS EVEN IF WE DIDN'T REBUILD
    for (const pivot of system.bifoldDoorPivots) {
      pivot.traverse((child) => {
        if (child.isMesh) {
          // ChangeObjectMorph(child, doorHeightKeyName, targetValueHeight);
          // ChangeObjectMorph(child, doorWidthKeyName, doorWidthMorph);
          ChangeGlobalMorph(doorHeightKeyName, targetValueHeight);
          ChangeGlobalMorph(doorWidthKeyName, doorWidthMorph);
        }
      });
    }

    system.doorQty = doorCount;

    this.openingBifoldDoor(span);
  }

  openingBifoldDoor(span = null) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = this.interpolateValue(
      state.biFoldDoorInput,
      1,
      100,
      0,
      0.9
    );

    let shapekeys_orientation_key = "";
    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    const frame = system.object;
    const totalDoors = frame.children.length;

    const frameWidth = system.spanWidth;

    const doorWidth = frameWidth / totalDoors;
    const doorThickness =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element
        .thickness;
    const maxAngle = Math.PI / 2;

    let doorStartPosX = frameWidth / 2;

    for (let i = 0; i < totalDoors; i++) {
      const door = frame.children[i];
      const currentAngle = inputValue * maxAngle;
      const offset =
        (doorWidth -
          doorThickness * Math.sin(currentAngle) -
          doorWidth * Math.cos(currentAngle)) *
        2;

      door.rotation.y = i % 2 === 0 ? -currentAngle : currentAngle;
      if (i === 0) {
        door.position.x = -doorStartPosX;
      }
      if (i > 0) {
        const doorOffset = i % 2 === 0 ? 0 : doorWidth * 2;
        const pairIndex = Math.floor((i - 1) / 2);
        door.position.x =
          -doorStartPosX +
          Math.floor(i / 2) * 2 * doorWidth +
          doorOffset -
          offset * (pairIndex + 1);
      }

      door.position.y = 0.02;
    }
  }

  setupBifoldDoorsShatters(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    let frame, door, shapekeys_orientation_key, shatter;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("bifold_shutters_side");
      door = system.object.getObjectByName("bifold-shutter_side");
      shatter = system.object.getObjectByName("blade_bifold_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("bifold_shutters");
      door = system.object.getObjectByName("bifold-shutter");
      shatter = system.object.getObjectByName("blade_bifold");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (!frame || !door) {
      return;
    }

    door.rotation.y = 0;
    this.changeObjectVisibility(true, door);

    const targetValueHeight = ConvertMorphValue(
      state.height - 0.1,
      MORPH_DATA.height.min,
      MORPH_DATA.height.max
    );

    const doorHeightKeyName =
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .height.key;

    // ChangeObjectMorph(door, doorHeightKeyName, targetValueHeight);
    ChangeGlobalMorph(doorHeightKeyName, targetValueHeight);

    const frameWidth = system.spanWidth;

    const doorMaxWidth =
      subSystems_options.BifoldDoorShatters.elementMaxWidthMM;
    const doorCount = Math.ceil(frameWidth / (doorMaxWidth / 1000));
    const doorWidth = frameWidth / doorCount;
    const doorThickness =
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .thickness;
    const doorWidthMorph = this.interpolateValue(
      doorWidth * 1000,
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .width.min,
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .width.max
    );
    const doorWidthKeyName =
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .width.key;
    const doorWidthKeyNameShatter =
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .width.keyBlade;

    ChangeGlobalMorph(doorWidthKeyName, doorWidthMorph);

    // ChangeObjectMorph(door, doorWidthKeyName, doorWidthMorph);
    // ChangeObjectMorph(shatter, doorWidthKeyNameShatter, doorWidthMorph);
    ChangeGlobalMorph(doorWidthKeyNameShatter, doorWidthMorph);

    const gapShutter = 0;
    const heightShutter = 0.02697;
    const fullShutterHeight = heightShutter + gapShutter;
    const totalHeight = this.getMeters(state.height) - 0.25;
    const countShutter = Math.floor(totalHeight / fullShutterHeight);

    for (let index = door.children.length - 1; index >= 1; index--) {
      const element = door.children[index];
      door.remove(element);
    }

    for (let i = 1; i < countShutter; i++) {
      const newShutter = shatter.clone(); // Клонуємо разом з морфами
      newShutter.position.y = i * fullShutterHeight;

      newShutter.material.color.set(state.colorRoof);

      this.changeObjectVisibility(true, newShutter); // Переключаємо видимість
      let radians = state.biFoldDoorShattersRotate * (Math.PI / 180);

      newShutter.rotation.x = radians;

      door.children.push(newShutter);

      // InitMorphModel(theModel);
    }

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    system.bifoldDoorPivots = [];

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      const pivot = new THREE.Group();

      newDoor.rotation.y = i % 2 === 0 ? Math.PI : 0;
      newDoor.position.set(0, 0, -doorThickness / 2);

      pivot.add(newDoor);
      frame.add(pivot);
      system.bifoldDoorPivots.push(pivot);
    }

    // ===> APPLY MORPHS EVEN IF WE DIDN'T REBUILD
    for (const pivot of system.bifoldDoorPivots) {
      pivot.traverse((child) => {
        if (child.isMesh) {
          // ChangeObjectMorph(child, doorHeightKeyName, targetValueHeight);
          // ChangeObjectMorph(child, doorWidthKeyName, doorWidthMorph);
          ChangeGlobalMorph(doorHeightKeyName, targetValueHeight);
          ChangeGlobalMorph(doorWidthKeyName, doorWidthMorph);
        }
      });
    }

    system.doorQty = doorCount;

    this.openingBifoldDoorShatters(span);
  }

  openingBifoldDoorShatters(span = null) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = this.interpolateValue(
      state.biFoldDoorShattersInput,
      1,
      100,
      0,
      0.9
    );

    let shapekeys_orientation_key = "";
    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    const frame = system.object;
    const totalDoors = frame.children.length;

    const frameWidth = system.spanWidth;

    const doorWidth = frameWidth / totalDoors;
    const doorThickness =
      subSystems_options.BifoldDoorShatters[shapekeys_orientation_key].element
        .thickness;
    const maxAngle = Math.PI / 2;

    let doorStartPosX = frameWidth / 2;

    for (let i = 0; i < totalDoors; i++) {
      const door = frame.children[i];
      const currentAngle = inputValue * maxAngle;
      const offset =
        (doorWidth -
          doorThickness * Math.sin(currentAngle) -
          doorWidth * Math.cos(currentAngle)) *
        2;

      door.rotation.y = i % 2 === 0 ? -currentAngle : currentAngle;
      if (i === 0) {
        door.position.x = -doorStartPosX;
      }
      if (i > 0) {
        const doorOffset = i % 2 === 0 ? 0 : doorWidth * 2;
        const pairIndex = Math.floor((i - 1) / 2);
        door.position.x =
          -doorStartPosX +
          Math.floor(i / 2) * 2 * doorWidth +
          doorOffset -
          offset * (pairIndex + 1);
      }

      door.position.y = 0.05;
    }
  }

  cloneMeshWithMorphs(originalMesh) {
    const clonedMesh = originalMesh.clone(true);

    clonedMesh.geometry = originalMesh.geometry.clone();
    clonedMesh.geometry.morphAttributes = {
      ...originalMesh.geometry.morphAttributes,
    };

    clonedMesh.material = originalMesh.material.clone();
    clonedMesh.material.morphTargets = true;

    // Якщо були morphTargetInfluences — скопіювати
    if (originalMesh.morphTargetInfluences) {
      clonedMesh.morphTargetInfluences = [
        ...originalMesh.morphTargetInfluences,
      ];
    }

    return clonedMesh;
  }

  updateSubsystems() {
    const spans = this.span.objects;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];

      if (span.isSystemSet) {
        span.systems.forEach((system) => {
          if (system.active) {
            switch (system.type) {
              case pergolaConst.systemType.privacyWall:
                const frame = system.object;

                const isDirectionX = !system.direction;

                let post = isDirectionX
                  ? scene.getObjectByName("post_3x3002")
                  : scene.getObjectByName("post_3x3002");

                let blade30 = isDirectionX
                  ? scene.getObjectByName("privacy_wall_2x2")
                  : scene.getObjectByName("privacy_wall_2x2_side");

                let blade60 = isDirectionX
                  ? scene.getObjectByName("privacy_wall_2x6")
                  : scene.getObjectByName("privacy_wall_2x6_side");

                const finalBlade = state.slatsSize ? blade30 : blade60;

                const intervalPost = 2.5;
                const half = system.spanWidth / 2;
                const countPosts = Math.floor(system.spanWidth / intervalPost);
                const direction = isDirectionX ? "x" : "z";

                const mirroredPoints = generateMidpoints(
                  this.addOffset(post.position, direction, half),
                  this.addOffset(post.position, direction, -half),
                  countPosts
                );

                // 🧹 Очистка старих постів
                for (let i = frame.children.length - 1; i >= 0; i--) {
                  const child = frame.children[i];
                  if (
                    child.name &&
                    child.name.includes("slats_post") &&
                    child.uuid !== post.uuid
                  ) {
                    frame.remove(child);
                  }
                }

                // ✨ Генерація нових постів
                const generatedPosts = [];

                for (let i = 0; i < mirroredPoints.length; i++) {
                  const newPost = post.clone();
                  newPost.position.x = post.position.x;
                  newPost.position.z = post.position.z;

                  if (isDirectionX) {
                    newPost.position.x = mirroredPoints[i].x;
                  } else {
                    newPost.position.z = mirroredPoints[i].z;
                  }

                  newPost.name = "slats_post_clone";
                  this.changeObjectVisibility(true, newPost);
                  frame.add(newPost);
                  generatedPosts.push(newPost);
                }

                // remove slats
                for (let i = frame.children.length - 1; i >= 0; i--) {
                  const child = frame.children[i];
                  if (child.name && child.name.includes("slat_clone")) {
                    frame.remove(child);
                  }
                }

                const gapShutter = !state.slatsSize ? 0 : 0.03;
                const heightShutter = !state.slatsSize ? 0.15 : 0.06;
                const fullShutterHeight = heightShutter + gapShutter;
                const totalHeight = this.getMeters(state.height);
                const countShutter = Math.floor(
                  totalHeight / fullShutterHeight
                );

                for (let p = 0; p < generatedPosts.length; p++) {
                  for (let i = 1; i < countShutter; i++) {
                    const newBlade = finalBlade.clone();
                    newBlade.position.y = i * fullShutterHeight;

                    newBlade.name = "slat_clone";
                    this.changeObjectVisibility(true, newBlade);
                    frame.add(newBlade);
                  }
                }

                if (!generatedPosts.length) {
                  for (let i = 1; i < countShutter; i++) {
                    const newBlade = finalBlade.clone();
                    newBlade.position.y = i * fullShutterHeight;

                    newBlade.name = "slat_clone";
                    this.changeObjectVisibility(true, newBlade);
                    frame.add(newBlade);
                  }
                }

                break;

              case pergolaConst.systemType.autoShade:
                const material = system.object.children[1].material;
                const zipPost = !system.direction
                  ? system.object.getObjectByName("post_3x3003")
                  : system.object.getObjectByName("post_3x3004");
                this.changeObjectVisibility(false, zipPost);

                material.color.set(state.colorZip);
                system.object.children[0].material.color.set(state.colorBody);

                material.opacity =
                  state.transparency === null
                    ? 0
                    : 1 - state.transparency / 100;

                break;

              default:
                break;
            }
          }
        });
      }
    }
  }

  setOptions() {
    this.clearOptionElements();

    pointsBeamX = [];
    pointsBeamZ = [];

    if (
      state.electro.has(pergolaConst.optionNameString.fans)
      // state.width > 4 &&
      // state.length > 4
    ) {
      this.setFans();
    }

    if (state.electro.has(pergolaConst.optionNameString.LEDRampLight)) {
      this.setFans();
    }
  }

  setPointLight() {
    const {
      point_post_width,
      point_post_length,
      point_louver_width,
      point_louver_length,
    } = this.getPostPoints();

    const { FL_point, FR_point, RR_point } = this.getCornerPoints();
    const countPointLight = 5;

    const cornerAndBeamPointZ = [
      FR_point,
      ...this.addOffset(point_post_length, "z", 0),
      RR_point,
    ];

    const cornerAndBeamPointX = [
      FL_point,
      ...this.addOffset(point_post_width, "x", 0),
      FR_point,
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForLouversX.push(...spanPoints);
    }

    const offset = 0.07;

    //#region SET POINT LED ON BEAM
    if (state.directionRoof) {
      for (let i = 0; i < pointsBeamX.length; i++) {
        const pointX = pointsBeamX[i];

        for (let i = 0; i < allPointsForLouversZ.length; i++) {
          const pointZ = allPointsForLouversZ[i].z;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.pointLED
          );

          element.object.position.z = pointZ;
          element.object.position.x = pointX;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
      }
    } else {
      for (let i = 0; i < pointsBeamZ.length; i++) {
        const pointZ = pointsBeamZ[i];

        for (let i = 0; i < allPointsForLouversX.length; i++) {
          const pointX = allPointsForLouversX[i].x;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.pointLED
          );

          element.object.position.z = pointZ;
          element.object.position.x = pointX;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
      }
    }
    // #endregion

    // PEREMETR POINTS no needed in this project
    // //#region LEFT
    // for (let i = 0; i < allPointsForLouversZ.length; i++) {
    //   const point = allPointsForLouversZ[i];
    //   // console.log(this.pointLights);
    //   const element = this.getAvaliableObjectFromOneArray(this.roof.pointLED);

    //   // console.log(element);

    //   element.object.position.z = point.z;
    //   element.object.position.x = -point.x + offset;

    //   element.object.visible = true;
    //   element.object.children.forEach((child) => (child.visible = true));
    //   element.active = true;
    // }
    // //#endregion

    // //#region RIGHT
    // for (let i = 0; i < allPointsForLouversZ.length; i++) {
    //   const point = allPointsForLouversZ[i];
    //   // console.log(this.pointLights);
    //   const element = this.getAvaliableObjectFromOneArray(this.roof.pointLED);

    //   // console.log(element);

    //   element.object.position.z = point.z;
    //   element.object.position.x = point.x - offset;

    //   element.object.visible = true;
    //   element.object.children.forEach((child) => (child.visible = true));
    //   element.active = true;
    // }

    // //#endregion

    // //#region BACK
    // for (let i = 0; i < allPointsForLouversX.length; i++) {
    //   const point = allPointsForLouversX[i];
    //   const element = this.getAvaliableObjectFromOneArray(this.roof.pointLED);

    //   element.object.position.z = -point.z + offset;
    //   element.object.position.x = point.x;

    //   element.object.visible = true;
    //   element.object.children.forEach((child) => (child.visible = true));
    //   element.active = true;
    // }

    // //#endregion

    // //#region FRONT
    // for (let i = 0; i < allPointsForLouversX.length; i++) {
    //   const point = allPointsForLouversX[i];
    //   const element = this.getAvaliableObjectFromOneArray(this.roof.pointLED);

    //   element.object.position.z = point.z - offset;
    //   element.object.position.x = point.x;

    //   element.object.visible = true;
    //   element.object.children.forEach((child) => (child.visible = true));
    //   element.active = true;
    // }

    // //#endregion
  }

  setLEDramp() {
    const {
      point_post_width,
      point_post_length,
      point_louver_width,
      point_louver_length,
    } = this.getPostPoints();
    const { span_width, span_depth } = this.getSpanPoints();

    const { FL_point, FR_point, RR_point } = this.getCornerPoints();
    const countPointLightSpanZ = Math.ceil(span_width / 3);
    const countPointLightSpanX = Math.ceil(span_width / 3);

    const cornerAndBeamPointZ = [
      FR_point,
      ...this.addOffset(point_post_length, "z", 0),
      RR_point,
    ];

    const cornerAndBeamPointX = [
      FL_point,
      ...this.addOffset(point_post_width, "x", 0),
      FR_point,
    ];

    let allPointsForLouversZ = [];
    let allPointsForLouversX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLightSpanZ
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLightSpanX
      );

      allPointsForLouversX.push(...spanPoints);
    }

    const offset = 0.07 * 2.3;
    const offseBeam = 0.08;
    // let height = this.getMeters(state.height) - 0.9;

    //#region SET RAM LED ON BEAM
    //SOLID
    if (!state.roofType) {
      //X BEAM
      for (let i = 0; i < point_post_length.length; i++) {
        const pointZ = point_post_length[i].z;

        //FIRT SIDE
        for (let i = 0; i < allPointsForLouversX.length; i++) {
          const pointX = allPointsForLouversX[i].x;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDX
          );

          element.object.position.z = pointZ - offseBeam;
          element.object.position.x = pointX;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
        //SECOND SIDE
        for (let i = 0; i < allPointsForLouversX.length; i++) {
          const pointX = allPointsForLouversX[i].x;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDX
          );

          element.object.position.z = pointZ + offseBeam;
          element.object.position.x = pointX;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
      }

      //Y BEAM
      for (let i = 0; i < point_post_width.length; i++) {
        const pointX = point_post_width[i].x;

        //FIRT SIDE
        for (let i = 0; i < allPointsForLouversZ.length; i++) {
          const pointZ = allPointsForLouversZ[i].z;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDY
          );

          element.object.position.z = pointZ;
          element.object.position.x = pointX - offseBeam;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
        //SECOND SIDE
        for (let i = 0; i < allPointsForLouversZ.length; i++) {
          const pointZ = allPointsForLouversZ[i].z;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDY
          );

          element.object.position.z = pointZ;
          element.object.position.x = pointX + offseBeam;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
      }
    } else {
      const pointBeamLenght = state.directionRoof
        ? point_louver_length
        : point_post_length;

      const pointBeamWidth = state.directionRoof
        ? point_post_width
        : point_louver_width;

      //X BEAM
      for (let i = 0; i < pointBeamLenght.length; i++) {
        const pointZ = pointBeamLenght[i].z;

        //FIRT SIDE
        for (let i = 0; i < allPointsForLouversX.length; i++) {
          const pointX = allPointsForLouversX[i].x;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDX
          );

          element.object.position.z = pointZ - offseBeam;
          element.object.position.x = pointX;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
        //SECOND SIDE
        for (let i = 0; i < allPointsForLouversX.length; i++) {
          const pointX = allPointsForLouversX[i].x;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDX
          );

          element.object.position.z = pointZ + offseBeam;
          element.object.position.x = pointX;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
      }

      //Y BEAM
      for (let i = 0; i < pointBeamWidth.length; i++) {
        const pointX = pointBeamWidth[i].x;

        //FIRT SIDE
        for (let i = 0; i < allPointsForLouversZ.length; i++) {
          const pointZ = allPointsForLouversZ[i].z;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDY
          );

          element.object.position.z = pointZ;
          element.object.position.x = pointX + offseBeam;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
        //SECOND SIDE
        for (let i = 0; i < allPointsForLouversZ.length; i++) {
          const pointZ = allPointsForLouversZ[i].z;

          const element = this.getAvaliableObjectFromOneArray(
            this.roof.rampLEDY
          );

          element.object.position.z = pointZ;
          element.object.position.x = pointX - offseBeam;

          element.object.visible = true;
          element.object.children.forEach((child) => (child.visible = true));
          element.active = true;
        }
      }
    }
    // #endregion

    //#region LEFT
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const point = allPointsForLouversZ[i];
      // console.log(this.pointLights);
      const element = this.getAvaliableObjectFromOneArray(this.roof.rampLEDY);
      // height = element.object.position.y -;

      // console.log(element);

      element.object.position.z = point.z;
      element.object.position.x = -point.x + offset;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }
    //#endregion

    //#region RIGHT
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const point = allPointsForLouversZ[i];
      // console.log(this.pointLights);
      const element = this.getAvaliableObjectFromOneArray(this.roof.rampLEDY);

      // console.log(element);

      element.object.position.z = point.z;
      element.object.position.x = point.x - offset;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }

    //#endregion

    //#region BACK
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];
      const element = this.getAvaliableObjectFromOneArray(this.roof.rampLEDX);

      element.object.position.z = -point.z + offset;
      element.object.position.x = point.x;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }

    //#endregion

    //#region FRONT
    for (let i = 0; i < allPointsForLouversX.length; i++) {
      const point = allPointsForLouversX[i];
      const element = this.getAvaliableObjectFromOneArray(this.roof.rampLEDX);

      element.object.position.z = point.z - offset;
      element.object.position.x = point.x;

      element.object.visible = true;
      element.object.children.forEach((child) => (child.visible = true));
      element.active = true;
    }

    //#endregion
  }

  setHeaters() {
    const { RL_point, FR_point, FL_point, RR_point } = this.getCornerPoints();
    const { point_post_length, point_louver_width, point_post_width } =
      this.getPostPoints();

    const pointsXforLouver = this.generateCenterPoints([
      ...this.addOffset([RL_point], "x", 0),
      ...point_post_width,
      ...this.addOffset([RR_point], "x", 0),
    ]);

    //BACK SIDE
    const backActiveSpan = pergola.span.objects.filter(
      (span) => span.side === pergolaConst.side.Back && span.isSystemSet
    );

    if (!state.backWall) {
      for (
        let j = 0;
        j < pointsXforLouver.length - backActiveSpan.length;
        j++
      ) {
        const pointX = pointsXforLouver[j].x;
        const pointZ = FR_point.z;
        const element = this.getAvaliableObjectFromOneArray(this.heatersBack);

        element.object.position.x = pointX;
        element.object.position.z = -pointZ;

        this.changeObjectVisibility(true, element.object);
        element.active = true;
      }
    }

    // FRONT SIDE
    const frontActiveSpan = pergola.span.objects.filter(
      (span) => span.side === pergolaConst.side.Front && span.isSystemSet
    );

    for (let j = 0; j < pointsXforLouver.length - frontActiveSpan.length; j++) {
      const point = pointsXforLouver[j];
      const pointX = point.x;
      const pointZ = FR_point.z;

      const element = this.getAvaliableObjectFromOneArray(this.heatersFront);

      // element.object.rotation.set(
      //   3.68,
      //   1.5707963267948966,
      //   element.object.rotation.z
      // );

      // mirrorObject(element.object, true);

      element.object.position.x = pointX;
      element.object.position.z = pointZ;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }

    // }
  }

  setFans() {
    const offsetForOverhangPosts = 0;

    const {
      point_louver_width,
      point_louver_length,
      point_post_length,
      point_post_width,
    } = this.getPostPoints(offsetForOverhangPosts, offsetForOverhangPosts);

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints(
      offsetForOverhangPosts,
      offsetForOverhangPosts
    );

    const countPointLight = 1;
    let cornerAndBeamPointZ = null;
    let cornerAndBeamPointX = null;
    let cornerAndSkyLightpointX = null;

    cornerAndBeamPointZ = [FL_point, ...point_post_length, RR_point];
    cornerAndBeamPointX = [RL_point, ...point_post_width, FR_point];

    if (pergola.pointXforSkylight.length) {
      cornerAndSkyLightpointX = [
        RL_point,
        ...pergola.pointXforSkylight,
        FR_point,
      ];
    }

    if (!state.roofType) {
      cornerAndBeamPointZ = [FL_point, ...point_post_length, RR_point];
      cornerAndBeamPointX = [RL_point, ...point_post_width, FR_point];
    }

    let allPointsForLouversZ = [];
    let allPointsForFansX = [];

    const qntyFans = Math.ceil(state.width / 20);

    let allPointsForLouversX = generateMidpoints(FL_point, FR_point, qntyFans);
    let allPointsForSkylightX = [];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointX[i],
        cornerAndBeamPointX[i + 1],
        countPointLight
      );

      allPointsForFansX.push(...spanPoints);
    }

    if (cornerAndSkyLightpointX) {
      for (let i = 0; i < cornerAndSkyLightpointX.length - 1; i++) {
        const spanPoints = generateMidpoints(
          cornerAndSkyLightpointX[i],
          cornerAndSkyLightpointX[i + 1],
          countPointLight
        );

        allPointsForSkylightX.push(...spanPoints);
      }
    }

    const fansBeam = this.fansBeam;
    const offsetLed =
      state.skyLight || state.directionRoof
        ? 0.3
        : this.getMeters(state.width) * 0.1;

    //#region BEAM X
    if (!state.directionRoof) {
      for (let i = 0; i < allPointsForLouversZ.length; i++) {
        const pointZ = allPointsForLouversZ[i].z;

        if (!state.roofType || !state.skyLight || state.roofType === 2) {
          for (let a = 0; a < allPointsForLouversX.length; a++) {
            let pointX = allPointsForLouversX[a].x;

            const elementFan = this.getAvaliableObjectFromOneArray(this.fans);
            const elementBeam = this.getAvaliableObjectFromOneArray(fansBeam);
            const elementPoinLight = this.getAvaliableObjectFromOneArray(
              this.leds
            );
            const elementPoinLightDif = this.getAvaliableObjectFromOneArray(
              this.ledsDifSide
            );

            if (
              state.electro.has(pergolaConst.optionNameString.LEDRampLight) &&
              state.width > 8
            ) {
              // #region first led
              elementPoinLight.object.position.x = pointX + offsetLed;
              elementPoinLight.object.position.z = pointZ;

              elementPoinLight.object.visible = true;
              elementPoinLight.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementPoinLight.active = true;

              //#endregion

              // #region second led
              elementPoinLightDif.object.position.x = pointX - offsetLed;
              elementPoinLightDif.object.position.z = pointZ;

              elementPoinLightDif.object.visible = true;
              elementPoinLightDif.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementPoinLightDif.active = true;
              // #endregion
            }

            //FANS
            if (state.electro.has(pergolaConst.optionNameString.fans)) {
              elementFan.object.position.x = pointX;
              elementFan.object.position.z = pointZ;

              elementFan.object.visible = true;
              elementFan.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementFan.active = true;
            }

            //FANS BEAM
            if (state.roofType !== 1) {
              elementBeam.object.position.z = pointZ;
              elementBeam.object.position.x =
                state.roofType === 2 ? state.comboCenteXpoint : 0;

              pointsBeamZ.push(pointZ);

              elementBeam.object.visible = true;
              elementBeam.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementBeam.active = true;
            }
          }
        }

        if (
          state.electro.has(pergolaConst.optionNameString.LEDRampLight) &&
          pergola.pointXforSkylight.length &&
          state.roofType === 1
        ) {
          for (let i = 0; i < pergola.pointXforSkylight.length; i++) {
            const pointSkylight = pergola.pointXforSkylight[i].x;

            const elementPoinLight = this.getAvaliableObjectFromOneArray(
              this.leds
            );
            const elementPoinLightDif = this.getAvaliableObjectFromOneArray(
              this.ledsDifSide
            );

            // #region first led
            elementPoinLight.object.position.x =
              i === 0 ? pointSkylight + offsetLed : pointSkylight - offsetLed;

            elementPoinLight.object.position.z = pointZ;

            elementPoinLight.object.visible = true;
            elementPoinLight.object.children.forEach(
              (child) => (child.visible = true)
            );
            elementPoinLight.active = true;
            // #endregion

            // #region second led
            elementPoinLightDif.object.position.x =
              i === pergola.pointXforSkylight.length - 1
                ? pointSkylight - offsetLed
                : pointSkylight + offsetLed;

            elementPoinLightDif.object.position.z = pointZ;

            elementPoinLightDif.object.visible = true;
            elementPoinLightDif.object.children.forEach(
              (child) => (child.visible = true)
            );
            elementPoinLightDif.active = true;
            // #endregion
          }
        }

        const pointForFan = allPointsForSkylightX.slice(1, -1);

        //FANS SKYLIGHT
        if (state.width > 8 && state.skyLight && state.roofType !== 2) {
          for (let i = 0; i < pointForFan.length; i++) {
            const pointX = pointForFan[i].x;
            const elementFan = this.getAvaliableObjectFromOneArray(this.fans);

            if (state.electro.has(pergolaConst.optionNameString.fans)) {
              elementFan.object.position.x = pointX;
              elementFan.object.position.z = pointZ;

              elementFan.object.visible = true;
              elementFan.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementFan.active = true;
            }
          }
        }
      }
    } else {
      const preparedPointX = allPointsForFansX
        .filter((_, i) => i % 2 === 0)
        .slice(0, qntyFans);

      for (let i = 0; i < allPointsForLouversZ.length; i++) {
        const pointZ = allPointsForLouversZ[i].z;

        if (!state.roofType || !state.skyLight || state.roofType === 2) {
          for (let a = 0; a < preparedPointX.length; a++) {
            let pointX = preparedPointX[a].x;

            const elementFan = this.getAvaliableObjectFromOneArray(this.fans);
            const elementBeam = this.getAvaliableObjectFromOneArray(
              this.fansBeamY
            );
            const elementPoinLight = this.getAvaliableObjectFromOneArray(
              this.leds
            );
            const elementPoinLightDif = this.getAvaliableObjectFromOneArray(
              this.ledsDifSide
            );

            if (
              state.electro.has(pergolaConst.optionNameString.LEDRampLight) &&
              state.width > 8
            ) {
              // #region first led
              elementPoinLight.object.position.x = pointX;
              elementPoinLight.object.position.z = pointZ + offsetLed;

              elementPoinLight.object.visible = true;
              elementPoinLight.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementPoinLight.active = true;

              //#endregion

              // #region second led
              elementPoinLightDif.object.position.x = pointX;
              elementPoinLightDif.object.position.z = pointZ - offsetLed;

              elementPoinLightDif.object.visible = true;
              elementPoinLightDif.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementPoinLightDif.active = true;
              // #endregion
            }

            //FANS
            if (state.electro.has(pergolaConst.optionNameString.fans)) {
              elementFan.object.position.x = pointX;
              elementFan.object.position.z = pointZ;

              elementFan.object.visible = true;
              elementFan.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementFan.active = true;
            }

            //FANS BEAM
            if (state.roofType !== 1) {
              elementBeam.object.position.z = 0;
              elementBeam.object.position.x = pointX;

              pointsBeamZ.push(pointZ);

              elementBeam.object.visible = true;
              elementBeam.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementBeam.active = true;
            }
          }
        }

        if (
          state.electro.has(pergolaConst.optionNameString.LEDRampLight) &&
          pergola.pointXforSkylight.length &&
          state.roofType === 1
        ) {
          for (let i = 0; i < pergola.pointXforSkylight.length; i++) {
            const pointSkylight = pergola.pointXforSkylight[i].x;

            const elementPoinLight = this.getAvaliableObjectFromOneArray(
              this.leds
            );
            const elementPoinLightDif = this.getAvaliableObjectFromOneArray(
              this.ledsDifSide
            );

            // #region first led
            elementPoinLight.object.position.x = pointSkylight + offsetLed;
            elementPoinLight.object.position.z = pointZ;

            elementPoinLight.object.visible = true;
            elementPoinLight.object.children.forEach(
              (child) => (child.visible = true)
            );
            elementPoinLight.active = true;

            //#endregion

            // #region second led
            elementPoinLightDif.object.position.x = pointSkylight - offsetLed;
            elementPoinLightDif.object.position.z = pointZ;

            elementPoinLightDif.object.visible = true;
            elementPoinLightDif.object.children.forEach(
              (child) => (child.visible = true)
            );
            elementPoinLightDif.active = true;
            // #endregion
          }
        }

        const pointForFan = allPointsForSkylightX.slice(1, -1);

        //FANS SKYLIGHT
        if (state.width > 8 && state.skyLight && state.roofType !== 2) {
          for (let i = 0; i < pointForFan.length; i++) {
            const pointX = pointForFan[i].x;
            const elementFan = this.getAvaliableObjectFromOneArray(this.fans);

            if (state.electro.has(pergolaConst.optionNameString.fans)) {
              elementFan.object.position.x = pointX;
              elementFan.object.position.z = pointZ;

              elementFan.object.visible = true;
              elementFan.object.children.forEach(
                (child) => (child.visible = true)
              );
              elementFan.active = true;
            }
          }
        }
      }
    }
    //#endregion
  }

  setSolidRoof() {
    this.changeRoofVisibility(false, "solidRoof", null, true);

    if (!state.roofType) {
      const mesh = this.roof.solidRoof[0].object;

      updateMaterialMap(mesh);

      this.changeObjectVisibility(true, mesh);
      mesh.active = true;
    }
  }

  setLouver() {
    this.changeRoofVisibility(false, "louverX", null, true);
    this.changeRoofVisibility(false, "louverY", null, true);
    countLeds.count = 0;

    if (state.roofType) {
      const countSolidRoofX = Math.ceil(
        this.getMeters(state.directionRoof ? state.width : state.length) /
          0.17989
      ); //size Louver

      const { RL_point, FR_point, FL_point, RR_point } = this.getCornerPoints();

      let point_beam_lenght;
      let point_beam_width;

      const {
        point_louver_length,
        point_louver_width,
        point_post_length,
        point_post_width,
      } = this.getPostPoints();

      //CHANGE DEPEND DIRECTION
      if (!state.directionRoof) {
        point_beam_lenght = point_post_length;
        point_beam_width = point_louver_width;
      } else {
        point_beam_lenght = point_louver_length;
        point_beam_width = point_post_width;
      }

      const pointsZforLouver = this.generateCenterPoints([
        ...this.addOffset([FR_point], "z", -0.1),
        ...point_beam_lenght,
        ...this.addOffset([RR_point], "z", 0.1),
      ]);

      const pointsXforLouver = this.generateCenterPoints([
        ...this.addOffset([FL_point], "x", 0.1),
        ...point_beam_width,
        ...this.addOffset([FR_point], "x", -0.1),
      ]);

      const generalSizePergola = state.directionRoof
        ? state.length
        : state.width;

      const countPoint = state.directionRoof
        ? pointsZforLouver.length
        : pointsXforLouver.length;

      const interpolatedWidthForLouver = this.interpolateValue(
        (this.getMeters(generalSizePergola) -
          (0.3 +
            0.13 *
              (!state.directionRoof
                ? pointsXforLouver.length - 1
                : pointsZforLouver.length - 1))) /
          countPoint,
        1.01364,
        4.82364
      );

      const cornerAndBeamPointX = [
        ...this.addOffset([RL_point], "x", 0),
        ...this.addOffset(point_beam_width, "x", 0),
        ...this.addOffset([FR_point], "x", -0.075),
      ];
      const cornerAndBeamPointZ = [
        ...this.addOffset([FR_point], "z", 0),
        ...this.addOffset(point_beam_lenght, "z", 0.03),
        ...this.addOffset([RR_point], "z", 0.075),
      ];

      const spanCount = state.directionRoof
        ? point_beam_width.length + 1
        : point_beam_lenght.length + 1;
      const louverForOneSpan = Math.floor(countSolidRoofX / spanCount);

      let allPointsForLouversX = [];
      let allPointsForLouversZ = [];

      for (let i = 0; i < cornerAndBeamPointX.length - 1; i++) {
        const spanPoints = generateMidpoints(
          ...this.addOffset([cornerAndBeamPointX[i]], "x", -0.05),
          ...this.addOffset([cornerAndBeamPointX[i + 1]], "x", 0.05),
          louverForOneSpan
        );
        allPointsForLouversX.push(...spanPoints);
      }

      for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
        const spanPoints = generateMidpoints(
          ...this.addOffset([cornerAndBeamPointZ[i]], "z", 0),
          ...this.addOffset([cornerAndBeamPointZ[i + 1]], "z", 0),
          louverForOneSpan
        );
        allPointsForLouversZ.push(...spanPoints);
      }

      ChangeGlobalMorph("length_louver", interpolatedWidthForLouver);
      ChangeGlobalMorph("width_louver", interpolatedWidthForLouver);

      const heightOffset = -0.08;

      if (state.directionRoof) {
        for (let j = 0; j < pointsZforLouver.length; j++) {
          const pointZ = pointsZforLouver[j].z;

          for (let j = 0; j < allPointsForLouversX.length; j++) {
            const pointX = allPointsForLouversX[j].x;
            const element = this.getAvaliableObjectFromOneArray(
              this.roof.louverY
            );

            let radians = state.currentRotationZ * (Math.PI / 180);

            element.object.rotation.z = radians;
            element.object.position.x = pointX;
            element.object.position.y =
              this.getMeters(state.height) + heightOffset;
            element.object.position.z = pointZ;

            this.changeObjectVisibility(true, element.object);
            element.active = true;
          }
        }
      } else {
        for (let j = 0; j < pointsXforLouver.length; j++) {
          const pointX = pointsXforLouver[j].x;

          for (let j = 0; j < allPointsForLouversZ.length; j++) {
            const pointZ = allPointsForLouversZ[j].z;
            const element = this.getAvaliableObjectFromOneArray(
              this.roof.louverX
            );

            let radians = state.currentRotationZ * (Math.PI / 180);

            element.object.rotation.z = radians;
            element.object.position.x = pointX;
            element.object.position.y =
              this.getMeters(state.height) + heightOffset;
            element.object.position.z = pointZ;

            this.changeObjectVisibility(true, element.object);
            element.active = true;
          }
        }
      }
    }
  }

  setBeamsPosition(points, array, rafter, rotate = false, zero) {
    const beams = array;

    for (let i = 0; i < points.length; i++) {
      const beamPoint = points[i];
      const element = beams[i];

      if (element == null) {
        return;
      }

      if (rafter) {
        element.object.position.x = zero ? 0 : beamPoint.x;
        element.object.position.z = 0;
        console.log("POS X", element);
      } else {
        element.object.position.z = beamPoint.z;
        element.object.position.x = 0;

        console.log("POS Z", element);
      }

      if (rotate) {
        element.object.rotation.y = Math.PI / 2;
        console.log("ROTATE", element);
      } else {
        element.object.rotation.y = 0;
      }

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  setTailPosition(points, array) {
    const beams = array;

    for (let i = 0; i < points.length; i++) {
      const beamPoint = points[i];
      const element = beams[i];

      if (element == null) {
        return;
      }

      element.object.position.x = beamPoint.x;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  inchesToMeters(inches) {
    const meters = inches * 0.0254;
    return meters;
  }

  setPosts() {
    this.changePostVisibility(false, "post3x3", true);
    this.changePostVisibility(false, "post3x3Left", true);
    this.changePostVisibility(false, "post3x3Right", true);
    this.changePostVisibility(false, "post3x3Back", true);
    this.changePostVisibility(false, "post3x3Front", true);

    this.changePostVisibility(false, "postSquare", true);
    this.changePostVisibility(false, "postSquareLeft", true);
    this.changePostVisibility(false, "postSquareRight", true);
    this.changePostVisibility(false, "postSquareBack", true);
    this.changePostVisibility(false, "postSquareFront", true);

    this.changePostVisibility(false, "postRound", true);
    this.changePostVisibility(false, "postRoundLeft", true);
    this.changePostVisibility(false, "postRoundRight", true);
    this.changePostVisibility(false, "postRoundBack", true);
    this.changePostVisibility(false, "postRoundFront", true);

    this.changePostVisibility(false, "postHeadsOne", true);
    this.changePostVisibility(false, "postHeadsOneLeft", true);
    this.changePostVisibility(false, "postHeadsOneRight", true);
    this.changePostVisibility(false, "postHeadsOneBack", true);
    this.changePostVisibility(false, "postHeadsOneFront", true);

    this.changePostVisibility(false, "postHeadsTwo", true);
    this.changePostVisibility(false, "postHeadsTwoLeft", true);
    this.changePostVisibility(false, "postHeadsTwoRight", true);
    this.changePostVisibility(false, "postHeadsTwoBack", true);
    this.changePostVisibility(false, "postHeadsTwoFront", true);

    this.changePostVisibility(false, "rainFront", true);
    this.changePostVisibility(false, "rainBack", true);

    this.changePostVisibility(false, "rainCornerFront", true);
    this.changePostVisibility(false, "rainCornerBack", true);
    this.roof.rainShield[0].object.visible = false;

    let morhpForColumn = 0;

    switch (true) {
      case state.postSize === 8:
        morhpForColumn = 0.5;
        break;

      case state.postSize === 10:
        morhpForColumn = 0.7;

        break;

      case state.postSize === 12:
        morhpForColumn = 1;

        break;
    }

    ChangeGlobalMorph("8-12", morhpForColumn);
    ChangeGlobalMorph("4-7", morhpForColumn);

    const typeLettice = state.roofType === 0;
    const typeLouver = state.roofType === 2;
    const typeSolid = state.roofType === 1;

    const changedOverhang = this.inchesToMeters(-state.overhang);

    const offsetForOverhangPosts = changedOverhang;

    const typeSolidOverhang = state.overhang === 12 ? 18 : state.overhang;

    const offsetForOverhangPostsX = typeSolid
      ? this.inchesToMeters(-typeSolidOverhang)
      : offsetForOverhangPosts;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints(
      offsetForOverhangPostsX,
      offsetForOverhangPosts
    );
    const { point_post_width, point_post_length } = this.getPostPoints(
      offsetForOverhangPostsX,
      offsetForOverhangPosts
    );

    const pointForCorner = [
      !state.leftWall ? FL_point : {},
      !state.rightWall ? FR_point : {},
      !state.backWall && !state.leftWall ? RL_point : {},
      !state.backWall && !state.rightWall ? RR_point : {},
    ];

    if (true) {
      // if need add condition
      if (state.gutter && state.roofType === 1) {
        this.setPostsPosition(
          "rainCornerFront",
          [state.rightWall ? {} : FR_point, state.leftWall ? {} : FL_point],
          true
        );
        this.setPostsPosition("rainFront", point_post_width, true);

        if (!state.backWall) {
          this.setPostsPosition("rainCornerBack", [RL_point, RR_point], true);
          this.setPostsPosition("rainBack", point_post_width, true);
        }
      }

      if (state.rain) {
        this.roof.rainShield[0].object.visible = true;
        // this.roof.rainShield[0].object.children[0].visible = true;

        this.roof.rainShield[0].object.children.forEach(
          (el) => (el.visible = true)
        );
      }

      switch (true) {
        case state.postType === 0 && !state.wrapKit && state.roofType !== 2:
          this.setPostsPosition("post3x3", pointForCorner);

          if (!state.leftWall) {
            this.setPostsPosition("post3x3Left", point_post_length, true);
          }

          if (!state.rightWall) {
            this.setPostsPosition("post3x3Right", point_post_length, true);
          }

          if (!state.backWall) {
            this.setPostsPosition("post3x3Back", point_post_width, true);
          }

          this.setPostsPosition("post3x3Front", point_post_width, true);

          console.log("POST 0");
          break;

        case state.postType === 0 && state.roofType === 2:
        case state.postType === 0 && state.wrapKit:
          const typeOfBeam = !state.beam ? "postHeadsOne" : "postHeadsTwo";

          this.setPostsPosition(typeOfBeam, pointForCorner);

          if (!state.leftWall) {
            this.setPostsPosition(`${typeOfBeam}Left`, point_post_length, true);
          }

          if (!state.rightWall) {
            this.setPostsPosition(
              `${typeOfBeam}Right`,
              point_post_length,
              true
            );
          }

          if (!state.backWall) {
            this.setPostsPosition(`${typeOfBeam}Back`, point_post_width, true);
          }

          this.setPostsPosition(`${typeOfBeam}Front`, point_post_width, true);

          console.log("POST 1");
          break;

        case state.postType === 1:
          this.setPostsPosition("postSquare", pointForCorner);

          if (!state.leftWall) {
            this.setPostsPosition("postSquareLeft", point_post_length, true);
          }

          if (!state.rightWall) {
            this.setPostsPosition("postSquareRight", point_post_length, true);
          }

          if (!state.backWall) {
            this.setPostsPosition("postSquareBack", point_post_width, true);
          }

          this.setPostsPosition("postSquareFront", point_post_width, true);
          break;

        case state.postType === 2:
          this.setPostsPosition("postRound", pointForCorner);

          if (!state.leftWall) {
            this.setPostsPosition("postRoundLeft", point_post_length, true);
          }

          if (!state.rightWall) {
            this.setPostsPosition("postRoundRight", point_post_length, true);
          }

          if (!state.backWall) {
            this.setPostsPosition("postRoundBack", point_post_width, true);
          }

          this.setPostsPosition("postRoundFront", point_post_width, true);
          break;
      }

      //center column
      if (point_post_width.length && point_post_length.length) {
        let posts = null;

        switch (true) {
          case state.postType === 0 && !state.wrapKit && state.roofType !== 2:
            posts = this.post.post3x3;

            break;

          case state.postType === 0 && state.roofType === 2:
          case state.postType === 0 && state.wrapKit:
            const typeOfBeam = pergola.settings.beam
              ? "postHeadsOne"
              : "postHeadsTwo";

            posts = this.post[typeOfBeam];

            break;

          case state.postType === 1:
            posts = this.post.postSquare;

            break;

          case state.postType === 2:
            posts = this.post.postRound;

            break;
        }

        for (let i = 0; i < point_post_width.length; i++) {
          const point = point_post_width[i];

          for (let j = 0; j < point_post_length.length; j++) {
            const pointZ = point_post_length[j].z;

            const element = this.getAvaliableObjectFromOneArray(posts);

            element.object.position.x = point.x;
            element.object.position.z = pointZ;

            this.changeObjectVisibility(true, element.object);
            element.active = true;
          }
        }
      }
    }
  }

  setWrapkitThicknessSolid() {
    switch (this.settings.roofSolidWrapkit) {
      case PergolaRoofWrapkit._2x6:
        // ChangeGlobalMorph("2x6-3x8", 0); // wrapkit
        break;
      case PergolaRoofWrapkit._3x8:
        // ChangeGlobalMorph("2x6-3x8", 1); // wrapkit
        break;
      default:
        // ChangeGlobalMorph("2x6-3x8", 1); // wrapkit
        break;
    }
  }

  setPanelThicknessSolid() {
    switch (this.settings.roofSolidThickness) {
      case PergolaRoofThickness._3inch:
        // ChangeGlobalMorph("3-6", 0); // roof thickness
        break;
      case PergolaRoofThickness._4inch:
        // ChangeGlobalMorph("3-6", 1 / 3); // roof thickness
        break;
      case PergolaRoofThickness._6inch:
        // ChangeGlobalMorph("3-6", 0.94); // roof thickness
        break;
      default:
        break;
    }
  }

  getAvaliableSolidObjectFromArray(
    objects,
    type,
    planks,
    plank8inch,
    direction = null
  ) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];

      if (element.active === true) {
        continue;
      }

      if (
        element.type === type &&
        element.planks === planks &&
        element.plank8inch === plank8inch &&
        element.direction === direction
      ) {
        return element;
      }
    }

    return null;
  }

  setSolidPosition(startPoint, roofElements) {
    const objects = this.roof.solid.objects;

    let currentEdgePoint = startPoint;

    for (let i = 0; i < roofElements.length; i++) {
      const roofElement = roofElements[i];

      // console.log
      const element = this.getAvaliableSolidObjectFromArray(
        objects,
        roofElement.type,
        roofElement.planks,
        roofElement.plank8inch,
        roofElement.direction
      );

      if (element == null) {
        continue;
      }

      element.object.position.x = currentEdgePoint + roofElement.width / 2;

      if (element.name !== "skylight") {
        element.object.position.y = 2.4766; // to prevent Z-fighting
      } else {
        element.object.scale.z = 0.999; // to prevent Z-fighting

        pergola.pointXforSkylight.push(element.object.position);

        // console.log("skylight", element.object.position.x);
      }

      currentEdgePoint = currentEdgePoint + roofElement.width;
      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  makeSolidAndComboRoof() {
    const wrapKitObject = scene.getObjectByName("wrap_kit");
    // const wrapKitObjectRain = scene.getObjectByName("solid_non_roof_rain_mesh001");
    const backBeamObject = scene.getObjectByName("back_beam");
    const solidRainObject = scene.getObjectByName(
      "solid_non_roof_rain_mesh001"
    );
    const fanBeam = scene.getObjectByName("beam");
    const solidRoofAnother = scene.getObjectByName("solid_roof_frame");
    const solidnonRainObject = scene.getObjectByName(
      "solid_non_roof_rain_mesh"
    );
    // const solidnonFrame = this.roof.solidnon.frames[0].object;
    // const solidFrame = this.roof.solid.frames[0].object;

    // solidFrame.scale.y = 1.001; // to prevent z-fighting
    // backBeamObject.position.x = 0;

    // if (state.roofType === 1) {
    //   backBeamObject.visible = false;
    // } else if (state.wallOption === 2) {
    //   backBeamObject.visible = true;
    // }

    wrapKitObject.scale.x = 1.002;
    // solidFrame.scale.x = 1.002;

    pergola.pointXforSkylight = [];
    // this.changeObjectVisibility(false, solidnonFrame);
    // this.changeObjectVisibility(false, solidFrame);
    this.changeObjectVisibility(false, solidRainObject);
    this.changeObjectVisibility(false, solidRainObject);
    this.changeObjectVisibility(false, solidnonRainObject);
    this.changeObjectVisibility(false, wrapKitObject);
    this.changeObjectVisibility(false, solidRoofAnother);
    // this.changeObjectVisibility(false, backBeamObject);

    this.changeHeadVisibility(false, null, true);
    this.changeRafterVisibility(false, null, true);
    this.changeTailVisibility(false, true);
    // this.changeLatticeVisibility(false, true);
    // this.changeLouveredVisibility(false, true);
    this.changeSolidSolidnonVisibility(false, "solidnon", true);
    this.changeSolidSolidnonVisibility(false, "solid", true);

    const { FL_point, FC_point, RL_point, FR_point } = this.getCornerPoints();

    const frameWidth_m = this.getMeters(state.width);

    let addPlankLeft;
    let addPlankRight;

    const typeSolid = state.roofType === 1;
    const typeCombo = state.roofType === 2;

    const {
      FL_post_point,
      FR_post_point,
      RL_post_point,
      RR_post_point,
      front_points,
      rear_points,
      left_points,
      right_points,
      offset,
    } = this.getPostPointsCombo();

    //* SOLID
    if (typeSolid) {
      // this.setWrapkitThicknessSolid();
      this.setPanelThicknessSolid();
      if (state.wrapKit) {
        this.changeObjectVisibility(true, wrapKitObject, 0);
      }
      // this.changeObjectVisibility(true, solidFrame, 0);
      this.changeObjectVisibility(true, solidRainObject, 0);

      wrapKitObject.position.x = 0;
      solidRainObject.position.x = 0;

      addPlankLeft = {
        type: PergolaRoofObjectType.roof,
        planks: 1,
        plank8inch: null,
        direction: PergolaSide.Left,
        width: 0.0254, // 1 inch
      };

      addPlankRight = {
        type: PergolaRoofObjectType.roof,
        planks: 1,
        plank8inch: null,
        direction: PergolaSide.Right,
        width: 0.0254, // 1 inch
      };

      if (!state.skyLight) {
        const qtyPanel6x = Math.floor(
          frameWidth_m / state.solidRoofElementWidth_m._6_plank
        );

        const rest = frameWidth_m % state.solidRoofElementWidth_m._6_plank;
        const qtyPanel1x = Math.floor(
          rest / state.solidRoofElementWidth_m._1_plank
        );

        let delta =
          (frameWidth_m -
            qtyPanel6x * state.solidRoofElementWidth_m._6_plank -
            qtyPanel1x * state.solidRoofElementWidth_m._1_plank) /
          2;

        let roofElements = [];

        for (let i = 0; i < qtyPanel6x; i++) {
          roofElements.push({
            type: PergolaRoofObjectType.roof,
            planks: 6,
            plank8inch: state.roofSolidPlank8inch,
            width: state.solidRoofElementWidth_m._6_plank,
          });
        }

        if (qtyPanel1x > 0) {
          roofElements.push({
            type: PergolaRoofObjectType.roof,
            planks: qtyPanel1x,
            plank8inch: state.roofSolidPlank8inch,
            width:
              state.solidRoofElementWidth_m[PergolaRoofSolidPanels[qtyPanel1x]],
          });
        }

        let totWidth = 0;

        for (let i = 0; i < roofElements.length; i++) {
          const elementWidth = roofElements[i].width;
          totWidth += elementWidth;
        }

        delta = frameWidth_m - totWidth;

        if (delta > 0.0127) {
          roofElements.push(addPlankRight);
          const targetValue = this.interpolateValue(
            delta,
            1 * 0.0254,
            8 * 0.0254
          );
          ChangeGlobalMorph("1-8", targetValue);
        }

        console.log(roofElements, "Roof Elemnts");

        this.setSolidPosition(FL_point.x, roofElements);
      } else {
        // with Skylights
        let roofElements = [];

        if (state.width <= 16) {
          const qtyWholePanel6x = Math.floor(
            (frameWidth_m - state.solidRoofSkylightWidth_m) /
              state.solidRoofElementWidth_m._6_plank /
              2
          );
          const restOnHalf =
            ((frameWidth_m - state.solidRoofSkylightWidth_m) / 2) %
            state.solidRoofElementWidth_m._6_plank;
          const qtyPanel1x = Math.floor(
            restOnHalf / state.solidRoofElementWidth_m._1_plank
          );

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: state.roofSolidPlank8inch,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: state.roofSolidPlank8inch,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }
        } else if (state.width > 16 && state.width < 30) {
          const qtyWholePanel6x = Math.floor(
            (frameWidth_m -
              state.solidRoofSkylightWidth_m * 2 -
              state.solidRoofElementWidth_m._6_plank * 3) /
              state.solidRoofElementWidth_m._6_plank /
              2
          );
          const restOnHalf =
            ((frameWidth_m -
              state.solidRoofSkylightWidth_m * 2 -
              state.solidRoofElementWidth_m._6_plank * 3) /
              2) %
            state.solidRoofElementWidth_m._6_plank;
          const qtyPanel1x = Math.floor(
            restOnHalf / state.solidRoofElementWidth_m._1_plank
          );

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: state.roofSolidPlank8inch,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < 3; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: state.roofSolidPlank8inch,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }
        } else if (state.width >= 30) {
          const qtyWholePanel6x = Math.floor(
            (frameWidth_m -
              state.solidRoofSkylightWidth_m * 3 -
              state.solidRoofElementWidth_m._6_plank * 6) /
              state.solidRoofElementWidth_m._6_plank /
              2
          );
          const restOnHalf =
            ((frameWidth_m -
              state.solidRoofSkylightWidth_m * 3 -
              state.solidRoofElementWidth_m._6_plank * 6) /
              2) %
            state.solidRoofElementWidth_m._6_plank;
          const qtyPanel1x = Math.floor(
            restOnHalf / state.solidRoofElementWidth_m._1_plank
          );

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: state.roofSolidPlank8inch,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < 3; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < 3; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: state.roofSolidPlank8inch,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: state.roofSolidPlank8inch,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }
        }

        let totWidth = 0;
        let delta = 0;

        for (let i = 0; i < roofElements.length; i++) {
          const elementWidth = roofElements[i].width;
          totWidth += elementWidth;
        }

        delta = (frameWidth_m - totWidth) / 2;

        let startPos = FL_point.x;

        if (delta > 0.0127) {
          roofElements.unshift(addPlankLeft);
          roofElements.push(addPlankRight);
          const targetValue = this.interpolateValue(
            delta,
            1 * 0.0254,
            8 * 0.0254
          );
          ChangeGlobalMorph("1-8", targetValue);

          startPos += delta - 0.0254;
        }

        this.setSolidPosition(startPos, roofElements);
      }

      // if (true) {
      //   this.setGutters();
      // }

      // this.setTails("solid", FL_point, FR_point, this.settings.roofSolidTails);
    }

    //* COMBO
    if (typeCombo) {
      const comboSolidPercent =
        this.settings.roofComboSolidPercentage ===
        PergolaRoofPercentage._70percent
          ? 0.7
          : 0.5;
      const { COMBO_LATTICE_CENTER_point, COMBO_SOLID_CENTER_point } =
        this.getComboCenterPoints();

      // Lattice part (50% or 30%)

      const rightRafterPoint = FC_point.clone().add(
        new THREE.Vector3(-0.05, 0, 0)
      );

      this.makeRafters(
        FL_post_point,
        rightRafterPoint,
        1 - comboSolidPercent,
        true,
        PergolaRoofRafters.single
      );

      let latticeSpacing;

      switch (state.spacing) {
        case PergolaRoofSpacing._2inch:
          latticeSpacing = 2 * 0.0254;
          break;
        case PergolaRoofSpacing._3inch:
          latticeSpacing = 3 * 0.0254;
          break;
        case PergolaRoofSpacing._4inch:
          latticeSpacing = 4 * 0.0254;
          break;
        default:
          latticeSpacing = 2 * 0.0254;
          break;
      }

      let lattice_points = [];
      const latticeWith2x2 = 0.0508;
      const latticeWith3x3 = 0.0762;

      const latticeWidth =
        state.thickness === 2 ? latticeWith2x2 : latticeWith3x3;

      if (
        this.settings.roofComboLatticeDirection ===
        PergolaRoofDirection.Straight
      ) {
        const rearPoint = RL_point.clone().add(new THREE.Vector3(0, 0, 0.03));
        const frontPoint = FL_point.clone().add(new THREE.Vector3(0, 0, -0.03));
        const latticeQty =
          Math.floor(
            (state.length * 0.3048 - latticeWidth) /
              (latticeWidth + latticeSpacing)
          ) - 1;
        lattice_points = generateMidpoints(
          frontPoint,
          rearPoint,
          latticeQty,
          true
        );
      } else {
        const latticeQty =
          Math.floor(
            (state.width * 0.3048 * (1 - comboSolidPercent) - latticeWidth) /
              (latticeWidth + latticeSpacing)
          ) - 1;
        const supportQty =
          Math.floor(
            (state.length * 0.3048 - offset * 2) /
              this.settings.latticeSupportlengthInterval_m
          ) - 1;
        const leftPoint = FL_point.clone().add(
          new THREE.Vector3(latticeWidth, 0, 0)
        );
        const rightPoint = FC_point.clone().add(
          new THREE.Vector3(-latticeWidth, 0, 0)
        );
        lattice_points = generateMidpoints(
          leftPoint,
          rightPoint,
          latticeQty,
          true
        );
        const support_points = generateMidpoints(
          FL_post_point,
          RL_post_point,
          supportQty,
          true
        );
        console.log(support_points, "SUPPORT POINTS");
        // this.setLatticePosition(
        //   support_points,
        //   true,
        //   COMBO_LATTICE_CENTER_point.x - 0.01
        // );
      }

      // console.log(
      //   lattice_points,
      //   "LETTICE POINT",
      //   COMBO_LATTICE_CENTER_point.x
      // );

      const spacing = this.inchesToMeters(state.spacing);

      const widthWithSpacing = pergola.settings.latticeSize
        ? 0.17 + spacing
        : 0.26 + spacing;

      const countLatticeX = Math.floor(state.length / widthWithSpacing - 2);

      const pointLatticeX = generateMidpoints(
        RL_point,
        FR_point,
        countLatticeX,
        true
      );

      this.setLatticePosition(
        pointLatticeX,
        false,
        COMBO_LATTICE_CENTER_point.x - 0.05
      );

      wrapKitObject.position.x = -(COMBO_LATTICE_CENTER_point.x + 0.01);
      solidRainObject.position.x = -(COMBO_LATTICE_CENTER_point.x + 0.01);
      // backBeamObject.position.x = COMBO_LATTICE_CENTER_point.x;
      state.comboCenteXpoint = COMBO_LATTICE_CENTER_point.x + 1;

      // if (backBeamObject) {
      //   backBeamObject.position.y = 2.432;
      //   backBeamObject.scale.y = 1.01;

      //   if (this.settings.mountingWall_Back && !this.settings.roofMount) {
      //     this.changeObjectVisibility(
      //       this.settings.mountingWall_Back,
      //       backBeamObject
      //     );
      //   }
      // }

      // ********************************************************************

      // Solid part (50% or 70%)

      const solidFrameWidth_m = frameWidth_m * comboSolidPercent;

      this.setWrapkitThicknessCombo();
      // ChangeGlobalMorph("3-6", 0); // roof thickness

      this.changeObjectVisibility(
        true,
        wrapKitObject,
        COMBO_SOLID_CENTER_point.x
      );
      // this.changeObjectVisibility(true, solidFrame, COMBO_SOLID_CENTER_point.x);
      this.changeObjectVisibility(
        true,
        solidRainObject,
        COMBO_SOLID_CENTER_point.x
      );

      addPlankLeft = {
        type: PergolaRoofObjectType.roof,
        planks: 1,
        plank8inch: null,
        direction: PergolaSide.Left,
        width: 0.0254, // 1 inch
      };

      addPlankRight = {
        type: PergolaRoofObjectType.roof,
        planks: 1,
        plank8inch: null,
        direction: PergolaSide.Right,
        width: 0.0254, // 1 inch
      };

      // Without Skylights
      if (!state.skyLight) {
        const qtyPanel6x = Math.floor(
          solidFrameWidth_m / state.solidRoofElementWidth_m._6_plank
        );
        const rest = solidFrameWidth_m % state.solidRoofElementWidth_m._6_plank;
        const qtyPanel1x = Math.floor(
          rest / state.solidRoofElementWidth_m._1_plank
        );
        let delta =
          (solidFrameWidth_m -
            qtyPanel6x * state.solidRoofElementWidth_m._6_plank -
            qtyPanel1x * state.solidRoofElementWidth_m._1_plank) /
          2;

        let roofElements = [];

        for (let i = 0; i < qtyPanel6x; i++) {
          roofElements.push({
            type: PergolaRoofObjectType.roof,
            planks: 6,
            plank8inch: false,
            width: state.solidRoofElementWidth_m._6_plank,
          });
        }

        if (qtyPanel1x > 0) {
          roofElements.push({
            type: PergolaRoofObjectType.roof,
            planks: qtyPanel1x,
            plank8inch: false,
            width:
              state.solidRoofElementWidth_m[PergolaRoofSolidPanels[qtyPanel1x]],
          });
        }

        let totWidth = 0;

        for (let i = 0; i < roofElements.length; i++) {
          const elementWidth = roofElements[i].width;
          totWidth += elementWidth;
        }

        delta = solidFrameWidth_m - totWidth;

        if (delta > 0.0127) {
          roofElements.push(addPlankRight);
          const targetValue = this.interpolateValue(
            delta,
            1 * 0.0254,
            8 * 0.0254
          );
          ChangeGlobalMorph("1-8", targetValue);
        }

        this.setSolidPosition(FC_point.x, roofElements);
      } else {
        // with Skylights
        let roofElements = [];

        // 1 skylight
        if (this.dimensions.width * comboSolidPercent <= 20) {
          const qtyWholePanel6x = Math.floor(
            (solidFrameWidth_m - state.solidRoofSkylightWidth_m) /
              state.solidRoofElementWidth_m._6_plank /
              2
          );
          const restOnHalf =
            ((solidFrameWidth_m - state.solidRoofSkylightWidth_m) / 2) %
            state.solidRoofElementWidth_m._6_plank;
          const qtyPanel1x = Math.floor(
            restOnHalf / state.solidRoofElementWidth_m._1_plank
          );

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: false,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: false,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: false,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: false,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }
        }

        // 2 skylights
        else if (this.dimensions.width * comboSolidPercent > 20) {
          const qtyWholePanel6x = Math.floor(
            (solidFrameWidth_m -
              state.solidRoofSkylightWidth_m * 2 -
              state.solidRoofElementWidth_m._6_plank * 3) /
              state.solidRoofElementWidth_m._6_plank /
              2
          );
          const restOnHalf =
            ((solidFrameWidth_m -
              state.solidRoofSkylightWidth_m * 2 -
              state.solidRoofElementWidth_m._6_plank * 3) /
              2) %
            state.solidRoofElementWidth_m._6_plank;
          const qtyPanel1x = Math.floor(
            restOnHalf / state.solidRoofElementWidth_m._1_plank
          );

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: false,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: false,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < 3; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: false,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          roofElements.push({
            type: PergolaRoofObjectType.skylight,
            planks: null,
            plank8inch: null,
            width: state.solidRoofSkylightWidth_m,
          });

          for (let i = 0; i < qtyWholePanel6x; i++) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: 6,
              plank8inch: false,
              width: state.solidRoofElementWidth_m._6_plank,
            });
          }

          if (qtyPanel1x > 0) {
            roofElements.push({
              type: PergolaRoofObjectType.roof,
              planks: qtyPanel1x,
              plank8inch: false,
              width:
                state.solidRoofElementWidth_m[
                  PergolaRoofSolidPanels[qtyPanel1x]
                ],
            });
          }
        }

        let totWidth = 0;
        let delta = 0;

        for (let i = 0; i < roofElements.length; i++) {
          const elementWidth = roofElements[i].width;
          totWidth += elementWidth;
        }

        delta = (solidFrameWidth_m - totWidth) / 2;

        let startPos = FC_point.x;

        if (delta > 0.0127) {
          roofElements.unshift(addPlankLeft);
          roofElements.push(addPlankRight);
          const targetValue = this.interpolateValue(
            delta,
            1 * 0.0254,
            8 * 0.0254
          );
          ChangeGlobalMorph("1-8", targetValue);

          startPos += delta - 0.0254;
        }

        this.setSolidPosition(startPos, roofElements);
      }

      this.setTails("combo", FC_point, FR_point, false);
    }
  }

  makeRafters(
    leftPoint,
    rightPoint,
    widthPercentage = 1,
    singleOnly = false,
    type = null
  ) {
    const rafterInterval = 2;
    this.setRafterPosition([leftPoint], PergolaPostPlace.Left, type);
    this.setRafterPosition([rightPoint], PergolaPostPlace.Right, type);
    const doubleOrSingle = singleOnly
      ? PergolaRoofRafters.single
      : this.settings.roofLatticeRafters;
    const rafterQty =
      doubleOrSingle === PergolaRoofRafters.double
        ? Math.floor(
            (state.width * widthPercentage * 0.3048) / rafterInterval
          ) - 1
        : Math.floor(
            (state.width * widthPercentage * 0.3048) / rafterInterval
          ) - 1;
    const rafter_points = generateMidpoints(leftPoint, rightPoint, rafterQty);
    this.setRafterPosition(rafter_points, null, type);
  }

  setRafterPosition(points, place = null, type = null) {
    const rafters = this.roof.rafterBevelDouble;
    const rafterType = type ?? this.settings.roofLatticeRafters;
    const endcut = this.settings.endcutType;

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      const element = this.getAvaliableHeadOrRafterFromArray(
        rafters,
        rafterType,
        endcut
      );
      if (element == null) {
        return;
      }
      element.object.position.x = point.x;
      element.object.position.z = 0;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
      element.place = place;
    }
  }

  getAvaliableHeadOrRafterFromArray(objects, headtype, endcut) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];
      if (element.active == true) {
        continue;
      }
      if (element.type === headtype && element.endcut === endcut) {
        return element;
      }
    }

    return null;
  }

  setWrapkitThicknessCombo() {
    switch (this.settings.roofComboSolidWrapkit) {
      case PergolaRoofWrapkit._2x6:
        // ChangeGlobalMorph("2x6-3x8", 0); // wrapkit
        break;
      case PergolaRoofWrapkit._3x8:
        // ChangeGlobalMorph("2x6-3x8", 1); // wrapkit
        break;
      default:
        break;
    }
  }

  setLatticePosition(points, dir = false, centerPointX = 0) {
    const latticeX = !state.thickness
      ? this.roof.lattice2x2X
      : this.roof.lattice3x3X;
    const latticeY = !state.thickness
      ? this.roof.lattice2x2Y
      : this.roof.lattice3x3Y;

    const lattices = !state.directionRoof ? latticeX : latticeY;

    let latticeDirection = 0;

    // if (state.roofType === PergolaRoofType.Combo) {
    //   latticeDirection = this.settings.roofComboLatticeDirection;
    // }

    // if (isSupport) {
    //   latticeDirection = PergolaRoofDirection.Straight;
    // }

    const latticeThickness = state.thickness;

    for (let index = 0; index < points.length; index++) {
      const point = points[index];

      const element = this.getAvaliableLatticeFromArray(
        lattices,
        latticeDirection,
        latticeThickness
      );

      if (element == null) {
        return;
      }
      if (!dir) {
        element.object.position.z = point.z;
        element.object.position.x = centerPointX;
      } else {
        element.object.position.x = point.x;
        element.object.position.z = 0;
      }

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  getAvaliableLatticeFromArray(objects, direction, thickness) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];
      if (element.active == true) {
        continue;
      }
      // if (element.direction === direction && element.thickness === thickness) {
      return element;
      // }
    }

    return null;
  }

  getComboCenterPoints() {
    const { FL_point, FR_point, FC_point } = this.getCornerPoints();

    const COMBO_LATTICE_CENTER_point = new THREE.Vector3(
      (FC_point.x + FL_point.x) / 2,
      0,
      0
    );
    const COMBO_SOLID_CENTER_point = new THREE.Vector3(
      (FR_point.x + FC_point.x) / 2,
      0,
      0
    );

    return { COMBO_LATTICE_CENTER_point, COMBO_SOLID_CENTER_point };
  }

  changeSolidSolidnonVisibility(status, roofType, reset = false) {
    if (this.roof == null) {
      return;
    }
    if (this.roof[roofType] == null) {
      return;
    }
    if (this.roof[roofType].objects == null) {
      return;
    }

    for (let index = 0; index < this.roof[roofType].objects.length; index++) {
      const element = this.roof[roofType].objects[index];

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      if (status === false && reset === true) {
        element.active = false;
      }
    }
  }

  setTails(roofType, FL_point, FR_point, middleTails = true) {
    let wrapkitName;

    switch (roofType) {
      case "solid":
        wrapkitName = "roofSolidWrapkit";
        break;
      case "solidnon":
        wrapkitName = "roofSolidnonWrapkit";
        break;
      case "combo":
        wrapkitName = "roofComboSolidWrapkit";
        break;

      default:
        wrapkitName = "roofSolidWrapkit";
        break;
    }

    let tailQty = 0;

    if (middleTails) {
      tailQty = this.settings.postHasDoubleHeader
        ? Math.floor(
            (this.settings.width * 0.3048) /
              this.settings.rafterWidthIntervalDouble_m
          ) - 1
        : Math.floor(
            (this.settings.width * 0.3048) /
              this.settings.rafterWidthIntervalSingle_m
          ) - 1;
    }

    let deltaX = 0;

    if (this.settings[wrapkitName] === PergolaRoofWrapkit._2x6) {
      deltaX =
        this.settings.postHasDoubleHeader && middleTails ? 0.0716 : 0.021;
    } else {
      deltaX =
        this.settings.postHasDoubleHeader && middleTails ? 0.0465 : -0.0045;
    }

    let deltaScaleX = 0;

    if (this.settings.postHasDoubleHeader && middleTails) {
      deltaScaleX = this.interpolateValue(
        this.settings.width,
        8,
        44,
        -0.0026,
        -0.0139
      );
    } else {
      deltaScaleX = this.interpolateValue(
        this.settings.width,
        8,
        44,
        -0.003,
        -0.0143
      );
    }

    const startPoint = FL_point.clone().add(
      new THREE.Vector3(deltaX + deltaScaleX, 0, 0)
    );
    const endPoint = FR_point.clone().add(
      new THREE.Vector3(-deltaX - deltaScaleX, 0, 0)
    );
    const tail_points = generateMidpoints(startPoint, endPoint, tailQty, true);

    this.setTailPosition(tail_points, middleTails);
  }

  getAvaliableTailFromArray(objects, headtype, endcut, side) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];
      if (element.active == true) {
        continue;
      }
      if (
        element.type === headtype &&
        element.endcut === endcut &&
        element.side === side
      ) {
        return element;
      }
    }

    return null;
  }

  changeHeadVisibility(
    status,
    headPlace = null,
    reset = false,
    headType = null
  ) {
    if (this.head == null) {
      return;
    }
    if (this.head.objects == null) {
      return;
    }

    for (let index = 0; index < this.head.objects.length; index++) {
      const element = this.head.objects[index];

      if (headType != null) {
        if (element.type != headType) {
          continue;
        }
      }

      if (headPlace != null) {
        if (element.place != headPlace) {
          continue;
        }
      }

      if (element.isLock) {
        continue;
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      if (status === false && reset === true) {
        element.place = null;
        element.active = false;
      }
    }
  }

  setGutters() {
    const { FL_post_point, FR_post_point, RL_post_point, RR_post_point } =
      this.getPostPoints();

    if (!this.settings.mountingWall_Back && !this.settings.mountingWall_Left) {
      this.setGutterPosition([RL_post_point], PergolaSide.Back);
    }

    if (!this.settings.mountingWall_Back && !this.settings.mountingWall_Right) {
      this.setGutterPosition([RR_post_point], PergolaSide.Back);
    }

    if (!this.settings.mountingWall_Left) {
      this.setGutterPosition([FL_post_point], PergolaSide.Front);
    }

    if (!this.settings.mountingWall_Right) {
      this.setGutterPosition([FR_post_point], PergolaSide.Front);
    }
  }

  setGutterPosition(points, side = null) {
    const gutters = this.roof.solid.objects;

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      const element = this.getAvaliableGutterObjectFromArray(
        gutters,
        PergolaRoofObjectType.gutter,
        side
      );
      if (element == null) {
        return;
      }
      element.object.position.x = point.x;
      element.object.position.z = point.z;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
      element.side = side;
    }

    const objects = this.roof.solid.objects;
  }

  getAvaliableGutterObjectFromArray(objects, type, side) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];

      if (element.active == true) {
        continue;
      }

      if (element.type === type && element.side === side) {
        return element;
      }
    }

    return null;
  }

  changeRafterVisibility(
    status,
    rafterPlace = null,
    reset = false,
    rafterType = null
  ) {
    if (this.rafter == null) {
      return;
    }
    if (this.rafter.objects == null) {
      return;
    }

    for (let index = 0; index < this.rafter.objects.length; index++) {
      const element = this.rafter.objects[index];

      if (rafterType != null) {
        if (element.type != rafterType) {
          continue;
        }
      }

      if (rafterPlace != null) {
        if (element.place != rafterPlace) {
          continue;
        }
      }

      if (element.isLock) {
        continue;
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      if (status === false && reset === true) {
        element.place = null;
        element.active = false;
      }
    }
  }

  changeTailVisibility(status, reset = false, tailType = null) {
    if (this.tail == null) {
      return;
    }
    if (this.tail.objects == null) {
      return;
    }

    for (let index = 0; index < this.tail.objects.length; index++) {
      const element = this.tail.objects[index];

      if (tailType != null) {
        if (element.type != tailType) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      if (status === false && reset === true) {
        element.active = false;
      }
    }
  }

  setHeadPosition(points, place = null) {
    const heads = this.head.objects;
    let headType = state.beam
      ? PergolaPostHeadtype.double
      : PergolaPostHeadtype.single;

    if (
      place === PergolaPostPlace.Back &&
      this.settings.roofMount &&
      this.settings.mountingWall_Back
    ) {
      headType = PergolaPostHeadtype.single;
    }

    let endcut = this.settings.endcutType;

    if (state.roofType == PergolaRoofType.Louvered) {
      headType = PergolaPostHeadtype.louvered;
      endcut = null;
    }

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      const element = this.getAvaliableHeadOrRafterFromArray(
        heads,
        headType,
        endcut
      );
      if (element == null) {
        return;
      }
      element.object.position.x = 0;
      element.object.position.z = point.z;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
      element.place = place;
    }
  }

  setRoof() {
    this.changeRoofVisibility(false, "rafterBevelSingle", null, true);
    this.changeRoofVisibility(false, "rafterBevelDouble", null, true);

    this.changeRoofVisibility(false, "rafterBevelSingleCut", null, true);
    this.changeRoofVisibility(false, "rafterBevelDoubleCut", null, true);

    this.changeRoofVisibility(false, "rafterBevelSingleShot", null, true);
    this.changeRoofVisibility(false, "rafterBevelDoubleShot", null, true);
    this.changeRoofVisibility(false, "rafterBevelSingleShotBack", null, true);
    this.changeRoofVisibility(false, "rafterBevelDoubleShotBack", null, true);

    this.changeRoofVisibility(false, "rafterMiterSingle", null, true);
    this.changeRoofVisibility(false, "rafterMiterDouble", null, true);

    this.changeRoofVisibility(false, "rafterMiterSingleCut", null, true);
    this.changeRoofVisibility(false, "rafterMiterDoubleCut", null, true);

    this.changeRoofVisibility(false, "rafterMiterSingleShot", null, true);
    this.changeRoofVisibility(false, "rafterMiterDoubleShot", null, true);
    this.changeRoofVisibility(false, "rafterMiterSingleShotBack", null, true);
    this.changeRoofVisibility(false, "rafterMiterDoubleShotBack", null, true);

    this.changeRoofVisibility(false, "rafterCorbelSingle", null, true);
    this.changeRoofVisibility(false, "rafterCorbelDouble", null, true);

    this.changeRoofVisibility(false, "rafterCorbelSingleCut", null, true);
    this.changeRoofVisibility(false, "rafterCorbelDoubleCut", null, true);

    this.changeRoofVisibility(false, "rafterCorbelSingleShot", null, true);
    this.changeRoofVisibility(false, "rafterCorbelDoubleShot", null, true);
    this.changeRoofVisibility(false, "rafterCorbelSingleShotBack", null, true);
    this.changeRoofVisibility(false, "rafterCorbelDoubleShotBack", null, true);

    this.changeRoofVisibility(false, "rafterScallopSingle", null, true);
    this.changeRoofVisibility(false, "rafterScallopDouble", null, true);

    this.changeRoofVisibility(false, "rafterScallopSingleCut", null, true);
    this.changeRoofVisibility(false, "rafterScallopDoubleCut", null, true);

    this.changeRoofVisibility(false, "rafterScallopSingleShot", null, true);
    this.changeRoofVisibility(false, "rafterScallopDoubleShot", null, true);
    this.changeRoofVisibility(false, "rafterScallopSingleShotBack", null, true);
    this.changeRoofVisibility(false, "rafterScallopDoubleShotBack", null, true);

    this.changeRoofVisibility(false, "lattice2x2X", null, true);
    this.changeRoofVisibility(false, "lattice3x3X", null, true);

    this.changeRoofVisibility(false, "lattice2x2Y", null, true);
    this.changeRoofVisibility(false, "lattice3x3Y", null, true);

    this.changeRoofVisibility(false, "solidFrame", null, true);
    this.changeRoofVisibility(false, "solidRoof", null, true);

    this.changeRoofVisibility(false, "louverX", null, true);
    this.changeRoofVisibility(false, "louverY", null, true);

    const typeLattice = state.roofType === 0;
    const typeSolid = state.roofType === 1;
    const typeCombo = state.roofType === 2; // COMBO not louver

    const offsetX = -0.15;
    const { FL_point, RL_point, FR_point, RR_point } =
      this.getCornerPoints(offsetX);

    const rafterInterval = 2;
    const countRafters =
      Math.floor(
        (state.directionRoof ? state.length : state.width) / rafterInterval
      ) - 2;

    const spacing = this.inchesToMeters(state.spacing);

    const widthWithSpacing = pergola.settings.latticeSize
      ? 0.17 + spacing
      : 0.26 + spacing;
    const halfDirection = state.directionRoof ? 4 : 1;

    const countLatticeX =
      Math.floor(state.length / widthWithSpacing - 2) / halfDirection;

    const countLatticeY = Math.floor(state.width / widthWithSpacing - 2);

    const firstCornerWithSingleOffset = new THREE.Vector3(
      RL_point.x - 0.05,
      RL_point.y,
      RL_point.z
    );

    const secondCornerWithSingleOffset = new THREE.Vector3(
      FR_point.x + 0.05,
      FR_point.y,
      FR_point.z
    );

    const newRL = offsetVector(RL_point, { z: 0.1 });
    const newFR = offsetVector(FR_point, { z: -0.1 });

    const newRLrafter = offsetVector(RL_point, {
      x: this.inchesToMeters(state.overhang) - 0.3,
      z: this.inchesToMeters(state.overhang) - 0.2,
    });
    const newFRrafter = offsetVector(FR_point, {
      x: -this.inchesToMeters(state.overhang) + 0.3,
      z: -this.inchesToMeters(state.overhang) + 0.2,
    });

    const pointForRafter = generateMidpoints(
      newRLrafter,
      newFRrafter,
      countRafters,
      true
    );

    const newRLrafterSingle = offsetVector(RL_point, {
      x: -0.06,
    });
    const newFRrafterSingle = offsetVector(FR_point, {
      x: 0.06,
    });

    const pointForRafterSolid = generateMidpoints(
      state.rafter ? RL_point : newRLrafterSingle,
      state.rafter ? FR_point : newFRrafterSingle,
      countRafters,
      true
    );

    pergola.settings.countRafter = pointForRafter;

    const pointLatticeX = generateMidpoints(
      state.directionRoof ? newRL : RL_point,
      state.directionRoof ? newFR : FR_point,
      countLatticeX,
      true
    );

    function offsetVector(vector, offset) {
      return new Vec3(
        vector.x + (offset.x || 0),
        vector.y + (offset.y || 0),
        vector.z + (offset.z || 0)
      );
    }

    const pointLatticeY = generateMidpoints(
      offsetVector(FL_point, { x: -0.05 }),
      offsetVector(FR_point, { x: 0.05 }),
      countLatticeY,
      true
    );

    function setShotOnCorner() {
      const shortRafterType = pergola.roof.rafterBevelSingleShot;

      const pointCornerRafter = [
        firstCornerWithSingleOffset,
        secondCornerWithSingleOffset,
      ];

      let middleIndex = Math.floor(shortRafterType.length / 2);
      let firstHalfFront = shortRafterType.slice(0, middleIndex);
      let secondHalfBack = shortRafterType.slice(middleIndex);

      pergola.setBeamsPosition(pointCornerRafter, firstHalfFront, true);
      pergola.setBeamsPosition(pointCornerRafter, secondHalfBack, true, true); // rotate shot
    }

    // RAFTER
    function processRafterCut(rafterType, pointForRafter) {
      this.setTailPosition(pointForRafter, rafterType, true);
    }

    if (state.endCuts) {
      const compareForSolid = !state.rafter;

      const typeOfRafter = !state.rafter ? "Single" : "Double";

      const rafterTypeKey = `rafter${
        ["Bevel", "Miter", "Corbel", "Scallop"][state.endCuts - 1]
      }${typeOfRafter}`;

      const rafterShotKey = `rafter${
        ["Bevel", "Miter", "Corbel", "Scallop"][state.endCuts - 1]
      }${compareForSolid ? "SingleShot" : "DoubleShot"}`;

      const rafterType = this.roof[rafterTypeKey];
      const rafterShotType = this.roof[rafterShotKey];
      const rafterShotTypeBack = this.roof[rafterShotKey + "Back"];

      switch (true) {
        case typeLattice:
          console.log("typeLattice RAFTER");

          state.directionRoof
            ? this.setBeamsPosition(pointForRafter, rafterType, false, true)
            : this.setBeamsPosition(pointForRafter, rafterType, true);
          break;

        case typeSolid:
          if (state.tails) {
            ChangeGlobalMorph("1", 0);

            processRafterCut.call(this, rafterShotType, pointForRafterSolid);
            processRafterCut.call(
              this,
              rafterShotTypeBack,
              pointForRafterSolid
            );
          }

          break;

        case typeCombo:
          this.setBeamsPosition(
            pointForRafter.slice(0, pointForRafter.length / 2),
            rafterType,
            true
          );
          break;
      }
    }

    ChangeGlobalMorph("-2", 1);

    switch (true) {
      // TYPE LETTICE
      case typeLattice && !state.removeLettice:
        const latticeX = !state.thickness
          ? this.roof.lattice2x2X
          : this.roof.lattice3x3X;
        const latticeY = !state.thickness
          ? this.roof.lattice2x2Y
          : this.roof.lattice3x3Y;

        // latticeX.object.position.x = 0;

        // LATTICE X

        ChangeGlobalMorph("-2", 0.5);

        // LATTICE Y
        if (state.directionRoof) {
          this.setLatticePosition(pointLatticeY, true);
        } else {
          this.setLatticePosition(pointLatticeX);
        }

        break;

      //TYPE SOLID
      case typeSolid:
        break;
    }
  }

  setRoofBeam() {
    this.changeRoofVisibility(false, "headBevelSingle", null, true);
    this.changeRoofVisibility(false, "headBevelDouble", null, true);

    this.changeRoofVisibility(false, "headMiterSingle", null, true);
    this.changeRoofVisibility(false, "headMiterDouble", null, true);

    this.changeRoofVisibility(false, "headCorbelSingle", null, true);
    this.changeRoofVisibility(false, "headCorbelDouble", null, true);

    this.changeRoofVisibility(false, "headScallopSingle", null, true);
    this.changeRoofVisibility(false, "headScallopDouble", null, true);

    this.changeRoofVisibility(false, "louverFrame", null, true);

    this.changeRoofVisibility(false, "louverBeamX", null, true);
    this.changeRoofVisibility(false, "louverBeamY", null, true);

    const typeCombo = state.roofType === 2; //COMBO
    const typeSolid = state.roofType === 1;

    const changedOverhang = this.inchesToMeters(-state.overhang);

    const offsetForOverhangPosts = changedOverhang;

    const { FL_point, RL_point, FR_point } = this.getCornerPoints(
      offsetForOverhangPosts,
      offsetForOverhangPosts
    );

    const { point_post_length, point_post_width, point_louver_width } =
      this.getPostPoints(offsetForOverhangPosts, offsetForOverhangPosts);

    const pointForBeam =
      state.backWall && state.wallOption !== 3
        ? [FL_point, ...point_post_length]
        : [FL_point, ...point_post_length, RL_point];

    const pointForBeamDir = [
      state.leftWall ? (state.wallOption === 3 ? FL_point : null) : FL_point,
      ...point_post_width,
      state.rightWall ? (state.wallOption === 3 ? FR_point : null) : FR_point,
    ].filter((el) => el !== null);

    const pointHeader = state.directionRoof ? pointForBeamDir : pointForBeam;

    // HEADER
    switch (state.endCuts) {
      case 1:
        const roofBevel = !state.beam
          ? this.roof.headBevelSingle
          : this.roof.headBevelDouble;

        state.directionRoof
          ? this.setBeamsPosition(pointHeader, roofBevel, true, true)
          : this.setBeamsPosition(pointHeader, roofBevel);
        break;

      case 2:
        const roofMiter = !state.beam
          ? this.roof.headMiterSingle
          : this.roof.headMiterDouble;

        state.directionRoof
          ? this.setBeamsPosition(pointHeader, roofMiter, true, true)
          : this.setBeamsPosition(pointHeader, roofMiter);
        break;

      case 3:
        const roofCorbel = !state.beam
          ? this.roof.headCorbelSingle
          : this.roof.headCorbelDouble;

        state.directionRoof
          ? this.setBeamsPosition(pointHeader, roofCorbel, true, true)
          : this.setBeamsPosition(pointHeader, roofCorbel);
        break;

      case 4:
        const roofScallop = !state.beam
          ? this.roof.headScallopSingle
          : this.roof.headScallopDouble;

        state.directionRoof
          ? this.setBeamsPosition(pointHeader, roofScallop, true, true)
          : this.setBeamsPosition(pointHeader, roofScallop);
        break;

      default:
        break;
    }
  }

  getAvaliableObjectFromOneArray(
    objects,
    propertyName = null,
    propertyValue = null
  ) {
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];

      if (!element.active) {
        element.active = true;

        return element;
      }
    }
  }

  setPostsPosition(nameArray, points, side = false) {
    const posts = this.post[nameArray];
    const offsetWrapKit = state.wrapKit || state.postType ? 0.07 : 0.12;

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const element = posts[i];

      if (element == null) {
        return;
      }

      if (!side) {
        element.object.position.set(point.x, point.y, point.z);
      } else {
        switch (nameArray) {
          case "postHeadsOneLeft":
          case "postHeadsTwoLeft":
          case "postSquareLeft":
          case "postRoundLeft":
          case "post3x3Left":
            element.object.position.z = point.z;
            element.object.position.x = -point.x;

            break;

          case "postHeadsOneRight":
          case "postHeadsTwoRight":
          case "postSquareRight":
          case "postRoundRight":
          case "post3x3Right":
            element.object.position.z = point.z;
            element.object.position.x = point.x;

            break;

          case "postHeadsOneBack":
          case "postHeadsTwoBack":
          case "postSquareBack":
          case "postRoundBack":
          case "post3x3Back":
            element.object.position.x = point.x;
            element.object.position.z = -point.z;

            break;

          case "postHeadsOneFront":
          case "postHeadsTwoFront":
          case "postSquareFront":
          case "postRoundFront":
          case "post3x3Front":
            element.object.position.x = point.x;
            element.object.position.z = point.z;
            break;

          case "rainFront":
          case "rainCornerFront":
            element.object.position.x = point.x;
            element.object.position.z = point.z - offsetWrapKit;
            break;

          case "rainBack":
            element.object.position.x = point.x;
            element.object.position.z = -point.z + offsetWrapKit;
            break;

          case "rainCornerBack":
            element.object.position.x = point.x;
            element.object.position.z = point.z + offsetWrapKit;
            break;
        }
      }

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  clonePostObject(count, side) {
    const element = this.getPost(side);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName("Scene");

      if (parent) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      const postObject = new PergolaPostObject();
      postObject.name = element.name;
      postObject.object = clonedMesh;
      postObject.place = side;
      this.post[side].push(postObject);
    }
  }
  getPost(side) {
    let element;

    if (this.post == null) {
      return;
    }

    if (
      side === "postSquare" ||
      side === "postSquareLeft" ||
      side === "postSquareRight" ||
      side === "postSquareBack" ||
      side === "postSquareFront"
    ) {
      model.traverse((o) => {
        if (o.name === "post_square") {
          element = o;
        }
      });
    }

    if (
      side === "postRound" ||
      side === "postRoundLeft" ||
      side === "postRoundRight" ||
      side === "postRoundBack" ||
      side === "postRoundFront"
    ) {
      model.traverse((o) => {
        if (o.name === "post_round") {
          element = o;
        }
      });
    }

    if (
      side === "postHeadsOne" ||
      side === "postHeadsOneLeft" ||
      side === "postHeadsOneRight" ||
      side === "postHeadsOneBack" ||
      side === "postHeadsOneFront"
    ) {
      model.traverse((o) => {
        if (o.name === "post_standart_1_heads") {
          element = o;
        }
      });
    }

    if (
      side === "postHeadsTwo" ||
      side === "postHeadsTwoLeft" ||
      side === "postHeadsTwoRight" ||
      side === "postHeadsTwoBack" ||
      side === "postHeadsTwoFront"
    ) {
      model.traverse((o) => {
        if (o.name === "post_standart_2_heads") {
          element = o;
        }
      });
    }

    if (
      side === "post3x3" ||
      side === "post3x3Left" ||
      side === "post3x3Right" ||
      side === "post3x3Back" ||
      side === "post3x3Front"
    ) {
      model.traverse((o) => {
        if (o.name === "post_3x3") {
          element = o;
        }
      });
    }

    if (side === "rainFront" || side === "rainCornerFront") {
      model.traverse((o) => {
        if (o.name === "rain_front") {
          element = o;
        }
      });
    }

    if (side === "rainBack" || side === "rainCornerBack") {
      model.traverse((o) => {
        if (o.name === "rain_back") {
          element = o;
        }
      });
    }

    return element;
  }

  cloneLouveredObject(count) {
    var element = this.roof.louvered.objects[0];
    if (element == null) {
      return;
    }

    for (let index = 0; index < count; index++) {
      var clonedMesh = element.object.clone();
      clonedMesh.visible = false;

      var parent = scene.getObjectByName("Scene");

      if (parent != null) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      var louveredObject = new PergolaRoofTypeLouveredObject();
      louveredObject.object = clonedMesh;

      this.roof.louvered.objects.push(louveredObject);
    }
  }

  cloneBeamObject(direction, count, isFanBeam = false) {
    var element = this.roof.beams.find(
      (item) => item.isFanBeam == isFanBeam && item.direction == direction
    );
    if (element == null) {
      return;
    }

    for (let index = 0; index < count; index++) {
      var clonedMesh = element.object.clone();
      clonedMesh.visible = false;

      var parent = scene.getObjectByName("Scene");

      if (parent != null) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      var beamObject = new PergolaRoofBeam();
      beamObject.direction = direction;
      beamObject.object = clonedMesh;
      beamObject.isFanBeam = isFanBeam;

      this.roof.beams.push(beamObject);
    }
  }

  cloneFrameObject(count) {
    const element = this.roof.frames[0];
    if (element == null) {
      return;
    }

    for (let index = 0; index < count; index++) {
      const clonedMesh = element.object.clone();
      clonedMesh.visible = false;

      const parent = scene.getObjectByName("Scene");

      if (parent != null) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      const frameObject = new PergolaRoofFrame();
      frameObject.object = clonedMesh;

      this.roof.frames.push(frameObject);
    }
  }

  cloneExtraOptionObject(type, count) {
    var element = this.extraOptions.elements.find((item) => item.type == type);

    if (element == null && type != PergolaExtraOptionType.moodLight) {
      return;
    }

    if (type != PergolaExtraOptionType.moodLight) {
      for (let index = 0; index < count; index++) {
        var extraOptionElement = new PergolaExtraOptionElement();
        extraOptionElement.type = element.type;

        var clonedMesh = element.object.clone();
        clonedMesh.visible = false;

        if (["Android", "iOS", "VisionPro"].includes(currentOS)) {
          if (type == PergolaExtraOptionType.light) {
            for (let l = 0; l < clonedMesh.children.length; l++) {
              const element = clonedMesh.children[l];
              if (!element.isLight) {
                continue;
              }
              pointLights.push(element);
            }
          }

          if (type == PergolaExtraOptionType.led) {
            for (let l = 0; l < clonedMesh.children.length; l++) {
              const element = clonedMesh.children[l];
              if (!element.isLight) {
                continue;
              }
              ledLights.push(element);
            }
          }

          if (type == PergolaExtraOptionType.moodLed) {
            for (let l = 0; l < clonedMesh.children.length; l++) {
              const element = clonedMesh.children[l];
              if (!element.isLight) {
                continue;
              }
              moodLeds.push(element);
            }
          }
        }

        var parent = scene.getObjectByName("Scene");

        if (parent != null) {
          parent.add(clonedMesh);
        } else {
          scene.add(clonedMesh);
        }

        extraOptionElement.object = clonedMesh;

        this.extraOptions.elements.push(extraOptionElement);
      }
    } else {
      // MOOD LIGHT
      for (let i = 0; i < count; i++) {
        const extraOptionElement = new PergolaExtraOptionElement();
        extraOptionElement.type = type;

        for (let j = 0; j < 4; j++) {
          const rectLight = new THREE.RectAreaLight(0xffffff, 1, 1, 0.05);
          rectLight.power = 3;
          rectLight.visible = false;

          // scene.add(new RectAreaLightHelper(rectLight)); //! TEMP for test

          const parent = scene.getObjectByName("Scene");
          if (parent != null) {
            parent.add(rectLight);
          } else {
            scene.add(rectLight);
          }

          extraOptionElement.objects[j] = rectLight;
        }
        this.extraOptions.elements.push(extraOptionElement);
      }
    }
  }

  prepareLouvereds() {
    const count = 209; // 629;
    this.cloneLouveredObject(count);
  }

  prepareRoof() {
    const prepareCountHead = 7;
    const prepareCountSolidRoof = Math.floor(MORPH_DATA.width.max / 0.5) * 2;
    const countLattice = MORPH_DATA.length.max / 0.0254;
    const prepareCountRafter = MORPH_DATA.width.max / 2; //rafter Interval
    const prepareCountRafterShot = prepareCountRafter * 4;

    this.cloneRoofObject("headerBackWall", prepareCountHead);

    // HEADER
    this.cloneRoofObject("headBevelSingle", prepareCountHead);
    this.cloneRoofObject("headBevelDouble", prepareCountHead);

    this.cloneRoofObject("headMiterSingle", prepareCountHead);
    this.cloneRoofObject("headMiterDouble", prepareCountHead);

    this.cloneRoofObject("headCorbelSingle", prepareCountHead);
    this.cloneRoofObject("headCorbelDouble", prepareCountHead);

    this.cloneRoofObject("headScallopSingle", prepareCountHead);
    this.cloneRoofObject("headScallopDouble", prepareCountHead);

    // RAFTER
    this.cloneRoofObject("rafterBevelSingle", prepareCountRafter);
    this.cloneRoofObject("rafterBevelDouble", prepareCountRafter);

    this.cloneRoofObject("rafterBevelSingleCut", prepareCountRafterShot);
    this.cloneRoofObject("rafterBevelDoubleCut", prepareCountRafterShot);

    this.cloneRoofObject("rafterBevelSingleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterBevelDoubleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterBevelSingleShotBack", prepareCountRafterShot);
    this.cloneRoofObject("rafterBevelDoubleShotBack", prepareCountRafterShot);

    this.cloneRoofObject("rafterMiterSingle", prepareCountRafter);
    this.cloneRoofObject("rafterMiterDouble", prepareCountRafter);

    this.cloneRoofObject("rafterMiterSingleCut", prepareCountRafterShot);
    this.cloneRoofObject("rafterMiterDoubleCut", prepareCountRafterShot);

    this.cloneRoofObject("rafterMiterSingleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterMiterDoubleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterMiterSingleShotBack", prepareCountRafterShot);
    this.cloneRoofObject("rafterMiterDoubleShotBack", prepareCountRafterShot);

    this.cloneRoofObject("rafterCorbelSingle", prepareCountRafter);
    this.cloneRoofObject("rafterCorbelDouble", prepareCountRafter);

    this.cloneRoofObject("rafterCorbelSingleCut", prepareCountRafterShot);
    this.cloneRoofObject("rafterCorbelDoubleCut", prepareCountRafterShot);

    this.cloneRoofObject("rafterCorbelSingleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterCorbelDoubleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterCorbelSingleShotBack", prepareCountRafterShot);
    this.cloneRoofObject("rafterCorbelDoubleShotBack", prepareCountRafterShot);

    this.cloneRoofObject("rafterScallopSingle", prepareCountRafter);
    this.cloneRoofObject("rafterScallopDouble", prepareCountRafter);

    this.cloneRoofObject("rafterScallopSingleCut", prepareCountRafterShot);
    this.cloneRoofObject("rafterScallopDoubleCut", prepareCountRafterShot);

    this.cloneRoofObject("rafterScallopSingleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterScallopDoubleShot", prepareCountRafterShot);
    this.cloneRoofObject("rafterScallopSingleShotBack", prepareCountRafterShot);
    this.cloneRoofObject("rafterScallopDoubleShotBack", prepareCountRafterShot);

    // LATTICE
    this.cloneRoofObject("lattice2x2X", countLattice);
    this.cloneRoofObject("lattice3x3X", countLattice);

    this.cloneRoofObject("lattice2x2Y", countLattice);
    this.cloneRoofObject("lattice3x3Y", countLattice);

    //SOLID FRAME
    this.cloneRoofObject("solidFrame", 1);
    this.cloneRoofObject("solidRoof", prepareCountSolidRoof);

    //LOUVER FRAME
    this.cloneRoofObject("louverFrame", 1);

    this.cloneRoofObject("louverX", prepareCountSolidRoof);
    this.cloneRoofObject("louverY", prepareCountSolidRoof);

    this.cloneRoofObject("louverBeamX", prepareCountRafter);
    this.cloneRoofObject("louverBeamY", prepareCountRafter);

    this.cloneRoofObject("headerBackWall", 1);

    // RAIN
    this.cloneRoofObject("rainShield", 1);

    // RAIN
    this.cloneRoofObject("fanBeam", prepareCountRafter);
  }

  prepareOptions() {
    // this.cloneInObject("heatersFront", 8 * 4);
    // this.cloneInObject("heatersBack", 8 * 4);
    this.cloneInObject("fans", 8 * 4);
    this.cloneInObject("fansBeam", 8 * 4);
    this.cloneInObject("fansBeamY", 8 * 4);
    this.cloneInObject("leds", 8 * 4);
    this.cloneInObject("ledsDifSide", 8 * 4);
  }

  cloneInObject(
    type = "baseBeams",
    count,
    needToAdd = true,
    parentName = "Scene"
  ) {
    const element = this.getRoofElement(type);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName(parentName);
      if (needToAdd && parent) {
        parent.add(clonedMesh);
      }
      if (needToAdd && !parent) {
        scene.add(clonedMesh);
      }

      const roofObject = new PergolaRoofObject();
      roofObject.name = element.name;
      roofObject.type = element.type;
      roofObject.object = clonedMesh;
      this[type].push(roofObject);
    }
  }

  cloneRoofObject(
    type = "baseBeams",
    count,
    needToAdd = true,
    parentName = "Scene"
  ) {
    const element = this.getRoofElement(type);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName(parentName);
      if (needToAdd && parent) {
        parent.add(clonedMesh);
      }
      if (needToAdd && !parent) {
        scene.add(clonedMesh);
      }

      const roofObject = new PergolaRoofObject();
      roofObject.name = element.name;
      roofObject.type = element.type;
      roofObject.object = clonedMesh;
      this.roof[type].push(roofObject);
    }
  }

  animateFans() {
    const animationStates = new WeakMap();

    const fanObjects = this.fans;

    const fanObjectsCombo = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.fan
    );

    for (let i = 0; i < fanObjects.length; i++) {
      const elementFan = fanObjects[i];

      this.animateGroup(elementFan.object, true, animationStates);
    }

    for (let i = 0; i < fanObjectsCombo.length; i++) {
      const elementFan = fanObjectsCombo[i];

      this.animateGroup(elementFan.object, true, animationStates);
    }
  }

  animateGroup(group, startAnimation, animationStates) {
    const child = group.children[2] || group;
    console.log(child);

    if (!child) return;

    const isAnimating = animationStates.get(group);

    if (startAnimation) {
      if (isAnimating) return;
      animationStates.set(group, true);

      const rotateChild = () => {
        if (!animationStates.get(group)) return;
        child.rotation.y += 0.05;
        child.rotation.y %= Math.PI * 2;
        requestAnimationFrame(rotateChild);
      };

      rotateChild();
    } else {
      animationStates.set(group, false);
    }
  }

  getRoofElement(type = "beams", name = null) {
    let element;

    if (type === "headerBackWall") {
      model.traverse((o) => {
        if (o.name === "beam_X") {
          element = o;
        }
      });
    }

    //HEADER
    if (type === "headBevelSingle") {
      model.traverse((o) => {
        if (o.name === "head_bevel_1") {
          element = o;
        }
      });
    }

    if (type === "headBevelDouble") {
      model.traverse((o) => {
        if (o.name === "head_bevel_2") {
          element = o;
        }
      });
    }

    if (type === "headMiterSingle") {
      model.traverse((o) => {
        if (o.name === "head_miter_1") {
          element = o;
        }
      });
    }

    if (type === "headMiterDouble") {
      model.traverse((o) => {
        if (o.name === "head_miter_2") {
          element = o;
        }
      });
    }

    if (type === "headCorbelSingle") {
      model.traverse((o) => {
        if (o.name === "head_corbel_1") {
          element = o;
        }
      });
    }

    if (type === "headCorbelDouble") {
      model.traverse((o) => {
        if (o.name === "head_corbel_2") {
          element = o;
        }
      });
    }

    if (type === "headScallopSingle") {
      model.traverse((o) => {
        if (o.name === "head_scallop_1") {
          element = o;
        }
      });
    }

    if (type === "headScallopDouble") {
      model.traverse((o) => {
        if (o.name === "head_scallop_2") {
          element = o;
        }
      });
    }

    //RAFTER

    if (type === "rafterBevelSingle") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_1") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }
    if (type === "rafterBevelDouble") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_2") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }

    if (type === "rafterBevelSingleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_1_cut") {
          element = o;
        }
      });
    }
    if (type === "rafterBevelDoubleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_2_cut") {
          element = o;
        }
      });
    }

    if (type === "rafterBevelSingleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_1_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterBevelDoubleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_2_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterBevelSingleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_1_shot001") {
          element = o;
        }
      });
    }
    if (type === "rafterBevelDoubleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_bevel_2_shot001") {
          element = o;
        }
      });
    }

    if (type === "rafterMiterSingle") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_1") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }
    if (type === "rafterMiterDouble") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_2") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }

    if (type === "rafterMiterSingleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_1_cut") {
          element = o;
        }
      });
    }
    if (type === "rafterMiterDoubleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_2_cut") {
          element = o;
        }
      });
    }

    if (type === "rafterMiterSingleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_1_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterMiterDoubleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_2_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterMiterSingleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_1_shot001") {
          element = o;
        }
      });
    }
    if (type === "rafterMiterDoubleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_miter_2_shot001") {
          element = o;
        }
      });
    }

    if (type === "rafterCorbelSingle") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_1") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }
    if (type === "rafterCorbelDouble") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_2") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }

    if (type === "rafterCorbelSingleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_1_cut") {
          element = o;
        }
      });
    }

    if (type === "rafterCorbelDoubleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_2_cut") {
          element = o;
        }
      });
    }

    if (type === "rafterCorbelSingleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_1_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterCorbelDoubleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_2_shot") {
          element = o;
        }
      });
    }

    if (type === "rafterCorbelSingleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_1_shot001") {
          element = o;
        }
      });
    }
    if (type === "rafterCorbelDoubleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_corbel_2_shot001") {
          element = o;
        }
      });
    }

    if (type === "rafterScallopSingle") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_1") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }
    if (type === "rafterScallopDouble") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_2") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }

    if (type === "rafterScallopSingleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_1_cut") {
          element = o;
        }
      });
    }
    if (type === "rafterScallopDoubleCut") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_2_cut") {
          element = o;
        }
      });
    }

    if (type === "rafterScallopSingleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_1_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterScallopDoubleShot") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_2_shot") {
          element = o;
        }
      });
    }
    if (type === "rafterScallopSingleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_1_shot001") {
          element = o;
        }
      });
    }
    if (type === "rafterScallopDoubleShotBack") {
      model.traverse((o) => {
        if (o.name === "rafter_scallop_2_shot001") {
          element = o;
        }
      });
    }

    // LATTICE

    if (type === "lattice2x2X") {
      model.traverse((o) => {
        if (o.name === "lattice_2x2_X") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }
    if (type === "lattice3x3X") {
      model.traverse((o) => {
        if (o.name === "lattice_3x3_X") {
          element = o;
          element.receiveShadow = false;
        }
      });
    }

    if (type === "lattice2x2Y") {
      model.traverse((o) => {
        if (o.name === "lattice_2x2_Y") {
          element = o;
        }
      });
    }
    if (type === "lattice3x3Y") {
      model.traverse((o) => {
        if (o.name === "lattice_3x3_Y") {
          element = o;
        }
      });
    }

    // SOLID FRAME
    if (type === "solidFrame") {
      model.traverse((o) => {
        if (o.name === "solid_frame") {
          element = o;
        }
      });
    }

    // SOLID ROOF
    if (type === "solidRoof") {
      model.traverse((o) => {
        if (o.name === "solid_roof") {
          element = o;
        }
      });
    }

    // LOUVER
    if (type === "louverFrame") {
      model.traverse((o) => {
        if (o.name === "louvered_frame") {
          element = o;
        }
      });
    }

    if (type === "louverX") {
      model.traverse((o) => {
        if (o.name === "louver_X") {
          element = o;
        }
      });
    }
    if (type === "louverY") {
      model.traverse((o) => {
        if (o.name === "louver_Y") {
          element = o;
        }
      });
    }

    if (type === "louverBeamX") {
      model.traverse((o) => {
        if (o.name === "louvered_baem_X") {
          element = o;
        }
      });
    }
    if (type === "louverBeamY") {
      model.traverse((o) => {
        if (o.name === "louvered_baem_Y") {
          element = o;
        }
      });
    }

    //OPTIONS
    if (type === "fans") {
      model.traverse((o) => {
        if (o.name === "fan") {
          element = o;
        }
      });
    }
    if (type === "pointLights") {
      model.traverse((o) => {
        if (o.name === "point-light") {
          element = o;
        }
      });
    }

    //RAIN
    if (type === "rainShield") {
      model.traverse((o) => {
        if (o.name === "rain_shield") {
          element = o;
        }
      });
    }

    //BEAM
    if (type === "fans") {
      model.traverse((o) => {
        if (o.name === "fan") {
          element = o;
        }
      });
    }

    //FANS
    if (type === "fansBeam") {
      model.traverse((o) => {
        if (o.name === "beam") {
          element = o;
        }
      });
    }

    if (type === "fansBeamY") {
      model.traverse((o) => {
        if (o.name === "beam_Y") {
          element = o;
        }
      });
    }

    //LEDS
    if (type === "leds" || type === "ledsDifSide") {
      model.traverse((o) => {
        if (o.name === "flushmount_lights") {
          element = o;
        }
      });
    }

    return element;
  }

  prepareBeams() {
    const count = 2;
    this.cloneBeamObject(PergolaRoofDirection.Straight, count + 1, false);
    this.cloneBeamObject(PergolaRoofDirection.Perpendicular, count, false);
    this.cloneBeamObject(PergolaRoofDirection.Straight, 17, true);
  }

  prepareFrames() {
    const count = 1; // 17;
    this.cloneFrameObject(count);
  }

  editSystem(span) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) {
      return;
    }

    state.lastSpan = span;
    this.settings.currentSpan = span;
    this.settings.currentSubsystem = system;
    this.settings.currentSubsystemKey = system.name;

    triggerIconClick(system.type);
  }

  checkSystemInScene(typeSys, side = false) {
    return this.span.objects.some((span) =>
      span.systems.some((system) => {
        const isCorrectSide = this.checkSide(side, system.side);

        const compareGul = this.checkSystemType(typeSys, system.type);

        return system.active && compareGul && isCorrectSide;
      })
    );
  }

  checkSide(side, systemSide) {
    if (side === pergolaConst.side.Back) {
      return (
        systemSide === pergolaConst.side.Back ||
        systemSide === pergolaConst.side.Front
      );
    } else if (side === pergolaConst.side.Left) {
      return (
        systemSide === pergolaConst.side.Left ||
        systemSide === pergolaConst.side.Right
      );
    } else {
      return true;
    }
  }

  checkSystemType(typeSys, systemType) {
    return systemType === typeSys;
  }

  getLastActiveSpan(typeSys, side = false, number = false) {
    return this.span.objects.filter((span) => {
      if ((span.number !== number || span.side !== side) && side && number)
        return false;

      return span.systems.some(
        (system) => system.active && system.type === typeSys
      );
    });
  }

  checkSystemInAllSpans(typeSys) {
    return this.span.objects.some((span) =>
      span.systems.find((system) => system.active && system.type === typeSys)
    );
  }

  resetSpans() {
    const spans = this.span.objects;
    for (let i = 0; i < spans.length; i++) {
      spans[i].avatar.visible = false;
      spans[i].active = false;
      spans[i].isLocked = false;
    }
  }

  getSpanPoints() {
    const offsetX = this.inchesToMeters(-state.overhang);
    const offsetZ = this.inchesToMeters(-state.overhang);
    const offsetBackZ = 0;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints(
      offsetX,
      offsetZ
    );

    const widthInterval = state.postWidthInterval;
    const depthInterval = state.postDepthInterval;
    const currentWidth = state.width;
    const currentDepth = state.length;

    const front_span_points = generateCenterMidpoints(
      FL_point,
      FR_point,
      Math.floor(currentWidth / widthInterval),
      true
    );
    const back_span_points = generateCenterMidpoints(
      RL_point.clone().add(new THREE.Vector3(0, 0, offsetBackZ)),
      RR_point.clone().add(new THREE.Vector3(0, 0, offsetBackZ)),
      Math.floor(currentWidth / widthInterval),
      true
    );
    const left_span_points = generateCenterMidpoints(
      FL_point,
      RL_point,
      Math.floor(currentDepth / depthInterval),
      true
    );
    const right_span_points = generateCenterMidpoints(
      FR_point,
      RR_point,
      Math.floor(currentDepth / depthInterval),
      true
    );

    const { point_post_length, point_post_width } = this.getPostPoints();
    // const { zAligned, xAligned } = this.getCornerPairs();

    function calculateDistance(point1, point2, correct) {
      const adjustedPoint1 = point1;
      const adjustedPoint2 = point2;

      let distance = Math.sqrt(Math.pow(adjustedPoint2 - adjustedPoint1, 2));

      if (correct) {
        const additionalOffset = 0.2;
        distance -= additionalOffset;
      }

      return distance;
    }

    const lenghtPoints = [FR_point, ...point_post_length, RR_point];
    const widthPoints = [FL_point, ...point_post_width, FR_point];

    const span_width = calculateDistance(widthPoints[0].x, widthPoints[1].x);
    const span_depth = calculateDistance(lenghtPoints[0].z, lenghtPoints[1].z);

    // console.log(span_width, span_depth, "CONSOLE LOG SPAN SIZE");

    return {
      front_span_points,
      back_span_points,
      left_span_points,
      right_span_points,
      span_width,
      span_depth,
    };
  }

  showAvailableSpans() {
    if (
      state.currentActiveSystems !== null &&
      state.currentActiveSystems !== undefined
    ) {
      const spans = this.span.objects;

      for (let i = 0; i < spans.length; i++) {
        setHotspotVisibility(spans[i].hotspot, spans[i].active);
      }
    }
  }

  outlineAvatar(object, active, animate = true) {
    if (!object) {
      return;
    }
    if (active && object.visible) {
      return;
    }
    if (!active && !object.visible) {
      return;
    }

    if (!active) {
      object.material.opacity = 0;
      object.material.needsUpdate = true;
      object.visible = false;
    } else {
      object.visible = true;

      if (animate) {
        object.material.opacity = 0;
        object.material.needsUpdate = true;
        animateProperty(
          object.material,
          "opacity",
          spanOpacity + 0.2,
          250,
          () => {
            object.material.needsUpdate = true;
          }
        );
      } else {
        object.material.opacity = spanOpacity + 0.2;
        object.material.needsUpdate = true;
      }
    }
  }

  //#region SPAN LOGIC

  putCurrentMenuSystemToCurrentSpan(span) {
    const currentSubsystem = state.currentActiveSystems;
    // const group = subSystems_options[this.settings.currentSubsystemKey].group;

    span.systems.forEach((system) => {
      system.active = false;
      this.changeObjectVisibility(false, system.object);
      // this.changeObjectVisibility(false, system.windowObject);
    });

    span.active = true;
    span.isSystemSet = false;

    const activeSystem = span.systems.find((system) => {
      return system.type === currentSubsystem;
    });

    // console.log(activeSystem, "ACTIVE SYSTEM");

    if (activeSystem) {
      activeSystem.active = true;
      state.currentActiveSystems = activeSystem.type;

      span.active = false;
      span.isSystemSet = true;

      this.changeObjectVisibility(true, activeSystem.object);

      console.log(activeSystem.type);

      //SAVE TO URL;
      const subForUrl = {
        spanNumber: state.lastSpan.number,
        type: activeSystem.type,
        side: state.lastSpan.side,
      };

      state.subSystemUrl.add(subForUrl);
    }

    function updateInputs(groupId, system) {
      const radioGroup = jQuery(`#${groupId} .canvas_menu__item_radio`);
      if (system.openingside) {
        radioGroup.find('input[value="Left"]').prop("checked", true);
      } else {
        radioGroup.find('input[value="Right"]').prop("checked", true);
      }

      const rangeInput = jQuery(
        `#${groupId} .range-container input[type="range"]`
      );
      // const newValue = system.openValue !== null ? system.openValue : "0";
      rangeInput.val(pergolaSettings.openShade);

      updateRangeBackgroundAndLabel(rangeInput);

      jQuery(`#${groupId}`).addClass("active");

      pergola && pergola.updatePopUpAndOverview();
    }

    this.update();
  }

  putCurrentMenuSystemToAllFreeSpans() {
    const currentSubsystem = this.settings.currentSubsystem;
    const spans = this.span.objects;

    spans.forEach((span) => {
      if (span.active && !span.isSystemSet) {
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });

        const activeSystem = span.systems.find((system) => {
          return system.type === currentSubsystem;
        });

        if (activeSystem) {
          activeSystem.active = true;
          span.active = false;
          span.isSystemSet = true;
          this.changeObjectVisibility(true, activeSystem.object);
        }
      }
    });

    this.update();
  }

  getSpanBySideAndNumber(side, number) {
    return this.span.objects.find(
      (span) => span.side === side && span.number === number
    );
  }

  removeSystemFromSpanType(type) {
    const spans = pergola.span.objects;

    const spansWithActiveSystem = spans.filter((span) => {
      return span.systems.some(
        (system) => system.active && system.type === type
      );
    });

    spansWithActiveSystem.forEach((span) => pergola.removeSystemFromSpan(span));
  }

  removeSystemFromSpan(span) {
    const system = span.getCurrentSystem();
    if (system) {
      system.active = false;
      system.openingside = true;
      system.openValue = 0;
      span.active = true;
      span.isLocked = true;
      span.isSystemSet = false;

      this.changeObjectVisibility(false, system.object);
      this.changeObjectVisibility(false, system.windowObject);

      this.update();
    }
  }

  //#endregion

  setSpans() {
    const {
      front_span_points,
      back_span_points,
      left_span_points,
      right_span_points,
      span_width,
      span_depth,
    } = this.getSpanPoints();

    this.resetSpans();

    const height = this.getMeters(state.height);
    const offsetZ =
      this.originZ == pergolaConst.side.Front ? (state.length * 0.0254) / 2 : 0;

    const configureSpan = (points, side, width, thickness) => {
      points.forEach((point) => {
        const span = this.getSpan(side);

        if (!span) {
          return;
        }

        span.active = span.isSystemSet ? false : true;

        if (
          (state.backWall && side === pergolaConst.side.Back) ||
          (state.leftWall && side === pergolaConst.side.Left) ||
          (state.rightWall && side === pergolaConst.side.Right)
        ) {
          span.active = false;
          span.isSystemSet = false;
          span.systems.forEach((system) => {
            system.active = false;
            this.changeObjectVisibility(false, system.object);
            // this.changeObjectVisibility(false, system.windowObject);
          });
        }

        if (!span.isLocked) {
          span.isSystemSet = false;
          span.systems.forEach((system) => {
            system.active = false;
            this.changeObjectVisibility(false, system.object);
            // this.changeObjectVisibility(false, system.windowObject);
          });
        }

        span.posX = point.x;
        span.posZ = point.z;
        span.width = width;
        span.height = height;

        if (span.systems.length > 0) {
          span.systems.forEach((system) => {
            if (system) {
              console.log(span.posX, span.posY, span.posZ);
              system.object.position.set(span.posX, span.posY, span.posZ);
              system.spanWidth = width;
              system.spanHeight = height;
            }
          });
        }

        span.avatar.position.set(span.posX, span.height / 2, span.posZ);
        span.avatar.scale.set(
          side === pergolaConst.side.Left || side === pergolaConst.side.Right
            ? thickness
            : width,
          span.height,
          side === pergolaConst.side.Left || side === pergolaConst.side.Right
            ? width
            : thickness
        );
        span.avatar.visible = false;

        span.hotspot.position.set(span.posX, model.position.y, span.posZ);
        setHotspotVisibility(span.hotspot, false);

        span.hotspot.setHoverFunction(() => {
          this.outlineAvatar(span.avatar, true);
        });

        span.hotspot.setNormalFunction(() => {
          this.outlineAvatar(span.avatar, false);
        });

        span.hotspot.setClickFunction(() => {
          state.lastSpan = span;

          this.putCurrentMenuSystemToCurrentSpan(span);

          triggerIconClick(state.currentActiveSystems);
        });
      });
    };

    configureSpan(
      front_span_points,
      pergolaConst.side.Front,
      span_width,
      spanAvatarThickness
    );
    configureSpan(
      back_span_points,
      pergolaConst.side.Back,
      span_width,
      spanAvatarThickness
    );
    configureSpan(
      left_span_points,
      pergolaConst.side.Left,
      span_depth,
      spanAvatarThickness
    );
    configureSpan(
      right_span_points,
      pergolaConst.side.Right,
      span_depth,
      spanAvatarThickness
    );

    this.checkAllSpans();
  }

  checkAllSpans() {
    const spans = this.span.objects;

    spans.forEach((span) => {
      if (!span.isLocked) {
        span.isSystemSet = false;

        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });
      }
    });
  }

  getSpan(side) {
    const spans = this.span.objects;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];

      if (span.side === side && !span.isLocked) {
        span.isLocked = true;
        return span;
      }
    }

    return null;
  }

  selectInterval(type = 0) {
    let intervalWidth = 0;
    let intervalLength = 0;
    let maxLouver = 0;
    let widthLouver = 0;

    switch (type) {
      case 0:
        intervalLength = state.roofType === 1 ? 16.5 : 12.5;
        intervalWidth = state.ab ? 20.5 : !state.beamSize ? 12.5 : 10.5;

        if (state.ab && state.beam) intervalWidth = 24.5;

        maxLouver = 15;
        widthLouver = 0.266425 / 1.2;

        break;

      default:
        console.log(`not have type`);

        break;
    }

    return {
      intervalWidth,
      intervalLength,
      maxLouver,
      widthLouver,
    };
  }

  changeDemisionParams() {
    const { intervalWidth, intervalLength } = this.selectInterval();

    state.postWidthInterval = intervalWidth;
    state.postDepthInterval = intervalLength;
  }

  async update() {
    this.changeDemisionParams();
    this.changeDimensions(state.width, state.length, state.height);

    if (
      this.lastSettings.roofLouveredRotate != this.settings.roofLouveredRotate
    ) {
      this.changeRoofLouveredRotate(this.settings.roofLouveredRotate);
    }

    this.checkEndCuts();

    this.setPosts();
    this.setRoof();
    this.makeSolidAndComboRoof();
    this.setRoofBeam();

    //set options
    if (state.roofType !== 2) {
      this.setOptions();
    } else {
      this.changeExtraOptions();
    }

    this.setSpans();
    this.updateSubsystems();
    this.showAvailableSpans();

    this.extendSystemsNearWall();

    this.checkFansOnPergola();
    this.checkPostType();

    WriteURLParameters();

    InitMorphModel(theModel);
  }

  reset() {
    //this.changeDimensions(8, 8);
  }

  checkFansOnPergola() {
    if (
      state.roofType === 1 &&
      state.electro.has(pergolaConst.optionNameString.fans)
    ) {
      if (!countVisibleObjectsByName(model, "fan", true, true)) {
        const subSystems = $("#last-group").find(".option").eq(1);

        subSystems.removeClass("type_interface_electronic_item--active");

        state.electro.delete(pergolaConst.optionNameString.fans);

        subSystems
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text(`${updateTextParam(state, this, true, true, true)}`);
      }
    }
  }

  checkPostType() {
    const newText =
      state.wrapKit || state.roofType === 2 ? "Santa Fe" : "Classic";
    const option = $(".wrapp_post-type .option").eq(0);

    option.find("input").val(newText);
    option.find("label").text(newText);

    const paramLabel = option.find("input").val();

    const $groupHeadParam = option
      .closest(".interface__group")
      .find(".interface__group__head__param");

    $groupHeadParam.text(paramLabel);
  }

  checkEndCuts() {
    ChangeGlobalMorph("bevel_off", 0);

    if (state.beamSize === 1 && state.roofType === 1) {
      state.endCuts = 1;

      $("#end-cuts").addClass("disable-group");
      ChangeGlobalMorph("bevel_off", 1);

      // $("#end-cuts .option").removeClass("active");
    } else {
      $("#end-cuts").removeClass("disable-group");
      // state.endCuts = +$("#end-cuts .option.active").attr("id");
    }
  }

  clearOptionElements() {
    this.changeRoofVisibilityRest(false, "heatersFront", null, true);
    this.changeRoofVisibilityRest(false, "heatersBack", null, true);
    this.changeRoofVisibilityRest(false, "fans", null, true);
    this.changeRoofVisibilityRest(false, "leds", null, true);
    this.changeRoofVisibilityRest(false, "ledsDifSide", null, true);
    this.changeRoofVisibilityRest(false, "fansBeam", null, true);
    this.changeRoofVisibilityRest(false, "fansBeamY", null, true);
    this.changeRoofVisibility(false, "pointLED", null, true);
    this.changeRoofVisibility(false, "rampLEDX", null, true);
    this.changeRoofVisibility(false, "rampLEDY", null, true);

    const fanObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.fan
    );
    const lightObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.light
    );
    const beamObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.beam
    );
    const skylightActiveObjects = this.roof.solid.objects.filter(
      (item) => item.type == PergolaRoofObjectType.skylight && item.active
    );

    [fanObjects, lightObjects, beamObjects].forEach((array) => {
      array.forEach((element) => {
        if (element.object.isGroup) {
          for (let index = 0; index < element.object.children.length; index++) {
            const obj = element.object.children[index];
            obj.visible = false;
          }
          element.object.visible = false;
          element.active = false;
        } else {
          element.object.visible = false;
          element.active = false;
        }
      });
    });
  }

  changeExtraOptions() {
    this.clearOptionElements();

    const fanObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.fan
    );
    const lightObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.light
    );
    const beamObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.beam
    );
    const skylightActiveObjects = this.roof.solid.objects.filter(
      (item) => item.type == PergolaRoofObjectType.skylight && item.active
    );

    const { FL_point, FR_point, RL_point, FC_point, RC_point } =
      this.getCornerPointsExtraOptions();
    const { COMBO_LATTICE_CENTER_point } = this.getComboCenterPoints();
    const { FL_post_point, FR_post_point } = this.getPostPointsCombo();

    let overhangOffset = this.inchesToMeters(state.overhang);

    let roofPercent = 0.5;

    if (state.roofType !== 2) {
      roofPercent = 1;
    }

    let RL_StartPoint =
      state.roofType == 2 ? RC_point.clone() : RL_point.clone();
    let FL_StartPoint =
      state.roofType == 2 ? FC_point.clone() : FL_point.clone();
    let FR_StartPoint = FR_point.clone();

    if (!state.backWall) {
      RL_StartPoint = new THREE.Vector3(
        RL_StartPoint.x,
        RL_StartPoint.y,
        RL_StartPoint.z + overhangOffset
      );
    }

    FL_StartPoint = new THREE.Vector3(
      FL_StartPoint.x,
      FL_StartPoint.y,
      FL_StartPoint.z - overhangOffset
    );
    FR_StartPoint = new THREE.Vector3(
      FR_StartPoint.x,
      FR_StartPoint.y,
      FR_StartPoint.z - overhangOffset
    );

    let width_points;
    let length_points;

    let allPointsForLouversZ = [];

    const countPointLight = 1;
    const { RR_point } = this.getCornerPoints();
    const { point_post_length } = this.getPostPoints();

    const cornerAndBeamPointZ = [FL_point, ...point_post_length, RR_point];

    for (let i = 0; i < cornerAndBeamPointZ.length - 1; i++) {
      const spanPoints = generateMidpoints(
        cornerAndBeamPointZ[i],
        cornerAndBeamPointZ[i + 1],
        countPointLight
      );

      allPointsForLouversZ.push(...spanPoints);
    }

    // length_points = allPointsForLouversZ;

    //* LIGHTS
    if (state.electro.has(pergolaConst.optionNameString.LEDRampLight)) {
      const widthQty =
        Math.floor((state.width * roofPercent) / state.fanIntervalWidth) + 1;
      let lengthQty = Math.floor(state.length / state.fanIntervalLength) + 1;

      // if (lengthQty < 2) {
      //   lengthQty = lengthQty * 2;
      // }

      // LETTICE
      if (state.roofType !== 0) {
        width_points = generateCenterMidpoints(
          FL_StartPoint,
          FR_StartPoint,
          widthQty - 1,
          true
        );
        length_points = generateMidpoints(
          RL_StartPoint,
          FL_StartPoint,
          lengthQty * 4 - 1,
          true
        );
        length_points = length_points.filter((_, index) => index % 2 === 1);
      } else {
        width_points = generateMidpoints(
          FL_StartPoint,
          FR_StartPoint,
          widthQty * 4 - 1,
          true
        );
        width_points = width_points.filter((_, index) => index % 2 === 1);
        // length_points = generateCenterMidpoints(
        //   RL_StartPoint,
        //   FL_StartPoint,
        //   lengthQty - 1,
        //   true
        // );
      }

      if (
        (state.roofType === 1 && state.skyLight && state.width >= 12) ||
        (state.roofType === 2 && state.skyLight && state.width >= 12)
      ) {
        width_points = getWidthPointsForSkylightRoof(this, roofPercent);
      }
      state.width;
      for (let l = 0; l < length_points.length; l++) {
        const pL = length_points[l];

        for (let w = 0; w < width_points.length; w++) {
          const pW = width_points[w];

          const element = this.getAvalibleExtraLightObject(lightObjects);

          element.object.position.x = pW.x;
          element.object.position.z = pL.z;
          // element.object.position.y = 2.389 + 0.048;

          // if (state.roofType === PergolaRoofType.Louvered) {
          //   element.object.position.y = 2.389 + 0.048 - 0.05;
          // }

          if (element.object.isGroup) {
            for (let i = 0; i < element.object.children.length; i++) {
              const obj = element.object.children[i];
              if (!obj.isPointLight) obj.visible = true;
              if (obj.isPointLight && sceneTime !== "Day") {
                obj.visible = true;
              }
            }
            if (!element.object.isPointLight) element.object.visible = true;
            if (element.object.isPointLight && sceneTime !== "Day") {
              element.object.visible = true;
            }
            element.active = true;
          } else {
            if (!element.object.isPointLight) element.object.visible = true;
            if (element.object.isPointLight && sceneTime !== "Day") {
              element.object.visible = true;
            }
            element.active = true;
          }
        }
      }

      if (state.roofType === 2 && state.width >= 12) {
        width_points = generateMidpoints(FL_post_point, FC_point, 3, true);
        width_points = width_points.filter((_, index) => index % 2 === 1);
        length_points = generateCenterMidpoints(
          RL_StartPoint,
          FL_StartPoint,
          lengthQty - 1,
          true
        );

        for (let l = 0; l < length_points.length; l++) {
          const pL = length_points[l];

          for (let w = 0; w < width_points.length; w++) {
            const pW = width_points[w];

            const element = this.getAvalibleExtraLightObject(lightObjects);

            element.object.position.x = pW.x;
            element.object.position.z = pL.z;
            element.object.position.y = 2.389 + 0.048;

            // if (state.roofType === PergolaRoofType.Louvered) {
            //   element.object.position.y = 2.389 + 0.048 - 0.05;
            // }

            if (element.object.isGroup) {
              for (let i = 0; i < element.object.children.length; i++) {
                const obj = element.object.children[i];
                if (!obj.isPointLight) obj.visible = true;
                if (obj.isPointLight && sceneTime !== "Day") {
                  obj.visible = true;
                }
              }
              if (!element.object.isPointLight) element.object.visible = true;
              if (element.object.isPointLight && sceneTime !== "Day") {
                element.object.visible = true;
              }
              element.active = true;
            } else {
              if (!element.object.isPointLight) element.object.visible = true;
              if (element.object.isPointLight && sceneTime !== "Day") {
                element.object.visible = true;
              }
              element.active = true;
            }
          }
        }
      }
    }

    //* FANS
    if (state.electro.has(pergolaConst.optionNameString.fans)) {
      const fanQtyWidth =
        Math.floor((state.width * roofPercent) / state.fanIntervalWidth) + 1;
      let fanQtyLength = Math.floor(state.length / state.fanIntervalLength);

      if (fanQtyLength < 2) {
        fanQtyLength = fanQtyLength * 2;
      }

      const offsetY = 0.05;

      let width_points = generateCenterMidpoints(
        FL_StartPoint,
        FR_StartPoint,
        fanQtyWidth - 1,
        true
      );
      const length_points = generateCenterMidpoints(
        RL_StartPoint,
        FL_StartPoint,
        fanQtyLength - 1,
        true
      );

      if (
        (state.roofType === PergolaRoofType.Solid &&
          state.skyLight &&
          state.width >= 12) ||
        (state.roofType === PergolaRoofType.Combo &&
          state.skyLight &&
          state.width >= 12)
      ) {
        width_points = getWidthPointsForSkylightRoof(this, roofPercent);
      }

      if (state.roofType === PergolaRoofType.Combo) {
        const latticeFanPoints = generateMidpoints(
          FL_post_point,
          FC_point,
          1,
          false
        );
        width_points.push(...latticeFanPoints);
      }

      for (let l = 0; l < length_points.length; l++) {
        const pL = length_points[l];

        for (let w = 0; w < width_points.length; w++) {
          const pW = width_points[w];
          const element = this.getAvalibleExtraLightObject(fanObjects);
          element.object.position.x = pW.x;
          element.object.position.z = pL.z;
          element.object.position.y = 2.389 + offsetY;

          // if (state.roofType === PergolaRoofType.Louvered) {
          //   element.object.position.y = 2.389 + offsetY - 0.05;
          // }

          if (element.object.isGroup) {
            for (let i = 0; i < element.object.children.length; i++) {
              const obj = element.object.children[i];
              obj.visible = true;
            }
            element.object.visible = true;
            element.active = true;
          } else {
            element.object.visible = true;
            element.active = true;
          }
        }
      }
    }

    //* BEAMS
    if (
      state.electro.has(pergolaConst.optionNameString.fans) ||
      state.electro.has(pergolaConst.optionNameString.LEDRampLight)
    ) {
      if (state.roofType !== PergolaRoofType.Solid) {
        let beamQtyLength =
          Math.floor(state.length / state.fanIntervalLength) + 1;

        // if (beamQtyLength < 2) {
        //   beamQtyLength = beamQtyLength * 2;
        // }

        let length_points = generateCenterMidpoints(
          RL_StartPoint,
          FL_StartPoint,
          beamQtyLength - 1,
          true
        );

        for (let l = 0; l < length_points.length; l++) {
          const pL = length_points[l];
          const element = this.getAvalibleExtraLightObject(beamObjects);
          if (!element) {
            break;
          }
          element.object.position.x = 0;
          element.object.position.z = pL.z;
          // element.object.position.y = 0.05;

          if (state.roofType === PergolaRoofType.Combo) {
            element.object.position.x = COMBO_LATTICE_CENTER_point.x;
          }

          // if (state.roofType === PergolaRoofType.Louvered) {
          //   element.object.position.y = 0;
          // }

          if (element.object.isGroup) {
            for (let i = 0; i < element.object.children.length; i++) {
              const obj = element.object.children[i];
              obj.visible = true;
            }
            element.object.visible = true;
            element.active = true;
          } else {
            element.object.visible = true;
            element.active = true;
          }
        }
      }
    }

    function getWidthPointsForSkylightRoof(obj, roofPercent = 1) {
      let width_points = [];

      if (state.roofType === PergolaRoofType.Solid) {
        // 1 skylight
        if (state.width <= 16) {
          width_points = generateCenterMidpoints(
            FL_StartPoint,
            FR_StartPoint,
            1,
            true
          );
        }

        // 2 skylights
        else if (state.width > 16 && state.width < 30) {
          width_points = skylightActiveObjects.map((obj) =>
            obj.object.position.clone()
          );
          if (width_points[0].x > width_points[1].x) {
            width_points[0].x -= 32 * 0.0254;
            width_points[1].x += 32 * 0.0254;
          } else {
            width_points[0].x += 32 * 0.0254;
            width_points[1].x -= 32 * 0.0254;
          }
        }

        // 3 skylights
        else if (state.width >= 30) {
          const sky_points = skylightActiveObjects.map((obj) =>
            obj.object.position.clone()
          );
          const firstPoint = generateMidpoints(
            sky_points[0],
            sky_points[1],
            1,
            false
          );
          const secondPoint = generateMidpoints(
            sky_points[1],
            sky_points[2],
            1,
            false
          );

          width_points = [...firstPoint, ...secondPoint];

          if (state.width >= 37) {
            if (sky_points[0].x < sky_points[sky_points.length - 1].x) {
              sky_points[0].x -= 32 * 0.0254;
              sky_points[sky_points.length - 1].x += 32 * 0.0254;
            } else {
              sky_points[0].x += 32 * 0.0254;
              sky_points[sky_points.length - 1].x -= 32 * 0.0254;
            }

            width_points.push(sky_points[0]);
            width_points.push(sky_points[sky_points.length - 1]);
          }
        }
      }

      if (state.roofType === PergolaRoofType.Combo) {
        // 1 skylight
        if (state.width >= 12) {
          width_points = generateCenterMidpoints(
            FL_StartPoint,
            FR_StartPoint,
            1,
            true
          );
        }

        // 2 skylights
        // else if (state.width * roofPercent > 20) {
        //   width_points = skylightActiveObjects.map((obj) =>
        //     obj.object.position.clone()
        //   );

        //   console.log(width_points);

        //   if (width_points[0].x > width_points[1].x) {
        //     width_points[0].x -= 32 * 0.0254;
        //     width_points[1].x += 32 * 0.0254;
        //   } else {
        //     width_points[0].x += 32 * 0.0254;
        //     width_points[1].x -= 32 * 0.0254;
        //   }
        // }
      }

      return width_points;
    }
  }

  changeWallMaterials() {
    const backWall = GetGroup("wall_back");
    const leftWall = GetGroup("wall_L");
    const rightWall = GetGroup("wall_R");

    const applyTextures = state.typePergola;

    const wallTextures = TEXTURES.inner.wallCommercial;

    [backWall, leftWall, rightWall].forEach((wall) => {
      wall.children.forEach((group) => {
        group.traverse((object) => {
          if (object.isMesh) {
            const material = object.material;

            if (!material.userData.originalMap) {
              material.userData.originalMap = material.map;
              material.userData.originalNormalMap = material.normalMap;
              material.userData.originalRoughnessMap = material.roughnessMap;
            }

            if (applyTextures) {
              setMaterialTexture(wall, [material.name], wallTextures, 0.4);
            } else {
              material.map = material.userData.originalMap;
              material.normalMap = material.userData.originalNormalMap;
              material.roughnessMap = material.userData.originalRoughnessMap;

              material.needsUpdate = true;
            }
          }
        });
      });
    });
  }

  setAddOptionWall() {
    ChangeGlobalMorph("on_roof", 0);
    ChangeGlobalMorph("fascia", 0);

    const backBeam = GetMesh("back_beam_wall");
    const backBeamL = GetMesh("beam_wall_L");
    const backBeamR = GetMesh("beam_wall_L001");
    backBeam.visible = false;
    backBeamL.visible = false;
    backBeamR.visible = false;
    $("#wall-option").show();

    const backSpanSystem = pergola.span.objects.some(
      (span) => span.side === pergolaConst.side.Back && span.isSystemSet
    );

    switch (true) {
      // freestanding
      case state.wallOption === 0:
        $("#back").removeClass("active");
        $("#left").removeClass("active");
        $("#right").removeClass("active");
        $("#wall-option").hide();

        state.backWall = false;
        state.rightWall = false;
        state.leftWall = false;

        toggleBackWall(false);
        toggleRightWall(false);
        toggleLeftWall(false);

        break;

      // wall-mounted
      case state.wallOption === 1:
        if (!backSpanSystem) {
          $("#back").addClass("active");

          state.backWall = true;

          toggleBackWall(true);
        }

        break;

      // fascia-mounted
      case state.wallOption === 2:
        state.backWall = true;

        ChangeGlobalMorph("fascia", 1);

        if (state.backWall) {
          backBeam.visible = true;
          // backBeam.position.y -= 0.2;
        }

        if (state.leftWall) {
          backBeamL.visible = true;

          // if (state.directionRoof) {
          //   backBeamL.position.y = oldHeight + 0.2;
          // } else {
          //   backBeamL.position.y = oldHeight - 0.25;
          // }
        }

        if (state.rightWall) {
          backBeamR.visible = true;

          // if (state.directionRoof) {
          //   backBeamR.position.y = oldHeight + 0.2;
          // } else {
          //   backBeamR.position.y = oldHeight - 0.25;
          // }
        }

        // backBeam.position.z = backBeam.position.z - 0.01;

        // ChangeGlobalMorph("on_roof", 0.1);
        $("#back").addClass("active");

        toggleBackWall(true);
        // if (!backSpanSystem) {
        //   $("#back").addClass("active");

        //   state.backWall = true;

        //   toggleBackWall(true);
        // }

        break;

      // roof-mounted
      case state.wallOption === 3:
        if (!backSpanSystem) {
          $("#back").addClass("active");

          state.backWall = true;

          toggleBackWall(true);
        }

        if (!state.roofType) {
          ChangeGlobalMorph("on_roof", state.directionRoof ? 0.68 : 0.73);
        } else {
          ChangeGlobalMorph("on_roof", state.beamSize ? 0.75 : 0.85);
        }

        break;

      // Cantilever
      case state.wallOption === 4:
        break;
    }
  }

  rgbToHex(rgb) {
    // Перевірка на формат rgb або rgba
    var result = rgb.match(/^rgba?\((\d+), (\d+), (\d+)(?:, (\d+\.?\d*))?\)$/);

    if (result) {
      var r = parseInt(result[1]);
      var g = parseInt(result[2]);
      var b = parseInt(result[3]);

      // Перетворення значень RGB в HEX
      var hex =
        "#" +
        ((1 << 24) | (r << 16) | (g << 8) | b)
          .toString(16)
          .slice(1)
          .toUpperCase();

      return hex;
    }

    // Якщо значення не підходить, просто повертаємо порожній рядок
    return null;
  }

  changeMountingWall(back, left, right, isPostsDepend = true) {
    this.changeMountingWallVisibility(back, PergolaElementOrientSide.Back);
    this.changeMountingWallVisibility(left, PergolaElementOrientSide.Left);
    this.changeMountingWallVisibility(right, PergolaElementOrientSide.Right);

    isPostsDepend && this.changePostVisibility(true, null, false);

    if (back) {
      this.changePostVisibility(false, PergolaPostSide.RL, false);
      this.changePostVisibility(false, PergolaPostSide.RR, false);
      this.changePostVisibility(false, PergolaPostSide.BC, true);
      this.lastSettings.mountingWall_Back = this.settings.mountingWall_Back;
    }

    if (left) {
      this.changePostVisibility(false, PergolaPostSide.RL, false);
      this.changePostVisibility(false, PergolaPostSide.FL, false);
      this.changePostVisibility(false, PergolaPostSide.LC, true);
      this.lastSettings.mountingWall_Left = this.settings.mountingWall_Left;
    }

    if (right) {
      this.changePostVisibility(false, PergolaPostSide.RR, false);
      this.changePostVisibility(false, PergolaPostSide.FR, false);
      this.changePostVisibility(false, PergolaPostSide.RC, true);
      this.lastSettings.mountingWall_Right = this.settings.mountingWall_Right;
    }
  }

  getAvaliableExtraLightObject(objects) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];
      if (element.active == true) {
        continue;
      }
      return element;
    }
  }

  getAvaliableObjectFromArray(objects) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];
      if (element.active == true) {
        continue;
      }
      return element;
    }
    return null;
  }

  // calculateExtraLightObjects(objects, mainPoints, pos1, pos2, dimension, interval = 7, numP = 0, useCenterMethod = false) {
  //   if (mainPoints.length > 0) {

  //     var mainPoints2 = generateMidpoints(pos1, pos2, Math.floor(dimension / 16), true);
  //     for (let i = 0; i < mainPoints2.length; i++) {

  //       if (i + 1 >= mainPoints2.length) { continue; }

  //       var point1 = mainPoints2[i];
  //       var point2 = mainPoints2[i + 1];
  //       var points = null;
  //       if (useCenterMethod == false) {
  //         points = generateMidpoints(point1, point2, numP <= 0 ? Math.floor(dimension / (mainPoints.length) / interval) : numP);
  //       } else {
  //         points = generateCenterMidpoints(point1, point2, numP <= 0 ? Math.floor(dimension / (mainPoints.length) / interval) : numP, true);
  //       }

  //       for (let w = 0; w < points.length; w++) {
  //         const point = points[w];
  //         const index = i * mainPoints2.length + w;

  //         if (index < objects.length) {
  //           const element = this.getAvaliableExtraLightObject(objects);

  //           element.object.position.x = point.x;

  //           switch (this.settings.postSize) {
  //             case PergolaPostType._4x4:
  //               element.object.position.y = 2.337;
  //               break;
  //             case PergolaPostType._7x7:
  //               element.object.position.y = 2.286;
  //               break;
  //             case PergolaPostType._8x8:
  //               element.object.position.y = 2.234;
  //               break;
  //             default:
  //               element.object.position.y = 2.286;
  //               break;
  //           }

  //           element.object.position.z = point.z;

  //           if (element.object.isGroup) {
  //             for (let index = 0; index < element.object.children.length; index++) {
  //               const obj = element.object.children[index];
  //               obj.visible = true;
  //             }
  //             element.object.visible = true;
  //             element.active = true;
  //           } else {
  //             element.object.visible = true;
  //             element.active = true;
  //           }
  //         } else {
  //           console.warn(`The element with index ${index} does not exist in the objects array.`);
  //         }
  //       }
  //     }
  //   } else {
  //     var points = generateMidpoints(pos1, pos2, Math.floor(dimension / interval));

  //     for (let w = 0; w < points.length; w++) {
  //       const point = points[w];

  //       const index = w;

  //       if (index < objects.length) {
  //         const element = this.getAvaliableExtraLightObject(objects);

  //         element.object.position.x = point.x;

  //         switch (this.settings.postSize) {
  //           case PergolaPostType._4x4:
  //             element.object.position.y = 2.337;
  //             break;
  //           case PergolaPostType._7x7:
  //             element.object.position.y = 2.286;
  //             break;
  //           case PergolaPostType._8x8:
  //             element.object.position.y = 2.234;
  //             break;
  //           default:
  //             element.object.position.y = 2.286;
  //             break;
  //         }

  //         element.object.position.z = point.z;

  //         if (element.object.isGroup) {
  //           for (let index = 0; index < element.object.children.length; index++) {
  //             const obj = element.object.children[index];
  //             obj.visible = true;
  //           }
  //           element.object.visible = true;
  //           element.active = true;
  //         } else {
  //           element.object.visible = true;
  //           element.active = true;
  //         }
  //       } else {
  //         console.warn(`The element with index ${index} does not exist in the objects array.`);
  //       }
  //     }
  //   }
  // }

  cloneMaterialTexture(name) {
    if (this.theModel == null) {
      return;
    }
    var mat = null;
    this.theModel.traverse((o) => {
      if (o.isMesh) {
        if (o.material.name == name) {
          mat = o.material;
          if (mat.map != null) {
            mat.map = mat.map.clone();
          }
        }
      }
    });
  }

  changeMaterialTilling(name, x, y) {
    if (this.theModel == null) {
      return;
    }
    var mat = null;
    this.theModel.traverse((o) => {
      if (o.isMesh) {
        if (o.material.name == name) {
          mat = o.material;
          if (mat.map != null) {
            mat.map.repeat.set(x, y);
          }
        }
      }
    });
  }

  changeMaterialOffset(name, x, y) {
    if (this.theModel == null) {
      return;
    }
    var mat = null;
    this.theModel.traverse((o) => {
      if (o.isMesh) {
        if (o.material.name == name) {
          mat = o.material;
          if (mat.map != null) {
            mat.map.offset.set(x, y);
          }
        }
      }
    });
  }

  getAvalibleExtraLightObject(objects) {
    for (let index = 0; index < objects.length; index++) {
      const element = objects[index];
      if (element.active == true) {
        continue;
      }
      return element;
    }
  }

  extendSystemsNearWall() {
    const { right_span_points } = this.getSpanPoints();

    if (state.backWall) {
      const qntySpanLength = right_span_points.length === 1 ? 0 : 1;

      //SET MORPH
      this.span.objects
        .filter((span) => span.number === qntySpanLength)
        .forEach((span) => {
          span.systems.forEach((system) => {
            ChangeObjectMorph(
              system.object,
              "+6",
              system.type === pergolaConst.systemType.autoShade ? 0.8 : 2
            );

            system.object.children.forEach((el) => {
              ChangeObjectMorph(
                el,
                "+6",
                system.type === pergolaConst.systemType.autoShade ? 0.8 : 2
              );
            });

            if (
              system.side === pergolaConst.side.Right &&
              system.type === pergolaConst.systemType.privacyWall &&
              !system.object.rotation.y
            ) {
              system.object.rotation.y = Math.PI;
            }
          });
        });
    }

    const frontSpan = pergola.span.objects.filter(
      (span) =>
        span.side === pergolaConst.side.Front &&
        (span.active || span.isSystemSet)
    );
    const backSpan = pergola.span.objects.filter(
      (span) =>
        span.side === pergolaConst.side.Back &&
        (span.active || span.isSystemSet)
    );

    if (state.leftWall) {
      if (frontSpan.length) {
        frontSpan[0].systems.forEach((system) => {
          ChangeObjectMorph(system.object, "+12L", 1);

          system.object.children.forEach((el) => {
            ChangeObjectMorph(el, "+12L", 1);
          });
        });
      }

      if (backSpan.length) {
        backSpan[0].systems.forEach((system) => {
          ChangeObjectMorph(system.object, "+12L", 1);

          system.object.children.forEach((el) => {
            ChangeObjectMorph(el, "+12L", 1);
          });
        });
      }
    }

    if (state.rightWall) {
      if (frontSpan.length) {
        frontSpan[frontSpan.length - 1].systems.forEach((system) => {
          ChangeObjectMorph(system.object, "+12R", 1);

          system.object.children.forEach((el) => {
            ChangeObjectMorph(el, "+12R", 1);
          });
        });
      }

      if (backSpan.length) {
        backSpan[backSpan.length - 1].systems.forEach((system) => {
          ChangeObjectMorph(system.object, "+12R", 1);

          system.object.children.forEach((el) => {
            ChangeObjectMorph(el, "+12R", 1);
          });
        });
      }
    }
  }

  checkSystemsInScene() {
    const zipUIinex = 3;
    const privacyWallUIindex = 2;

    // if (state.subSystem.size) {
    if (!pergola.checkSystemInAllSpans(pergolaConst.systemType.autoShade)) {
      hideIcon(pergolaConst.systemType.autoShade);
      $(".portal-container").hide();

      const subSystems = $("#last-group").find(".option").eq(zipUIinex);

      subSystems.removeClass("type_interface_electronic_item--active");

      state.subSystem.delete(pergolaConst.systemNameString.autoShade);

      subSystems
        .closest(".interface__group")
        .find(".interface__group__head__param")
        .text(`${updateTextParam(state, this, true, true, true)}`);

      state.currentActiveSystems = null;
    } else {
      $(".portal-container__close").trigger("click");
    }

    if (!pergola.checkSystemInAllSpans(pergolaConst.systemType.privacyWall)) {
      hideIcon(pergolaConst.systemType.privacyWall);
      $(".portal-container").hide();

      const subSystems = $("#last-group")
        .find(".option")
        .eq(privacyWallUIindex);

      subSystems.removeClass("type_interface_electronic_item--active");

      state.subSystem.delete(pergolaConst.systemNameString.privacyWall);

      subSystems
        .closest(".interface__group")
        .find(".interface__group__head__param")
        .text(`${updateTextParam(state, this, true, true, true)}`);

      state.currentActiveSystems = null;
    } else {
      $(".portal-container__close").trigger("click");
    }
    // }
  }

  changeDimensions(width = null, length = null, height = null) {
    const { span_width, span_depth } = this.getSpanPoints();
    let offsetSide = 0;
    let offset = 0;
    let offsetNegativeSide = 0;
    let offsetNegative = 0;

    switch (height) {
      case 8:
        offsetNegativeSide = 0;
        offsetNegative = 0;
        offsetSide = 0;
        offset = state.roofType === 1 && !state.beamSize ? 0 : 0.05;
        break;

      case 9:
        offsetNegativeSide = 0;
        offsetNegative = 0;
        offsetSide = 0.14;
        offset = state.roofType === 1 && !state.beamSize ? 0.14 : 0.18;
        break;

      case 10:
        offsetNegativeSide = 0;
        offsetNegative = 0;

        offsetSide = 0.27;
        offset = state.roofType === 1 && !state.beamSize ? 0.28 : 0.33;

        break;

      case 11:
        offsetNegativeSide = 0;
        offsetNegative = 0;

        offsetSide = 0.39;
        offset = state.roofType === 1 && !state.beamSize ? 0.4 : 0.48;
        break;

      case 12:
        offsetNegativeSide = 0;
        offsetNegative = 0;

        offsetSide = 0.52;
        offset = state.roofType === 1 && !state.beamSize ? 0.58 : 0.62;

        break;
    }

    const offsetPrepered = state.directionRoof ? offset + 0.05 : offset;

    let openZip = this.interpolateValue(
      +state.zipInput,
      1,
      100,
      0 - offsetNegative,
      1 + offsetPrepered
    );

    let openZipSide = this.interpolateValue(
      +state.zipInput,
      1,
      100,
      0 - offsetNegativeSide,
      1 + offsetSide
    );

    const targetValueWidth = ConvertMorphValue(
      width,
      MORPH_DATA.width.min,
      MORPH_DATA.width.max
    );

    const targetValueWidthLattice = ConvertMorphValue(
      width / 2,
      MORPH_DATA.width.min,
      MORPH_DATA.width.max
    );

    const targetValueWidthBeam = ConvertMorphValue(
      width / 2.05,
      MORPH_DATA.width.min,
      MORPH_DATA.width.max
    );

    const targetValueHeight = ConvertMorphValue(
      height,
      MORPH_DATA.height.min,
      MORPH_DATA.height.max
    );

    const targetValueLength = ConvertMorphValue(
      length,
      MORPH_DATA.length.min,
      MORPH_DATA.length.max
    );

    const targetValueFanBeamLenght = ConvertMorphValue(
      this.getMeters(length) - this.inchesToMeters(state.overhang / 1.8),
      this.getMeters(MORPH_DATA.length.min),
      this.getMeters(MORPH_DATA.length.max)
    );

    const targetValueFanBeamWidth = ConvertMorphValue(
      this.getMeters(width) - this.inchesToMeters(state.overhang / 2),
      this.getMeters(MORPH_DATA.width.min),
      this.getMeters(MORPH_DATA.width.max)
    );

    const offsetColumnZip = !state.postType ? 0.1 : 0.1;

    const targetValueWidthSystem = ConvertMorphValue(
      span_width + offsetColumnZip,
      0.625818,
      7.31494
    );

    const targetValueLengthSystem = ConvertMorphValue(
      span_depth + offsetColumnZip,
      1.23542,
      6.09575
    );

    const offsetColumn = 0.07;

    const targetValueWidthPrivacyWall = ConvertMorphValue(
      span_width + offsetColumn,
      0.7112,
      3.6576
    );

    const targetValueLengthFixSlats = ConvertMorphValue(
      span_depth - offsetColumn,
      1.2192,
      3.5052
    );

    ChangeGlobalMorph("+8in", state.directionRoof ? 1 : 0);
    ChangeGlobalMorph("-8in", state.directionRoof ? 0.8 : 0);

    ChangeGlobalMorph("+6", 0);
    ChangeGlobalMorph("+12L", 0);
    ChangeGlobalMorph("+12R", 0);

    // ZIP-SHADE DIR
    if (state.directionRoof) {
      ChangeGlobalMorph("R", 1);
    } else {
      ChangeGlobalMorph("R", state.beamSize ? 0.5 : 0);
    }

    let morhWrapKitThickness = 0;

    switch (state.thickness) {
      case 3:
        morhWrapKitThickness = 0.8;
        break;
      case 4:
        morhWrapKitThickness = 1.2;
        break;
      case 6:
        morhWrapKitThickness = 1.65;
        break;
    }

    ChangeGlobalMorph("8-5", 0);
    ChangeGlobalMorph("6-8", 1);

    if (state.roofType === 1) {
      ChangeGlobalMorph("8-5", state.beamSize);
    }

    // RAIN MORPH
    let morphForRain = null;
    let roofOffset = null;

    switch (state.overhang) {
      case 16:
        morphForRain = 0;
        roofOffset = 1;

        break;

      case 20:
        morphForRain = 0.18;
        roofOffset = 1.4;

        break;

      case 24:
        morphForRain = 0.3;
        roofOffset = 1.6;

        break;

      case 28:
        morphForRain = 0.5;
        roofOffset = 2;

        break;
    }

    // const morhForHalfLattice = "";

    ChangeGlobalMorph("+8", roofOffset);

    ChangeGlobalMorph("overhang_rain", morphForRain);

    ChangeGlobalMorph("8-5", state.beamSize);

    if (state.roofType === 2) {
      ChangeGlobalMorph("3-6", 1.65);
    } else {
      ChangeGlobalMorph("3-6", morhWrapKitThickness);
    }

    ChangeGlobalMorph("2x6-3x8", 1);

    ChangeGlobalMorph("close_shades_side", openZipSide);
    ChangeGlobalMorph("close_shades", openZip);

    ChangeGlobalMorph("width", targetValueWidth);
    ChangeGlobalMorph(
      "width_non_solid",
      state.roofType === 2 ? targetValueWidthLattice : targetValueWidth // combo condition
    );
    ChangeGlobalMorph(
      "width_wrap",
      state.roofType === 2 ? targetValueWidthLattice : targetValueWidth // combo condition
    );
    ChangeGlobalMorph("width_beam", targetValueWidth);

    ChangeGlobalMorph(
      "width_beam_2",
      state.roofType === 2 ? targetValueWidthBeam : targetValueFanBeamWidth // combo condition
    );

    ChangeGlobalMorph(
      "lenth_beam_2",
      targetValueFanBeamLenght // combo condition
    );

    ChangeGlobalMorph("width_rain", targetValueWidth);
    ChangeGlobalMorph("width_wall", targetValueWidth);
    ChangeGlobalMorph("privacy_width", targetValueWidthPrivacyWall);
    ChangeGlobalMorph("width_shades", targetValueWidthSystem);

    ChangeGlobalMorph("all_roof_length", targetValueLength);
    ChangeGlobalMorph("lenth", targetValueLength);
    ChangeGlobalMorph("length_wrap", targetValueLength);
    ChangeGlobalMorph("length_Y", targetValueLength);
    ChangeGlobalMorph("length_beam", targetValueLength);
    // ChangeGlobalMorph("length_rain", targetValueLength);
    ChangeGlobalMorph("length_wall", targetValueLength);
    ChangeGlobalMorph("privacy_lenth", targetValueLengthFixSlats);
    ChangeGlobalMorph("length_shades_side", targetValueLengthSystem);

    ChangeGlobalMorph("height", targetValueHeight);
    ChangeGlobalMorph("height_wall", targetValueHeight);

    ChangeGlobalMorph("height_shades", targetValueHeight);
    ChangeGlobalMorph("height_shades_side", targetValueHeight);

    // ChangeGlobalMorph("close_shades_side", openZip);
    // ChangeGlobalMorph("close_shades", openZip);

    ChangeGlobalMorph("length_lattice", targetValueLength);
    ChangeGlobalMorph("lenght", targetValueLength);
    ChangeGlobalMorph("length_louver", targetValueLength);
    ChangeGlobalMorph("length", targetValueLength);
    ChangeGlobalMorph("length_solid", targetValueLength);
    ChangeGlobalMorph(
      "length_rafter",
      state.directionRoof ? 0 : targetValueLength
    );
    ChangeGlobalMorph("width_L", state.directionRoof ? targetValueLength : 0);
    ChangeGlobalMorph("length_L", state.directionRoof ? targetValueWidth : 0);

    //WIDTH

    ChangeGlobalMorph("width", targetValueWidth);
    ChangeGlobalMorph("width_beam_wall", targetValueWidth);
    ChangeGlobalMorph(
      "width_header",
      state.directionRoof ? 0 : targetValueWidth
    );
    ChangeGlobalMorph("width_louver", targetValueWidth);
    ChangeGlobalMorph("width_solid", targetValueWidth);
    ChangeGlobalMorph(
      "width_lattice",
      state.roofType === 2 ? targetValueWidthLattice : targetValueWidth
    );

    //HEIGHT
    ChangeGlobalMorph("height", targetValueHeight);
  }

  updateWallTilling(height, valueX, valueY, valueZ) {
    let wallBackTillingX = ConvertMorphValueReverse(
      valueX,
      1,
      9,
      0,
      0.6296296296296297
    );
    let wallSideTillingZ = ConvertMorphValueReverse(
      valueZ,
      1,
      5,
      0,
      0.6296296296296297
    );

    const wallSideTillingY = ConvertMorphValueReverse(valueY, 1, 1.703, 0, 1);
    const wallBackTillingY = ConvertMorphValueReverse(valueY, 1, 3.34, 0, 1);

    this.changeMaterialTilling("wall_side", wallSideTillingZ, wallSideTillingY);
    this.changeMaterialOffset(
      "wall_side",
      0.0,
      WALL_OFFSETS[`height_${height}`].sideWallOffsetY
    );

    this.changeMaterialTilling("wall_tile", wallBackTillingX, wallBackTillingY);
    this.changeMaterialOffset(
      "wall_tile",
      0.0,
      WALL_OFFSETS[`height_${height}`].backWallOffsetY
    );
  }

  changePostSupport() {
    this.changePostVisibility(false, null, true);
    const FC_Post = this.getPostObject(null, PergolaPostSide.FC);
    const BC_Post = this.getPostObject(null, PergolaPostSide.BC);
    const LC_Post = this.getPostObject(null, PergolaPostSide.LC);
    const RC_Post = this.getPostObject(null, PergolaPostSide.RC);
    const CC_Post = this.getPostObject(null, PergolaPostSide.CC);

    if (this.dimensions.width > this.settings.postWidthInterval) {
      FC_Post.visible = true;
      BC_Post.visible = true;
    } else {
      FC_Post.visible = false;
      BC_Post.visible = false;
    }

    if (this.dimensions.length > this.settings.postLengthInterval) {
      LC_Post.visible = true;
      RC_Post.visible = true;
    } else {
      LC_Post.visible = false;
      RC_Post.visible = false;
    }

    if (
      state.width > this.settings.postWidthInterval &&
      this.dimensions.length > this.settings.postLengthInterval
    ) {
      CC_Post.visible = true;
    } else {
      CC_Post.visible = false;
    }
  }

  getSystem(name = null, type = null, direction = null, side = null) {
    if (this.system == null) {
      return;
    }
    if (this.system.objects == null) {
      return;
    }
    if (!this.system.objects) {
      return;
    }

    for (let i = 0; i < this.system.objects.length; i++) {
      const element = this.system.objects[i];

      if (name != null) {
        if (element.name != name) {
          continue;
        }
      }
      if (type != null) {
        if (element.type != type) {
          continue;
        }
      }
      if (direction != null) {
        if (element.direction != direction) {
          continue;
        }
      }
      if (side != null) {
        if (element.side != side) {
          continue;
        }
      }

      return element;
    }
  }

  cloneSystemObject(type, direction, side, count) {
    const element = this.getSystem(null, type, direction);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.object.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName("Scene");

      if (parent) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      if (side === pergolaConst.side.Right || side === pergolaConst.side.Back) {
        clonedMesh.scale.z = -1;
      }

      const systemObject = new PergolaSystemObject();
      systemObject.name = element.name;
      systemObject.object = clonedMesh;
      systemObject.type = type;
      systemObject.direction = direction;
      systemObject.side = side;

      this.system.objects.push(systemObject);
    }
  }

  prepareExtraOptions() {
    const count_fan_width = Math.ceil(
      MORPH_DATA.width.max / state.fanIntervalWidth
    );
    const count_fan_length = Math.ceil(
      MORPH_DATA.length.max / state.fanIntervalLength
    );
    const count_fan = count_fan_width * count_fan_length + 1;

    const count_light_width = Math.floor(
      MORPH_DATA.width.max / state.lightIntervalWidth
    );
    const count_light_length = Math.floor(
      MORPH_DATA.length.max / state.lightIntervalLength
    );
    const count_light = count_light_width * count_light_length;

    const count_beam = count_fan_length - 1;

    this.cloneExtraOptionObject(PergolaExtraOptionType.fan, count_fan);
    this.cloneExtraOptionObject(PergolaExtraOptionType.light, count_light);
    this.cloneExtraOptionObject(PergolaExtraOptionType.beam, count_beam);
  }

  prepareSystems() {
    const qtySpansWidth = 6;
    const qtySpansDepth = 2;

    //#region FRONT SIDE
    this.cloneSystemObject(
      pergolaConst.systemType.autoShade,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.privacyWall,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    //#endregion

    //#region BACK SIDE
    this.cloneSystemObject(
      pergolaConst.systemType.autoShade,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.privacyWall,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    //#endregion

    //#region LEFT SIDE
    this.cloneSystemObject(
      pergolaConst.systemType.autoShade,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.privacyWall,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    //#endregion

    //#region RIGHT SIDE
    this.cloneSystemObject(
      pergolaConst.systemType.autoShade,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.privacyWall,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    //#endregion
  }

  getSubsystemByTypeAndSide(type, side) {
    const systems = this.system.objects;

    for (let i = 0; i < systems.length; i++) {
      const system = systems[i];

      if (system.type === type && system.side === side && !system.isLocked) {
        system.isLocked = true;
        return system;
      }
    }
    return undefined;
  }

  prepareSpans() {
    const spanColor = "#06AEEF";

    const qtyLeft = 2;
    const qtyRight = qtyLeft;
    const qtyFront = 6;
    const qtyBack = qtyFront;

    const spanGeometry = new THREE.BoxGeometry(1, 1, 1);
    const spanMaterial = new THREE.MeshBasicMaterial({
      color: spanColor,
      transparent: true,
      opacity: 0,
    });

    const makeSpanBySide = (side, qty) => {
      for (let i = 0; i < qty; i++) {
        const span = new PergolaSpanObject();
        span.side = side;
        span.number = i;
        const spanAvatar = new THREE.Mesh(spanGeometry, spanMaterial);
        spanAvatar.position.set(span.posX, span.posY, span.posZ);
        spanAvatar.visible = false;

        spanAvatar.name = `avatar_${side}_${i}`;
        spanAvatar.parentSpan = span;
        clickableObjects.push(spanAvatar);

        theModel.add(spanAvatar);
        span.avatar = spanAvatar;

        span.hotspot = createHotspot(
          `span_hotspot_${side}_${i}`,
          labelObjects.addObject.url,
          labelObjects.addObjectHover.url,
          new THREE.Vector3(0, 0, 0),
          "subsystems"
        );

        setHotspotVisibility(span.hotspot, false);
        hotspots.push(span.hotspot);

        const subsystems = [];

        Object.keys(pergolaConst.systemType).forEach((key) => {
          const sys = this.getSubsystemByTypeAndSide(
            pergolaConst.systemType[key],
            side
          );
          subsystems.push(sys);
        });

        if (subsystems.length > 0) {
          span.systems.push(...subsystems);
        }

        this.span.objects.push(span);
      }
    };

    makeSpanBySide(pergolaConst.side.Left, qtyLeft);
    makeSpanBySide(pergolaConst.side.Right, qtyRight);
    makeSpanBySide(pergolaConst.side.Front, qtyFront);
    makeSpanBySide(pergolaConst.side.Back, qtyBack);
  }

  changeBeamSupport() {
    this.changeBeamVisibility(false, null, null);

    const { FL_point, FR_point, RL_point } = this.getCornerPoints();

    const leftPoints = generateMidpoints(
      RL_point,
      FL_point,
      Math.floor(this.dimensions.length / this.settings.beamLengthInterval)
    );
    const frontPoints = generateMidpoints(
      FL_point,
      FR_point,
      Math.floor(this.dimensions.width / this.settings.beamWidthInterval)
    );

    if (this.dimensions.length > this.settings.beamPerimeterInterval) {
      const pointL = FL_point.clone();
      const pointR = FR_point.clone();
      pointL.x -= this.settings.beamThickness / 2;
      pointR.x += this.settings.beamThickness / 2;
      frontPoints.push(pointL, pointR);
    }

    if (this.dimensions.width > this.settings.beamPerimeterInterval) {
      leftPoints.push(RL_point, FL_point);
    }

    //* LEFT
    if (leftPoints.length > 0) {
      this.changeSupportBeamPositions(
        PergolaRoofDirection.Straight,
        leftPoints,
        null,
        0
      );
    }

    //* FRONT
    if (frontPoints.length > 0) {
      this.changeSupportBeamPositions(
        PergolaRoofDirection.Perpendicular,
        frontPoints,
        0,
        null
      );
    }
  }

  changeSupportBeamPositions(
    direction,
    points,
    x = null,
    y = null,
    height = null
  ) {
    const beams = this.roof.beams.filter(
      (item) => item.direction == direction && item.isFanBeam === false
    );

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      const element = this.getAvaliableObjectFromArray(beams);

      element.object.position.x = y == null ? point.x : y;

      if (height != null) {
        element.object.position.y = height;
      }

      element.object.position.z = x == null ? point.z : x;
      element.object.visible = true;
      element.active = true;
    }
  }

  changeMoodLightParameters(moodLightObjects, color) {
    const { mainBeamQty, leftPoints, frontPoints, framesPoints } =
      this.getFramesPoints();
    const framesPerGap = (leftPoints.length - 1) / (mainBeamQty + 1);
    const delta = this.settings.beamThickness / framesPerGap;
    const frameWidth = frontPoints[0].distanceTo(frontPoints[1]);
    const frameLength = leftPoints[0].distanceTo(leftPoints[1]) - delta;
    const moodOffset = 0.04;

    for (let i = 0; i < framesPoints.length; i++) {
      const element = moodLightObjects[i];

      for (let j = 0; j < element.objects.length; j++) {
        const light = element.objects[j];
        light.color = new THREE.Color(color);
        light.position.y = this.totalHeight - 0.2;

        if (j == 0) {
          light.position.x = framesPoints[i].x;
          light.position.z = framesPoints[i].z - frameLength / 2 + moodOffset;
          light.width = frameWidth - moodOffset * 2;
          light.rotation.y = THREE.MathUtils.degToRad(180);
          light.visible = frameLength < frameWidth;
        } else if (j == 1) {
          light.position.x = framesPoints[i].x + frameWidth / 2 - moodOffset;
          light.position.z = framesPoints[i].z;
          light.width = frameLength - moodOffset * 2;
          light.rotation.y = THREE.MathUtils.degToRad(90);
          light.visible = frameLength >= frameWidth;
        } else if (j == 2) {
          light.position.x = framesPoints[i].x;
          light.position.z = framesPoints[i].z + frameLength / 2 - moodOffset;
          light.width = frameWidth - moodOffset * 2;
          light.visible = frameLength < frameWidth;
        } else if (j == 3) {
          light.position.x = framesPoints[i].x - frameWidth / 2 + moodOffset;
          light.position.z = framesPoints[i].z;
          light.width = frameLength - moodOffset * 2;
          light.rotation.y = THREE.MathUtils.degToRad(-90);
          light.visible = frameLength >= frameWidth;
        }
      }
    }
  }

  getPointLightpositions(lightGap) {
    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();
    const { mainBeamQty, leftPoints, frontPoints } = this.getFramesPoints();
    const framesPerGap = (leftPoints.length - 1) / (mainBeamQty + 1);
    const delta = this.settings.beamThickness / framesPerGap;
    const frameWidth = frontPoints[0].distanceTo(frontPoints[1]);
    const frameLength = leftPoints[0].distanceTo(leftPoints[1]) - delta;

    // const pointY = 2.45; // for testing
    const postOffset = 0.04;

    // Perimeter beams

    function calculatePerimeterPostPoints(
      startPoint,
      endPoint,
      dimensionValue,
      postInterval
    ) {
      if (dimensionValue > postInterval) {
        const q = Math.floor(dimensionValue / postInterval);
        return generateMidpoints(startPoint, endPoint, q, true);
      } else {
        return [startPoint, endPoint];
      }
    }

    const FLRL_postPoints = this.settings.mountingWall_Left
      ? []
      : calculatePerimeterPostPoints(
          FL_point,
          RL_point,
          this.dimensions.length,
          this.settings.postLengthInterval
        );
    const FLFR_postPoints = calculatePerimeterPostPoints(
      FL_point,
      FR_point,
      state.width,
      this.settings.postWidthInterval
    );
    const FRRR_postPoints = this.settings.mountingWall_Right
      ? []
      : calculatePerimeterPostPoints(
          FR_point,
          RR_point,
          this.dimensions.length,
          this.settings.postLengthInterval
        );
    const RLRR_postPoints = this.settings.mountingWall_Back
      ? []
      : calculatePerimeterPostPoints(
          RL_point,
          RR_point,
          state.width,
          this.settings.postWidthInterval
        );

    function calculatePointsBetweenPosts(postPoints, gap) {
      const points = [];
      if (postPoints.length <= 1) {
        return points;
      }

      for (let i = 0; i < postPoints.length - 1; i++) {
        let qty =
          Math.round(
            postPoints[i].distanceTo(postPoints[i + 1]) / (gap * 0.3048)
          ) - 1;
        if (qty < 1) {
          qty = 1;
        }
        points.push(
          generateMidpoints(postPoints[i], postPoints[i + 1], qty, false)
        );
      }

      return points;
    }

    let FLRL_points = calculatePointsBetweenPosts(
      FLRL_postPoints,
      lightGap
    ).flat();
    let FLFR_points = calculatePointsBetweenPosts(
      FLFR_postPoints,
      lightGap
    ).flat();
    let FRRR_points = calculatePointsBetweenPosts(
      FRRR_postPoints,
      lightGap
    ).flat();
    let RLRR_points = calculatePointsBetweenPosts(
      RLRR_postPoints,
      lightGap
    ).flat();

    setValueToCoordinates(FLRL_points, "x", FL_point.x + postOffset);
    setValueToCoordinates(FLFR_points, "z", FL_point.z - postOffset);
    setValueToCoordinates(FRRR_points, "x", FR_point.x - postOffset);
    setValueToCoordinates(RLRR_points, "z", RL_point.z + postOffset);

    const perimeterLightPoints = [
      ...FLRL_points,
      ...FLFR_points,
      ...FRRR_points,
      ...RLRR_points,
    ].flat();

    const vertCrossQty = Math.round(this.totalLength / frameLength) - 1;
    const horiCrossQty = Math.round(this.totalWidth / frameWidth) - 1;
    const vertCrossPoints = generateMidpoints(
      FL_point,
      RL_point,
      vertCrossQty,
      true
    );
    const horiCrossPoints = generateMidpoints(
      FL_point,
      FR_point,
      horiCrossQty,
      true
    );

    if (
      state.width > this.settings.postWidthInterval &&
      this.dimensions.length > this.settings.postLengthInterval
    ) {
      if (vertCrossPoints.length % 2 === 0) {
        const middleIndex = vertCrossPoints.length / 2;
        vertCrossPoints.splice(middleIndex, 0, new THREE.Vector3(0, 0, 0));
      }
    }

    // Vertical beams
    let vertLightPoints = [];
    for (let i = 1; i < horiCrossPoints.length - 1; i++) {
      if (horiCrossPoints.length <= 2) {
        break;
      }
      setValueToCoordinates(vertCrossPoints, "x", horiCrossPoints[i].x);
      vertLightPoints.push(
        ...calculatePointsBetweenPosts(vertCrossPoints, lightGap)
      );
    }

    // Horisontal beams
    let horiLightPoints = [];

    if (
      state.width > this.settings.postWidthInterval &&
      this.dimensions.length > this.settings.postLengthInterval
    ) {
      if (vertCrossPoints.length % 2 !== 0) {
        const middleIndex = Math.floor(vertCrossPoints.length / 2);
        vertCrossPoints.splice(middleIndex, 1);
      }
    }

    for (let i = 1; i < vertCrossPoints.length - 1; i++) {
      if (vertCrossPoints.length <= 2) {
        break;
      }
      setValueToCoordinates(horiCrossPoints, "z", vertCrossPoints[i].z);
      horiLightPoints.push(
        ...calculatePointsBetweenPosts(horiCrossPoints, lightGap)
      );
    }

    const allLightPoints = [
      ...perimeterLightPoints,
      ...vertLightPoints,
      ...horiLightPoints,
    ].flat();

    return allLightPoints;
  }

  getCornerPointsExtraOptions() {
    const offsetX = 0;
    const offsetZ = 0;
    const totalWidth = state.width * 0.3048;
    const totalLength = state.length * 0.3048;
    const comboSolidPercent = 0.5;
    const widthLeftRoofPart = totalWidth * (1 - comboSolidPercent);

    const RL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      -totalLength / 2 - offsetZ / 2
    );
    const FL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      totalLength / 2 + offsetZ / 2
    );
    const FR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      totalLength / 2 + offsetZ / 2
    );
    const RR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      -totalLength / 2 - offsetZ / 2
    );

    const FC_point = new THREE.Vector3(
      -totalWidth / 2 + widthLeftRoofPart,
      0,
      totalLength / 2 + offsetZ / 2
    );
    const RC_point = new THREE.Vector3(
      -totalWidth / 2 + widthLeftRoofPart,
      0,
      -totalLength / 2 - offsetZ / 2
    );

    return { FL_point, FR_point, RL_point, RR_point, FC_point, RC_point };
  }

  getCornerPoints(xOffset = 0, zOffset = 0) {
    const offsetX = xOffset;
    const offsetZ = zOffset;
    const totalWidth = this.getMeters(state.width);
    const totalDepth = this.getMeters(state.length);

    const lineZback = -totalDepth / 2;
    const lineZfront = totalDepth / 2;

    // Основні точки
    let FL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      lineZfront + offsetZ / 2
    );
    let FR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      lineZfront + offsetZ / 2
    );
    let RL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      lineZback - offsetZ / 2
    );
    let RR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      lineZback - offsetZ / 2
    );

    const comboSolidPercent =
      this.settings.roofComboSolidPercentage ===
      PergolaRoofPercentage._70percent
        ? 0.7
        : 0.5;

    const widthLeftRoofPart = totalWidth * (1 - comboSolidPercent);

    const FC_point = new THREE.Vector3(
      -totalWidth / 2 + widthLeftRoofPart,
      0,
      lineZfront + offsetZ / 2
    );

    return { FL_point, FR_point, RL_point, RR_point, FC_point };
  }

  getFramesPoints() {
    const { FL_point, FR_point, RL_point } = this.getCornerPoints();

    let pointsQty = Math.floor(
      this.dimensions.length / this.settings.beamLengthInterval
    );
    const gapsQty = pointsQty + 1;
    const gapLength = this.dimensions.length / gapsQty;
    const mainBeamQty = gapsQty - 1;

    if (gapLength > this.settings.beamLouverLengthInterval) {
      pointsQty =
        pointsQty +
        Math.floor(gapLength / this.settings.beamLouverLengthInterval) *
          gapsQty;
    }

    let leftPoints = generateMidpoints(FL_point, RL_point, pointsQty, true);
    let leftCenterPoints = generateCenterMidpoints(
      FL_point,
      RL_point,
      pointsQty,
      true
    );

    const framesPerGap = (leftPoints.length - 1) / (mainBeamQty + 1);
    const adjustmentValue = this.settings.beamThickness / 4;

    if (framesPerGap == 2 && leftCenterPoints.length % 2 === 0) {
      for (let i = 0; i < leftCenterPoints.length; i += 2) {
        leftCenterPoints[i].z -= adjustmentValue;
        leftCenterPoints[i + 1].z += adjustmentValue;
      }
    }

    const frontPoints = generateMidpoints(
      FL_point,
      FR_point,
      Math.floor(this.dimensions.width / this.settings.beamWidthInterval),
      true
    );
    const frontCenterPoints = generateCenterMidpoints(
      FL_point,
      FR_point,
      Math.floor(this.dimensions.width / this.settings.beamWidthInterval),
      true
    );

    let framesPoints = [];

    for (let i = 0; i < leftCenterPoints.length; i++) {
      for (let j = 0; j < frontCenterPoints.length; j++) {
        const point = new THREE.Vector3(
          frontCenterPoints[j].x,
          0,
          leftCenterPoints[i].z
        );
        framesPoints.push(point);
      }
    }

    return { mainBeamQty, leftPoints, frontPoints, framesPoints };
  }

  changeRoofFrame() {
    this.changeRoofFrameVisibility(false);

    const { mainBeamQty, leftPoints, frontPoints, framesPoints } =
      this.getFramesPoints();

    const framesPerGap = (leftPoints.length - 1) / (mainBeamQty + 1);
    const delta = this.settings.beamThickness / framesPerGap;
    const frameWidth = frontPoints[0].distanceTo(frontPoints[1]);
    const frameLength = leftPoints[0].distanceTo(leftPoints[1]) - delta;

    // this.changeFramePosition(framesPoints);

    const targetValueLength = ConvertMorphValue(
      frameLength,
      MORPH_DATA_SI.frameLength.min,
      MORPH_DATA_SI.frameLength.max
    );
    const targetValueWidth = ConvertMorphValue(
      frameWidth,
      MORPH_DATA_SI.frameWidth.min,
      MORPH_DATA_SI.frameWidth.max
    );

    ChangeGlobalMorph("length_louver", targetValueLength);
    ChangeGlobalMorph("width_louver", targetValueWidth);

    this.changeLouvers(frameWidth, framesPoints);
  }

  changeFramePosition(points, x = null, y = null, height = null) {
    const frames = this.roof.frames;

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      const element = this.getAvaliableObjectFromArray(frames);

      element.object.position.x = y == null ? point.x : y;
      if (height != null) {
        element.object.position.y = height;
      }
      element.object.position.z = x == null ? point.z : x;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  changeLouvers(frameWidth, framesPoints) {
    this.changeLouversVisibility(false);

    // const louverWidth = 0.17989;
    const louverWidth = 0.1677;
    const firstLouverOffset = 0.15;
    const louverQtyPerFrame =
      (frameWidth - firstLouverOffset + 0.03) / louverWidth;
    const louverQtyPerFrameRound = Math.floor(louverQtyPerFrame);
    const delta = louverQtyPerFrame - louverQtyPerFrameRound;
    const coveredWidth = louverQtyPerFrameRound * louverWidth;

    let loversPoints = [];

    for (let i = 0; i < framesPoints.length; i++) {
      let louverPointX =
        delta >= 0.5
          ? framesPoints[i].x - coveredWidth / 2 + 0.06
          : framesPoints[i].x - frameWidth / 2 + firstLouverOffset;

      const louverPointZ = framesPoints[i].z;

      for (let j = 0; j < louverQtyPerFrameRound; j++) {
        const point = new THREE.Vector3(louverPointX, 0, louverPointZ);
        loversPoints.push(point);
        louverPointX += louverWidth;
      }
    }

    const louverHeight = this.totalHeight - 0.125;
    this.changeLouversPosition(loversPoints, louverHeight);
  }

  changeLouversPosition(points, height = null, x = null, y = null) {
    const louvers = this.roof.louvered.objects;

    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      const element = this.getAvaliableObjectFromArray(louvers);

      element.object.position.x = y == null ? point.x : y;
      if (height != null) {
        element.object.position.y = height;
      }
      element.object.position.z = x == null ? point.z : x;

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  changeRoofLouveredRotate(value) {
    if (value == null) return;

    for (let index = 0; index < this.roof.louvered.objects.length; index++) {
      const element = this.roof.louvered.objects[index];
      element.object.rotation.z = THREE.MathUtils.degToRad(value);
    }

    this.lastSettings.roofLouveredRotate = this.settings.roofLouveredRotate;
  }

  changePostColor(value) {
    if (value == null) {
      return;
    }

    for (let index = 0; index < this.post.objects.length; index++) {
      const element = this.post.objects[index];
      element.object.material.color.set(value);
      setMaterialColor("alum", value);
    }
  }

  changeLouverColor(value) {
    if (value == null) {
      return;
    }

    for (let index = 0; index < this.roof.louvered.objects.length; index++) {
      const element = this.roof.louvered.objects[index];
      element.object.material.color.set(value);
    }
  }

  changeLedColor(value) {
    if (value == null) {
      return;
    }

    const ledObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.led
    );

    ledObjects[0].object.material.color.set(value);
    ledObjects[0].object.material.emissive.set(value);
    // ledObjects[0].object.material.emissiveIntensity = 5;
  }

  changeMoodLedColor(value) {
    if (value == null) {
      return;
    }

    const moodLedObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.moodLed
    );

    moodLedObjects[0].object.material.color.set(value);
    moodLedObjects[0].object.material.emissive.set(value);
    // moodLedObjects[0].object.material.emissiveIntensity = 5;
  }

  getPostObject(name = null, postSide = null, isLock = null, isSupport = null) {
    if (this.post == null) {
      return;
    }
    if (this.post.objects == null) {
      return;
    }

    for (let index = 0; index < this.post.objects.length; index++) {
      const element = this.post.objects[index];

      if (name != null) {
        if (element.name != name) {
          continue;
        }
      }

      if (postSide != null) {
        if (element.side != postSide) {
          continue;
        }
      }

      if (isLock != null) {
        if (element.isLock != isLock) {
          continue;
        }
      }

      if (isSupport != null) {
        if (element.isSupport != isSupport) {
          continue;
        }
      }

      return element.object;
    }
  }

  changeRoofFrameVisibility(status, frameType = null) {
    if (this.roof == null) {
      return;
    }
    if (this.roof.frames == null) {
      return;
    }

    for (let index = 0; index < this.roof.frames.length; index++) {
      const element = this.roof.frames[index];

      if (frameType != null) {
        if (element.type != frameType) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      element.active = status;
    }
  }

  changeLouversVisibility(status) {
    if (this.roof == null) {
      return;
    }
    if (this.roof.louvered == null) {
      return;
    }
    if (this.roof.louvered.objects == null) {
      return;
    }

    for (let index = 0; index < this.roof.louvered.objects.length; index++) {
      const element = this.roof.louvered.objects[index];

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      element.active = status;
    }
  }

  changeObjectVisibility(status, object) {
    if (object == null) {
      return;
    }

    object.visible = status;

    if (object.isGroup) {
      for (let index = 0; index < object.children.length; index++) {
        const ge = object.children[index];
        ge.visible = status;
      }
    }
  }

  changeMoodLightVisibility(status, element) {
    if (element == null) {
      return;
    }

    for (let i = 0; i < element.objects.length; i++) {
      element.objects[i].visible = status;

      if (element.objects[i].isGroup) {
        for (
          let index = 0;
          index < element.objects[i].children.length;
          index++
        ) {
          const ge = element.objects[i].children[index];
          ge.visible = status;
        }
      }
    }
  }

  changeObjectArrayVisibility(status, objectArray) {
    if (objectArray == null || objectArray.length == 0) {
      return;
    }

    for (let f = 0; f < objectArray.length; f++) {
      const element = objectArray[f];
      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const obj = element.object.children[index];
          obj.visible = status;
        }
        element.object.visible = status;
        element.active = status;
      } else {
        element.object.visible = status;
        element.active = status;
      }
    }
  }

  changeMoodLightsVisibility(status, objectArray) {
    if (objectArray == null || objectArray.length == 0) {
      return;
    }

    for (let f = 0; f < objectArray.length; f++) {
      const element = objectArray[f];
      for (let i = 0; i < element.objects.length; i++) {
        if (element.objects[i].isGroup) {
          for (
            let index = 0;
            index < element.objects[i].children.length;
            index++
          ) {
            const obj = element.objects[i].children[index];
            obj.visible = status;
          }
          element.objects[i].visible = status;
          element.active = status;
        } else {
          element.objects[i].visible = status;
          element.active = status;
        }
      }
    }
  }

  changePostVisibility(status, nameArray, reset = false) {
    if (this.post == null) {
      return;
    }

    for (let index = 0; index < this.post[nameArray].length; index++) {
      const element = this.post[nameArray][index];

      element.active = false;

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;

          if (status === false && reset === true) {
            ge.active = false;
          }
        }
      } else {
        element.object.visible = status;
        if (status === false && reset === true) {
          element.object.active = false;
        }
      }
    }
  }

  changeBeamVisibility(status, postType = null, postSide = null) {
    if (this.roof == null) {
      return;
    }
    if (this.roof.beams == null) {
      return;
    }

    for (let index = 0; index < this.roof.beams.length; index++) {
      const element = this.roof.beams[index];

      if (postType != null) {
        if (element.type != postType) {
          continue;
        }
      }

      if (postSide != null) {
        if (element.side != postSide) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
        element.object.visible = status;
        element.active = status;
      } else {
        element.object.visible = status;
        element.active = status;
      }
    }
  }

  changeMountingWallVisibility(status, side = null) {
    if (this.mountingWall == null) {
      return;
    }
    if (this.mountingWall.elements == null) {
      return;
    }

    for (let index = 0; index < this.mountingWall.elements.length; index++) {
      const element = this.mountingWall.elements[index];

      if (side != null) {
        if (element.side != side) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }
    }
  }
}

export class PergolaSettings {
  constructor() {
    this.width = null;
    this.length = null;
    this.height = null;
    this.postSize = null;
    this.postWidthInterval = null;
    this.postLengthInterval = null;
    this.color = 0;
    this.colorHex = null;
    this.colorLouvered = 0;
    this.colorLouveredHex = null;
    this.colorLedHex = null;
    this.colorMoodHex = null;
    this.colors = null;
    this.colorsLouvered = null;
    this.roofLouveredRotate = 0;
    this.roofColor = null;
    this.mountingWall_Back = false;
    this.mountingWall_Left = false;
    this.mountingWall_Right = false;
    this.extraOptionLight = null;
    this.extraOptionLightSpacing = null;
    this.extraOptionFan = null;
    this.extraOptionLed = null;
    this.extraOptionHeaters = null;
    this.extraOptionMoodLight = null;
  }

  getValues() {
    var values = [
      {
        name: "Dimensions",
        value: pergolaSettings.toString_dimensions(),
        options: null,
      },
      {
        name: "Frame Color",
        value: pergolaSettings.toString_color(),
        options: null,
      },
      {
        name: "Louver Color",
        value: pergolaSettings.toString_louverColor(),
        options: null,
      },
      {
        name: "Post size",
        value: pergolaSettings.toString_postSize(),
        options: null,
      },
      {
        name: "Wall Mounted",
        value: pergolaSettings.toString_mountingWall(),
        options: null,
      },
      {
        name: "Side Options",
        value: "",
        options: [
          ["Recessed lighting", pergolaSettings.toString_extraOptions_Light()],
          ["Led lights", pergolaSettings.toString_extraOptions_Led()],
          ["Mood lighting", pergolaSettings.toString_extraOptions_Mood()],
          ["Ceiling fan", pergolaSettings.toString_extraOptions_Fan()],
          ["Heaters", pergolaSettings.toString_extraOptions_Heater()],
        ],
      },
    ];

    return values;
  }

  toString_dimensions() {
    return `Width: ${this.width}', Projection:${this.length}', Height: ${this.height}'`;
  }

  toString_color() {
    return this.colorHex.toUpperCase();
  }

  toString_louverColor() {
    return this.colorLouveredHex.toUpperCase();
  }

  toString_postSize() {
    switch (this.postSize) {
      case PergolaPostType._4x4:
        return '4"x4"';
      case PergolaPostType._7x7:
        return '7"x7"';
      default:
        return "";
    }
  }

  toString_mountingWall() {
    let array = [];

    if (this.mountingWall_Back == true) {
      array.push("Back Side");
    }
    if (this.mountingWall_Left == true) {
      array.push("Left Side");
    }
    if (this.mountingWall_Right == true) {
      array.push("Right Side");
    }

    if (array.length == 1) {
      return array[0];
    }

    let result = "";

    for (let index = 0; index < array.length; index++) {
      result += array[index];

      if (index != array.length - 1) {
        result += ", ";
      }
    }

    return result;
  }

  toString_extraOptions_Light() {
    return this.extraOptionLight == true
      ? `Yes (Spacing: ${this.extraOptionLightSpacing}')`
      : "No";
  }

  toString_extraOptions_Fan() {
    return this.extraOptionFan == true ? "Yes" : "No";
  }

  toString_extraOptions_Led() {
    return this.extraOptionLed == true
      ? `Yes (${this.colorLedHex.toUpperCase()})`
      : "No";
  }

  toString_extraOptions_Mood() {
    return this.extraOptionMoodLight == true
      ? `Yes (${this.colorMoodHex.toUpperCase()})`
      : "No";
  }

  toString_extraOptions_Heater() {
    return this.extraOptionHeaters == true ? "Yes" : "No";
  }
}

// Типи перголи
// const PergolaType = {
//   Cantilever: 0,
//   Freestanding: 1,
//   Attached: 2
// };

// Клас для розмірів перголи
class PergolaDimensions {
  constructor() {
    this.width = 8; // ширина в футах
    this.length = 8; // довжина в футах
    this.height = 8; // висота в футах
  }
}

// Клас для постів перголи
class PergolaPost {
  constructor() {
    this.post3x3 = [];
    this.post3x3Left = [];
    this.post3x3Right = [];
    this.post3x3Back = [];
    this.post3x3Front = [];

    this.postSquare = [];
    this.postSquareLeft = [];
    this.postSquareRight = [];
    this.postSquareBack = [];
    this.postSquareFront = [];

    this.postRound = [];
    this.postRoundLeft = [];
    this.postRoundRight = [];
    this.postRoundBack = [];
    this.postRoundFront = [];

    this.postHeadsOne = [];
    this.postHeadsOneLeft = [];
    this.postHeadsOneRight = [];
    this.postHeadsOneBack = [];
    this.postHeadsOneFront = [];

    this.postHeadsTwo = [];
    this.postHeadsTwoLeft = [];
    this.postHeadsTwoRight = [];
    this.postHeadsTwoBack = [];
    this.postHeadsTwoFront = [];

    //RAIN
    this.rainFront = [];
    this.rainBack = [];

    this.rainCornerFront = [];
    this.rainCornerBack = [];
  }
}

class PergolaPostObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.isSupport = false;
    this.isLock = false;
    this.side = null;
    this.object = null;
    this.active = false;
  }
}

const PergolaPostType = {
  _4x4: 0,
  _7x7: 1,
};

const PergolaPostSide = {
  FL: 0,
  FR: 1,
  RL: 2,
  RR: 3,

  FC: 4,
  BC: 5,
  LC: 6,
  RC: 7,

  CC: 8,
};

const PergolaElementOrientSide = {
  Front: 0,
  Back: 1,
  Left: 2,
  Right: 3,
  Center: 4,
};

// Клас для кольору
class PergolaColorElement {
  constructor() {
    this.name = "Espresso";
    this.select = null;
    this.colors = [];
  }
}

//* SYSTEMS
class PergolaSystem {
  constructor() {
    this.objects = [];
  }
}

//* SPAN
class PergolaSpan {
  constructor() {
    this.objects = [];
  }
}

class PergolaSpanObject {
  constructor() {
    this.side = null;
    this.number = 0;
    this.width = null;
    this.height = null;
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.offsetY = 0.2;
    this.avatar = null;
    this.hotspot = null;
    this.active = false;
    this.isSystemSet = false;
    this.systems = [];
    this.isLocked = false;

    this.getCurrentSystem = () => {
      return this.systems.find((system) => {
        return system.active;
      });
    };
  }
}

class PergolaSystemObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.spanWidth = null;
    this.spanHeight = null;
    this.direction = null;
    this.side = null;
    this.posX = 0;
    this.posZ = 0;
    this.openingside = null;
    this.openValue = 0;
    this.color = null;
    this.object = null;
    this.active = false;
    this.isLocked = false;
    this.windowObject = null;
    this.windowPosX = 0;
    this.windowPosZ = 0;
    this.doorQty = 0;
  }
}

// Клас для даху
class PergolaRoof {
  constructor() {
    this.open = 0;
    //HEAD FOR BACK WALL
    this.headerBackWall = [];

    //HEADER
    this.headBevelSingle = [];
    this.headBevelDouble = [];

    this.headMiterSingle = [];
    this.headMiterDouble = [];

    this.headCorbelSingle = [];
    this.headCorbelDouble = [];

    this.headScallopSingle = [];
    this.headScallopDouble = [];

    // RAFTER
    this.rafterBevelSingle = [];
    this.rafterBevelDouble = [];

    this.rafterBevelSingleCut = [];
    this.rafterBevelDoubleCut = [];

    this.rafterBevelSingleShot = [];
    this.rafterBevelDoubleShot = [];
    this.rafterBevelSingleShotBack = [];
    this.rafterBevelDoubleShotBack = [];

    this.rafterMiterSingle = [];
    this.rafterMiterDouble = [];

    this.rafterMiterSingleCut = [];
    this.rafterMiterDoubleCut = [];

    this.rafterMiterSingleShot = [];
    this.rafterMiterDoubleShot = [];
    this.rafterMiterSingleShotBack = [];
    this.rafterMiterDoubleShotBack = [];

    this.rafterCorbelSingle = [];
    this.rafterCorbelDouble = [];

    this.rafterCorbelSingleCut = [];
    this.rafterCorbelDoubleCut = [];

    this.rafterCorbelSingleShot = [];
    this.rafterCorbelDoubleShot = [];
    this.rafterCorbelSingleShotBack = [];
    this.rafterCorbelDoubleShotBack = [];

    this.rafterScallopSingle = [];
    this.rafterScallopDouble = [];

    this.rafterScallopSingleCut = [];
    this.rafterScallopDoubleCut = [];

    this.rafterScallopSingleShot = [];
    this.rafterScallopDoubleShot = [];
    this.rafterScallopSingleShotBack = [];
    this.rafterScallopDoubleShotBack = [];

    // LATTICE
    this.lattice2x2X = [];
    this.lattice3x3X = [];

    this.lattice2x2Y = [];
    this.lattice3x3Y = [];

    // SOLID
    this.solidFrame = [];
    this.solidRoof = [];

    //LOUVER
    this.louverFrame = [];
    this.louverX = [];
    this.louverY = [];

    this.louverBeamX = [];
    this.louverBeamY = [];

    // RAIN Shield
    this.rainShield = [];

    // Fan Beam
    this.fanBeam = [];

    // Solid
    this.solid = null;
  }
}

class PergolaRoofTypeSolid {
  constructor() {
    this.frames = [];
    this.objects = [];
    this.color = new PergolaColorElement();
    this.wrapkit = null;
    this.makeRoofOverhang = null;
  }
}

class PergolaRoofObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.object = null;
    this.direction = null;
    this.active = false;
  }
}

class PergolaRoofFrame {
  constructor() {
    this.type = null;
    this.object = null;
    this.active = false;
  }
}

class PergolaRoofBeam {
  constructor() {
    this.type = null;
    this.direction = null;
    this.object = null;
    this.active = false;
  }
}

const PergolaRoofType = {
  Lattice: 0,
  Solid: 1,
  Combo: 2,
};

class PergolaRoofTypeSolidObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.planks = null;
    this.plank8inch = false;
    this.side = null;
    this.object = null;
    this.active = false;
    this.direction = null;
  }
}

// Типи даху
class PergolaRoofTypeLouvered {
  constructor() {
    this.rotate = 0;
    this.rails = [];
    this.objects = [];
    // this.makeRoofOverhang = false;
  }
}

class PergolaRoofTypeLouveredObject {
  constructor() {
    this.object = null;
    this.active = false;
  }
}

// Константи напрямку даху
const PergolaRoofDirection = {
  Straight: 0,
  Perpendicular: 1,
};

// Клас для стін кріплення
class PergolaMountingWall {
  constructor() {
    this.elements = [];
  }
}

class PergolaMountingWallElement {
  constructor() {
    this.side = null;
    this.object = null;
    this.active = false;
  }
}

// Клас для додаткових опцій
class PergolaExtraOptions {
  constructor() {
    this.elements = [];
  }
}

// Клас для додаткових елементів
class PergolaExtraOptionElement {
  constructor() {
    this.type = null;
    this.active = false;
    this.object = null;
    this.objects = [];
  }
}

const PergolaExtraOptionType = {
  light: 0,
  fan: 1,
  beam: 2,
};

var pergolaSettings = new PergolaSettings();

pergolaSettings.beamThickness = 0.0508;
pergolaSettings.postWidthInterval = 30;
pergolaSettings.postLengthInterval = 30;
pergolaSettings.beamWidthInterval = 20.1;
pergolaSettings.beamLengthInterval = 14.1;
pergolaSettings.beamPerimeterInterval = 20.1;
pergolaSettings.beamLouverLengthInterval = 14.1;

pergolaSettings.width = 18; // 18
pergolaSettings.length = 12; // 12
pergolaSettings.height = 8; // 8
pergolaSettings.postSize = PergolaPostType._7x7;
pergolaSettings.colorHex = "#281F1E";
pergolaSettings.colorLouveredHex = "#281F1E";
pergolaSettings.colorLedHex = "#FFFFFF";
pergolaSettings.colorMoodHex = "#FFFFFF";
pergolaSettings.roofType = PergolaRoofType.Louvered;
pergolaSettings.roofLouveredDirection = PergolaRoofDirection.Perpendicular;
pergolaSettings.roofLouveredRotate = 0;
pergolaSettings.mountingWall_Back = false;
pergolaSettings.mountingWall_Left = false;
pergolaSettings.mountingWall_Right = false;
pergolaSettings.extraOptionLight = false;
pergolaSettings.extraOptionLightSpacing = 4;
pergolaSettings.extraOptionFan = false;
pergolaSettings.extraOptionLed = false;
pergolaSettings.extraOptionHeaters = false;
pergolaSettings.extraOptionMoodLight = false;

var sceneTime = "Day"; // Day, Night
var blockURLWriter = true;
export var pergola = new PergolaObject();

function CreatePergola(model) {
  pergola = new PergolaObject(pergolaSettings);
  window.pergola = pergola;

  pergola.createFrom3DModel(model);
  changeSceneTime(sceneTime);
  AssignUIFromPergolaSettings();
}

//#region Assign UI

function AssignUIFromPergolaSettings() {
  if (pergolaSettings == null) {
    return;
  }

  $("#range-width").val(pergolaSettings.width);
  $("#range-width").trigger("change");

  $("#range-length").val(pergolaSettings.length);
  $("#range-length").trigger("change");

  $("#range-height").val(pergolaSettings.height);
  $("#range-height").trigger("change");

  switch (pergolaSettings.postSize) {
    case PergolaPostType._4x4:
      $("#postSize4").click();
      break;
    case PergolaPostType._7x7:
      $("#postSize7").click();
      break;
    default:
      $("#postSize7").click();
      break;
  }

  $("#color-frame").val(pergolaSettings.colorHex);
  $("#color-frame")
    .next(".color-picker-display")
    .css("background-color", pergolaSettings.colorHex);
  $("#group_1_title").text(pergolaSettings.colorHex);

  $("#color-louver").val(pergolaSettings.colorLouveredHex);
  $("#color-louver")
    .next(".color-picker-display")
    .css("background-color", pergolaSettings.colorLouveredHex);
  $("#group_2_title").text(pergolaSettings.colorLouveredHex);

  $("#color-led-lights").val(pergolaSettings.colorLedHex);
  $("#color-led-lights")
    .next(".color-picker-display")
    .css("background-color", pergolaSettings.colorLedHex);
  // $("#group_2_title").text(pergolaSettings.colorLedHex);

  $("#color-mood-lightning").val(pergolaSettings.colorMoodHex);
  $("#color-mood-lightning")
    .next(".color-picker-display")
    .css("background-color", pergolaSettings.colorMoodHex);
  // $("#group_2_title").text(pergolaSettings.colorMoodHex);

  $("#range-angle").val(pergolaSettings.roofLouveredRotate);
  $("#range-angle").trigger("change");

  $("#wallBack").prop("checked", pergolaSettings.mountingWall_Back);
  $("#wallBack").trigger("change");
  $("#wallLeft").prop("checked", pergolaSettings.mountingWall_Left);
  $("#wallLeft").trigger("change");
  $("#wallRight").prop("checked", pergolaSettings.mountingWall_Right);
  $("#wallRight").trigger("change");

  $("#moodLightning").prop("checked", pergolaSettings.extraOptionMoodLight);
  $("#moodLightning").trigger("change");
  $("#ledLights").prop("checked", pergolaSettings.extraOptionLed);
  $("#ledLights").trigger("change");
  $("#ceilingFan").prop("checked", pergolaSettings.extraOptionFan);
  $("#ceilingFan").trigger("change");
  $("#heaters").prop("checked", pergolaSettings.extraOptionHeaters);
  $("#heaters").trigger("change");
  $("#recessedLighting").prop("checked", pergolaSettings.extraOptionLight);
  $("#recessedLighting").trigger("change");

  $("#range-quantity").val(pergolaSettings.extraOptionLightSpacing);
  $("#range-quantity").trigger("change");

  if (sceneTime == "Night") {
    $(".tumbler-wrapper").addClass("active");
    changeSceneTime("Night");
  }

  // $('.formWrapper input[type="range"]').each(function() {
  //   updateRangeBackgroundAndLabel($(this));
  // });
}

function AssignUI() {
  qrcode = $("#qrcode");
  $(".hidden").hide();

  const gui_Dimensions_function = (dimensionType, value) => {
    if (pergolaSettings[dimensionType]) {
      pergolaSettings[dimensionType] = value;
      pergola.update();
    }
  };

  $("#range-width").on("input", function () {
    const newValue = $(this).val();
    if (pergolaSettings.width == newValue) {
      return;
    }
    gui_Dimensions_function("width", newValue);
  });

  $("#range-length").on("input", function () {
    const newValue = $(this).val();
    if (pergolaSettings.length == newValue) {
      return;
    }
    gui_Dimensions_function("length", newValue);
  });

  $("#range-height").on("input", function () {
    const newValue = $(this).val();
    if (pergolaSettings.height == newValue) {
      return;
    }
    gui_Dimensions_function("height", newValue);
  });

  const gui_PostSize_function = (postType) => {
    pergolaSettings.postSize = PergolaPostType[postType];
    pergola.update();
  };

  $("#postSize4").on("click", function () {
    gui_PostSize_function("_4x4");
  });
  $("#postSize7").on("click", function () {
    gui_PostSize_function("_7x7");
  });

  $("#color-frame").on("input", function () {
    pergolaSettings.colorHex = $(this).val();
    pergola.update();
  });

  $("#color-louver").on("input", function () {
    pergolaSettings.colorLouveredHex = $(this).val();
    pergola.update();
  });

  $("#color-led-lights").on("input", function () {
    pergolaSettings.colorLedHex = $(this).val();
    pergola.update();
  });

  $("#color-mood-lightning").on("input", function () {
    pergolaSettings.colorMoodHex = $(this).val();
    pergola.update();
  });

  $("#range-angle").on("input", function () {
    const newValue = ($(this).val() * 170) / 180;
    if (pergolaSettings.roofLouveredRotate == newValue) {
      return;
    }

    pergolaSettings.roofLouveredRotate = newValue;
    pergola.update();
  });

  $("#wallBack").on("click", function () {
    pergolaSettings.mountingWall_Back = !pergolaSettings.mountingWall_Back;
    pergola.update();
  });

  $("#wallLeft").on("click", function () {
    pergolaSettings.mountingWall_Left = !pergolaSettings.mountingWall_Left;
    pergola.update();
  });

  $("#wallRight").on("click", function () {
    pergolaSettings.mountingWall_Right = !pergolaSettings.mountingWall_Right;
    pergola.update();
  });

  $("#moodLightning").on("change", function () {
    pergolaSettings.extraOptionMoodLight = this.checked;
    pergola.update();
  });

  $("#ledLights").on("change", function () {
    pergolaSettings.extraOptionLed = this.checked;
    pergola.update();
  });

  $("#ceilingFan").on("change", function () {
    pergolaSettings.extraOptionFan = this.checked;
    isAutoRotate = this.checked;
    pergola.update();
  });

  $("#heaters").on("change", function () {
    pergolaSettings.extraOptionHeaters = this.checked;
    pergola.update();
  });

  $("#recessedLighting").on("change", function () {
    pergolaSettings.extraOptionLight = this.checked;
    pergola.update();
  });

  $("#range-quantity").on("input", function () {
    const newValue = $(this).val();
    if (pergolaSettings.extraOptionLightSpacing == newValue) {
      return;
    }

    pergolaSettings.extraOptionLightSpacing = newValue;
    pergola.update();
  });

  $("#js-summary").on("click", function () {
    CreateImageList();
    writeSummatyUI();
  });

  $(".tumbler-wrapper").on("click", function () {
    $(this).toggleClass("active");
    changeSceneTime($(this).hasClass("active") ? "Night" : "Day");
  });

  $("#js-showModalQRcode").on("click", function () {
    PergolaOpenARorQR();
  });

  $("#js-showModalShare").on("click", function () {
    var data_url = GetURLWithParameters();
    if (wix_current_url != null) {
      data_url = wix_current_url;
    }
    var element = $("#info-sharing-input");
    element.val(data_url);
  });

  $("#js-showRequestEstimationModal").on("click", function () {
    wix_contactForm_Text = estimationStringValue();
    window.parent.postMessage(
      "WIX_ContactForm_Text|" + wix_contactForm_Text,
      "*"
    );
  });

  $("#share_copyToClipboard").on("click", function () {
    var data_url = GetURLWithParameters();
    if (wix_current_url != null) {
      data_url = wix_current_url;
    }

    window.parent.postMessage("WIX_URL_CopyToClipboard|", "*");
    return;
  });

  // eslint-disable-next-line no-unused-vars
  $("#modalAR").on("dialogopen", function (event, ui) {
    qrScaned = 1;
    WriteURLParameters();
  });

  // eslint-disable-next-line no-unused-vars
  $("#modalAR").on("dialogclose", function (event, ui) {
    qrScaned = 0;
    WriteURLParameters();
  });

  $("#share_copyToClipboard").on("click", function () {
    var data_url = GetURLWithParameters();
    if (wix_current_url != null) {
      data_url = wix_current_url;
    }

    window.parent.postMessage("WIX_URL_CopyToClipboard|", "*");
    return;
  });
}

function estimationStringValue() {
  var result = "";
  var values = pergolaSettings.getValues();

  result += "I'd like to get a quotation for this configuration ";

  var data_url = GetURLWithParameters();
  if (wix_current_url != null) {
    data_url = wix_current_url;
  }

  result += data_url + "\n\n";

  switch (pergolaSettings.roofType) {
    case PergolaRoofType.Solid:
      values[4].options = null;
      break;
    case PergolaRoofType.Lattice:
      values[4].options = null;
      break;
    case PergolaRoofType.Louvered:
      values[4].options = null;
      break;
    default:
      values[4].options = null;
      break;
  }

  for (let index = 0; index < values.length; index++) {
    const element = values[index];
    result += element.name + ": ";

    if (element.options != null) {
      result += element.value + "\n";

      for (let i = 0; i < element.options.length; i++) {
        const arrayValue = element.options[i];
        result += arrayValue[0] + ": " + arrayValue[1] + "\n";
      }
    } else {
      result += element.value + "\n";
    }
  }

  return result;
}

function writeSummatyUI() {
  var values = [
    pergolaSettings.toString_dimensions(),
    pergolaSettings.toString_color(),
    pergolaSettings.toString_louverColor(),
    pergolaSettings.toString_postSize(),
    pergolaSettings.toString_mountingWall(),
    pergolaSettings.toString_extraOptions_Light(),
    pergolaSettings.toString_extraOptions_Led(),
    pergolaSettings.toString_extraOptions_Mood(),
    pergolaSettings.toString_extraOptions_Fan(),
    pergolaSettings.toString_extraOptions_Heater(),
  ];

  const itemValues = $(".summary__item_value");
  const subitemValues = $(".summary__subitem_value");
  let subItemIndex = 0;

  for (let i = 0; i < itemValues.length; i++) {
    $(itemValues[i]).text(values[i]);
    subItemIndex = i + 1;
  }

  for (let i = 0; i < subitemValues.length; i++) {
    $(subitemValues[i]).text(values[subItemIndex + i]);
  }
}
//#endregion

// GUI - TEST WORK
function customGUI() {
  const gui = new dat.GUI();
  gui.close();

  const gui_TimeOptions_functions = {
    default: false,
    Time: ["Day", "Night"],
  };
  gui.add(gui_TimeOptions_functions, "default");

  const folder_TimeOptions = gui.addFolder("Time Options");
  folder_TimeOptions
    .add(gui_TimeOptions_functions, "Time", gui_TimeOptions_functions.Time)
    .onChange(function (newValue) {
      changeSceneTime(newValue);
    });

  const gui_PDF_functions = {
    GetPDF: function () {
      // createPDF();
    },
  };

  const folder_PDF = gui.addFolder("PDF Options");
  folder_PDF.add(gui_PDF_functions, "GetPDF");

  const gui_CreateImage_functions = {
    CreateImages: function () {
      CreateImageList();
    },
  };

  const folder_Screenshot = gui.addFolder("Image Options");
  folder_Screenshot.add(gui_CreateImage_functions, "CreateImages");

  var params_Bloom = {
    threshold: 1,
    strength: 1,
    radius: 1,
  };

  const folder_bloom = gui.addFolder("Bloom Options");
  folder_bloom
    .add(params_Bloom, "threshold", 0, 10)
    .onChange(function (newValue) {
      updateBloomSettings(newValue);
    });
  folder_bloom
    .add(params_Bloom, "strength", 0, 10)
    .onChange(function (newValue) {
      updateBloomSettings(null, newValue);
    });
  folder_bloom.add(params_Bloom, "radius", 0, 10).onChange(function (newValue) {
    updateBloomSettings(null, null, newValue);
  });
}

//#endregion

export function changeSceneTime(value) {
  if (value == null) {
    return;
  }

  switch (value) {
    case "Night":
      updateEnvMap("public/environment/moonless_golf_1k copy.hdr", 0.2, false);
      bloomPass.enabled = true;
      saoPass.enabled = true;
      outputPass.enabled = true;
      fxaaPass.enabled = true;
      scene.background = new THREE.Color(0x222222);
      dirLight.intensity = 0.03;
      updateBloomSettings(null, 0.45);
      changePointLightStatus(pointLights, 0.1, true);
      break;

    case "Day":
    default:
      bloomPass.enabled = false;
      saoPass.enabled = false;
      outputPass.enabled = false;
      fxaaPass.enabled = false;
      updateEnvMap(ENVIRONMENT_MAP, ENVIRONMENT_MAP_INTENSITY);
      updateBloomSettings(null, 0);
      scene.background = new THREE.Color(BACKGROUND_COLOR);
      changePointLightStatus(pointLights, 0, false);
      break;
  }

  sceneTime = value;
}

function changePointLightStatus(array, intensity, visible) {
  if (array == null) {
    return;
  }
  if (pointLights == null) {
    return;
  }
  if (pointLights.length <= 0) {
    return;
  }

  if (["Android", "iOS", "VisionPro"].includes(currentOS)) {
    return;
  }

  if (pointLights.length > 0) {
    for (let index = 0; index < pointLights.length; index++) {
      const element = pointLights[index];
      element.intensity = intensity;
      element.visible = visible;
    }
  }
}

//#region PDF
function calculateImageScale(
  originalWidth,
  originalHeight,
  targetWidth,
  targetHeight
) {
  return Math.min(targetWidth / originalWidth, targetHeight / originalHeight);
}

async function createPDF() {
  await CreateImageList();

  const pdfDoc = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit);
  const font_regular_url = "./css/fonts/NeueHaasUnica-ExtraLight.ttf";
  const font_bold_url = "./css/fonts/ITCAvantGardePro-Md.ttf";

  const font_regular_bytes = await fetch(font_regular_url).then((res) =>
    res.arrayBuffer()
  );
  const font_bold_bytes = await fetch(font_bold_url).then((res) =>
    res.arrayBuffer()
  );
  const font_regular_value = await pdfDoc.embedFont(font_regular_bytes);
  const font_bold_value = await pdfDoc.embedFont(font_bold_bytes);

  const png_logo_url = "./src/pdf/logo.png";
  const png_icon_web_url = "./src/pdf/icon_web.png";
  const png_icon_phone_url = "./src/pdf/icon_phone.png";
  const png_icon_email_url = "./src/pdf/icon_email.png";

  var png_img_1_url = "./src/pdf/img_1.png";

  if (share_RenderImages.length >= 1) {
  }

  png_img_1_url = pdfImg.img;

  const png_logo_bytes = await fetch(png_logo_url).then((res) =>
    res.arrayBuffer()
  );
  const png_icon_web_bytes = await fetch(png_icon_web_url).then((res) =>
    res.arrayBuffer()
  );
  const png_icon_phone_bytes = await fetch(png_icon_phone_url).then((res) =>
    res.arrayBuffer()
  );
  const png_icon_email_bytes = await fetch(png_icon_email_url).then((res) =>
    res.arrayBuffer()
  );

  const png_img_1_bytes = await fetch(png_img_1_url).then((res) =>
    res.arrayBuffer()
  );

  const png_logo_image = await pdfDoc.embedPng(png_logo_bytes);
  const png_icon_web_image = await pdfDoc.embedPng(png_icon_web_bytes);
  const png_icon_phone_image = await pdfDoc.embedPng(png_icon_phone_bytes);
  const png_icon_email_image = await pdfDoc.embedPng(png_icon_email_bytes);

  const png_img_1_image = await pdfDoc.embedPng(png_img_1_bytes);

  const png_logo_dimensions = png_logo_image.scale(0.5);
  const png_icon_web_dimensions = png_icon_web_image.scale(0.25);
  const png_icon_phone_dimensions = png_icon_phone_image.scale(0.25);
  const png_icon_email_dimensions = png_icon_email_image.scale(0.25);

  const additionalImgScale = 0.6; // 1
  const png_img_1_scale =
    calculateImageScale(
      png_img_1_image.width,
      png_img_1_image.height,
      share_RenderImageSize.x,
      share_RenderImageSize.y
    ) * additionalImgScale;

  const png_img_1_dimensions = png_img_1_image.scale(png_img_1_scale);
  const page1 = pdfDoc.addPage([595, 842]);

  // HEADERS
  // Page 1
  page1.drawImage(png_logo_image, {
    x: page1.getWidth() / 2 - png_logo_dimensions.width / 2,
    y: page1.getHeight() - 30 - png_logo_dimensions.height,
    width: png_logo_dimensions.width,
    height: png_logo_dimensions.height,
  });

  // BOTTOM

  // Page 1
  const fontSizeBold = 12;

  const elements = [
    {
      text: "(800) 401- 9323 ",
      x: 50,
      y: 33,
      width: 73,
      height: 13,
      font: font_bold_value,
      fontSize: fontSizeBold,
      color: rgb(0.0, 0.0, 0.0),
    },
    {
      text: "info@alumaluxusa.com",
      x: 214,
      y: 33,
      width: 140,
      height: 13,
      font: font_bold_value,
      fontSize: fontSizeBold,
      color: rgb(0.0, 0.0, 0.0),
    },
    {
      text: "www.alumaluxusa.com",
      x: 427,
      y: 33,
      width: 140,
      height: 13,
      font: font_bold_value,
      fontSize: fontSizeBold,
      color: rgb(0.0, 0.0, 0.0),
    },
  ];

  const icons = [
    {
      icon: png_icon_phone_image,
      x: 30,
      y: 30,
      width: png_icon_phone_dimensions.width,
      height: png_icon_phone_dimensions.height,
    },
    {
      icon: png_icon_email_image,
      x: 194,
      y: 30,
      width: png_icon_email_dimensions.width,
      height: png_icon_email_dimensions.height,
    },
    {
      icon: png_icon_web_image,
      x: 409,
      y: 30,
      width: png_icon_web_dimensions.width,
      height: png_icon_web_dimensions.height,
    },
  ];

  elements.forEach(({ text, x, y, width, height, font, fontSize, color }) => {
    page1.drawText(text, {
      x,
      y,
      size: fontSize,
      font: font,
      color: color,
    });
  });

  icons.forEach(({ icon, x, y, width, height }) => {
    page1.drawImage(icon, {
      x: x,
      y: y,
      width: width,
      height: height,
    });
  });

  // BODY

  // Page 1
  page1.drawImage(png_img_1_image, {
    x: page1.getWidth() / 2 - png_img_1_dimensions.width / 2,
    y:
      page1.getHeight() -
      30 -
      png_img_1_dimensions.height -
      png_logo_dimensions.height,
    width: png_img_1_dimensions.width,
    height: png_img_1_dimensions.height,
  });

  var values = pergolaSettings.getValues();
  var indexValue = 0;
  var indexHeigth = 0;
  var indexHeigthAdditional = 0;

  for (let index = 0; index < values.length; index++) {
    const element = values[index];
    indexHeigth =
      page1.getHeight() -
      png_logo_dimensions.height -
      30 -
      51 * (indexValue + 1) -
      index -
      png_img_1_dimensions.height -
      indexHeigthAdditional;
    page1.drawText(element.name, {
      x: 30,
      y: indexHeigth,
      size: 14,
      font: font_bold_value,
      // color: rgb(0.0, 0.0, 0.0),
    });

    if (element.options != null) {
      page1.drawText(element.value, {
        x:
          page1.getWidth() -
          30 -
          font_regular_value.widthOfTextAtSize(element.value, 14),
        y: indexHeigth,
        size: 14,
        font: font_regular_value,
        color: rgb(0.0, 0.0, 0.0),
      });
      indexHeigthAdditional += 18;

      for (let i = 0; i < element.options.length; i++) {
        const arrayValue = element.options[i];

        if (i === 0) {
          indexHeigthAdditional += 24;
        } else {
          indexHeigthAdditional += 10;
        }

        indexHeigth =
          page1.getHeight() -
          png_logo_dimensions.height -
          30 -
          51 * (indexValue + 1) -
          index -
          png_img_1_dimensions.height -
          indexHeigthAdditional;
        page1.drawText(arrayValue[0], {
          x: 30,
          y: indexHeigth,
          size: 14,
          font: font_regular_value,
          color: rgb(0.0, 0.0, 0.0),
        });
        page1.drawText(arrayValue[1], {
          x:
            page1.getWidth() -
            30 -
            font_regular_value.widthOfTextAtSize(arrayValue[1], 14),
          y: indexHeigth,
          size: 14,
          font: font_regular_value,
          color: rgb(0.0, 0.0, 0.0),
        });

        if (i != element.options.length - 1) {
          indexHeigthAdditional += 14;
        }
      }
    } else {
      page1.drawText(element.value, {
        x:
          page1.getWidth() -
          30 -
          font_regular_value.widthOfTextAtSize(element.value, 14),
        y: indexHeigth,
        size: 14,
        font: font_regular_value,
        color: rgb(0.0, 0.0, 0.0),
      });
    }

    indexValue += 1;

    if (index == values.length - 1) {
      continue;
    }

    page1.drawLine({
      start: { x: 30, y: indexHeigth - 23 },
      end: { x: page1.getWidth() - 30, y: indexHeigth - 23 },
      thickness: 0.5,
      color: rgb(0.573, 0.573, 0.573),
    });
  }

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "exterior-perfections-pergola.pdf";
  link.target = "_blank";
  link.click();
}

//#endregion

//#region Dimmensions

function removeObject3D(object3D) {
  if (!(object3D instanceof THREE.Object3D)) return false;

  if (object3D.geometry) object3D.geometry.dispose();

  if (object3D.material) {
    if (object3D.material instanceof Array) {
      object3D.material.forEach((material) => material.dispose());
    } else {
      object3D.material.dispose();
    }
  }
  object3D.removeFromParent();
  return true;
}

var dimmensionObjects = [];

function changeDimmensionRender(status, lookAtCamera = null, stage) {
  if (!status) {
    for (let index = 0; index < dimmensionObjects.length; index++) {
      const element = dimmensionObjects[index];
      removeObject3D(element);
    }

    dimmensionObjects = [];
    return;
  }

  const colorDemension = "#000000";
  const { FL_point, FR_point, RR_point } = pergola.getCornerPoints();
  const modelHeight = pergola.getMeters(state.height);
  const deltaHeight = 0.7;

  let textSize = 0.2;

  if (state.width > 15 || state.length > 15) {
    textSize = 0.25;
  }

  if (state.width > 25 || state.length > 25) {
    textSize = 0.3;
  }

  if (state.width > 30 || state.length > 30) {
    textSize = 0.35;
  }

  var pos_width_0 = new THREE.Vector3(
    FL_point.x - 0.1,
    modelHeight - deltaHeight,
    FL_point.z + 0.1
  );
  var pos_width_1 = new THREE.Vector3(
    FR_point.x + 0.08,
    modelHeight - deltaHeight,
    FR_point.z + 0.1
  );

  var pos_length_0 = new THREE.Vector3(
    FR_point.x + 0.1,
    modelHeight - deltaHeight,
    FR_point.z + 0.08
  );
  var pos_length_1 = new THREE.Vector3(
    RR_point.x + 0.1,
    modelHeight - deltaHeight,
    RR_point.z - 0.1
  );

  var pos_width_center = generateMidpoints(pos_width_0, pos_width_1, 1);
  var pos_length_center = generateMidpoints(pos_length_0, pos_length_1, 1);

  var pos_width_textPosition = new THREE.Vector3(
    pos_width_center[0].x,
    pos_width_center[0].y + 0.2,
    pos_width_center[0].z + 0.1
  );
  var pos_length_textPosition = new THREE.Vector3(
    pos_length_center[0].x + 0.1,
    pos_length_center[0].y + 0.1,
    pos_length_center[0].z
  );

  AddDimmension(
    pos_width_center[0],
    pos_width_0,
    pos_width_1,
    pergola.getMeters(state.width.toString()) + "'",
    pos_width_textPosition,
    "x",
    0.01,
    colorDemension,
    lookAtCamera
  );
  createDimensionBorderLine(pos_width_0, 0.25, 0.01, "x", colorDemension);
  createDimensionBorderLine(pos_width_1, 0.25, 0.01, "x", colorDemension);
  createDimensionText(
    state.width.toString() + "'",
    pos_width_textPosition,
    colorDemension,
    lookAtCamera,
    textSize
  );

  AddDimmension(
    pos_length_center[0],
    pos_length_0,
    pos_length_1,
    pergola.getMeters(state.length.toString()) + "'",
    pos_length_textPosition,
    "z",
    0.01,
    colorDemension,
    lookAtCamera
  );
  createDimensionBorderLine(pos_length_0, 0.25, 0.01, "x", colorDemension);
  createDimensionBorderLine(pos_length_1, 0.25, 0.01, "x", colorDemension);
  createDimensionText(
    state.length.toString() + "'",
    pos_length_textPosition,
    colorDemension,
    lookAtCamera,
    textSize
  );

  var pos_height_0 = new THREE.Vector3(RR_point.x + 0.5, -1, RR_point.z);
  var pos_height_1 = new THREE.Vector3(
    RR_point.x + 0.5,
    modelHeight - 1,
    RR_point.z
  );

  var pos_height_center = generateMidpoints(pos_height_0, pos_height_1, 1);
  var pos_height_textPosition = new THREE.Vector3(
    pos_height_center[0].x + 0.1,
    pos_height_center[0].y,
    pos_height_center[0].z + 0.2
  );

  AddDimmension(
    pos_height_center[0],
    pos_height_0,
    pos_height_1,
    "8" + "'",
    pos_height_textPosition,
    "y",
    0.01,
    colorDemension,
    lookAtCamera
  );
  createDimensionBorderLine(pos_height_0, 0.25, 0.01, "y", colorDemension);
  createDimensionBorderLine(pos_height_1, 0.25, 0.01, "y", colorDemension);
  createDimensionText(
    state.height.toString() + "'",
    pos_height_textPosition,
    colorDemension,
    lookAtCamera,
    textSize
  );
}

function AddDimmension(
  position,
  start,
  end,
  text,
  textPosition = null,
  side = "x",
  thickness = 0.01,
  color = colorDemension,
  lookAtCamera = null
) {
  const line = createDimensionLine(
    position,
    start,
    end,
    thickness,
    side,
    color
  );
  scene.add(line);
  dimmensionObjects.push(line);

  /*
  if(textPosition != null){
    createDimensionText(text, textPosition, colorDemension, lookAtCamera);
    return;
  }

  var line1_center = generateMidpoints(start, end, 1);
  createDimensionText(text, line1_center[0], colorDemension, lookAtCamera);
  dimmensionObjects.push(line);
  */
}

function getDistance(point1, point2) {
  return point1.distanceTo(point2);
}

function createDimensionLine(
  position,
  start,
  end,
  thickness = 0.01,
  side = "x",
  color = colorDemension
) {
  //const material = new THREE.LineBasicMaterial({ color: color });
  var length = getDistance(start, end);

  var x_value = side != "x" ? thickness : length;
  var y_value = side != "y" ? thickness : length;
  var z_value = side != "z" ? thickness : length;

  const material = new THREE.MeshBasicMaterial({ color: color });
  const geometry = new THREE.BoxGeometry(x_value, y_value, z_value);
  const lineMesh = new THREE.Mesh(geometry, material);
  lineMesh.position.set(position.x, position.y, position.z);

  return lineMesh;
}

function createDimensionBorderLine(
  position,
  length,
  thickness = 0.01,
  side = "x",
  color = colorDemension
) {
  var x_value = side != "y" ? thickness : length;
  var y_value = side != "x" ? thickness : length;
  var z_value = side != "z" ? thickness : length;

  switch (side) {
    case "x":
      x_value = thickness;
      y_value = length;
      z_value = thickness;
      break;
    case "y":
      x_value = length;
      y_value = thickness;
      z_value = thickness;
      break;
    case "z":
      x_value = thickness;
      y_value = length;
      z_value = thickness;
      break;

    default:
      break;
  }

  const material = new THREE.MeshBasicMaterial({ color: color });
  const geometry = new THREE.BoxGeometry(x_value, y_value, z_value);
  const lineBorderMesh = new THREE.Mesh(geometry, material);
  lineBorderMesh.position.set(position.x, position.y, position.z);

  scene.add(lineBorderMesh);
  dimmensionObjects.push(lineBorderMesh);
  return lineBorderMesh;
}

function loadThreeJSFonts() {
  const loader = new FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      threejs_font_helvetiker_regular = font;
    }
  );
}

function createDimensionText(
  text,
  position,
  color = colorDemension,
  lookAtCamera = null,
  textSize = 0.2
) {
  if (threejs_font_helvetiker_regular == null) {
    return;
  }

  const textGeometry = new TextGeometry(text, {
    font: threejs_font_helvetiker_regular,
    size: textSize, // Розмір тексту
    depth: 0.01, // Глибина тексту
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: color });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(position.x, position.y, position.z);
  if (lookAtCamera != null) {
    textMesh.lookAt(lookAtCamera.position);
  }

  scene.add(textMesh);
  dimmensionObjects.push(textMesh);

  return textMesh;
}

//#endregion

//#region CAPTURE CAMERA IMAGE

var share_RenderImageSize = {
  x: 650,
  y: 350,
};

var share_RenderImages = [];

export async function CreateImageList() {
  if (canvas == null) {
    return;
  }

  const fov = 50;
  let width = Number(state.width);
  let length = Number(state.length);
  const sizeValue = width > length ? width : length;

  const deltaDist = ConvertMorphValue(state.height, 8, 15, 4.5, 8.0);
  const deltaY = ConvertMorphValue(state.height, 8, 15, 0.5, 2.0);

  const dist = (sizeValue / 40) * 10 + deltaDist;

  // console.log(canvas);
  const cameraImageViews_Global = [
    {
      id: "view_1.png",
      alt: "view 1",
      cameraObject: new THREE.PerspectiveCamera(
        fov,
        canvas.width / canvas.height,
        0.01,
        1000
      ),
      position: new THREE.Vector3(dist / 1.7, 0 + deltaY, dist / 1.7),
      rotation: new THREE.Vector3(0, Math.PI / 4.25, 0),
    },
    {
      id: "view_top.png",
      alt: "view from top",
      cameraObject: new THREE.PerspectiveCamera(
        fov,
        canvas.width / canvas.height,
        0.01,
        1000
      ),
      position: new THREE.Vector3(0, dist * 1.1, 0),
      rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
      rotate: true,
    },
  ];

  share_RenderImages = [];

  pergola.update();

  for (let index = 0; index < cameraImageViews_Global.length; index++) {
    const element = cameraImageViews_Global[index];

    element.cameraObject.visible = true;
    element.cameraObject.aspect = camera.aspect;
    element.cameraObject.updateProjectionMatrix();
    element.cameraObject.position.set(
      element.position.x,
      element.position.y,
      element.position.z
    );
    element.cameraObject.rotation.set(
      element.rotation.x,
      element.rotation.y,
      element.rotation.z
    );

    changeDimmensionRender(true, element, index, element.rotate);
    TakeImage(element, "ar_pop_share_image");
    await new Promise((resolve) => setTimeout(resolve, 1));
    changeDimmensionRender(false);
  }

  // state.backWall = oldBackWall;
  // state.leftWall = oldLeftWall;
  // state.rightWall = oldRightWall;

  pdfImg.img = share_RenderImages[0].src;
  pdfImgTop.img = share_RenderImages[1].src;

  // $("#js-summary-image-preview-1").find("img").eq(1).remove();
}

function TakeImage(view, img_class) {
  var img_div = document.createElement("div");
  img_div.classList.add(img_class);
  var img = CreateImage(view);
  img_div.appendChild(img);
  //DownloadRenderImage(img.src, img.alt);
  //ar_pop_share_pics.appendChild(img_div);
}

function CreateImage(view) {
  var img = new Image();

  renderer.setSize(share_RenderImageSize.x, share_RenderImageSize.y, false);
  view.cameraObject.aspect = share_RenderImageSize.x / share_RenderImageSize.y;
  view.cameraObject.updateProjectionMatrix();
  renderer.render(scene, view.cameraObject);

  img.src = renderer.domElement.toDataURL();
  img.alt = view.alt;

  share_RenderImages.push(img);

  view.cameraObject.visible = false;
  updateRenderSize();
  return img;
}

function DownloadRenderImage(src, alt) {
  if (src == null) {
    return;
  }
  if (alt == 0) {
    return;
  }

  var a = document.createElement("a");
  a.href = src;
  a.download = alt;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//#endregion

//#region Encode/Decode

String.prototype.SEncode = function () {
  if (this == undefined) {
    return "";
  }
  return btoa(unescape(encodeURIComponent(this)));
};

String.prototype.SDecode = function () {
  if (this == undefined) {
    return "";
  }
  return decodeURIComponent(escape(atob(this)));
};

//#endregion

function rotateFans(fans, speed = 0.01) {
  if (isAutoRotate) {
    fans.forEach((obj) => {
      if (obj.active) {
        obj.object.rotation.y -= speed;
      }
    });
  }

  requestAnimationFrame(() => rotateFans(fans, speed));
}
