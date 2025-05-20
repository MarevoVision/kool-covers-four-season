import $ from "jquery";
import {
  GetGroup,
  modelForExport,
  pergolaConst,
  theModel,
  toggleLoad,
} from "../../../core/3d-configurator";
import { createPDF } from "../../../core/customFunctions/createPDF";
import { state } from "../../../core/settings";
import "./summaryPage.scss";
import { loadFormData } from "./summary-page-portal/summaryPagePortal";
import {
  stringPostSize,
  stringRoofType,
  stringTypeModel,
} from "../../Interface/interface";
import {
  stringNameFrameColor,
  stringNameRoofColor,
} from "../../Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";
export let countLeds = {
  count: 0,
};

function countVisibleObjectsByName(scene, name, exactMatch = false) {
  let count = 0;

  scene.traverse((object) => {
    if (!object.visible) return;

    const isMatch = exactMatch
      ? object.name === name
      : object.name.includes(name);

    if (isMatch) {
      count++;
    }
  });

  return count;
}

function countVisibleMeshes(model, nameGroup) {
  let visibleCount = 0;

  model.traverse((object) => {
    console.log(object.name);

    if (nameGroup === "fan" && object.name === nameGroup && object.visible) {
      visibleCount++;
    } else if (
      object.name &&
      object.name.includes(nameGroup) &&
      object.visible &&
      nameGroup !== "fan"
    ) {
      visibleCount++;
    }
  });

  return visibleCount;
}

