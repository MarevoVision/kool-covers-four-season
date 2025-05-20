"use strict";

import { changeURL, initStateFromUrl } from "./customFunctions/paramsURL";

export const BACKGROUND_COLOR = 0xffffff;
export const ENVIRONMENT_MAP = "public/environment/neutral_2.hdr";
export const ENVIRONMENT_MAP_INTENSITY = 1.0;
export const SHADOW_TRANSPARENCY = 0.2;
export const TONE_MAPPING_EXPOSURE = 1;

export const settingsLouver = {
  countLouver: 0,
  width: 0,
  correction: 0,
  morphValueOrigin: 0,
};

export const log = false;
export let pdfImg = { img: "" };
export let pdfImgTop = { img: "" };

//#region URL AND STATE
let isBatchUpdating = false;
const delay = 100;

function triggerCallback() {
  if (isBatchUpdating) {
    return;
  }

  isBatchUpdating = true;

  setTimeout(() => {
    changeURL();
    isBatchUpdating = false;
  }, delay);
}

function createNestedProxy(target) {
  return new Proxy(target, {
    set(target, key, value) {
      target[key] = value;

      triggerCallback();

      return true;
    },

    get(target, key) {
      const value = target[key];
      if (typeof value === "object" && value !== null) {
        if (value instanceof Set) {
          return createSetProxy(value); // STATE PARAM === SET
        } else if (Array.isArray(value)) {
          return createArrayProxy(value); // STATE PARAM === ARRAY
        } else {
          return createNestedProxy(value); // STATE PARAM === ...
        }
      }
      return value;
    },
  });
}

function createSetProxy(set) {
  //DESCRIPTION OWN METHOD FOR PROXY COVER
  return new Proxy(set, {
    get(target, prop) {
      if (prop === "add") {
        return (value) => {
          target.add(value);
          triggerCallback();
          return target;
        };
      }

      if (prop === "delete") {
        return (value) => {
          const result = target.delete(value);
          triggerCallback();
          return result;
        };
      }

      if (prop === "clear") {
        return () => {
          target.clear();
          triggerCallback();
        };
      }

      if (prop === "has") {
        return (value) => {
          const result = target.has(value);
          triggerCallback();
          return result;
        };
      }

      if (prop === "forEach") {
        return (...args) => {
          target.forEach(...args);
          triggerCallback();
        };
      }

      if (prop === "from") {
        return (iterable) => {
          const newSet = Set.from(iterable);
          triggerCallback();
          return newSet;
        };
      }

      // if (prop === "values") {
      //   return () => {
      //     const result = Set.prototype.values.call(target);
      //     triggerCallback();
      //     return result;
      //   };
      // }

      if (prop === "values" || prop === Symbol.iterator) {
        return () => {
          const iterator = target[Symbol.iterator](); // Використовуємо стандартний ітератор
          triggerCallback();
          return iterator;
        };
      }

      return target[prop];
    },

    set(target, prop, value) {
      target[prop] = value;
      triggerCallback();
      return true;
    },
  });
}

function createArrayProxy(array) {
  return new Proxy(array, {
    set(target, key, value) {
      target[key] = value;

      triggerCallback();

      return true;
    },
    get(target, key) {
      if (
        key === "push" ||
        key === "pop" ||
        key === "shift" ||
        key === "unshift" ||
        key === "splice" ||
        key === "filter"
      ) {
        return (...args) => {
          const result = Array.prototype[key].apply(target, args);
          triggerCallback();
          return result;
        };
      }
      return target[key];
    },
  });
}

