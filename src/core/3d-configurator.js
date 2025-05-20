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

import { interfaceComponent } from "../components/Interface/interface";
import { countLeds } from "../components/summary/summary-page/summaryPage";
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
import { updateMaterialMap } from "../components/Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";

const DEBUG_MODE_VALUES = false;
export let modelForExport = null;

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
    LEDRampLight: "LED Ramp Light",
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
        console.log(`CLICKED: ${intersectedObject.name}`);

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

export async function toggleBackWall(toggle) {
  const bigWall = GetGroup("wall_back001");
  const smallWall = GetGroup("wall_back");

  // #region turn OFF
  bigWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = false;
      }
    });
  });

  smallWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = false;
      }
    });
  });
  //  #endregion

  const wallBackGroup = !state.typePergola ? smallWall : bigWall;

  wallBackGroup.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = toggle;
      }
    });
  });
}

function mirrorObject(object, value = true) {
  if (object) object.scale.x = value ? -1 : 1;
}

export async function toggleLeftWall(toggle) {
  const bigWall = GetGroup("wall_L001");
  const smallWall = GetGroup("wall_L");

  // #region turn OFF
  bigWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = false;
      }
    });
  });

  smallWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = false;
      }
    });
  });
  //  #endregion

  const wallBackGroup = !state.typePergola ? smallWall : bigWall;

  wallBackGroup.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = toggle;
      }
    });
  });
}

export async function toggleRightWall(toggle) {
  const bigWall = GetGroup("wall_R001");
  const smallWall = GetGroup("wall_R");

  // #region turn OFF
  bigWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = false;
      }
    });
  });

  smallWall.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = false;
      }
    });
  });
  //  #endregion

  const wallBackGroup = !state.typePergola ? smallWall : bigWall;

  wallBackGroup.children.forEach((group) => {
    group.traverse((object) => {
      if (object.isMesh) {
        object.visible = toggle;
      }
    });
  });
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
  console.log("start");

  if (init) {
    console.log("open", scene, pergola, theModel, modelForExport);

    InitMorphModel(theModel);

    ComputeMorphedAttributes();

    // //Remove wall
    // if (pergola != null) {
    //   if (pergolaSettings.mountingWall_Back) {
    //     pergola.changeMountingWallVisibility(
    //       false,
    //       PergolaElementOrientSide.Back
    //     );
    //   }

    //   if (pergolaSettings.mountingWall_Left) {
    //     pergola.changeMountingWallVisibility(
    //       false,
    //       PergolaElementOrientSide.Left
    //     );
    //   }

    //   if (pergolaSettings.mountingWall_Right) {
    //     pergola.changeMountingWallVisibility(
    //       false,
    //       PergolaElementOrientSide.Right
    //     );
    //   }
    // }

    await ImportScene(scene);

    // if (getMobileOperatingSystem() == "iOS") {
    //   if (pergola != null) {
    //     if (pergolaSettings.mountingWall_Back) {
    //       pergola.changeMountingWallVisibility(
    //         pergolaSettings.mountingWall_Back,
    //         PergolaElementOrientSide.Back,
    //         true
    //       );
    //     }
    //     if (pergolaSettings.mountingWall_Left) {
    //       pergola.changeMountingWallVisibility(
    //         pergolaSettings.mountingWall_Left,
    //         PergolaElementOrientSide.Left,
    //         true
    //       );
    //     }
    //     if (pergolaSettings.mountingWall_Right) {
    //       pergola.changeMountingWallVisibility(
    //         pergolaSettings.mountingWall_Right,
    //         PergolaElementOrientSide.Right,
    //         true
    //       );
    //     }
    //   }
    // }

    init = false;
  }

  console.log("end");
}

// eslint-disable-next-line no-unused-vars
export function OpenARorQR() {
  console.log("click AR");
  if (["Android", "iOS", "VisionPro"].includes(currentOS)) {
    OpenAR();
    return;
  }

  console.log("QR");
  CreateQR();

  $("#ar").show();
}

