import $ from "jquery";
import { ArViewerComponent } from "./components/ar-viewer/ArViewer";
import { modelViewerComponent } from "./components/model-viewer/modelViewer";
import { portalComponent } from "./components/portal/portals";
import { summaryPageComponent } from "./components/summary/summary-page/summaryPage";
import { pergola, Start } from "./core/3d-configurator";
import "./styles/main.scss";
import "./styles/mobileStyles.scss";
import { initStateFromUrl } from "./core/customFunctions/paramsURL";
import { shareArComponent } from "./components/shareAr/shareAr";
import { summaryPagePortalComponent } from "./components/summary/summary-page/summary-page-portal/summaryPagePortal";
import { getBrowserBarHeight } from "./core/customFunctions/customFunctions";
import { disablePortalComponent } from "./components/portal/disablePortal/disablePortal";

const root = "#app";
export const mainContent = $('<main class="main-content" id="content"></main>');
const footer = $('<footer class="footer footer-h" id="footer"></footer>');

$(document).ready(async () => {
  await modelViewerComponent(mainContent, false);
  summaryPagePortalComponent(mainContent, false);
  summaryPagePortalComponent(mainContent);
  shareArComponent(mainContent);
  disablePortalComponent(mainContent);

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

  // #region DISABLE MOBILE PORTAL
  let disablePortalTimeout;

  $("body").on("click", ".disable", function () {
    const text = $(this).attr("data-text");

    $(".disable-portal").text(text).addClass("disable-portal-v");

    clearTimeout(disablePortalTimeout);

    disablePortalTimeout = setTimeout(() => {
      $(".disable-portal").removeClass("disable-portal-v");

      disablePortalTimeout = null;
    }, 2000);
  });
  // #endregion

  fixMobileViewport();
});
