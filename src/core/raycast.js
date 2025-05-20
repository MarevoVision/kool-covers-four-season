//#region RAYCAST
import $ from "jquery";
import * as THREE from "three";
import { camera, renderer } from "./3d-scene";
import { lastHeatersForRemove } from "./customFunctions/subSystemHeaters";
import { lastScreenForRemove } from "./customFunctions/subSystemScreen";
import { state } from "./settings";

export const raycastItem = [];
export const objectForRaycast = [];

export function initRaycast() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const canvas = document.getElementById("ar_model_view");
  let isMouseMoved = false;
  let clickThreshold = 5;
  let startX, startY;

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
      getVisibleClickableObjects(objectForRaycast);
    const intersects = raycaster.intersectObjects(
      visibleClickableObjects,
      true
    );

    if (intersects.length > 0) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
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
        getVisibleClickableObjects(objectForRaycast);

      const intersects = raycaster.intersectObjects(
        visibleClickableObjects,
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        if (intersectedObject.name.includes("screen")) {
          lastScreenForRemove.last = intersectedObject.perentSpan;

          if (intersectedObject.perentSpan.isScreen) {
            const screenIcon = $("#screen");
            screenIcon.trigger("click");
            $(".portal-screen").show();
          }

          if (intersectedObject.perentSpan.isShades) {
            const shadesIcon = $("#shades");
            shadesIcon.trigger("click");
            $(".portal-shades").show();
          }
        } else {
          lastHeatersForRemove.last = intersectedObject.perentSpan;

          state.currentActiveSystems = state.currentActiveSystems.filter(
            (span) =>
              span !== $(lastHeatersForRemove.last.hotspot.element).get(0).id
          );

          const heatersIcon = $("#heaters");
          heatersIcon.trigger("click");
          $(".portal-heaters").show();
        }
      }
    }
  }

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function getVisibleClickableObjects() {
  return raycastItem
    .filter((span) => span.isHeater || span.isScreen || span.isShades)
    .map((span) => span.avatar);
}

//#endregion