//IMPORT
async function ImportScene(newScene) {
  console.log(modelViewer[0], newScene);
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
  var uvTransformSymbol = "uvTransform";

  if (THREE.REVISION >= 150) {
    vUvSymbol = "vMapUv";
    uvTransformSymbol = "mapTransform";
  }

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
                  `vec4 worldPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nworldPosition = instanceMatrix * worldPosition;\n#endif\nworldPosition = modelMatrix * worldPosition;\n${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;`
                );
            };
          } else if (object.material.name.includes("_Y")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `vec4 worldPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nworldPosition = instanceMatrix * worldPosition;\n#endif\nworldPosition = modelMatrix * worldPosition;\n${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;`
                );
            };
          } else if (object.material.name.includes("_X")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `vec4 worldPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nworldPosition = instanceMatrix * worldPosition;\n#endif\nworldPosition = modelMatrix * worldPosition;\n${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.yz, 1)).xy;`
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
    this.fansBeamX = [];
    this.fansBeamY = [];
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

      // base
      if (o.name.includes("header") && !o.name.includes("LED")) {
        this.changeObjectVisibility(o);
        o.visible = true;
      }

      // WALLS
      if (o.name.includes("wall")) {
        var mountingWall = new PergolaMountingWallElement();
        mountingWall.object = o;

        if (o.name.includes("_R")) {
          mountingWall.side = PergolaElementOrientSide.Right;
        } else if (o.name.includes("_L")) {
          mountingWall.side = PergolaElementOrientSide.Left;
        } else if (o.name.includes("_back")) {
          mountingWall.side = PergolaElementOrientSide.Back;
        } else {
          mountingWall.side = PergolaElementOrientSide.Right;
        }

        this.mountingWall.elements.push(mountingWall);
      }

      // Fan
      if (o.name.includes("fan")) {
        var fan = new PergolaExtraOptionElement();

        fan.type = PergolaExtraOptionType.fan;
        fan.object = o;

        this.extraOptions.elements.push(fan);
      }

      // Heater
      if (o.name.includes("UFO")) {
        var heater = new PergolaExtraOptionElement();

        heater.type = PergolaExtraOptionType.heater;
        heater.object = o;

        this.extraOptions.elements.push(heater);
      }

      // Point Light
      if (o.name.includes("point-light")) {
        var pointLight = new PergolaExtraOptionElement();

        pointLight.type = PergolaExtraOptionType.light;
        pointLight.object = o;

        this.extraOptions.elements.push(pointLight);
      }

      // LED Strip
      if (o.name.includes("frame") && o.name.includes("LED")) {
        const ledLight = new PergolaExtraOptionElement();

        ledLight.type = PergolaExtraOptionType.led;
        ledLight.object = o;

        this.extraOptions.elements.push(ledLight);
      }

      // LED Strip MOOD LIGHTING
      if (o.name.includes("frame") && o.name.includes("001")) {
        const ledMood = new PergolaExtraOptionElement();

        ledMood.type = PergolaExtraOptionType.moodLed;
        ledMood.object = o;

        this.extraOptions.elements.push(ledMood);
      }
    });

    // ROOF
    var roofTypeLouvered = new PergolaRoofTypeLouvered();
    model.traverse((o) => {
      if (o.name.includes("louver") && !o.name.includes("frame")) {
        var louveredObject = new PergolaRoofTypeLouveredObject();
        louveredObject.object = o;
        roofTypeLouvered.objects.push(louveredObject);
      }
    });

    this.roof.louvered = roofTypeLouvered;

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
    this.animateFans();
    // this.prepareFrames();
    this.prepareLouvereds();
    this.prepareSystems();
    this.prepareSpans();
    updateHotspots(hotspots);
    // this.cloneMaterialTexture("wall");
    // this.cloneMaterialTexture("wall_side");
    // this.cloneMaterialTexture("wall_tile");

    ParseMorphByModel(model);

    setTimeout(() => {
      state.currentActiveSystems = null;
      pergola.update();
    }, 500);

    this.update();
  }

  preparePosts() {
    const countPosts = 40;

    // const qtyMiddlePostsWidth = Math.floor(
    //   this.settings.maxWidth / minInterval
    // );

    this.clonePostObject(countPosts, "leftCenter");
    this.clonePostObject(countPosts, "rightCenter");
    this.clonePostObject(countPosts, "frontCenter");
    this.clonePostObject(countPosts, "backCenter");
    this.clonePostObject(countPosts, "centerCenter");
  }

  getMeters(feet) {
    const meters = feet * 0.3048;
    return meters;
  }

  getPostPoints(xOffset, zOffset) {
    const offsetX = 0.075;
    const offsetZ = 0;

    const qtyWidth = Math.floor(state.width / state.postWidthInterval);

    const qtyWidthLouver = Math.floor(state.width / state.louverInterval);
    const qtyLengthLouver = Math.floor(state.length / state.louverInterval);

    const qtyLength = Math.floor(state.length / state.postDepthInterval);

    const { FL_point, FR_point, RR_point } = this.getCornerPoints();

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

  setRoofBeam() {
    this.changeRoofVisibility(false, "beamX", null, true);
    this.changeRoofVisibility(false, "beamY", null, true);
    this.changeRoofVisibility(false, "beamXLed", null, true);
    this.changeRoofVisibility(false, "beamYLed", null, true);

    const {
      point_post_length,
      point_post_width,
      point_louver_width,
      point_louver_length,
    } = this.getPostPoints();

    if (state.roofType) {
      if (state.directionRoof) {
        this.setBeamsPosition(point_louver_length, this.roof.beamX);
        this.setBeamsPosition(point_post_width, this.roof.beamY, true);

        if (state.electro.has(pergolaConst.optionNameString.LEDStrip)) {
          this.setBeamsPosition(point_louver_length, this.roof.beamXLed);
          this.setBeamsPosition(point_post_width, this.roof.beamYLed, true);
        }
      } else {
        this.setBeamsPosition(point_post_length, this.roof.beamX);
        this.setBeamsPosition(point_louver_width, this.roof.beamY, true);

        if (state.electro.has(pergolaConst.optionNameString.LEDStrip)) {
          this.setBeamsPosition(point_post_length, this.roof.beamXLed);
          this.setBeamsPosition(point_louver_width, this.roof.beamYLed, true);
        }
      }
    } else {
      this.setBeamsPosition(point_post_length, this.roof.beamX);
      this.setBeamsPosition(point_post_width, this.roof.beamY, true);

      if (state.electro.has(pergolaConst.optionNameString.LEDStrip)) {
        this.setBeamsPosition(point_post_length, this.roof.beamXLed);
        this.setBeamsPosition(point_post_width, this.roof.beamYLed, true);
      }
    }
  }

  addOffset(target, direction, offset) {
    if (Array.isArray(target)) {
      return target.map((el) => {
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
    const { span_width, span_depth } = this.getSpanPoints();

    const spans = this.span.objects;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];

      if (span.isSystemSet) {
        span.systems.forEach((system) => {
          if (system.active) {
            switch (system.type) {
              case pergolaConst.systemType.privacyWall:
                const frame = system.object;

                // system.object.position.x = span.posX;
                // system.object.position.z = span.posZ;

                const isDirectionX = !system.direction;

                // const mesh = post.children[0];
                let post = isDirectionX
                  ? scene.getObjectByName("privacy_wall_post_3x3")
                  : scene.getObjectByName("privacy_wall_post_3x3_side");

                post.material.color.set(state.colorBody);

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

                const gapShutter = !state.slatsSize ? 0 : 0.06;
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
                const minSize = 0.930618;
                const maxSize = 7.01014;

                if (!system.direction) {
                  const morphValue = this.interpolateValue(
                    span_width,
                    minSize,
                    maxSize
                  );

                  ChangeGlobalMorph("width_shades", morphValue);
                } else {
                  const morphValue = this.interpolateValue(
                    span_depth,
                    minSize,
                    maxSize
                  );

                  ChangeGlobalMorph("length_shades_side", morphValue);
                }

                const material = system.object.children[1].material;
                const zipPost = !system.direction
                  ? system.object.getObjectByName("zip_post")
                  : system.object.getObjectByName("zip_post_side");
                this.changeObjectVisibility(false, zipPost);

                if (system.spanWidth >= 5.9) {
                  //m
                  this.changeObjectVisibility(true, zipPost);
                }

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
      } else {
        // span.systems.forEach((system) => {
        //   system.active = false;
        //   this.changeObjectVisibility(false, system.object);
        //   this.changeObjectVisibility(false, system.windowObject);
        // });
      }
    }
  }

  setOptions() {
    this.changeRoofVisibilityRest(false, "heatersFront", null, true);
    this.changeRoofVisibilityRest(false, "heatersBack", null, true);
    this.changeRoofVisibilityRest(false, "fans", null, true);
    this.changeRoofVisibilityRest(false, "fansBeamX", null, true);
    this.changeRoofVisibilityRest(false, "fansBeamY", null, true);
    this.changeRoofVisibility(false, "pointLED", null, true);
    this.changeRoofVisibility(false, "rampLEDX", null, true);
    this.changeRoofVisibility(false, "rampLEDY", null, true);
    pergola.roof.headerLed[0].object.visible = false;

    pointsBeamX = [];
    pointsBeamZ = [];

    if (
      state.electro.has(pergolaConst.optionNameString.fans) ||
      (state.electro.has(pergolaConst.optionNameString.LEDRecessed) &&
        state.width > 4)
    ) {
      this.setFans();
    }

    if (state.electro.has(pergolaConst.optionNameString.LEDStrip)) {
      pergola.roof.headerLed[0].object.visible = true;
    }

    if (state.electro.has(pergolaConst.optionNameString.LEDRecessed)) {
      this.setPointLight();
    }

    if (state.electro.has(pergolaConst.optionNameString.LEDRampLight)) {
      this.setLEDramp();
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

    if (state.directionRoof) {
      cornerAndBeamPointZ = [FL_point, ...point_louver_length, RR_point];
      cornerAndBeamPointX = [RL_point, ...point_post_width, FR_point];
    } else {
      cornerAndBeamPointZ = [FL_point, ...point_post_length, RR_point];
      cornerAndBeamPointX = [RL_point, ...point_louver_width, FR_point];
    }

    if (!state.roofType) {
      cornerAndBeamPointZ = [FL_point, ...point_post_length, RR_point];
      cornerAndBeamPointX = [RL_point, ...point_post_width, FR_point];
    }

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

    const fansBeam = state.directionRoof ? this.fansBeamY : this.fansBeamX;

    //#region BEAM X
    for (let i = 0; i < allPointsForLouversZ.length; i++) {
      const pointZ = allPointsForLouversZ[i].z;

      for (let a = 0; a < allPointsForLouversX.length; a++) {
        const pointX = allPointsForLouversX[a].x;
        const elementFan = this.getAvaliableObjectFromOneArray(this.fans);
        const elementBeam = this.getAvaliableObjectFromOneArray(fansBeam);

        //FANS
        if (state.electro.has(pergolaConst.optionNameString.fans)) {
          elementFan.object.position.x = pointX;
          elementFan.object.position.z = pointZ;

          elementFan.object.visible = true;
          elementFan.object.children.forEach((child) => (child.visible = true));
          elementFan.active = true;
        }

        //FANS BEAM
        if (state.directionRoof) {
          elementBeam.object.position.x = pointX;
          pointsBeamX.push(pointX);
        } else {
          elementBeam.object.position.z = pointZ;
          pointsBeamZ.push(pointZ);
        }

        elementBeam.object.visible = true;
        elementBeam.object.children.forEach((child) => (child.visible = true));
        elementBeam.active = true;
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

  setBeamsPosition(points, array, rafter, rotate = false) {
    const beams = array;

    for (let i = 0; i < points.length; i++) {
      const beamPoint = points[i];
      const element = beams[i];

      if (element == null) {
        return;
      }

      if (rafter) {
        element.object.position.x = beamPoint.x;
      } else {
        element.object.position.z = beamPoint.z;
      }

      if (rotate) {
        element.object.rotation.y = Math.PI;
      }

      element.active = true;
      element.object.visible = true;
      this.changeObjectVisibility(true, element.object);
      console.log("Beam", element.object);
    }
  }

  setPosts() {
    this.post.postFL.visible = false;
    this.post.postFR.visible = false;
    this.post.postBR.visible = false;
    this.post.postBL.visible = false;

    this.changePostVisibility(false, "leftCenter", true);
    this.changePostVisibility(false, "rightCenter", true);
    this.changePostVisibility(false, "frontCenter", true);
    this.changePostVisibility(false, "backCenter", true);
    this.changePostVisibility(false, "centerCenter", true);

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();
    const { point_post_width, point_post_length } = this.getPostPoints();

    console.log(point_post_width, point_post_length);

    const pointForCorner = [
      !pergola.settings.leftWall ? FL_point : {},
      !pergola.settings.rightWall ? FR_point : {},
      !pergola.settings.backWall && !pergola.settings.leftWall ? RL_point : {},
      !pergola.settings.backWall && !pergola.settings.rightWall ? RR_point : {},
    ];

    if (!state.leftWall) {
      this.post.postFL.visible = true;
    }

    if (!state.rightWall) {
      this.post.postFR.visible = true;
    }

    if (!state.backWall && !state.leftWall) {
      this.post.postBL.visible = true;
    }

    if (!state.backWall && !state.rightWall) {
      this.post.postBR.visible = true;
    }

    if (!state.leftWall) {
      this.setPostsPosition("leftCenter", point_post_length, true);
    }

    if (!state.rightWall) {
      this.setPostsPosition("rightCenter", point_post_length, true);
    }

    if (!state.backWall) {
      this.setPostsPosition("backCenter", point_post_width, true);
    }

    this.setPostsPosition("frontCenter", point_post_width, true);

    // center column
    if (point_post_width.length && point_post_length.length) {
      const posts = this.post.centerCenter;

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
          case "leftCenter":
            element.object.position.z = point.z;
            // element.object.position.x = -point.x;

            break;

          case "rightCenter":
            element.object.position.z = point.z;
            // element.object.position.x = point.x;

            break;

          case "backCenter":
            element.object.position.x = point.x;
            // element.object.position.z = -point.z;

            break;

          case "frontCenter":
            element.object.position.x = point.x;
            // element.object.position.z = point.z;

            break;
        }
      }

      console.log(element);

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

    if (side === "leftCenter") {
      model.traverse((o) => {
        if (o.name === "post_CL") {
          element = o;
        }
      });
    }

    if (side === "rightCenter") {
      model.traverse((o) => {
        if (o.name === "post_CR") {
          element = o;
        }
      });
    }

    if (side === "frontCenter") {
      model.traverse((o) => {
        if (o.name === "post_FC") {
          element = o;
        }
      });
    }

    if (side === "backCenter") {
      model.traverse((o) => {
        if (o.name === "post_BC") {
          element = o;
        }
      });
    }

    if (side === "centerCenter") {
      model.traverse((o) => {
        if (o.name === "post_C") {
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

  prepareOptions() {
    // this.cloneInObject("heatersFront", 8 * 4);
    // this.cloneInObject("heatersBack", 8 * 4);
    this.cloneInObject("fans", 8 * 4);
    this.cloneInObject("fansBeamX", 8 * 4);
    this.cloneInObject("fansBeamY", 8 * 4);
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

  prepareRoof() {
    const prepareCountBeam = 5;
    const prepareCountLouver =
      Math.ceil(this.getMeters(MORPH_DATA.width.max) / 0.17989) * 5;

    this.cloneRoofObject("headerLed", 1);

    // BEAM
    this.cloneRoofObject("beamX", prepareCountBeam);
    this.cloneRoofObject("beamXLed", prepareCountBeam);

    this.cloneRoofObject("beamY", prepareCountBeam);
    this.cloneRoofObject("beamYLed", prepareCountBeam);

    // LOUVER
    this.cloneRoofObject("louverY", prepareCountLouver);
    this.cloneRoofObject("louverX", prepareCountLouver);

    this.cloneRoofObject("solidRoof", 1);

    this.cloneRoofObject("pointLED", 500);
    this.cloneRoofObject("rampLEDX", 100);
    this.cloneRoofObject("rampLEDY", 100);
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

    console.log(pergola.fans);

    for (let i = 0; i < pergola.fans.length; i++) {
      const elementFan = pergola.fans[i];

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

    //BEAM
    if (type === "beamX") {
      model.traverse((o) => {
        if (o.name === "beam_x") {
          element = o;
          console.log(o, "BEAM");
        }
      });
    }

    if (type === "beamY") {
      model.traverse((o) => {
        if (o.name === "beam_Y") {
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

    if (type === "louverX") {
      model.traverse((o) => {
        if (o.name === "louver_X") {
          element = o;
        }
      });
    }

    if (type === "fans") {
      model.traverse((o) => {
        if (o.name === "fan") {
          element = o;
        }
      });
    }

    if (type === "pointLED") {
      model.traverse((o) => {
        if (o.name === "point-light") {
          element = o;
        }
      });
    }

    if (type === "rampLEDX") {
      model.traverse((o) => {
        if (o.name === "LED_ramp") {
          element = o;
        }
      });
    }
    if (type === "rampLEDY") {
      model.traverse((o) => {
        if (o.name === "LED_ramp_Y") {
          element = o;
        }
      });
    }

    if (type === "heatersFront") {
      model.traverse((o) => {
        if (o.name === "Cube001") {
          element = o;
        }
      });
    }

    if (type === "heatersBack") {
      model.traverse((o) => {
        if (o.name === "Cube004") {
          element = o;
        }
      });
    }

    if (type === "fansBeamX") {
      model.traverse((o) => {
        if (o.name === "beam_x_fan") {
          element = o;
        }
      });
    }

    if (type === "fansBeamY") {
      model.traverse((o) => {
        if (o.name === "beam_Y_fan") {
          element = o;
        }
      });
    }

    if (type === "solidRoof") {
      model.traverse((o) => {
        if (o.name === "solid_roof") {
          element = o;
        }
      });
    }

    if (type === "headerLed") {
      model.traverse((o) => {
        if (o.name === "header_LED") {
          element = o;
        }
      });
    }

    if (type === "beamXLed") {
      model.traverse((o) => {
        if (o.name === "beam_x_LED") {
          element = o;
        }
      });
    }

    if (type === "beamYLed") {
      model.traverse((o) => {
        if (o.name === "beam_Y_LED") {
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

  prepareExtraOptions() {
    const count_fan = 3; // 17;
    const count_heater = 7;
    const count_led = 5; // 17;
    const count_mood = 6; // 18;
    const count_mood_led = 5; // 17;
    const count_light = 103; // 320;

    this.cloneExtraOptionObject(PergolaExtraOptionType.heater, count_heater);
    this.cloneExtraOptionObject(PergolaExtraOptionType.led, count_led);
    this.cloneExtraOptionObject(PergolaExtraOptionType.moodLight, count_mood);
    this.cloneExtraOptionObject(PergolaExtraOptionType.moodLed, count_mood_led);
    this.cloneExtraOptionObject(PergolaExtraOptionType.light, count_light);
    this.cloneExtraOptionObject(PergolaExtraOptionType.fan, count_fan);

    const fanObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.fan
    );
    rotateFans(fanObjects, autoRotateSpeed);
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

  getLastActiveSpan(typeSys) {
    return this.span.objects.filter((span) =>
      span.systems.find((system) => system.active && system.type === typeSys)
    );
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
    const offsetX = -0.15;
    const offsetZ = -0.15; // зміщення по осі Z для Front/Back
    const offsetWidth = 0.159;
    const offsetDepth = 0.315;
    const offsetBackZ = 0;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints(
      offsetX,
      offsetZ
    );

    // const FL_post_point = FL_point.clone().add(
    //   new THREE.Vector3(0, 0, offsetZ) // Зміщуємо тільки по осі Z для фронту
    // );
    // const FR_post_point = FR_point.clone().add(
    //   new THREE.Vector3(offsetX, 0, 0) // Зміщуємо тільки по осі Z для фронту
    // );
    // const RL_post_point = RL_point.clone().add(
    //   new THREE.Vector3(0, 0, -offsetZ) // Зміщуємо тільки по осі Z для задньої частини
    // );
    // const RR_post_point = RR_point.clone().add(
    //   new THREE.Vector3(offsetX, 0, 0) // Зміщуємо тільки по осі Z для задньої частини
    // );

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

  async update() {
    this.changeDimensions(state.width, state.length, state.height);

    if (
      this.lastSettings.roofLouveredRotate != this.settings.roofLouveredRotate
    ) {
      this.changeRoofLouveredRotate(this.settings.roofLouveredRotate);
    }

    this.setPosts();
    this.setRoofBeam();

    this.setLouver();
    this.setSolidRoof();
    this.setOptions();

    this.setSpans();
    this.updateSubsystems();
    this.showAvailableSpans();

    WriteURLParameters();

    InitMorphModel(theModel);
  }

  reset() {
    //this.changeDimensions(8, 8);
  }

  setColor() {}

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

  changeExtraOptions() {
    const fanObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.fan
    );
    const heaterObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.heater
    );
    const fanBeams = this.roof.beams.filter((item) => item.isFanBeam === true);
    const lightObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.light
    );
    const ledObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.led
    );
    const moodLightObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.moodLight
    );
    const moodLedsObjects = this.extraOptions.elements.filter(
      (item) => item.type == PergolaExtraOptionType.moodLed
    );

    this.changeObjectArrayVisibility(false, fanObjects);
    this.changeObjectArrayVisibility(false, heaterObjects);
    this.changeObjectArrayVisibility(false, fanBeams);
    this.changeObjectArrayVisibility(false, ledObjects);
    this.changeObjectArrayVisibility(false, moodLedsObjects);
    this.changeObjectArrayVisibility(false, lightObjects);
    this.changeMoodLightsVisibility(false, moodLightObjects);

    const { framesPoints } = this.getFramesPoints();

    //! FANS
    if (this.settings.extraOptionFan) {
      const { FL_point, FR_point, RL_point } = this.getCornerPoints();
      const { mainBeamQty, leftPoints, frontPoints } = this.getFramesPoints();
      const framesPerGap = (leftPoints.length - 1) / (mainBeamQty + 1);
      const delta = this.settings.beamThickness / framesPerGap;
      const frameWidth = frontPoints[0].distanceTo(frontPoints[1]);
      const frameLength = leftPoints[0].distanceTo(leftPoints[1]) - delta;

      let fanPoints = [];
      let addBeam = false;

      const horiFrameQty = Math.round(this.totalWidth / frameWidth);
      const vertFrameQty = Math.round(this.totalLength / frameLength);
      const vertPoints = generateMidpoints(
        FL_point,
        RL_point,
        vertFrameQty - 1
      );

      if (horiFrameQty > 1) {
        if (vertFrameQty >= 2) {
          const horiPoints = generateCenterMidpoints(
            FL_point,
            FR_point,
            horiFrameQty - 1,
            true
          );
          for (let i = 0; i < vertPoints.length; i++) {
            for (let j = 0; j < horiPoints.length; j++) {
              fanPoints.push(
                new THREE.Vector3(horiPoints[j].x, 0, vertPoints[i].z)
              );
            }
          }
          addBeam = false;
        } else {
          fanPoints.push(new THREE.Vector3(0, 0, 0));
          addBeam = false;
        }
      } else {
        if (vertFrameQty >= 2) {
          const horiPoints = generateMidpoints(
            FL_point,
            FR_point,
            horiFrameQty
          );
          for (let i = 0; i < vertPoints.length; i++) {
            for (let j = 0; j < horiPoints.length; j++) {
              fanPoints.push(
                new THREE.Vector3(horiPoints[j].x, 0, vertPoints[i].z)
              );
            }
          }
          addBeam = false;
        } else {
          fanPoints.push(new THREE.Vector3(0, 0, 0));
          addBeam = true;
        }
      }

      for (let index = 0; index < fanPoints.length; index++) {
        const point = fanPoints[index];

        const fan = this.getAvaliableObjectFromArray(fanObjects);
        fan.object.position.x = point.x;
        fan.object.position.z = point.z;
        this.changeObjectVisibility(true, fan.object);
        fan.active = true;

        if (addBeam) {
          const fanBeam = this.getAvaliableObjectFromArray(fanBeams);
          fanBeam.object.position.x = point.x;
          fanBeam.object.position.z = point.z;
          this.changeObjectVisibility(true, fanBeam.object);
          fanBeam.active = true;
        }
      }

      this.lastSettings.extraOptionLight = this.settings.extraOptionLight;
    }

    //! MOOD LIGHTS
    if (this.settings.extraOptionMoodLight) {
      if (framesPoints.length === 1) {
        this.changeMoodLightParameters(
          moodLightObjects,
          this.settings.colorMoodHex
        );
      } else {
        for (let index = 0; index < framesPoints.length; index++) {
          const point = framesPoints[index];
          const moodLedStrip =
            this.getAvaliableObjectFromArray(moodLedsObjects);
          moodLedStrip.object.position.x = point.x;
          moodLedStrip.object.position.z = point.z;
          moodLedStrip.object.position.y = 0;
          this.changeObjectVisibility(true, moodLedStrip.object);
          moodLedStrip.active = true;
        }
      }
    }

    //! HEATERS
    if (this.settings.extraOptionHeaters) {
      const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();
      const heaterOffset = 0.2;
      const heaterHight = this.totalHeight - 0.3;

      FL_point.x += heaterOffset;
      FL_point.y = heaterHight;
      FL_point.z -= heaterOffset;
      FR_point.x -= heaterOffset;
      FR_point.y = heaterHight;
      FR_point.z -= heaterOffset;
      RL_point.x += heaterOffset;
      RL_point.y = heaterHight;
      RL_point.z += heaterOffset;
      RR_point.x -= heaterOffset;
      RR_point.y = heaterHight;
      RR_point.z += heaterOffset;

      let leftPoints = [];
      let rightPoints = [];
      let frontPoints = [];
      let rearPoints = [];

      if (this.dimensions.length > this.settings.postLengthInterval) {
        leftPoints = generateMidpoints(FL_point, RL_point, 3, false);
        rightPoints = generateMidpoints(FR_point, RR_point, 3, false);
        leftPoints.splice(1, 1);
        rightPoints.splice(1, 1);
      } else {
        leftPoints = generateMidpoints(FL_point, RL_point, 1, false);
        rightPoints = generateMidpoints(FR_point, RR_point, 1, false);
      }

      if (this.dimensions.width > this.settings.postWidthInterval) {
        frontPoints = generateMidpoints(FL_point, FR_point, 3, false);
        rearPoints = generateMidpoints(RL_point, RR_point, 3, false);
        frontPoints.splice(1, 1);
        rearPoints.splice(1, 1);
      } else {
        frontPoints = generateMidpoints(FL_point, FR_point, 1, false);
        rearPoints = generateMidpoints(RL_point, RR_point, 1, false);
      }

      function setHeaters(points, rotationAngle) {
        points.forEach((point) => {
          const heater = this.getAvaliableObjectFromArray(heaterObjects);
          heater.object.position.set(point.x, point.y, point.z);
          heater.object.rotation.y = THREE.MathUtils.degToRad(rotationAngle);
          this.changeObjectVisibility(true, heater.object);
          heater.active = true;
        });
      }

      setHeaters.call(this, leftPoints, 90);
      setHeaters.call(this, rightPoints, -90);
      setHeaters.call(this, frontPoints, 180);
      setHeaters.call(this, rearPoints, 0);

      // this.lastSettings.extraOptionLight = this.settings.extraOptionLight;
    }

    //! LED STRIPS
    if (this.settings.extraOptionLed) {
      for (let index = 0; index < framesPoints.length; index++) {
        const point = framesPoints[index];
        const ledStrip = this.getAvaliableObjectFromArray(ledObjects);
        // console.log("🚀 ~ ledStrip:", ledStrip);
        ledStrip.object.position.x = point.x;
        ledStrip.object.position.z = point.z;
        this.changeObjectVisibility(true, ledStrip.object);
        ledStrip.active = true;
      }
    }

    //! POINTLIGHTS
    if (this.settings.extraOptionLight) {
      const minLightQty = this.getPointLightpositions(8).length;
      const maxLightQty = this.getPointLightpositions(2).length;

      const lightGap = this.settings.extraOptionLightSpacing;

      const lightPoints = this.getPointLightpositions(lightGap);
      const pointY = 2.185;

      for (let i = 0; i < lightPoints.length; i++) {
        const element = lightObjects[i];
        const light = element.object;
        light.position.set(lightPoints[i].x, pointY, lightPoints[i].z);
        // light.children[1].material.emissiveIntensity = 3;
        element.active = true;
        this.changeObjectVisibility(true, light);
      }

      this.lastSettings.extraOptionFan = this.settings.extraOptionFan;
    }
  }

  changeDimensions(width = null, length = null, height = null) {
    const { span_width, span_depth } = this.getSpanPoints();
    let offset = 0;
    let offsetNegative = 0;

    switch (height) {
      case 9:
        offsetNegative = 0.1;
        offset = 0.14;
        break;

      case 10:
        offsetNegative = 0.1;
        offset = 0.28;
        break;

      case 11:
        offsetNegative = 0.1;
        offset = 0.43;
        break;

      case 12:
        offsetNegative = 0.1;
        offset = 0.57;
        break;
    }

    let openZip = this.interpolateValue(
      +state.zipInput,
      1,
      100,
      0 - offsetNegative,
      1 + offset
    );

    const targetValueWidth = ConvertMorphValue(
      width,
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

    const targetValueWidthSystem = ConvertMorphValue(
      span_width - 0.1,
      0.879818,
      4.87655
    );

    const targetValueLengthSystem = ConvertMorphValue(
      span_depth - 0.1,
      0.879818,
      4.87655
    );

    const targetValueWidthFrame = ConvertMorphValue(
      span_width - 0.1,
      0.879106,
      4
    );

    const targetValueLengthFrame = ConvertMorphValue(
      span_depth - 0.1,
      0.879106,
      4
    );

    const targetValueWidthShatters = ConvertMorphValue(
      span_width - 0.1,
      0.879106,
      6
    );

    const targetValueLengthShatters = ConvertMorphValue(
      span_depth - 0.1,
      0.879106,
      6
    );

    const targetValueWidthFixSlats = ConvertMorphValue(
      span_width,
      0.9144,
      3.6576
    );

    const targetValueLengthFixSlats = ConvertMorphValue(
      span_depth,
      0.9144,
      3.6576
    );

    ChangeGlobalMorph("6-8", state.postSize);

    ChangeGlobalMorph("width", targetValueWidth);
    ChangeGlobalMorph("width_wall", targetValueWidth);
    ChangeGlobalMorph("privacy_width", targetValueWidthFixSlats);
    ChangeGlobalMorph("width_shades", targetValueWidthSystem);
    ChangeGlobalMorph("width_sl-doors_frame", targetValueWidthFrame);
    ChangeGlobalMorph("width_bi-doors_frame", targetValueWidthShatters);
    ChangeGlobalMorph("width_fix_shutters_frame", targetValueWidthFrame);
    ChangeGlobalMorph("width_sl-shutters_frame", targetValueWidthShatters);
    ChangeGlobalMorph("width_fix_shutters_frame", targetValueWidthShatters);
    ChangeGlobalMorph("width_bifold_shutters_frame", targetValueWidthShatters);

    ChangeGlobalMorph("lenth", targetValueLength);
    ChangeGlobalMorph("length_wall", targetValueLength);
    ChangeGlobalMorph("privacy_lenth", targetValueLengthFixSlats);
    ChangeGlobalMorph("length_shades_side", targetValueLengthSystem);
    ChangeGlobalMorph("length_sl-doors_frame_side", targetValueLengthFrame);
    ChangeGlobalMorph("length_bi-doors_frame_side", targetValueLengthShatters);
    ChangeGlobalMorph("length_fix_shutters_frame", targetValueLengthShatters);
    ChangeGlobalMorph("length_sl-shutters_frame", targetValueLengthShatters);
    ChangeGlobalMorph(
      "length_bifold_shutters_frame",
      targetValueLengthShatters
    );

    ChangeGlobalMorph("height", targetValueHeight);
    ChangeGlobalMorph("height_shades", targetValueHeight);
    ChangeGlobalMorph("height_shades_side", targetValueHeight);

    ChangeGlobalMorph("close_shades_side", openZip);
    ChangeGlobalMorph("close_shades", openZip);

    // const inputSlidingShutterInput = $("#sl-open-range_wrap");

    // if (inputSlidingShutterInput) {
    //   inputSlidingShutterInput.trigger("click");
    //   console.log("trigger slidi input");
    // }

    // switch (this.settings.postSize) {
    //   case PergolaPostType._4x4:
    //     ChangeGlobalMorph('4"-7"', 0);
    //     break;
    //   case PergolaPostType._7x7:
    //     ChangeGlobalMorph('4"-7"', 1);
    //     break;
    //   default:
    //     break;
    // }

    // let valueTillingX = 1;
    // let valueTillingY = 1;
    // let valueTillingZ = 1;

    // if (height != null) {
    //   this.dimensions.height = height;

    //   const targetValue = ConvertMorphValue(
    //     height,
    //     MORPH_DATA.height.min,
    //     MORPH_DATA.height.max
    //   );
    //   valueTillingY = targetValue;
    //   this.totalHeight = ConvertMorphValueReverse(
    //     targetValue,
    //     MORPH_DATA_SI.height.min,
    //     MORPH_DATA_SI.height.max,
    //     0,
    //     1
    //   );

    //   ChangeGlobalMorph("height", targetValue);

    //   pergolaSettings.width = width;
    //   this.lastSettings.width = this.settings.width;
    // }

    // if (width != null) {
    //   this.dimensions.width = width;

    //   const targetValue = ConvertMorphValue(
    //     width,
    //     MORPH_DATA.width.min,
    //     MORPH_DATA.width.max
    //   );
    //   valueTillingX = targetValue;
    //   // 0.09 => товщина контурної рами;
    //   this.totalWidth =
    //     ConvertMorphValueReverse(
    //       targetValue,
    //       MORPH_DATA_SI.width.min,
    //       MORPH_DATA_SI.width.max,
    //       0,
    //       1
    //     ) - 0.09;

    //   ChangeGlobalMorph("width", targetValue);
    //   ChangeGlobalMorph("width_wall", targetValue);

    //   pergolaSettings.width = width;
    //   this.lastSettings.width = this.settings.width;
    // }

    // if (length != null) {
    //   this.dimensions.length = length;

    //   const targetValue = ConvertMorphValue(
    //     length,
    //     MORPH_DATA.length.min,
    //     MORPH_DATA.length.max
    //   );
    //   valueTillingZ = targetValue;
    //   // 0.09 => товщина контурної рами;
    //   this.totalLength =
    //     ConvertMorphValueReverse(
    //       targetValue,
    //       MORPH_DATA_SI.length.min,
    //       MORPH_DATA_SI.length.max,
    //       0,
    //       1
    //     ) - 0.09;

    //   ChangeGlobalMorph("length", targetValue);
    //   ChangeGlobalMorph("length_wall", targetValue);

    //   pergolaSettings.length = length;
    //   this.lastSettings.length = this.settings.length;
    // }

    // if (length != null && width != null && height != null) {
    //   this.updateWallTilling(
    //     height,
    //     valueTillingX,
    //     valueTillingY,
    //     valueTillingZ
    //   );
    // }
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
      this.dimensions.width > this.settings.postWidthInterval &&
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

  prepareSystems() {
    const qtySpansWidth = 3;
    const qtySpansDepth = 3;

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

    const qtyLeft = 3;
    const qtyRight = qtyLeft;
    const qtyFront = 3;
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
      this.dimensions.width,
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
          this.dimensions.width,
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
      this.dimensions.width > this.settings.postWidthInterval &&
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
      this.dimensions.width > this.settings.postWidthInterval &&
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

  getCornerPoints(xOffset = 0, zOffset = 0) {
    const offsetX = xOffset;
    const offsetZ = zOffset;
    const totalWidth = this.getMeters(state.width);
    const totalDepth = this.getMeters(state.length);

    const lineZback = -totalDepth / 2;
    const lineZfront = totalDepth / 2;

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

    return { FL_point, FR_point, RL_point, RR_point };
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
    this.postFR = null;
    this.postFL = null;
    this.postBL = null;
    this.postBR = null;

    this.leftCenter = [];
    this.rightCenter = [];
    this.backCenter = [];
    this.frontCenter = [];

    this.centerCenter = [];
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
    this.name = "";
    this.beamX = [];
    this.beamY = [];
    this.louverY = [];
    this.louverX = [];
    this.solidRoof = [];

    this.pointLED = [];
    this.rampLEDX = [];
    this.rampLEDY = [];

    this.headerLed = [];
    this.beamXLed = [];
    this.beamYLed = [];
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
  Louvered: 0,
};

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
  heater: 2,
  led: 3,
  moodLight: 4,
  moodLed: 5,
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
    pos_height_center[0].z
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

  console.log(canvas);
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
