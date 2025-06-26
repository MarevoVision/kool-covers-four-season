import $ from "jquery";
import {
  pergola,
  pergolaConst,
  theModel,
  toggleLoad,
} from "../../../core/3d-configurator";
import { state } from "../../../core/settings";
import {
  stringEndCuts,
  stringPostType,
  stringRoofType,
  stringTypeModel,
} from "../../Interface/interface";
import {
  stringNameFrameColor,
  stringNameRoofLetticeColor,
  stringNameRoofSolidColor,
  wallAddOptionString,
} from "../../Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";
import { loadFormData } from "./summary-page-portal/summaryPagePortal";
import "./summaryPage.scss";
export let countLeds = {
  count: 0,
};

export function countVisibleObjectsByName(
  scene,
  name,
  exactMatch = false,
  checkChildrenVisible = false
) {
  let count = 0;

  scene.traverse((object) => {
    const isMatch = exactMatch
      ? object.name === name
      : object.name.includes(name);

    const isTargetType = object.isMesh || object.type === "Group";

    if (!isMatch || !isTargetType || !object.visible) return;

    if (checkChildrenVisible && object.children.length > 0) {
      const allChildrenVisible = object.children.every(
        (child) => child.visible
      );
      if (!allChildrenVisible) return;
    }

    count++;
  });

  return count;
}

