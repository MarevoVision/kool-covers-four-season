import $ from "jquery";
import * as THREE from "three";
import { typePortalOption } from "../../components/portal/portals";
import {
    ChangeGlobalMorph,
    ConvertMorphValue,
    ConvertMorphValueReverse,
    generateMidpoints,
    GetGroup,
    GetMesh,
    modelForExport,
    ParseMorphByModel,
} from "../3d-configurator";
import { getMobileOperatingSystem } from "../3d-scene";
import { objectForRaycast, raycastItem } from "../raycast";
import { state } from "../settings";
import {
    changeColorAndTexture,
    clearClones,
    columnClonesBottom,
    columnClonesLeft,
    columnClonesRight,
    columnClonesTop,
    getMeters,
    screensClonesBottom,
    screensClonesLeft,
    screensClonesRight,
    screensClonesTop,
    stepForColumn,
} from "./customFunctions";
import {
    createHotspot,
    hotspots,
    setHotspotVisibility,
} from "./subSystemHeaters";
const spanColor = "#997A4F";

export let lastScreenForRemove = {
  last: null,
};
export const spansScreen = [];

export class PergolaSpan {
  constructor() {
    this.objects = [];
  }
}

export class PergolaSpanObject {
  constructor() {
    this.side = null;
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
    this.heaters = null;
    this.subSystem = null;

    this.isHeater = false;
    this.isScreen = false;
    this.isShades = false;
  }
}

const spanGeometry = new THREE.BoxGeometry(1, 1, 1);
const spanMaterial = new THREE.MeshBasicMaterial({
  color: spanColor,
  transparent: true,
  opacity: 0,
});

export const makeSpanBySideScreen = (side, qty) => {
  for (let i = 0; i < qty; i++) {
    const span = new PergolaSpanObject();
    span.side = side;

    const spanAvatar = new THREE.Mesh(spanGeometry, spanMaterial);
    spanAvatar.position.set(span.posX, span.posY, span.posZ);
    spanAvatar.visible = false;

    spanAvatar.perentSpan = span;
    spanAvatar.name = `avatar_screen_${i}`;

    const original = GetGroup("screen_wall_X");
    const originalShades = GetGroup("shades_X");

    if (side === "top" || side === "bottom") {
      span.prepareScreens = [];
      span.prepareShades = [];

      for (let i = 0; i < 6; i++) {
        const clone = original.clone();

        clone.position.set(0, 0, 0);
        clone.visible = false;
        clone.name = `clone_screen_${side}_${i}`;

        clone.renderOrder = 1;

        changeColorAndTexture(clone.children[1]);
        modelForExport.add(clone);

        const screenData = {
          screen: clone,
          isActive: false,
        };

        span.prepareScreens.push(screenData);
      }

      for (let i = 0; i < 5; i++) {
        const clone = originalShades.clone();

        clone.position.set(0, 0, 0);
        clone.visible = false;
        clone.name = `clone_shades_${side}_${i}`;

        clone.renderOrder = 1;

        clone.children[1].material.depthWrite = true;
        clone.children[1].material.transparent = true;
        clone.children[1].material.alphaTest = 0.5;

        modelForExport.add(clone);

        const shadesData = {
          shade: clone,
          isActive: false,
          morphValue: state.zipInput,
        };

        span.prepareShades.push(shadesData);
      }

      ParseMorphByModel(modelForExport);
    }

    const originalZ = GetGroup("screen_wall_Y");
    const originalShadesZ = GetGroup("shades_Y");

    if (side === "left" || side === "right") {
      span.prepareScreensZ = [];
      span.prepareShadesZ = [];

      for (let i = 0; i < 6; i++) {
        const clone = originalZ.clone();

        clone.position.set(0, 0, 0);
        clone.visible = false;
        clone.name = `clone_screen_${side}_${i}`;

        clone.renderOrder = 1;

        changeColorAndTexture(clone.children[1]);
        modelForExport.add(clone);

        const screenData = {
          screen: clone,
          isActive: false,
        };

        span.prepareScreensZ.push(screenData);
      }

      for (let i = 0; i < 5; i++) {
        const clone = originalShadesZ.clone();

        clone.position.set(0, 0, 0);
        clone.visible = false;
        clone.name = `clone_shades_${side}_${i}`;

        // clone.children[1].material.transparent = true;
        clone.renderOrder = 1;

        clone.children[1].material.depthWrite = true; // Стандартний режим для непрозорих стін
        clone.children[1].material.transparent = true; // Якщо потрібно
        clone.children[1].material.alphaTest = 0.5;

        modelForExport.add(clone);

        const shadesData = {
          shadeZ: clone,
          isActiveZ: false,
          morphValue: state.zipInput,
        };

        span.prepareShadesZ.push(shadesData);
      }

      ParseMorphByModel(modelForExport);
    }

    modelForExport.add(spanAvatar);
    span.avatar = spanAvatar;
    span.hotspot = createHotspot(
      `span_screen-shades_hotspot_${side}_${i}`,
      "public/img/icons/sub.svg",
      "public/img/icons/hover-sub.svg",
      new THREE.Vector3(0, 0, 0),
      "subsystems"
    );
    setHotspotVisibility(span.hotspot, false);
    hotspots.push(span.hotspot);

    const subsystems = [];

    if (subsystems.length > 0) {
      span.systems.push(...subsystems);
    }

    spansScreen.push(span);
  }
};

export function resetSpansScreen() {
  const spans = spansScreen;
  for (let i = 0; i < spans.length; i++) {
    spans[i].avatar.visible = false;
    spans[i].active = false;
    spans[i].isLocked = false;
  }
}

