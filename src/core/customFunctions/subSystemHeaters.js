import $ from "jquery";
import * as THREE from "three";
import {
    generateMidpoints,
    GetGroup,
    modelForExport,
} from "../3d-configurator";
import { objectForRaycast, raycastItem } from "../raycast";
import { state } from "../settings";
import {
    clearClones,
    getCorners,
    getMeters,
    heatersBottom,
    heatersLeft,
    heatersRight,
    heatersTop,
    stepForColumn,
} from "./customFunctions";
const spanColor = "#997A4F";

export let lastHeatersForRemove = {
  last: null,
};

export const hotspots = [];
export const spansHeaters = [];

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

const qtyLeft = Math.floor(40 / 17) + 1;
const qtyRight = qtyLeft;
const qtyFront = qtyLeft;
const qtyBack = qtyFront;

const spanGeometry = new THREE.BoxGeometry(1, 1, 1);
const spanMaterial = new THREE.MeshBasicMaterial({
  color: spanColor,
  transparent: true,
  opacity: 0,
});

export const makeSpanBySide = (side, qty) => {
  for (let i = 0; i < qty; i++) {
    const span = new PergolaSpanObject();
    span.side = side;

    const spanAvatar = new THREE.Mesh(spanGeometry, spanMaterial);
    spanAvatar.position.set(span.posX, span.posY, span.posZ);
    spanAvatar.visible = false;

    spanAvatar.perentSpan = span;
    spanAvatar.name = `avatar_heaters_${i}`;

    modelForExport.add(spanAvatar);
    span.avatar = spanAvatar;
    span.hotspot = createHotspot(
      `span_heaters_hotspot_${side}_${i}`,
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

    spansHeaters.push(span);
  }
};

export function createHotspot(
  id,
  normalUrl,
  hoverUrl,
  position,
  groupName = ""
) {
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
    console.log(`Hotspot ${id} clicked`);
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

export function setHotspotVisibility(hotspot, visible) {
  if (!hotspot || !hotspot.element) {
    return;
  }
  hotspot.element.style.display = visible ? "block" : "none";
}

// export function updateHotspots(hotspots) {
//   const $canvasContainer = $("#ar_model_viewer");

//   hotspots.forEach(({ element, position }) => {
//     if (position) {
//       const screenPosition = position.clone();
//       screenPosition.project(camera);

//       const x = (screenPosition.x * 0.5 + 0.5) * $canvasContainer.width();
//       const y = (screenPosition.y * -0.5 + 0.5) * $canvasContainer.height();

//       $(element).css({
//         left: `${x}px`,
//         top: `${y}px`,
//         transform: "translate(-50%, -50%)",
//         "-webkit-transform": "translate(-50%, -50%)",
//       });
//     }
//   });
// }

export function resetSpans() {
  const spans = spansHeaters;
  for (let i = 0; i < spans.length; i++) {
    spans[i].avatar.visible = false;
    spans[i].active = false;
    spans[i].isLocked = false;
  }
}

export function resetSpansActive() {
  const spans = spansHeaters;
  for (let i = 0; i < spans.length; i++) {
    spans[i].isHeater = false;
  }
}

function getSpan(side) {
  const spans = spansHeaters;

  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    if (span.side === side && !span.isLocked) {
      span.isLocked = true;
      return span;
    }
  }

  return null;
}

export function showAvailableSpans() {
  if (state.currentSubSystem !== null) {
    const spans = spansHeaters;
    for (let i = 0; i < spans.length; i++) {
      setHotspotVisibility(spans[i].hotspot, spans[i].active);
    }
  }
}

function changeObjectVisibility(status, object) {
  if (!object) return;
  object.visible = status;
  if (object.children && object.children.length > 0) {
    object.children.forEach((child) => changeObjectVisibility(status, child));
  }
}

export function setSpansHeaters() {
  const lengthCondition = state.length >= stepForColumn * 2;
  const widthCondition = state.width >= stepForColumn * 2;
  const { LB_point, RB_point, LT_point, RT_point } = getCorners(
    state.width,
    state.length
  );

  let countPointLenght = 1;
  let countPointWidth = 1;

  if (state.length >= stepForColumn) {
    countPointLenght = 3;
  }

  if (state.width >= stepForColumn) {
    countPointWidth = 3;
  }

  if (state.length >= stepForColumn * 2) {
    countPointLenght = 5;
  }

  if (state.width >= stepForColumn * 2) {
    countPointWidth = 5;
  }

  const leftSideCount = generateMidpoints(LB_point, LT_point, countPointLenght);
  const rightSideCount = generateMidpoints(
    RB_point,
    RT_point,
    countPointLenght
  );
  const bottomSideCount = generateMidpoints(
    LB_point,
    RB_point,
    countPointWidth
  );
  const topSideCount = generateMidpoints(LT_point, RT_point, countPointWidth);

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

  clearClones(modelForExport, heatersBottom);
  clearClones(modelForExport, heatersTop);
  clearClones(modelForExport, heatersLeft);
  clearClones(modelForExport, heatersRight);

  resetSpans();

  const height = state.height * 0.0254;
  const offsetZ = 0;

  const configureSpan = (
    points,
    side = "left",
    width = 1.5,
    thickness = 0.1,
    ySpan,
    yAvatar
  ) => {
    points.forEach((point, index) => {
      const span = getSpan(side);

      if (!span) {
        return;
      }

      span.active = span.isHeater ? false : true;

      if (
        (state.backWall && side === "back") ||
        (state.leftWall && side === "left") ||
        (state.rightWall && side === "right")
      ) {
        span.active = false;
        span.isSystemSet = false;
        span.systems.forEach((system) => {
          system.active = false;
          // changeObjectVisibility(false, system.object);
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

      let offsetLeftRightAvatarZ = 0;

      if (side === "left" || side === "right") {
        offsetLeftRightAvatarZ = -0.03;
      }

      span.avatar.position.set(
        span.posX,
        yAvatar,
        span.posZ + offsetLeftRightAvatarZ
      );

      span.avatar.scale.set(
        side === "left" || side === "right" ? thickness : width,
        span.height,
        side === "left" || side === "right" ? width + 0.1 : thickness
      );
      span.avatar.visible = false;

      span.isLocked &&
        span.hotspot.position.set(span.posX, ySpan, span.posZ + offsetZ);

      //#region LOGIC HEATERS
      const { LB_point } = getCorners(state.width, state.length);
      const originalUFO = GetGroup("UFO");
      const offsetUFO = 0.05;

      if (state.electro.has("Heaters")) {
        switch (span.side) {
          case "bottom":
            const cloneUFObottom = originalUFO.clone();
            cloneUFObottom.rotation.y = Math.PI;

            const heightUFOBottom = !state.model
              ? getMeters(state.height) - offsetUFO
              : getMeters(state.height) - offsetUFO + 0.01;

            cloneUFObottom.position.set(
              span.hotspot.position.x,
              heightUFOBottom,
              LB_point.z - offsetUFO
            );
            cloneUFObottom.name = `clone_ufo_bottom_${index}`;

            modelForExport.add(cloneUFObottom);
            heatersBottom.push(cloneUFObottom);
            span.heaters = cloneUFObottom;
            objectForRaycast.push(span);

            if (span.isHeater) {
              cloneUFObottom.visible = true;
              cloneUFObottom.children.forEach((child) => {
                child.visible = true;
              });
            }
            break;

          case "left":
            const cloneUFOleft = originalUFO.clone();
            cloneUFOleft.rotation.y = Math.PI / 2;

            const heightUFOLeft = !state.model
              ? getMeters(state.height) - offsetUFO
              : getMeters(state.height) - offsetUFO + 0.01;

            cloneUFOleft.position.set(
              LB_point.x + offsetUFO,
              heightUFOLeft,
              span.hotspot.position.z
            );
            cloneUFOleft.name = `clone_ufo_left_${index}`;

            modelForExport.add(cloneUFOleft);
            heatersLeft.push(cloneUFOleft);
            span.heaters = cloneUFOleft;
            objectForRaycast.push(span);

            if (span.isHeater) {
              cloneUFOleft.visible = true;
              cloneUFOleft.children.forEach((child) => {
                child.visible = true;
              });
            }
            break;

          case "top":
            const cloneUFOtop = originalUFO.clone();
            cloneUFOtop.rotation.y = 0;

            const heightUFOTop = !state.model
              ? getMeters(state.height) - offsetUFO
              : getMeters(state.height) - offsetUFO + 0.01;

            cloneUFOtop.position.set(
              span.hotspot.position.x,
              heightUFOTop,
              -LB_point.z + offsetUFO
            );
            cloneUFOtop.name = `clone_ufo_top_${index}`;

            modelForExport.add(cloneUFOtop);
            heatersTop.push(cloneUFOtop);
            span.heaters = cloneUFOtop;
            objectForRaycast.push(span);

            if (span.isHeater) {
              cloneUFOtop.visible = true;
              cloneUFOtop.children.forEach((child) => {
                child.visible = true;
              });
            }
            break;

          case "right":
            const cloneUFOright = originalUFO.clone();
            cloneUFOright.rotation.y = -Math.PI / 2;

            const heightUFORight = !state.model
              ? getMeters(state.height) - offsetUFO
              : getMeters(state.height) - offsetUFO + 0.01;

            cloneUFOright.position.set(
              -LB_point.x - offsetUFO,
              heightUFORight,
              span.hotspot.position.z
            );
            cloneUFOright.name = `clone_ufo_right_${index}`;

            modelForExport.add(cloneUFOright);
            heatersRight.push(cloneUFOright);
            span.heaters = cloneUFOright;
            objectForRaycast.push(span);

            if (span.isHeater) {
              cloneUFOright.visible = true;
              cloneUFOright.children.forEach((child) => {
                child.visible = true;
              });
            }
            break;

          default:
            break;
        }
      }
      //#endregion

      span.hotspot.setHoverFunction(() => {
        span.avatar.material.opacity = 0;
        span.avatar.material.needsUpdate = true;
        span.avatar.visible = true;
        animateProperty(span.avatar.material, "opacity", 0.4, 250, () => {
          span.avatar.material.needsUpdate = true;
        });
      });

      span.hotspot.setNormalFunction(() => {
        span.avatar.material.opacity = 0;
        span.avatar.material.needsUpdate = true;
        span.avatar.visible = false;
      });

      span.hotspot.setClickFunction(() => {
        const portalHeaters = $(".portal-heaters");
        const heatersIcon = $("#heaters");

        lastHeatersForRemove.last = span;
        raycastItem.push(span);

        state.currentActiveSystems.push($(span.hotspot.element).get(0).id);

        span.isHeater = true;
        span.active = false;

        const UFO = GetGroup(`clone_ufo_${span.side}_${index}`);

        UFO.visible = true;
        UFO.children.forEach((child) => {
          child.visible = true;
        });

        heatersIcon.addClass("sun__icon-active--heaters");
        portalHeaters.show();

        showAvailableSpans();
      });
    });
  };

  const heightAvatar =
    getMeters(state.height) - state.fanAvatarHeight / 2 + 0.04;
  const heightSpan = getMeters(state.height) - 0.2 * 5;

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
    state.fanAvatarWidth,
    0.1,
    heightSpan,
    heightAvatar
  );
  configureSpan(
    prepareRight,
    "right",
    state.fanAvatarWidth,
    0.1,
    heightSpan,
    heightAvatar
  );
  configureSpan(
    prepareBottom,
    "bottom",
    state.fanAvatarWidth,
    0.1,
    heightSpan,
    heightAvatar
  );
  configureSpan(
    prepareTop,
    "top",
    state.fanAvatarWidth,
    0.1,
    heightSpan,
    heightAvatar
  );

  showAvailableSpans();
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

// export function setAllHotspotsVisibility(visible) {
//   const spans = spansHeaters;
//   for (let i = 0; i < spans.length; i++) {
//     setHotspotVisibility(spans[i].hotspot, visible);
//   }
// }
