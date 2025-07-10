import $ from "jquery";
import "./modelViewer.scss";
import * as THREE from "three";
import modelViewerHTML from "./modelViewer.html";
import { shareArComponent } from "../shareAr/shareAr";
import {
  GetGroup,
  OpenARorQR,
  pergola,
  toggleBackWall,
  toggleLeftWall,
  toggleRightWall,
} from "../../core/3d-configurator";
import { getMobileOperatingSystem } from "../../core/3d-scene";
import { state } from "../../core/settings";

export async function modelViewerComponent(container) {
  const componentContent = $('<div class="model-viewer-container"></div>');

  componentContent.append(modelViewerHTML);

  componentContent.find("#js-showModalShare").on("click", () => {
    $("#share").show();
    $(".main-content").addClass("main-content-bg");

    $(".interface-container").addClass("interface-container-portal");
  });

  componentContent.find("#js-showModalQRcode").on("click", () => {
    OpenARorQR();
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