export function resetSpansActiveScreen() {
  const spans = spansScreen;
  for (let i = 0; i < spans.length; i++) {
    spans[i].isScreen = false;
  }
}

export function resetSpansActiveShades() {
  const spans = spansScreen;
  for (let i = 0; i < spans.length; i++) {
    spans[i].isShades = false;
  }
}

function getSpanScreen(side) {
  const spans = spansScreen;

  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    if (span.side === side && !span.isLocked) {
      span.isLocked = true;
      return span;
    }
  }

  return null;
}

export function showAvailableSpansScreen() {
  if (state.currentSubSystem !== null) {
    const spans = spansScreen;
    for (let i = 0; i < spans.length; i++) {
      setHotspotVisibility(spans[i].hotspot, spans[i].active);
    }
  }
}

export function setSpansScreen() {
  const lengthCondition = state.length >= stepForColumn * 2;
  const widthCondition = state.width >= stepForColumn * 2;
  const { RL_point, RR_point, FL_point, FR_point } = pergola.getCornerPoints(
    state.width,
    state.length
  );

  let countPointLenght = 1;
  let countPointWidth = 1;
  let partWidth = 1;
  let partLenght = 1;

  if (state.length >= stepForColumn) {
    countPointLenght = 3;
    partLenght = 2;
  }

  if (state.width >= stepForColumn) {
    countPointWidth = 3;
    partWidth = 2;
  }

  if (state.length >= stepForColumn * 2) {
    countPointLenght = 5;
    partLenght = 3;
  }

  if (state.width >= stepForColumn * 2) {
    countPointWidth = 5;
    partWidth = 3;
  }

  const leftSideCount = generateMidpoints(RL_point, FL_point, countPointLenght);
  const rightSideCount = generateMidpoints(
    RR_point,
    FR_point,
    countPointLenght
  );
  const bottomSideCount = generateMidpoints(
    RL_point,
    RR_point,
    countPointWidth
  );
  const topSideCount = generateMidpoints(FL_point, FR_point, countPointWidth);

  const left_span_points = !lengthCondition
    ? [leftSideCount[0], leftSideCount[leftSideCount.length - 1]]
    : [leftSideCount[0], leftSideCount[2], leftSideCount[4]];
  const right_span_points = !lengthCondition
    ? [rightSideCount[0], rightSideCount[rightSideCount.length - 1]]
    : [rightSideCount[0], rightSideCount[2], rightSideCount[4]];

  const bottom_span_points = !widthCondition
    ? [bottomSideCount[0], bottomSideCount[bottomSideCount.length - 1]]
    : [bottomSideCount[0], bottomSideCount[4], bottomSideCount[2]];
  const top_span_points = !widthCondition
    ? [topSideCount[0], topSideCount[topSideCount.length - 1]]
    : [topSideCount[0], topSideCount[2], topSideCount[4]];

  clearClones(modelForExport, screensClonesBottom);
  clearClones(modelForExport, columnClonesBottom);

  clearClones(modelForExport, screensClonesLeft);
  clearClones(modelForExport, columnClonesLeft);

  clearClones(modelForExport, screensClonesTop);
  clearClones(modelForExport, columnClonesTop);

  clearClones(modelForExport, screensClonesRight);
  clearClones(modelForExport, columnClonesRight);

  spansScreen &&
    spansScreen.forEach((span) => {
      span.prepareScreens &&
        span.prepareScreens.forEach((data) => {
          data.screen.visible = false;

          data.screen.children.forEach((child) => {
            child.visible = false;
          });
        });

      span.prepareScreensZ &&
        span.prepareScreensZ.forEach((data) => {
          data.screen.visible = false;

          data.screen.children.forEach((child) => {
            child.visible = false;
          });
        });

      span.prepareShades &&
        span.prepareShades.forEach((data) => {
          data.shade.visible = false;

          data.shade.children.forEach((child) => {
            child.visible = false;
          });
        });

      span.prepareShadesZ &&
        span.prepareShadesZ.forEach((data) => {
          data.shadeZ.visible = false;

          data.shadeZ.children.forEach((child) => {
            child.visible = false;
          });
        });
    });

  resetSpansScreen();

  const height = state.height * 0.0254;
  const screenHeight = getMeters(state.height);
  const avatarDeep = 0.08;
  const heightOffsetAvatar = getMeters(state.height) / 2;
  const heightSpan = -1;
  const widthAvatar = getMeters((state.width - 0.5) / partWidth) + 0.12;
  const widthAvatarSecond = getMeters((state.width - 0.5) / partWidth);
  const lenghtAvatar = getMeters((state.length - 0.5) / partLenght) + 0.2;
  const lenghtAvatarSecond =
    getMeters((state.length - 0.5) / partLenght) - 0.04;

  const configureSpan = (
    points,
    side = "left",
    width = 1.5,
    thickness = 0.1,
    ySpan,
    yAvatar
  ) => {
    points.forEach((point, index) => {
      const span = getSpanScreen(side);

      if (!span) {
        return;
      }

      span.active = span.isScreen || span.isShades ? false : true;

      if (span.side === "left" && state.leftWall) {
        spansScreen
          .filter((span) => span.side === "left")
          .map((span) => {
            span.isScreen = false;
            span.active = false;
          });
      }

      if (span.side === "right" && state.rightWall) {
        spansScreen
          .filter((span) => span.side === "right")
          .map((span) => {
            span.isScreen = false;
            span.active = false;
          });
      }

      if (span.side === "top" && state.backWall) {
        spansScreen
          .filter((span) => span.side === "top")
          .map((span) => {
            span.isScreen = false;
            span.active = false;
          });
      }

      if (!span.isLocked) {
        span.isSystemSet = false;
        span.systems.forEach((system) => {
          system.active = false;
          setHotspotVisibility(span.hotspot, false);
        });
      }

      span.posX = point.x;
      span.posZ = point.z;
      span.width = width;
      span.height = height;

      let offsetX = 0;
      let offsetZ = 0;

      if (side === "left" || side === "right") {
        if (side === "left") {
          offsetX = avatarDeep;
        } else {
          offsetX = -avatarDeep;
        }
      }

      if (side === "bottom" || side === "top") {
        if (side === "bottom") {
          offsetZ = -avatarDeep;
        } else {
          offsetZ = avatarDeep;
        }
      }

      span.avatar.position.set(
        span.posX + offsetX,
        yAvatar,
        span.posZ + offsetZ
      );

      span.avatar.scale.set(
        side === "left" || side === "right" ? thickness : width,
        screenHeight,
        side === "left" || side === "right" ? width + 0.1 : thickness
      );
      span.avatar.visible = false;

      span.isLocked &&
        span.hotspot.position.set(span.posX, ySpan, span.posZ + offsetZ);

      //#region LOGIC SCREENS
      const column = GetMesh("Body3");

      switch (side) {
        case "top":
        case "bottom":
          const morphValueBottom = ConvertMorphValue(state.width, 6, 40);
          const morphValueShadeBottom = ConvertMorphValue(
            (state.width - 0.5) / partWidth,
            6,
            stepForColumn
          );
          const offsetPostSizeBottom = 0.2;
          const widthScreenBottom = getMeters(
            ConvertMorphValueReverse(morphValueBottom, 2.5, 4)
          );
          const countColumnBottom =
            Math.round(widthAvatar / widthScreenBottom) - 1;
          const centerBottom = span.avatar.position.x;
          const startAvatarBottom =
            centerBottom + (widthAvatar - offsetPostSizeBottom) / 2;

          const endAvatarBottom =
            centerBottom - (widthAvatar - offsetPostSizeBottom) / 2;

          const startVectorBottom = new THREE.Vector3(
            startAvatarBottom,
            span.avatar.position.y,
            span.avatar.position.z
          );
          const endVectorBottom = new THREE.Vector3(
            endAvatarBottom,
            span.avatar.position.y,
            span.avatar.position.z
          );
          const pointForColumnBottom = generateMidpoints(
            startVectorBottom,
            endVectorBottom,
            countColumnBottom,
            true
          ).slice(1, -1);

          const pointForScreenBottom = generateMidpoints(
            startVectorBottom,
            endVectorBottom,
            countColumnBottom,
            true
          ).slice(0, -1);

          let correctMorphBottom = 0;
          let correctOffsetBottom = 0;
          let correctMorphForShade = 0;
          let correctOffsetForShade = 0;

          const differentWidthBottom =
            widthAvatar - ((countColumnBottom - 1) * widthScreenBottom + 0.16);

          if (state.width <= stepForColumn) {
            if (differentWidthBottom >= 1 && differentWidthBottom <= 1.4) {
              correctMorphBottom = state.initValuePostSize.includes("4")
                ? 0.16
                : -0.06;
              correctOffsetBottom = -0.05;
            }

            if (differentWidthBottom >= 1.4 && differentWidthBottom <= 1.46) {
              correctMorphBottom = -0.03;
              correctOffsetBottom = -0.08;
            }

            if (differentWidthBottom >= 1.455 && differentWidthBottom <= 1.67) {
              correctMorphBottom = state.initValuePostSize.includes("4")
                ? 0.3
                : 0.13;
              correctOffsetBottom = -0.01;
            }

            if (differentWidthBottom >= 1.68 && differentWidthBottom <= 1.94) {
              correctMorphBottom = state.initValuePostSize.includes("4")
                ? 0.4
                : 0.33;
              correctOffsetBottom = 0.02;
            }

            if (differentWidthBottom === 1.8212000000000002) {
              correctMorphBottom = 0.57;
              correctOffsetBottom = 0.06;
            }

            if (differentWidthBottom === 1.9198117647058823) {
              correctMorphBottom = 0.56;
              correctOffsetBottom = 0.02;
            }

            if (differentWidthBottom >= 2 && differentWidthBottom <= 2.99) {
              correctMorphBottom = 0.43;
              correctOffsetBottom = -0.01;
            }

            if (differentWidthBottom === 2.1394470588235293) {
              correctMorphBottom = 0.5;
              correctOffsetBottom = 0.02;
            }
            if (differentWidthBottom === 1.8615411764705883) {
              correctMorphBottom = 0.35;
              correctOffsetBottom = -0.01;
            }
          }

          if (state.width > stepForColumn && state.width <= stepForColumn * 2) {
            const specificValues = {
              1.538811764705882: { morph: 0.2, offset: -0.04 },
              1.6643176470588235: { morph: 0.2, offset: -0.04 },
              1.8212000000000002: { morph: 0.33, offset: 0.06 },
              1.8660235294117653: { morph: 0.2, offset: -0.037 },
              1.9780823529411764: {
                morph: !state.model ? 0.33 : 0.2,
                offset: -0.05,
              },
              2.0901411764705875: { morph: 0.3, offset: -0.06 },
              2.1394470588235297: { morph: 0.6, offset: -0.01 },
              2.2784000000000004: { morph: 0.63, offset: 0.025 },
              2.2918470588235293: { morph: 0.4, offset: 0.01 },
              2.417352941176471: { morph: 0.65, offset: 0.054 },
              2.4173529411764707: { morph: 0.5, offset: 0.01 },
              1.7898235294117648: { morph: 0.2, offset: -0.04 },
              2.5428588235294116: { morph: 0.5, offset: 0.03 },
              2.105082352941176: { morph: 0.1, offset: -0.05 },
              2.668364705882353: { morph: 0.6, offset: 0.035 },
              2.6340000000000003: { morph: 0.5, offset: 0.013 },
              2.7938705882352943: { morph: 0.7, offset: 0.035 },
              2.9193764705882357: { morph: 0.7, offset: 0.065 },
              2.000494117647059: { morph: 0.45, offset: -0.01 },
            };

            if (specificValues[differentWidthBottom]) {
              correctMorphBottom = specificValues[differentWidthBottom].morph;
              correctOffsetBottom = specificValues[differentWidthBottom].offset;
            } else {
              if (differentWidthBottom >= 1 && differentWidthBottom <= 1.4) {
                correctMorphBottom = -0.06;
                correctOffsetBottom = -0.05;
              } else if (
                differentWidthBottom >= 1.4 &&
                differentWidthBottom <= 1.46
              ) {
                correctMorphBottom = -0.05;
                correctOffsetBottom = -0.08;
              } else if (
                differentWidthBottom >= 1.455 &&
                differentWidthBottom <= 1.67
              ) {
                correctMorphBottom = 0.1;
                correctOffsetBottom = -0.05;
              } else if (
                differentWidthBottom >= 1.68 &&
                differentWidthBottom <= 1.94
              ) {
                correctMorphBottom = 0.27;
                correctOffsetBottom = -0.03;
              } else if (
                differentWidthBottom >= 2 &&
                differentWidthBottom <= 2.99
              ) {
                correctMorphBottom = 0.35;
                correctOffsetBottom = -0.01;
              }
            }
          }

          if (state.width > stepForColumn * 2) {
            const morphOffsets = {
              2.193235294117647: { morph: 0.14, offset: -0.04 },
              2.281388235294118: { morph: 0.22, offset: -0.04 },
              2.3695411764705883: { morph: 0.3, offset: -0.04 },
              2.4576941176470593: { morph: 0.3, offset: 0.01 },
              2.54584705882353: { morph: 0.3, offset: 0.01 },
              2.6340000000000003: { morph: 0.37, offset: 0.01 },
            };

            if (morphOffsets[differentWidthBottom]) {
              correctMorphBottom = morphOffsets[differentWidthBottom].morph;
              correctOffsetBottom = morphOffsets[differentWidthBottom].offset;
            }
          }

          //#region CORRECT SHADE
          if (!state.model) {
            const morphOffsets = {
              6: { morph: 0.07, offset: 0 },
              7: { morph: 0.05, offset: 0 },
              8: { morph: 0.03, offset: 0 },
              9: { morph: 0, offset: 0 },
              10: { morph: -0.02, offset: 0 },
              11: { morph: -0.04, offset: 0 },
              12: { morph: -0.065, offset: 0 },
              13: { morph: -0.08, offset: 0 },
              14: { morph: -0.11, offset: 0 },
              15: { morph: -0.13, offset: 0 },
              16: { morph: -0.15, offset: 0 },
              17: { morph: 0.03, offset: 0 },
              18: { morph: 0.02, offset: 0 },
              20: { morph: 0, offset: 0 },
              21: { morph: -0.015, offset: 0 },
              22: { morph: -0.02, offset: 0 },
              23: { morph: -0.03, offset: 0 },
              24: { morph: -0.04, offset: 0 },
              25: { morph: -0.05, offset: 0 },
              26: { morph: -0.06, offset: 0 },
              27: { morph: -0.07, offset: 0 },
              28: { morph: -0.08, offset: 0 },
              29: { morph: -0.09, offset: 0 },
              30: { morph: -0.1, offset: 0 },
              31: { morph: -0.11, offset: 0 },
              32: { morph: -0.12, offset: 0 },
              33: { morph: -0.145, offset: 0 },
              34: { morph: -0.03, offset: 0 },
              35: { morph: -0.04, offset: 0 },
              36: { morph: -0.05, offset: 0 },
              37: { morph: -0.06, offset: 0 },
              38: { morph: -0.07, offset: 0 },
              39: { morph: -0.08, offset: 0 },
              40: { morph: -0.09, offset: 0 },
            };

            if (morphOffsets[state.width]) {
              correctMorphForShade = morphOffsets[state.width].morph;
              correctOffsetForShade = morphOffsets[state.width].offset;
            }
          } else {
            const morphOffsets = {
              6: {
                morph: state.initValuePostSize.includes("4") ? 0.09 : 0.07,
                offset: 0,
              },
              7: {
                morph: state.initValuePostSize.includes("4") ? 0.08 : 0.095,
                offset: 0,
              },
              8: { morph: 0.09, offset: 0 },
              9: { morph: 0.1, offset: 0 },
              10: { morph: 0.09, offset: 0 },
              11: { morph: 0.07, offset: 0 },
              12: { morph: 0.07, offset: 0 },
              13: { morph: 0.07, offset: 0 },
              14: { morph: 0.07, offset: 0 },
              15: { morph: 0.07, offset: 0 },
              16: { morph: 0.07, offset: 0 },
              17: { morph: 0.05, offset: 0 },
              18: { morph: 0.05, offset: 0 },
              19: { morph: 0.05, offset: 0 },
              20: { morph: 0.07, offset: 0 },
              21: { morph: 0.07, offset: 0 },
              22: { morph: 0.07, offset: 0 },
              23: { morph: 0.07, offset: 0 },
              24: { morph: 0.07, offset: 0 },
              25: { morph: 0.07, offset: 0 },
              26: { morph: 0.07, offset: 0 },
              27: { morph: 0.07, offset: 0 },
              28: { morph: 0.07, offset: 0 },
              29: { morph: 0.06, offset: 0 },
              30: { morph: 0.06, offset: 0 },
              31: { morph: 0.055, offset: 0 },
              32: { morph: 0.055, offset: 0 },
              33: { morph: 0.05, offset: 0 },
              34: { morph: 0.05, offset: 0 },
              35: { morph: 0.05, offset: 0 },
              36: { morph: 0.05, offset: 0 },
              37: { morph: 0.05, offset: 0 },
              38: { morph: 0.05, offset: 0 },
              39: { morph: 0.045, offset: 0 },
              40: {
                morph: state.initValuePostSize.includes("4") ? 0.06 : 0.045,
                offset: 0,
              },
            };

            if (morphOffsets[state.width]) {
              correctMorphForShade = morphOffsets[state.width].morph;
              correctOffsetForShade = morphOffsets[state.width].offset;
            }
          }
          //#endregion

          const screenWidth = widthAvatar / (pointForColumnBottom.length + 1);

          const minWidth = 0.762;
          const maxWidth = 1.2192;

          const screenMorphWidth = ConvertMorphValue(
            screenWidth,
            minWidth,
            maxWidth
          );

          console.log(differentWidthBottom);
          ChangeGlobalMorph("width_screen_wall", screenMorphWidth);
          ChangeGlobalMorph(
            "width_shades_X",
            morphValueShadeBottom + correctMorphForShade
          );

          const columnsBottom = [];
          const screensBottom = [];
          const shadesBottom = [];

          //columns
          pointForColumnBottom.forEach((point, index) => {
            const cloneColumnScreenBottom = column.clone();
            cloneColumnScreenBottom.position.set(point.x, 0, point.z);
            cloneColumnScreenBottom.name = `clone_column_bottom_${index}`;
            modelForExport.add(cloneColumnScreenBottom);
            columnsBottom.push(cloneColumnScreenBottom);
            columnClonesBottom.push(cloneColumnScreenBottom);

            if (span.isScreen) {
              cloneColumnScreenBottom.visible = true;
            }
          });

          //screens
          pointForScreenBottom.forEach((point, index) => {
            if (span.prepareScreens[index]) {
              const { screen, isActive } = span.prepareScreens[index];

              screen.position.set(
                point.x - widthScreenBottom / 2 - correctOffsetBottom,
                0,
                point.z
              );

              screensBottom.push(screen);

              if (span.isScreen) {
                screen.visible = true;
                screen.children.forEach((child) => {
                  child.visible = true;
                });
              }
            }
          });

          //#region SHADES
          let correctMorphForShadeHightBottom = 0;

          const morphOffsetsBottom = {
            8: { morph: 0, offset: 0 },
            9: { morph: 0.12, offset: 0 },
            10: { morph: 0.26, offset: 0 },
            11: { morph: 0.38, offset: 0 },
            12: { morph: 0.52, offset: 0 },
          };

          if (morphOffsetsBottom[state.height]) {
            correctMorphForShadeHightBottom =
              morphOffsetsBottom[state.height].morph;
          }

          let baseMorphBottom = ConvertMorphValue(
            state.zipInput,
            1,
            90,
            0,
            1 + correctMorphForShadeHightBottom
          );

          if (span.prepareShades[index]) {
            const { shade, isActive, morphValue } = span.prepareShades[index];
            const zPos = side === "top" ? point.z + 0.05 : point.z - 0.02;

            shade.position.set(point.x - correctOffsetForShade, 0, zPos);

            shadesBottom.push(shade);

            ChangeGlobalMorph("close", baseMorphBottom);

            if (span.isShades) {
              shade.visible = true;
              shade.children.forEach((child) => {
                child.visible = true;
              });
            }
          }
          //#endregion

          objectForRaycast.push(span);

          span.columns = columnsBottom;
          span.screens = screensBottom;
          span.shades = shadesBottom;

          break;

        case "right":
        case "left":
          const morphValueLeft = ConvertMorphValue(state.length, 6, 40);
          const morphValueShadeLeft = ConvertMorphValue(
            (state.length - 0.5) / partLenght,
            6,
            stepForColumn
          );
          const offsetPostSizeLeft = 0.2;
          const widthScreenLeft = getMeters(
            ConvertMorphValueReverse(morphValueLeft, 2.5, 4)
          );
          const countColumnLeft =
            Math.round(lenghtAvatar / widthScreenLeft) - 1;
          const centerLeft = span.avatar.position.z;
          const startAvatarLeft =
            centerLeft + (lenghtAvatar - offsetPostSizeLeft) / 2;
          const endAvatarLeft =
            centerLeft - (lenghtAvatar - offsetPostSizeLeft) / 2;
          const startVectorLeft = new THREE.Vector3(
            span.avatar.position.x,
            span.avatar.position.y,
            startAvatarLeft
          );
          const endVectorLeft = new THREE.Vector3(
            span.avatar.position.x,
            span.avatar.position.y,
            endAvatarLeft
          );
          const pointForColumnLeft = generateMidpoints(
            startVectorLeft,
            endVectorLeft,
            countColumnLeft,
            true
          ).slice(1, -1);
          const pointForScreenLeft = generateMidpoints(
            startVectorLeft,
            endVectorLeft,
            countColumnLeft,
            true
          ).slice(0, -1);

          let correctMorphLeft = 0;
          let correctOffsetLeft = 0;
          let correctMorphForShadeLeft = 0;
          let correctOffsetForShadeLeft = 0;

          const differentWidthLeft =
            lenghtAvatar - ((countColumnLeft - 1) * widthScreenLeft + 0.16);

          if (state.length <= stepForColumn) {
            if (differentWidthLeft >= 1 && differentWidthLeft <= 1.4) {
              correctMorphLeft = state.initValuePostSize.includes("4")
                ? 0.16
                : -0.06;
              correctOffsetLeft = -0.05;
            }

            if (differentWidthLeft >= 1.4 && differentWidthLeft <= 1.46) {
              correctMorphLeft = -0.03;
              correctOffsetLeft = -0.08;
            }

            if (differentWidthLeft >= 1.455 && differentWidthLeft <= 1.67) {
              correctMorphLeft = state.initValuePostSize.includes("4")
                ? 0.3
                : 0.13;
              correctOffsetLeft = -0.01;
            }

            if (differentWidthLeft >= 1.68 && differentWidthLeft <= 1.94) {
              correctMorphLeft = state.initValuePostSize.includes("4")
                ? 0.4
                : 0.33;
              correctOffsetLeft = 0.02;
            }

            if (differentWidthLeft === 1.8212000000000002) {
              correctMorphLeft = 0.57;
              correctOffsetLeft = 0.06;
            }

            if (differentWidthLeft === 1.9198117647058823) {
              correctMorphLeft = 0.56;
              correctOffsetLeft = 0.02;
            }

            if (differentWidthLeft >= 2 && differentWidthLeft <= 2.99) {
              correctMorphLeft = 0.43;
              correctOffsetLeft = -0.01;
            }

            if (differentWidthLeft === 2.1394470588235293) {
              correctMorphLeft = 0.5;
              correctOffsetLeft = 0.02;
            }
            if (differentWidthLeft === 1.8615411764705883) {
              correctMorphLeft = 0.35;
              correctOffsetLeft = -0.01;
            }
          }

          if (
            state.length > stepForColumn &&
            state.length <= stepForColumn * 2
          ) {
            const specificValues = {
              1.538811764705882: { morph: 0.2, offset: -0.04 },
              1.6643176470588235: { morph: 0.2, offset: -0.04 },
              1.8212000000000002: { morph: 0.33, offset: 0.06 },
              1.8660235294117653: { morph: 0.2, offset: -0.037 },
              1.9780823529411764: {
                morph: !state.model ? 0.33 : 0.2,
                offset: -0.05,
              },
              2.0901411764705875: { morph: 0.3, offset: -0.06 },
              2.1394470588235297: { morph: 0.6, offset: -0.01 },
              2.2784000000000004: { morph: 0.63, offset: 0.025 },
              2.2918470588235293: { morph: 0.4, offset: 0.01 },
              2.417352941176471: { morph: 0.65, offset: 0.054 },
              2.4173529411764707: { morph: 0.5, offset: 0.01 },
              1.7898235294117648: { morph: 0.2, offset: -0.04 },
              2.5428588235294116: { morph: 0.5, offset: 0.03 },
              2.105082352941176: { morph: 0.1, offset: -0.05 },
              2.668364705882353: { morph: 0.6, offset: 0.035 },
              2.6340000000000003: { morph: 0.5, offset: 0.013 },
              2.7938705882352943: { morph: 0.7, offset: 0.035 },
              2.9193764705882357: { morph: 0.7, offset: 0.065 },
              2.000494117647059: { morph: 0.45, offset: -0.01 },
            };

            if (specificValues[differentWidthLeft]) {
              correctMorphLeft = specificValues[differentWidthLeft].morph;
              correctOffsetLeft = specificValues[differentWidthLeft].offset;
            } else {
              if (differentWidthLeft >= 1 && differentWidthLeft <= 1.4) {
                correctMorphLeft = -0.06;
                correctOffsetLeft = -0.05;
              } else if (
                differentWidthLeft >= 1.4 &&
                differentWidthLeft <= 1.46
              ) {
                correctMorphLeft = -0.05;
                correctOffsetLeft = -0.08;
              } else if (
                differentWidthLeft >= 1.455 &&
                differentWidthLeft <= 1.67
              ) {
                correctMorphLeft = 0.1;
                correctOffsetLeft = -0.05;
              } else if (
                differentWidthLeft >= 1.68 &&
                differentWidthLeft <= 1.94
              ) {
                correctMorphLeft = 0.27;
                correctOffsetLeft = -0.03;
              } else if (
                differentWidthLeft >= 2 &&
                differentWidthLeft <= 2.99
              ) {
                correctMorphLeft = 0.35;
                correctOffsetLeft = -0.01;
              }
            }
          }

          if (state.length > stepForColumn * 2) {
            const morphOffsets = {
              2.193235294117647: { morph: 0.14, offset: -0.04 },
              2.281388235294118: { morph: 0.22, offset: -0.04 },
              2.3695411764705883: { morph: 0.3, offset: -0.04 },
              2.4576941176470593: { morph: 0.3, offset: 0.01 },
              2.54584705882353: { morph: 0.3, offset: 0.01 },
              2.6340000000000003: { morph: 0.37, offset: 0.01 },
            };

            if (morphOffsets[differentWidthLeft]) {
              correctMorphLeft = morphOffsets[differentWidthLeft].morph;
              correctOffsetLeft = morphOffsets[differentWidthLeft].offset;
            }
          }

          //#region CORRECT SHADE
          if (!state.model) {
            const morphOffsets = {
              6: { morph: 0.07, offset: 0 },
              7: { morph: 0.05, offset: 0 },
              8: { morph: 0.03, offset: 0 },
              9: { morph: 0, offset: 0 },
              10: { morph: -0.02, offset: 0 },
              11: { morph: -0.04, offset: 0 },
              12: { morph: -0.065, offset: 0 },
              13: { morph: -0.08, offset: 0 },
              14: { morph: -0.11, offset: 0 },
              15: { morph: -0.13, offset: 0 },
              16: { morph: -0.15, offset: 0 },
              17: { morph: 0.03, offset: 0 },
              18: { morph: 0.02, offset: 0 },
              20: { morph: 0, offset: 0 },
              21: { morph: -0.015, offset: 0 },
              22: { morph: -0.02, offset: 0 },
              23: { morph: -0.03, offset: 0 },
              24: { morph: -0.04, offset: 0 },
              25: { morph: -0.05, offset: 0 },
              26: { morph: -0.06, offset: 0 },
              27: { morph: -0.07, offset: 0 },
              28: { morph: -0.08, offset: 0 },
              29: { morph: -0.09, offset: 0 },
              30: { morph: -0.1, offset: 0 },
              31: { morph: -0.11, offset: 0 },
              32: { morph: -0.12, offset: 0 },
              33: { morph: -0.145, offset: 0 },
              34: { morph: -0.03, offset: 0 },
              35: { morph: -0.04, offset: 0 },
              36: { morph: -0.05, offset: 0 },
              37: { morph: -0.06, offset: 0 },
              38: { morph: -0.07, offset: 0 },
              39: { morph: -0.08, offset: 0 },
              40: { morph: -0.09, offset: 0 },
            };

            if (morphOffsets[state.length]) {
              correctMorphForShadeLeft = morphOffsets[state.length].morph;
              correctOffsetForShadeLeft = morphOffsets[state.length].offset;
            }
          } else {
            const morphOffsets = {
              6: {
                morph: state.initValuePostSize.includes("4") ? 0.09 : 0.07,
                offset: 0,
              },
              7: { morph: 0.08, offset: 0 },
              8: { morph: 0.09, offset: 0 },
              9: { morph: 0.1, offset: 0 },
              10: { morph: 0.07, offset: 0 },
              11: { morph: 0.07, offset: 0 },
              12: { morph: 0.07, offset: 0 },
              13: { morph: 0.07, offset: 0 },
              14: { morph: 0.07, offset: 0 },
              15: { morph: 0.07, offset: 0 },
              16: { morph: 0.07, offset: 0 },
              17: { morph: 0.05, offset: 0 },
              18: { morph: 0.05, offset: 0 },
              19: { morph: 0.05, offset: 0 },
              20: { morph: 0.07, offset: 0 },
              21: { morph: 0.07, offset: 0 },
              22: { morph: 0.07, offset: 0 },
              23: { morph: 0.07, offset: 0 },
              24: { morph: 0.07, offset: 0 },
              25: { morph: 0.07, offset: 0 },
              26: { morph: 0.07, offset: 0 },
              27: { morph: 0.07, offset: 0 },
              28: { morph: 0.07, offset: 0 },
              29: { morph: 0.06, offset: 0 },
              30: { morph: 0.06, offset: 0 },
              31: { morph: 0.055, offset: 0 },
              32: { morph: 0.055, offset: 0 },
              33: { morph: 0.05, offset: 0 },
              34: { morph: 0.05, offset: 0 },
              35: { morph: 0.05, offset: 0 },
              36: { morph: 0.05, offset: 0 },
              37: { morph: 0.05, offset: 0 },
              38: { morph: 0.05, offset: 0 },
              39: { morph: 0.045, offset: 0 },
              40: {
                morph: state.initValuePostSize.includes("4") ? 0.07 : 0.07,
                offset: 0,
              },
            };

            if (morphOffsets[state.length]) {
              correctMorphForShadeLeft = morphOffsets[state.length].morph;
              correctOffsetForShadeLeft = morphOffsets[state.length].offset;
            }
          }
          //#endregion

          const screenLength = lenghtAvatar / (pointForColumnLeft.length + 1);

          const minlength = 0.762;
          const maxLength = 1.2192;

          const screenMorphLength = ConvertMorphValue(
            screenLength,
            minlength,
            maxLength
          );

          ChangeGlobalMorph("length_screen_wall", screenMorphLength);
          ChangeGlobalMorph(
            "length_shades_Y",
            morphValueShadeLeft + correctMorphForShadeLeft
          );

          const columnsLeft = [];
          const screensLeft = [];
          const shadesLeft = [];

          pointForColumnLeft.forEach((point, index) => {
            const cloneColumnScreenLeft = column.clone();
            cloneColumnScreenLeft.position.set(point.x, 0, point.z);
            cloneColumnScreenLeft.name = `clone_column_left_${index}`;
            modelForExport.add(cloneColumnScreenLeft);
            columnsLeft.push(cloneColumnScreenLeft);
            columnClonesLeft.push(cloneColumnScreenLeft);

            if (span.isScreen) {
              cloneColumnScreenLeft.visible = true;
            }
          });

          pointForScreenLeft.forEach((point, index) => {
            if (span.prepareScreensZ[index]) {
              const { screen, isActive } = span.prepareScreensZ[index];

              screen.position.set(
                point.x,
                0,
                point.z - widthScreenLeft / 2 - correctOffsetLeft
              );

              screensLeft.push(screen);

              if (span.isScreen) {
                screen.visible = true;
                screen.children.forEach((child) => {
                  child.visible = true;
                });
              }
            }
          });

          //#region SHADES
          let correctMorphForShadeHight = 0;

          const morphOffsets = {
            8: { morph: 0, offset: 0 },
            9: { morph: 0.12, offset: 0 },
            10: { morph: 0.26, offset: 0 },
            11: { morph: 0.38, offset: 0 },
            12: { morph: 0.52, offset: 0 },
          };

          if (morphOffsets[state.height]) {
            correctMorphForShadeHight = morphOffsets[state.height].morph;
          }

          let baseMorph = ConvertMorphValue(
            state.zipInput,
            1,
            90,
            0,
            1 + correctMorphForShadeHight
          );

          if (span.prepareShadesZ[index]) {
            const { shadeZ } = span.prepareShadesZ[index];
            const xPos = side === "left" ? point.x + 0.05 : point.x - 0.02;

            shadeZ.position.set(xPos, 0, point.z);

            shadesLeft.push(shadeZ);

            ChangeGlobalMorph("close", baseMorph);

            if (span.isShades) {
              shadeZ.visible = true;
              shadeZ.children.forEach((child) => {
                child.visible = true;
              });
            }
          }
          //#endregion

          objectForRaycast.push(span);
          span.columns = columnsLeft;
          span.screens = screensLeft;
          span.shades = shadesLeft;

          break;
      }
      //#endregion

      span.hotspot.setHoverFunction(() => {
        span.avatar.material.opacity = 0;
        span.avatar.material.needsUpdate = true;

        if (
          getMobileOperatingSystem() !== "Android" &&
          getMobileOperatingSystem() !== "iOS"
        ) {
          span.avatar.visible = true;
          animateProperty(span.avatar.material, "opacity", 0.4, 250, () => {
            span.avatar.material.needsUpdate = true;
          });
        }
      });

      span.hotspot.setNormalFunction(() => {
        span.avatar.material.opacity = 0;
        span.avatar.material.needsUpdate = true;
        span.avatar.visible = false;
      });

      span.hotspot.setClickFunction(() => {
        const portalScreen = $(".portal-screen");
        const portalShades = $(".portal-shades");

        lastScreenForRemove.last = span;
        raycastItem.push(span);

        span.active = false;

        if (state.portalOption === typePortalOption.screens) {
          let elementId = $(span.hotspot.element).get(0).id;

          if (elementId.includes("**SH")) {
            elementId = elementId.replace("**SH", "**SC");
          } else {
            elementId = elementId.concat("**SC");
          }

          $(span.hotspot.element).get(0).id = elementId;

          state.currentActiveSystems.push($(span.hotspot.element).get(0).id);

          span.isShades = false;
          span.isScreen = true;

          span.columns.forEach((column) => (column.visible = true));
          span.screens.forEach((screen) => {
            screen.visible = true;

            screen.children.forEach((child) => {
              child.visible = true;
            });
          });

          portalScreen.show();
          portalShades.hide();
        } else if (state.portalOption === typePortalOption.shades) {
          let elementId = $(span.hotspot.element).get(0).id;

          if (elementId.includes("**SC")) {
            elementId = elementId.replace("**SC", "**SH");
          } else {
            elementId = elementId.concat("**SH");
          }

          $(span.hotspot.element).get(0).id = elementId;

          state.currentActiveSystems.push($(span.hotspot.element).get(0).id);

          span.isShades = true;
          span.isScreen = false;

          span.shades.forEach((shades) => {
            shades.visible = true;

            shades.children.forEach((child) => {
              child.visible = true;
            });
          });

          portalShades.show();
          portalScreen.hide();
        }

        showAvailableSpansScreen();
      });
    });
  };

  const heightAvatar = getMeters(state.height / 2);

  const prepareBottom =
    state.width < stepForColumn
      ? bottom_span_points.slice(0, -1)
      : bottom_span_points;
  const prepareTop =
    state.width < stepForColumn
      ? top_span_points.slice(0, -1)
      : top_span_points;
  const prepareLeft =
    state.length < stepForColumn
      ? left_span_points.slice(0, -1)
      : left_span_points;
  const prepareRight =
    state.length < stepForColumn
      ? right_span_points.slice(0, -1)
      : right_span_points;

  configureSpan(
    prepareLeft,
    "left",
    lenghtAvatarSecond,
    avatarDeep,
    heightSpan,
    heightOffsetAvatar
  );
  configureSpan(
    prepareRight,
    "right",
    lenghtAvatarSecond,
    avatarDeep,
    heightSpan,
    heightOffsetAvatar
  );
  configureSpan(
    prepareBottom,
    "bottom",
    widthAvatarSecond,
    avatarDeep,
    heightSpan,
    heightOffsetAvatar
  );
  configureSpan(
    prepareTop,
    "top",
    widthAvatarSecond,
    avatarDeep,
    heightSpan,
    heightOffsetAvatar
  );

  showAvailableSpansScreen();
}

export function setAllHotspotsVisibilityScreen(visible) {
  const spans = spansScreen;
  for (let i = 0; i < spans.length; i++) {
    setHotspotVisibility(spans[i].hotspot, visible);
  }
}

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