export const stateForProxy = {
  typePergola: 0,
  roofType: 0,
  postSize: 0,
  directionRoof: 0,
  roofColorType: 0,
  currentRotationZ: 90,
  isRotated: false,
  height: 9,
  length: 10,
  width: 10,
  postWidthInterval: 23.5,
  postDepthInterval: 23.5,
  louverInterval: 16.5,
  backWall: false,
  leftWall: false,
  rightWall: false,
  colorRoof: "#000000",
  colorBody: "#000000",
  colorLed: "#FFFFFF",
  electro: new Set(),
  dayMode: true,
  recessedLighting: 4,
  currentSubSystem: [],
  fanAvatarHeight: 0.4,
  fanAvatarWidth: 0.8,
  portalOption: 0,
  subSystem: new Set(),
  subSystemUrl: new Set(),
  fans: false,
  heaters: false,
  moodLight: false,
  ledLights: false,
  slatsSize: false,
  lastSpan: null,
  zipInput: 0,
  slidingDoorInput: 0,
  type3Dmodel: 0,
  slidingShuttersInput: 0,
  slidingShuttersRotate: 0,
  slidingFixShuttersRotate: 0,
  biFoldDoorShattersInput: 0,
  biFoldDoorShattersRotate: 0,
  midPointForScreenZ: 0,
  midPointForScreenX: 0,
  transparency: "10",
  colorZip: "#000000",
  currentActiveSystems: null,
  imgForPdf: null,
};

export const state = new Proxy(stateForProxy, {
  get(target, key) {
    const value = target[key];
    if (key === "currentActiveSystems") {
      console.log(value);
    }
    if (typeof value === "object" && value !== null) {
      if (value instanceof Set) {
        return createSetProxy(value); // COVER FOR SET
      } else if (Array.isArray(value)) {
        return createArrayProxy(value); // COVER FOR ARRAY
      } else {
        return createNestedProxy(value); // COVER FOR ANOTHER ...
      }
    }
    return value;
  },

  set(target, key, value) {
    target[key] = value;

    triggerCallback();

    return true;
  },
});

window.state = state;

await initStateFromUrl();
//#endregion

export const MODEL_PATHS = ["public/models/hide_away_01.glb"];

export const MODEL_CENTER_POSITION = -1;

export const DATA_CONCTRUCTION = {
  widthToPillar: 44, // inch
  depthToPillar: 24, // inch
  roofGlassWidthMin: 100 / 2.54, // inch
  roofGlassWidthMax: 150 / 2.54, // inch
};

export const MORPH_DATA = {
  width: {
    min: 4,
    initValue: state.width,
    max: 60,
  },
  length: {
    min: 4,
    initValue: state.length,
    max: 60,
  },
  height: {
    min: 8,
    initValue: state.height,
    max: 12,
  },
};

export const MORPH_DATA_SI = {
  width: {
    min: 1.21,
    max: 12.1844,
  },
  length: {
    min: 1.21,
    max: 12.1844,
  },
  height: {
    min: 2.65,
    max: 4.57,
  },
  frameWidth: {
    min: 1.21,
    max: 18.28,
  },
  frameLength: {
    min: 1.21,
    max: 18.28,
  },
  louverLength: {
    min: 1.67,
    max: 4.26,
  },
};

export const WALL_OFFSETS = {
  height_8: {
    sideWallOffsetY: 0,
    backWallOffsetY: 0,
  },
  height_9: {
    sideWallOffsetY: 0.0217,
    backWallOffsetY: 0.4015,
  },
  height_10: {
    sideWallOffsetY: 0.045,
    backWallOffsetY: 0.4965,
  },
  height_11: {
    sideWallOffsetY: 0.067,
    backWallOffsetY: 0.513,
  },
  height_12: {
    sideWallOffsetY: 0.09,
    backWallOffsetY: 0.5315,
  },
  height_13: {
    sideWallOffsetY: 0.035,
    backWallOffsetY: 0.5485,
  },
  height_14: {
    sideWallOffsetY: 0.0575,
    backWallOffsetY: 0.566,
  },
  height_15: {
    sideWallOffsetY: 0.0035,
    backWallOffsetY: 0.2,
  },
};

console.log(state);
