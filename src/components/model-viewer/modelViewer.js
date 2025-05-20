import $ from "jquery";
import "./modelViewer.scss";
import * as THREE from "three";
import modelViewerHTML from "./modelViewer.html";
import { shareArComponent } from "../shareAr/shareAr";
import { GetGroup, OpenARorQR } from "../../core/3d-configurator";
import { getMobileOperatingSystem } from "../../core/3d-scene";

export async function modelViewerComponent(container) {
  const componentContent = $('<div class="model-viewer-container"></div>');

  componentContent.append(modelViewerHTML);

  componentContent.find("#js-showModalShare").on("click", () => {
    $("#share").show();
    $(".main-content").addClass("main-content-bg");

    $(".interface-container").addClass("interface-container-portal");
  });

  componentContent.find("#js-showModalQRcode").on("click", async () => {
    OpenARorQR();
    $(".main-content").addClass("main-content-bg");

    if (
      (await getMobileOperatingSystem()) == "Android" ||
      (await getMobileOperatingSystem()) == "iOS"
    ) {
      GetGroup("shades_X").children.forEach((child) => {
        if (child.material) {
          child.material.side = THREE.DoubleSide;
        }
      });

      GetGroup("shades_Y").children.forEach((child) => {
        if (child.material) {
          child.material.side = THREE.DoubleSide;
        }
      });

      $("#footer").removeClass("footer-h");
    }
  });

  componentContent.find(".full-screen").on("click", () => {
    if ($("#interface").is(":visible")) {
      $("#interface").hide();
    } else {
      $("#interface").show();
    }
  });

  $(container).append(componentContent);
}
