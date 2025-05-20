import $ from "jquery";
import { ArViewerComponent } from "./components/ar-viewer/ArViewer";
import { modelViewerComponent } from "./components/model-viewer/modelViewer";
import { portalComponent } from "./components/portal/portals";
import { summaryPageComponent } from "./components/summary/summary-page/summaryPage";
import { Start } from "./core/3d-configurator";
import "./styles/main.scss";
import "./styles/mobileStyles.scss";
import { initStateFromUrl } from "./core/customFunctions/paramsURL";
import { shareArComponent } from "./components/shareAr/shareAr";
import { summaryPagePortalComponent } from "./components/summary/summary-page/summary-page-portal/summaryPagePortal";
import { getBrowserBarHeight } from "./core/customFunctions/customFunctions";

const root = "#app";
export const mainContent = $('<main class="main-content" id="content"></main>');
const footer = $('<footer class="footer footer-h" id="footer"></footer>');

$(document).ready(async () => {
  await modelViewerComponent(mainContent, false);
  summaryPagePortalComponent(mainContent, false);
  summaryPagePortalComponent(mainContent);
  shareArComponent(mainContent);

  $(root).append(mainContent);

  await Start();

  portalComponent();
  ArViewerComponent(footer);

  $(root).append(footer);

  function fixMobileViewport() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
  }

  fixMobileViewport();
});