export function countActiveSystemsInPergola(typeSystem) {
  const count = pergola.span.objects
    .filter((span) => span.isSystemSet)
    .filter((span) =>
      span.systems.some((system) => system.active && system.type === typeSystem)
    );

  return count.length;
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
      .join(", ") || `${wallAddOptionString[state.wallOption]}`;

  const roofType = stringRoofType[state.roofType];
  const postType = stringPostType[state.postType];
  const postSize = `${state.postSize}' x ${state.postSize}'`;
  const endCuts = `${stringEndCuts[state.endCuts - 1]}`;

  const frameColor = state.colorBody;
  const roofColor = state.colorRoof;

  const ledLight = state.ledLights ? `${countLeds.count}` : "No";
  const brightness =
    state.colorLed === "#FAFFC4" ? "3500 lumens" : "2500 lumens";
  const frequency = `Every ${state.spacing} louvers`;
  const fans = state.fans ? `Yes` : "No";
  const heaters = state.heaters ? `Yes` : "No";

  // const isTexture =
  //   typeof state.colorBody === "string" &&
  //   /\.(jpe?g|png|webp)$/i.test(state.colorBody);

  const styleFrame = `background-color: ${state.colorBody}; background-size: cover; background-position: center;`;
  const styleRoofLettice = `background-color: ${state.colorRoof}; background-size: cover; background-position: center;`;
  const styleRoofSolid = `background-color: ${state.colorRoofSolid}; background-size: cover; background-position: center;`;

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
        
        
        ${
          // LATTICE SETTINGS FROM POP-UP
          state.roofType === 0
            ? `
           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Spacing</h3>
             <div class="sum__page__main-list__info__param">${
               state.spacing
             }"</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Thickness</h3>
             <div class="sum__page__main-list__info__param">${
               !state.thickness ? `2"x2"` : `3"x3"`
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Rafter</h3>
             <div class="sum__page__main-list__info__param">${
               !state.rafter ? "Single" : "Double"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Direction</h3>
             <div class="sum__page__main-list__info__param">${
               state.directionRoof ? "Perpendicular" : "Horizontal"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Roof Overhang</h3>
             <div class="sum__page__main-list__info__param">${
               state.overhang - 4
             }"</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Rain Shield</h3>
             <div class="sum__page__main-list__info__param">${
               state.rain ? "Yes" : "No"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Remove Lattice</h3>
             <div class="sum__page__main-list__info__param">${
               state.removeLettice ? "Yes" : "No"
             }</div>
           </div>
          `
            : ""
        } 

        ${
          // SOLID SETTINGS FROM POP-UP
          state.roofType === 1
            ? `
           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Thickness</h3>
             <div class="sum__page__main-list__info__param">${
               state.thickness
             }"</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Rafter</h3>
             <div class="sum__page__main-list__info__param">${
               !state.rafter ? "Single" : "Double"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Beam Size</h3>
             <div class="sum__page__main-list__info__param">${
               !state.beamSize ? `3x8"` : `3x5"`
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Gutter</h3>
             <div class="sum__page__main-list__info__param">${
               !state.gutter ? "Scupper" : "Down Spout"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Roof Overhang</h3>
             <div class="sum__page__main-list__info__param">${
               state.overhang - 4
             }"</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Pergola Wrap Kit</h3>
             <div class="sum__page__main-list__info__param">${
               state.wrapKit ? "Yes" : "No"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Skylight</h3>
             <div class="sum__page__main-list__info__param">${
               state.skyLight ? "Yes" : "No"
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Tails</h3>
             <div class="sum__page__main-list__info__param">${
               state.tails ? "Yes" : "No"
             }</div>
           </div>
          `
            : ""
        } 

        ${
          // COMBO SETTINGS FROM POP-UP
          state.roofType === 2
            ? `
           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Beam Size</h3>
             <div class="sum__page__main-list__info__param">${
               !state.beamSize ? `3x8"` : `3x5"`
             }</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Thickness</h3>
             <div class="sum__page__main-list__info__param">${
               !state.thickness ? `2"x2"` : `3"x3"`
             }</div>
           </div>
        
           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Spacing</h3>
             <div class="sum__page__main-list__info__param">${
               state.spacing
             }"</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Roof Overhang</h3>
             <div class="sum__page__main-list__info__param">${
               state.overhang - 4
             }"</div>
           </div>

           <div class="sum__page__main-list__info"> 
             <h3 class="sum__page__main-list__info__title">Skylight</h3>
             <div class="sum__page__main-list__info__param">${
               state.skyLight ? "Yes" : "No"
             }</div>
           </div>
          `
            : ""
        } 
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

       ${
         state.postType
           ? `<div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Size</h3>
          <div class="sum__page__main-list__info__param">${postSize}</div>
        </div>`
           : ""
       } 

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Type post</h3>
          <div class="sum__page__main-list__info__param">${postType}</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">End cuts</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Size</h3>
          <div class="sum__page__main-list__info__param">${endCuts}</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Frame color</p>

        <div class="sum__page__main-list__info"> 
          <div class="sum__page__main-list__info__color" style="${styleFrame}"></div>
          <div class="sum__page__main-list__info__param">${stringNameFrameColor}</div>
        </div>
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Roof color</p>

       ${
         state.roofType === 0 || state.roofType === 2
           ? `<div class="sum__page__main-list__info">
             <div
               class="sum__page__main-list__info__color"
               style="${styleRoofLettice}"
             ></div>
             <div class="sum__page__main-list__info__param">
               ${stringNameRoofLetticeColor}
             </div>
           </div>`
           : ""
       } 
        
       ${
         state.roofType === 1 || state.roofType === 2
           ? `<div class="sum__page__main-list__info">
             <div
               class="sum__page__main-list__info__color"
               style="${styleRoofSolid}"
             ></div>
             <div class="sum__page__main-list__info__param">
               ${stringNameRoofSolidColor}
             </div>
           </div>`
           : ""
       }
        
      </li>

      <li class="sum__page__main-list__item">
        <p class="sum__page__main-list__title">Extra Options</p>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">LED Light</h3>
          <div class="sum__page__main-list__info__param">${
            state.electro.has(pergolaConst.optionNameString.LEDRampLight)
              ? "Yes"
              : "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Fan</h3>
          <div class="sum__page__main-list__info__param">${
            state.electro.has(pergolaConst.optionNameString.LEDRampLight)
              ? countVisibleObjectsByName(model, "fan", true, true) / 2 || "No"
              : countVisibleObjectsByName(model, "fan", true, true) || "No"
          }</div>
        </div>

         <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Privacy Wall</h3>
          <div class="sum__page__main-list__info__param">${
            countActiveSystemsInPergola(pergolaConst.systemType.privacyWall) ||
            "No"
          }</div>
        </div>

        <div class="sum__page__main-list__info"> 
          <h3 class="sum__page__main-list__info__title">Automated Screens</h3>
          <div class="sum__page__main-list__info__param">${
            countActiveSystemsInPergola(pergolaConst.systemType.autoShade) ||
            "No"
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