export function summaryPageComponent(container) {
  const modelType = stringTypeModel[state.type3Dmodel];
  const wall =
    [
      state.backWall && "Back Wall",
      state.leftWall && "Left Wall",
      state.rightWall && "Right Wall",
    ]
      .filter(Boolean)
      .join(", ") || "Freestanding";

  // const roof = state.model ? state.moodLight : "Louvered";
  const roofType = stringRoofType[state.roofType];
  const postSize = stringPostSize[state.postSize];
  // const postSize = state.initValuePostSize.includes("6")
  //   ? `6' x 6'`
  //   : state.initValuePostSize.includes("8")
  //   ? `8' x 8'`
  //   : `4' x 4'`;
  const frameColor = state.colorBody;
  const roofColor = state.colorRoof;

  const ledLight = state.ledLights ? `${countLeds.count}` : "No";
  const brightness =
    state.colorLed === "#FAFFC4" ? "3500 lumens" : "2500 lumens";
  const frequency = `Every ${state.recessedLighting} louvers`;
  const fans = state.fans ? `Yes` : "No";
  const heaters = state.heaters ? `Yes` : "No";

  const motorized = state.subSystem.has(pergolaConst.systemNameString.zip_shade)
    ? `Yes`
    : "No";
  const colorZip = state.subSystem.has(pergolaConst.systemNameString.zip_shade)
    ? `${state.colorZip}`
    : "No";

  const transparency = state.subSystem.has(
    pergolaConst.systemNameString.zip_shade
  )
    ? `${state.transparency}%`
    : "No";
  const slidingGlassDoor = state.subSystem.has(
    pergolaConst.systemNameString.sliding_doors
  )
    ? `Yes`
    : "No";
  const bifoldingGlassDoor = state.subSystem.has(
    pergolaConst.systemNameString.bifold_doors
  )
    ? `Yes`
    : "No";
  const fixedShutters = state.subSystem.has(
    pergolaConst.systemNameString.fix_shutters
  )
    ? `Yes`
    : "No";
  const slidingShutters = state.subSystem.has(
    pergolaConst.systemNameString.sliding_shutters
  )
    ? `Yes`
    : "No";
  const biFoldingShutters = state.subSystem.has(
    pergolaConst.systemNameString.bifold_shutters
  )
    ? `Yes`
    : "No";
  const fixedSlats = state.subSystem.has(
    pergolaConst.systemNameString.fix_shutters
  )
    ? `Yes`
    : "No";

  const isTexture =
    typeof state.colorRoof === "string" &&
    /\.(jpe?g|png|webp)$/i.test(state.colorRoof);

  const style = isTexture
    ? `background-image: url('${state.colorRoof}'); background-size: cover; background-position: center;`
    : `background-color: ${state.colorRoof};`;

  const summaryContent = $(`
    <div id="summary-content">
  <div class="sum__page" id="sum-page">
    <h2 class="sum__page__title">Summary</h2>
    <div class="sum__page__close" id="sum-close"></div>

    <div id="js-summary-image-preview-1">
      <img class="sum__page__img" />
    </div>

    <ul class="sum__page__main-list">
      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Manufacturer</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Type</h3>
          <div class="sum__page__main-list__info__param">${modelType}</div>
        </div>
      </li>

     <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Wall</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Type</h3>
          <div class="sum__page__main-list__info__param">${wall}</div>
        </div>
      </li>

    <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Roof Type</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Type</h3>
          <div class="sum__page__main-list__info__param">${roofType}</div>
        </div>
      </li>

    <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Dimensions</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Width</h3>
          <div class="sum__page__main-list__info__param">${state.width}'</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Projection</h3>
          <div class="sum__page__main-list__info__param">${state.length}'</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Height</h3>
          <div class="sum__page__main-list__info__param">${state.height}'</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Post size</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Size</h3>
          <div class="sum__page__main-list__info__param">${postSize}</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Frame color</p>

        <div class="sum__page__main-list__info"> 
          <div class="sum__page__main-list__info__color" style="background-color: ${
            state.colorBody
          }"></div>
          <div class="sum__page__main-list__info__param">${stringNameFrameColor}</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Roof color</p>

        <div class="sum__page__main-list__info"> 
          <div class="sum__page__main-list__info__color" style="${style}"></div>
          <div class="sum__page__main-list__info__param">${stringNameRoofColor}</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Extra Options</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">LED Ramp Light</h3>
          <div class="sum__page__main-list__info__param">${
            countVisibleObjectsByName(theModel, "LED_ramp", true) +
              countVisibleObjectsByName(theModel, "LED_ramp_Y", true) || "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Fan</h3>
          <div class="sum__page__main-list__info__param">${
            countVisibleObjectsByName(theModel, "fan", true) - 1 || "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Privacy Wall</h3>
          <div class="sum__page__main-list__info__param">${
            countVisibleObjectsByName(theModel, "privacy_wall_frame", true) +
              countVisibleObjectsByName(
                theModel,
                "privacy_wall_frame_side",
                true
              ) || "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">LED Recessed</h3>
          <div class="sum__page__main-list__info__param">${
            countVisibleObjectsByName(theModel, "point-light", true) - 1 || "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">LED Strip</h3>
          <div class="sum__page__main-list__info__param">${
            state.electro.has(pergolaConst.optionNameString.LEDStrip) ? "Yes" : "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Automated Screens</h3>
          <div class="sum__page__main-list__info__param">${
            countVisibleObjectsByName(theModel, "zip_shade", true) +
              countVisibleObjectsByName(theModel, "zip_shade_side", true) -
              2 || "No"
          }</div>
        </div>
      </li>
    </ul>
  
    <div class="sum__page__buttons">
      <button class="sum__page__buttons__button sum__page__buttons__button--back" id="back-bt">Back</button>
      <button class="sum__page__buttons__button sum__page__buttons__button--contact" id="contact-bt">Request Quote</button>
      <button class="sum__page__buttons__button" id="dw-bt">Download PDF</button>
    </div>
  </div>
</div>
    `);

  const backButton = summaryContent.find("#back-bt");
  const contactButton = summaryContent.find("#contact-bt");
  const downloadButton = summaryContent.find("#dw-bt");

  summaryContent.find("#sum-close").on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, "fast", () => {
      summaryContent.hide();
      $("body").removeClass("body-overflow-auto");
    });
  });

  backButton.on("click", () => {
    toggleLoad(true);
    $("html, body").animate({ scrollTop: 0 }, "fast", () => {
      summaryContent.hide();
      $("body").removeClass("body-overflow-auto");
    });
    toggleLoad(false);
  });

  contactButton.on("click", () => {
    loadFormData(".form-container");

    $("#sum-portal-with-comment").show();

    $("body").removeClass("body-overflow-auto");
  });

  downloadButton.on("click", async () => {
    toggleLoad(true);
    //OPEN FORM
    $("#sum-portal").show();

    $("body").removeClass("body-overflow-auto");

    // await createPDF();
    toggleLoad(false);
  });

  $(container).append(summaryContent);
}
