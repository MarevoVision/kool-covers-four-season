import Pickr from "@simonwep/pickr";
import $ from "jquery";
import {
  changeSceneTime,
  hideIcon,
  pergola,
  pergolaConst,
  showIcon,
} from "../../core/3d-configurator";
import { removeFromUrlSystemBySideAndtype } from "../../core/customFunctions/initiSubSystem";
import { state } from "../../core/settings";
import {
  deleteActiveClassFromContainerRadioType,
  stringEndCuts,
} from "../Interface/interface";
import { updateTextParam } from "../Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";
import { generateRangeHTML } from "../Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/range/generateRange";
import "./portals.scss";

export const lightRange = [
  {
    title: "Spacing",
    min: 2,
    max: 8,
    step: 1,
    thumb: true,
    initialValue: state.spacing,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const shadesRange = [
  {
    title: "Shades",
    min: 1,
    labelMin: "0",
    max: 90,
    step: 1,
    thumb: false,
    initialValue: state.zipInput,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const bladeRotation = [
  {
    title: "Solid Roof Settings",
    min: 1,
    labelMin: "0",
    max: 90,
    step: 1,
    thumb: false,
    initialValue: state.currentRotationZ,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const slidingDoorRotation = [
  {
    title: "Sliding Door",
    min: 1,
    labelMin: "Close",
    max: 100,
    labelMax: "Open",
    step: 1,
    thumb: false,
    initialValue: state.slidingDoorInput,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const zipShadeRange = [
  {
    title: "zip",
    min: 1,
    labelMin: "Open",
    max: 100,
    labelMax: "Close",
    step: 1,
    thumb: true,
    initialValue: state.zipInput,
    labelValue: `${state.zipInput}%`,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const biFoldDoorRange = [
  {
    title: "bi-fold",
    min: 1,
    labelMin: "Close",
    max: 100,
    labelMax: "Open",
    step: 1,
    thumb: false,
    initialValue: state.biFoldDoorInput,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const slidingShutters = [
  {
    title: "Open",
    min: 1,
    labelMin: "Close",
    max: 100,
    labelMax: "Open",
    step: 1,
    thumb: false,
    initialValue: state.slidingShuttersInput,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const shuttersRotate = [
  {
    title: "Rotate",
    min: 1,
    labelMin: "0",
    max: 180,
    labelMax: "180",
    step: 1,
    thumb: false,
    initialValue: state.slidingShuttersRotate,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const fixShuttersRotate = [
  {
    title: "Rotate",
    min: 1,
    labelMin: "0",
    max: 180,
    labelMax: "180",
    step: 1,
    thumb: false,
    initialValue: state.slidingFixShuttersRotate,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const biFoldShatters = [
  {
    title: "Open",
    min: 1,
    labelMin: "Close",
    max: 100,
    labelMax: "Open",
    step: 1,
    thumb: false,
    initialValue: state.biFoldDoorShattersInput,
    showLabels: true,
    showSwitchAngle: false,
  },
];

export const biFoldShattersRotate = [
  {
    title: "Rotate",
    min: 1,
    labelMin: "0",
    max: 100,
    labelMax: "180",
    step: 1,
    thumb: false,
    initialValue: state.biFoldDoorShattersRotate,
    showLabels: true,
    showSwitchAngle: false,
  },
];

function createHandleRange(
  compare,
  portalContainer,
  stateKey,
  inputSelector = ".range__input"
) {
  if (compare) {
    const $rangeInput = portalContainer.find(inputSelector);

    // ✅ INIT
    $rangeInput.val(state[stateKey]);

    const min = parseInt($rangeInput.attr("min"), 10);
    const max = parseInt($rangeInput.attr("max"), 10);
    const value = parseInt($rangeInput.val(), 10);

    // ✅ INIT BG
    const percentValue =
      Math.round(((value - min) / (max - min)) * 100 * 100) / 100;
    $rangeInput.css(
      "background",
      `linear-gradient(to right, #0B70A2 ${percentValue}%, #0B70A24D ${percentValue}%)`
    );

    // ✅ INIT thumb
    const $rangeThumbValue = portalContainer.find("#range__thumb-value");

    const borderForHide = 2;

    if ($rangeThumbValue) {
      if (
        (value >= min &&
          value <= min + borderForHide &&
          max - min > borderForHide * 2) ||
        (value >= max - borderForHide &&
          value <= max &&
          max - min > borderForHide * 2)
      ) {
        $rangeThumbValue.hide();
      } else {
        $rangeThumbValue.show();
        $rangeThumbValue.text(`${value}%`);

        const percent = ((value - min) / (max - min)) * 100;
        const thumbOffset = $rangeThumbValue.outerWidth() / 2;
        $rangeThumbValue.css("left", `calc(${percent}% - ${thumbOffset}px)`);
      }

      if (value === min || value === max) {
        $rangeThumbValue.hide();
      }
    }

    // ✅ HANDLE "input"
    $rangeInput.on("input", function (event) {
      const $rangeInput = $(this);
      state[stateKey] = +event.target.value;

      const min = parseInt($rangeInput.attr("min"), 10);
      const max = parseInt($rangeInput.attr("max"), 10);
      const value = parseInt($rangeInput.val(), 10);

      const percentValue =
        Math.round(((value - min) / (max - min)) * 100 * 100) / 100;

      $rangeInput.css(
        "background",
        `linear-gradient(to right, #0B70A2 ${percentValue}%, #0B70A24D ${percentValue}%)`
      );

      const $rangeThumbValue = portalContainer.find("#range__thumb-value");

      if ($rangeThumbValue) {
        if (
          (value >= min &&
            value <= min + borderForHide &&
            max - min > borderForHide * 2) ||
          (value >= max - borderForHide &&
            value <= max &&
            max - min > borderForHide * 2)
        ) {
          $rangeThumbValue.hide();
        } else {
          $rangeThumbValue.show();
          $rangeThumbValue.text(`${value}%`);

          const percent = ((value - min) / (max - min)) * 100;
          const thumbOffset = $rangeThumbValue.outerWidth() / 2;
          $rangeThumbValue.css("left", `calc(${percent}% - ${thumbOffset}px)`);
        }

        if (value === min || value === max) {
          $rangeThumbValue.hide();
        }
      }

      pergola.update();
    });
  }
}

function removeHandle(
  portalContainer,
  portalContentTitle,
  key,
  indexOfMenu,
  typeIndex
) {
  portalContainer.find(".portal-container__remove").on("click", function () {
    const moodLight = $(".type_interface_electronic")
      .find(".option")
      .eq(indexOfMenu);

    moodLight.removeClass("type_interface_electronic_item--active");

    state[key] = false;
    state.electro.delete(portalContentTitle);

    updateTextParam(state, moodLight, true);

    hideIcon(typeIndex);

    $(".portal-container").hide();

    state.currentActiveSystems = null;

    $(".interface-container").removeClass("interface-container-portal");

    pergola.update();
  });
}

export function removeHandleSystem(
  portalContainer,
  portalContentTitle,
  key,
  indexOfMenu,
  typeIndex
) {
  portalContainer.find(".portal-container__remove").on("click", function () {
    const privacyWall = $(".icon_container .sun__icon-active--1");
    // const autoShade = $(".icon_container .sun__icon-active--0");
    let lastSpan = null;

    state.currentActiveSystems = privacyWall.length ? 1 : 0;

    // console.log(privacyWall, autoShade);

    if (state.lastSpan) {
      lastSpan = pergola.getLastActiveSpan(
        state.currentActiveSystems,
        state.lastSpan.side,
        state.lastSpan.number
      )[0];
    } else {
      lastSpan = pergola.getLastActiveSpan(state.currentActiveSystems)[0];
    }

    pergola.removeSystemFromSpan(lastSpan);

    removeFromUrlSystemBySideAndtype(
      lastSpan.side,
      state.currentActiveSystems,
      lastSpan.number
    );

    state.lastSpan = null;

    if (!pergola.checkSystemInAllSpans(state.currentActiveSystems)) {
      hideIcon(typeIndex);
      $(".portal-container").hide();

      const subSystems = $("#last-group").find(
        `#${state.currentActiveSystems}`
      );

      console.log(subSystems, "REMOVED OPTION");

      subSystems.removeClass("type_interface_electronic_item--active");

      state[key].delete(portalContentTitle);

      subSystems
        .closest(".interface__group")
        .find(".interface__group__head__param")
        .text(`${updateTextParam(state, this, true, true, true)}`);

      state.currentActiveSystems = null;
    } else {
      $(".portal-container__close").trigger("click");
    }

    $(".interface-container").removeClass("interface-container-portal");
    pergola.update();
  });
}

export const typePortalOption = {
  "LED Lights": "LED Lights",
  "Mood Light": "Mood Light",
  Fans: "Fans",
  Heaters: "Heaters",
};

export function portalComponent() {
  const bladeRange = generateRangeHTML(bladeRotation[0]).html();
  const zipRange = generateRangeHTML(zipShadeRange[0]).html();
  const slidingDoorRange = generateRangeHTML(slidingDoorRotation[0]).html();
  const biFoldRange = generateRangeHTML(biFoldDoorRange[0]).html();
  const slidingShuttersRange = generateRangeHTML(slidingShutters[0]).html();
  const shuttersRotateRange = generateRangeHTML(shuttersRotate[0]).html();
  const fixShuttersRotateRange = generateRangeHTML(fixShuttersRotate[0]).html();
  const biFoldShattersRange = generateRangeHTML(biFoldShatters[0]).html();
  const biFoldShattersRotateRange = generateRangeHTML(
    biFoldShattersRotate[0]
  ).html();

  const modelId = $("#ar_model_viewer");
  const mainContent = $("#content");

  function portalGenerete() {
    const existingPortal = mainContent.find(".portal-container");

    if (existingPortal.length > 0) {
      existingPortal.remove();
    }

    let portaInnerHtml = "";

    switch (state.portalOption) {
      case 7:
        portaInnerHtml = `
          <h3 class="portal-container__title">Mood Light</h3>
            <div class="type_interface_colors-buttons-led">
            <h3  class="portal-container__title__sub-title">Color</h3>
           
            <div class="type_interface_colors-buttons-led__options">
               <div class="type_interface_colors-buttons-led__item option">
                <label class="type_interface_colors-buttons-led__label">
                    <div class="image-container" style="background-color: #ffffff">
                    </div>
                    <span class="color-name">White</span>
                    <input class="type_interface_colors-buttons-led__option" type="radio" id="C34Bronze" name="fav_language" value="Oak">
                </label>
            </div>

            <div class="type_interface_colors-buttons-led__item option">
                <label class="type_interface_colors-buttons-led__label">
                    <div class="image-container" style="background-color: #FAFFC4">
                    </div>
                    <span class="color-name">Yellow</span>
                    <input class="type_interface_colors-buttons-led__option" type="radio" id="C34Bronze" name="fav_language" value="Oak">
                </label>
            </div>
            </div>
         
            <div class="colors_picker_container">
                <div id="color-box" class="colors_picker_color" style="background-color: ${state.colorLed}">
                </div>
                
                <div class="colors_picker_button" id="color-picker">
                    Color Picker
                </div>
        
                <div id="color-picker-container"></div>
            </div>
        </div>

           

          <span class="portal-container__remove">Remove</span>
        `;
        break;

      case 6:
        portaInnerHtml = `
          <h3 class="portal-container__title">LED Lights</h3>
            <h3  class="portal-container__title__sub-title">Frequency</h3>

            <div class="main_container">
            <div class="text">Every</div>

            <ul class="radio__container">
              <li class="radio__container__item ">
                <div class="radio__container__item__cyrcle"></div>

                <span class="radio__container__item__text">3</span>
              </li>

              <li class="radio__container__item">
                <div class="radio__container__item__cyrcle"></div>

                <span class="radio__container__item__text">4</span>
              </li>

              <li class="radio__container__item">
                <div class="radio__container__item__cyrcle"></div>

                <span class="radio__container__item__text">5</span>
              </li>
            </ul>

            <div class="text">louvers</div>
            </div>
          <span class="portal-container__remove">Remove</span>
        `;
        break;

      case pergolaConst.systemType.autoShade:
        portaInnerHtml = `
          <h3 class="portal-container__title">${pergolaConst.systemNameString.autoShade}</h3>

          <div class="portal-container__range" id="zip-range_wrap">
          ${zipRange}
          </div>

          <span class="portal-container__remove">Remove</span>
        `;
        break;

      case pergolaConst.systemType.privacyWall:
        portaInnerHtml = `
          <h3 class="portal-container__title">${pergolaConst.systemNameString.privacyWall}</h3>

          <div class="main_container" style="margin: 0" id="slats_radio">
            <div class="canvas_menu__title">Spacing</div>

            <ul class="radio__container">
              <li class="radio__container__item ">
                <div class="radio__container__item__cyrcle"></div>

                <span class="radio__container__item__text" id="30">No</span>
              </li>

              <li class="radio__container__item">
                <div class="radio__container__item__cyrcle"></div>

                <span class="radio__container__item__text" id="60">1.7"</span>
              </li>
            </ul>
          </div>

          <span class="portal-container__remove">Remove</span>
        `;
        break;

      case 10:
        portaInnerHtml = `
          <div class="info-pop" id="disable-thickness-massage">
           ${state.thickness}" roof thickness is available only for pergolas under ${state.length} feet in length.
          </div>

          <h3 class="portal-container__title">${bladeRotation[0].title}</h3>

            <div class="radio-inputs"> 
                 <div class="main_container" style="margin-bottom: 20px" id="beam-size">
                  <div class="canvas_menu__title">Beam Size:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0" data-text="This option is available only with Elitewood">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">Elitewood</span>
                     </li>
      
                     <li class="radio__container__item" id="1" data-text="Classic beams can't be selected when Pergola Wrap Kit is active">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">Classic</span>
                    </li>
                  </ul>
                 </div>
            </div>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 20px 0" id="thickness">
                  <div class="canvas_menu__title">Thickness:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="3" data-text="Not available when pergola length exceeds 17 ft">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">3"</span>
                     </li>
      
                     <li class="radio__container__item" id="4" data-text="Not available when pergola length exceeds 20 ft">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">4"</span>
                    </li>

                     <li class="radio__container__item" id="6" data-text="Only available when pergola length is between 20-24 ft">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">6"</span>
                    </li>
                  </ul>
                 </div>
            </div>

              <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 20px 0" id="rafter">
                  <div class="canvas_menu__title">Rafter:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0"  data-text="Rafters appear only when Tails are enabled">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text" >Single</span>
                     </li>
      
                     <li class="radio__container__item" id="1" data-text="Rafters appear only when Tails are enabled">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">Double</span>
                    </li>
                  </ul>
                 </div>
              </div>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 0" id="gutter">
                  <div class="canvas_menu__title">Gutter:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text" >Scupper</span>
                     </li>
      
                     <li class="radio__container__item" id="1">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">Down Spout</span>
                    </li>
                  </ul>
                 </div>
            </div>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 20px 0; display: block;" id="overhang">
                  <div class="canvas_menu__title" style="width: fit-content; margin-bottom: 10px">Roof Overhang:</div>

                  <ul class="radio__container" style="justify-content: space-between;">
                    <li class="radio__container__item" id="16">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text" >12"</span>
                     </li>
      
                     <li class="radio__container__item" id="20">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">16"</span>
                    </li>

                     <li class="radio__container__item" id="24">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text" >20"</span>
                    </li>

                     <li class="radio__container__item" id="28">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">24"</span>
                    </li>
                  </ul>
                 </div>
            </div>


            <div class="select-inputs"  style="display: flex; gap: 20px;">
                <div class="type_interface_checkbox-wall_item option" id="wrap-kit" style="width: fit-content;" data-text="This option is available only with Elitewood"> 
                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="back" style="white-space: nowrap;">Pergola Wrap Kit</label>
                  </div> 
                </div>

               <div class="type_interface_checkbox-wall_item option" id="skylight"  style="width: fit-content;" data-text="Skylight isn't available for smaller pergolas"> 
                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="back">Skylight</label>
                  </div> 
                </div>

               <div class="type_interface_checkbox-wall_item option" id="tails"  style="width: fit-content;" data-text="Turn on Pergola Wrap Kit to use Tails"> 
                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="back">Tails</label>
                  </div> 
                </div>
             </div>
            
            <div class="select-inputs" style="margin-top: 20px" data-text="End Cut is available only with Elitewood">
              <form class="type_interface_radio-model" id="end-cuts">
                                 <div class="type_interface_radio-model_item option" id="1">
                                   <input data-value="0" class="type_interface_radio-model_option ends-cut--bevel" 
                                       type="radio" name="fav_language" value="${stringEndCuts[0]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="shade">${stringEndCuts[0]}</label>
                                 </div>
               
                                 <div class="type_interface_radio-model_item option" id="2">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--mitre" 
                                       type="radio" name="fav_language" value="${stringEndCuts[1]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[1]}</label>
                                 </div>
               
                                 <div class="type_interface_radio-model_item option" id="3">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--corbel" 
                                       type="radio" name="fav_language" value="${stringEndCuts[2]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[2]}</label>
                                 </div>
             
                                 <div class="type_interface_radio-model_item option" id="4">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--scallop" 
                                       type="radio" name="fav_language" value="${stringEndCuts[3]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[3]}</label>
                                 </div>
                               </form>
            </div>
        `;

        break;

      case 11:
        portaInnerHtml = `
          <h3 class="portal-container__title" style="margin-bottom: 20px">Lattice Roof Settings</h3>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 0" id="spacing">
                  <div class="canvas_menu__title">Spacing</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="1">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">1"</span>
                     </li>
      
                     <li class="radio__container__item" id="2">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">2"</span>
                    </li>
                  </ul>
                 </div>
            </div>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 20px 0" id="thickness">
                  <div class="canvas_menu__title">Thickness:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">2"x2"</span>
                     </li>
      
                     <li class="radio__container__item" id="1">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">3"x3"</span>
                    </li>
                  </ul>
                 </div>
            </div>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 20px 0" id="rafter">
                  <div class="canvas_menu__title">Rafter:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0" data-text="Rafters appear only when Tails are enabled">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text" >Single</span>
                     </li>
      
                     <li class="radio__container__item" id="1" data-text="Rafters appear only when Tails are enabled">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">Double</span>
                    </li>
                  </ul>
                 </div>
            </div>

           <div class="canvas_menu_switch_container">
            <div class="canvas_menu__title">Direction</div>

            <div class="switch-container">
              <div class="switch-container-sign"></div>

              <label class="switch-rot">
                <input type="checkbox" id="switchButton">
              </label>

              <div class="switch-container-sign switch-container-sign--right"></div>
            </div>
           </div>

             <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 20px 0; display: block;" id="overhang">
                  <div class="canvas_menu__title" style="width: fit-content; margin-bottom: 10px">Roof Overhang:</div>

                  <ul class="radio__container" style="justify-content: space-between;">
                    <li class="radio__container__item" id="16">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text" >12"</span>
                     </li>
      
                     <li class="radio__container__item" id="20">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">16"</span>
                    </li>

                     <li class="radio__container__item" id="24">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text" >20"</span>
                    </li>

                     <li class="radio__container__item" id="28">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">24"</span>
                    </li>
                  </ul>
                 </div>
            </div>

              <div class="select-inputs"  style="display: flex; gap: 20px">
                 <div class="type_interface_checkbox-wall_item option" id="rain" style="width: fit-content;"> 
                    <div class="type_interface_checkbox-wall_bottom">
                      <input class="type_interface_checkbox-wall_option" type="checkbox">
                      <label for="back">Rain Shield</label>
                    </div> 
                  </div>

                 <div class="type_interface_checkbox-wall_item option" id="remove-lettice"  style="width: fit-content;"> 
                    <div class="type_interface_checkbox-wall_bottom">
                      <input class="type_interface_checkbox-wall_option" type="checkbox">
                      <label for="back">Remove Lattice</label>
                    </div> 
                  </div>
              </div>

                <div class="select-inputs" style="margin-top: 20px" data-text="End Cut is available only with Elitewood">
              <form class="type_interface_radio-model" id="end-cuts">
                                 <div class="type_interface_radio-model_item option" id="1">
                                   <input data-value="0" class="type_interface_radio-model_option ends-cut--bevel" 
                                       type="radio" name="fav_language" value="${stringEndCuts[0]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="shade">${stringEndCuts[0]}</label>
                                 </div>
               
                                 <div class="type_interface_radio-model_item option" id="2">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--mitre" 
                                       type="radio" name="fav_language" value="${stringEndCuts[1]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[1]}</label>
                                 </div>
               
                                 <div class="type_interface_radio-model_item option" id="3">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--corbel" 
                                       type="radio" name="fav_language" value="${stringEndCuts[2]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[2]}</label>
                                 </div>
             
                                 <div class="type_interface_radio-model_item option" id="4">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--scallop" 
                                       type="radio" name="fav_language" value="${stringEndCuts[3]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[3]}</label>
                                 </div>
                               </form>
            </div>
        `;

        break;

      case 12:
        portaInnerHtml = `
            <h3 class="portal-container__title">Combo Roof Settings</h3>
  
              <div class="radio-inputs"> 
                 <div class="main_container" style="margin-bottom: 20px" id="beam-size">
                  <div class="canvas_menu__title">Beam Size:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">Elitewood</span>
                     </li>
      
                     <li class="radio__container__item" id="1">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">Classic</span>
                    </li>
                  </ul>
                 </div>
            </div>
            
            <p class="portal_sub-title">Lattice</p>

              <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 10px 0 10px 0" id="thickness">
                  <div class="canvas_menu__title">Thickness:</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="0">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">2"x2"</span>
                     </li>
      
                     <li class="radio__container__item" id="1">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">3"x3"</span>
                    </li>
                  </ul>
                 </div>
              </div>
  
              <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 0 0 20px 0" id="spacing">
                  <div class="canvas_menu__title">Spacing</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="1">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">1"</span>
                     </li>
      
                     <li class="radio__container__item" id="2">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">2"</span>
                    </li>

                     <li class="radio__container__item" id="3">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">3"</span>
                    </li>
                  </ul>
                 </div>
              </div>

            <p class="portal_sub-title">Solid</p>
  
              <div class="select-inputs"  style="display: flex; gap: 20px;">
               <div class="type_interface_checkbox-wall_item option" id="skylight"  style="width: fit-content;"> 
                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="back">Skylight</label>
                  </div> 
                </div>
              </div>
  
               <div class="radio-inputs"> 
                   <div class="main_container" style="margin: 10px 0 0 0; display: block;" id="overhang">
                    <div class="canvas_menu__title" style="width: fit-content; margin-bottom: 10px">Roof Overhang:</div>
  
                    <ul class="radio__container" style="justify-content: space-between;">
                      <li class="radio__container__item" id="16">
                        <div class="radio__container__item__cyrcle"></div>
  
                        <span class="radio__container__item__text" >12"</span>
                       </li>
        
                       <li class="radio__container__item" id="20">
                         <div class="radio__container__item__cyrcle"></div>
        
                         <span class="radio__container__item__text">16"</span>
                      </li>
  
                       <li class="radio__container__item" id="24">
                         <div class="radio__container__item__cyrcle"></div>
        
                         <span class="radio__container__item__text" >20"</span>
                      </li>
  
                       <li class="radio__container__item" id="28">
                         <div class="radio__container__item__cyrcle"></div>
        
                         <span class="radio__container__item__text">24"</span>
                      </li>
                    </ul>
                   </div>
              </div>

                <div class="select-inputs" style="margin-top: 20px" data-text="End Cut is available only with Elitewood">
              <form class="type_interface_radio-model" id="end-cuts">
                                 <div class="type_interface_radio-model_item option" id="1">
                                   <input data-value="0" class="type_interface_radio-model_option ends-cut--bevel" 
                                       type="radio" name="fav_language" value="${stringEndCuts[0]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="shade">${stringEndCuts[0]}</label>
                                 </div>
               
                                 <div class="type_interface_radio-model_item option" id="2">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--mitre" 
                                       type="radio" name="fav_language" value="${stringEndCuts[1]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[1]}</label>
                                 </div>
               
                                 <div class="type_interface_radio-model_item option" id="3">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--corbel" 
                                       type="radio" name="fav_language" value="${stringEndCuts[2]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[2]}</label>
                                 </div>
             
                                 <div class="type_interface_radio-model_item option" id="4">
                                   <input data-value="1" class="type_interface_radio-model_option ends-cut--scallop" 
                                       type="radio" name="fav_language" value="${stringEndCuts[3]}"
                                       style="height: 60px"
                                       >
                                   <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[3]}</label>
                                 </div>
                               </form>
            </div>
          `;

        break;

      default:
        break;
    }

    const portalContent = $(`
      <div class="portal-container">
        <div class="portal-container-wrapp">
          <span class="portal-container__close"></span>
          ${portaInnerHtml}
        </div>
      </div>
    `);

    const portalContentTitle = portalContent
      .find(`.portal-container__title`)
      .text();

    const activeColorClass = "type_interface_colors-buttons-led__item--active";

    //#region BLADE ROTATION
    if (bladeRotation[0].title === portalContentTitle) {
      createHandleRange(
        bladeRotation[0].title === portalContentTitle,
        portalContent,
        "currentRotationZ"
      );

      //INIT SWITCH ROOF Equinox
      if (state.directionRoof) {
        portalContent.find("#switchButton").addClass("switchButton-active");
      } else {
        portalContent.find("#switchButton").removeClass("switchButton-active");
      }

      //HANDLE SWITCH ROOF Equinox
      portalContent.find("#switchButton").on("click", () => {
        state.directionRoof = !state.directionRoof;

        portalContent.find("#switchButton").toggleClass("switchButton-active");

        pergola.update();
      });

      //#endregion
    }

    //#endregion

    //#region LETTICE PORTAL || SOLID ROOF || COMBP
    if (
      "Lattice Roof Settings" === portalContentTitle ||
      bladeRotation[0].title === portalContentTitle ||
      "Combo Roof Settings"
    ) {
      // #region END-CUTS
      // INIT END CUTS
      portalContent.find("#end-cuts .option").each(function () {
        const id = +$(this).attr("id");

        if (id === state.endCuts) {
          $(this).addClass("active");

          setTimeout(() => {
            $(this)
              .closest(".interface__group")
              .find(".interface__group__head__param")
              .text($(this).find("input").val());
          }, 0);
        }
      });

      //#region HANDLE END CUTS
      portalContent.find("#end-cuts .option").on("click", function () {
        if ($(this).closest(".select-inputs").hasClass("disable")) {
          return;
        }
        const parentItem = $(this).closest(".type_interface_radio-model_item");
        const id = +$(this).attr("id");

        state.endCuts = id;

        portalContent.find("#end-cuts .option").removeClass("active");

        parentItem.addClass("active");

        $(parentItem)
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text($(this).find("input").val());

        pergola.setAddOptionWall();

        pergola.update();
      });
      //#endregion

      // #endregion

      // #region INIT Rain
      portalContent.find("#rain").each(function () {
        if (state.rain) {
          $(this).addClass("active");
        }

        if (state.wallOption === 2) {
          $(this).addClass("disable");
        }

        pergola.update();
      });
      //  #endregion

      // #region INIT SkyLight
      portalContent.find("#skylight").each(function () {
        if (state.skyLight) {
          $(this).addClass("active");
        }

        if (state.width < 10) {
          $(this).addClass("disable");
          $(this).removeClass("active");
          state.skyLight = false;
        }

        pergola.update();
      });
      //  #endregion

      // #region INIT Tails
      portalContent.find("#tails").each(function () {
        if (!state.wrapKit) {
          portalContent.find("#tails").addClass("disable");
        }

        if (state.tails) {
          $(this).addClass("active");
        }

        pergola.update();
      });
      //  #endregion

      // #region INIT Wrap-kit
      portalContent.find("#wrap-kit").each(function () {
        if (state.wrapKit) {
          $(this).addClass("active");
        }

        if (state.wrapKit) {
          portalContent
            .find("#beam-size .radio__container__item")
            .eq(1)
            .addClass("disable");
        }

        pergola.update();
      });
      //  #endregion

      // #region INIT Remove lattice
      portalContent.find("#remove-lettice").each(function () {
        if (state.removeLettice) {
          $(this).addClass("active");
        }

        pergola.update();
      });
      //  #endregion

      // #region INIT Direction
      portalContent.find("#switchButton").each(function () {
        if (state.directionRoof) {
          $(this).addClass("switchButton-active");
        }

        pergola.update();
      });
      //  #endregion

      //#region INIT overhang
      portalContent
        .find("#overhang .radio__container__item ")
        .each(function () {
          const $input = $(this);
          const id = +$(this).attr("id");

          if (id === state.overhang) {
            $input.addClass("active");
          }
        });
      //#endregion

      //#region INIT gutter
      portalContent.find("#gutter .radio__container__item").each(function () {
        const $input = $(this);
        const id = +$(this).attr("id");

        if (id === state.gutter) {
          $input.addClass("active");
        }
      });
      //#endregion

      //#region INIT beam-size
      portalContent
        .find("#beam-size .radio__container__item ")
        .each(function () {
          const $input = $(this);
          const id = +$(this).attr("id");

          if (id === state.beamSize) {
            $input.addClass("active");
          }

          if (state.beamSize) {
            portalContent.find("#wrap-kit").addClass("disable");
            portalContent
              .find("#end-cuts")
              .closest(".select-inputs")
              .addClass("disable");
          }
        });

      //#endregion

      //#region INIT RAFTER
      portalContent.find("#rafter .radio__container__item ").each(function () {
        const $input = $(this);
        const id = +$(this).attr("id");

        // LOGIC SOLID
        if (!state.tails && state.roofType === 1) {
          $input.addClass("disable");

          state.rafter = 0;
        }

        if (id === state.rafter) {
          $input.addClass("active");
        }
      });
      //#endregion

      //#region INIT SPACING
      portalContent.find("#spacing .radio__container__item ").each(function () {
        const $input = $(this);
        const id = +$(this).attr("id");

        if (id === state.spacing) {
          $input.addClass("active");
        }
      });
      //#endregion

      //#region INIT thickness
      portalContent
        .find("#thickness .radio__container__item ")
        .each(function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$(this).attr("id");

          //LOGIC FOR SOLID
          if (state.roofType === 1) {
            switch (true) {
              case id === 3 && state.length > 16 && state.length <= 20:
                $input.addClass("disable");

                state.thickness = state.thickness === 3 ? 4 : state.thickness;
                break;

              case id === 3 && 20 < state.length:
              case id === 4 && 20 < state.length:
                $input.addClass("disable");
                state.thickness = 6;
                break;
            }
          }

          if (id === state.thickness) {
            $input.addClass("active");
          }
        });
      //#endregion

      //#region HANDLE SPACING
      portalContent
        .find("#spacing .radio__container__item ")
        .on("click", function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$(this).attr("id");

          state.spacing = id;

          //REMOVE ACTIVE CLASS
          portalContent
            .find("#spacing .radio__container__item")
            .each(function () {
              $(this).removeClass("active");
            });

          $input.addClass("active");

          pergola.update();
        });
      //#endregion

      //#region HANDLE thickness
      // #region handle disable option
      portalContent.find("#disable-thickness-massage").on("click", function () {
        $(this).css("visibility", "hidden");
      });
      // #endregion

      portalContent
        .find("#thickness")
        .on("click", ".radio__container__item", function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$input.attr("id");
          state.thickness = id;

          $("#disable-thickness-massage").css("visibility", "hidden");

          if ($input.hasClass("disable")) {
            const message = `${id}" roof thickness is available only for pergolas under ${state.length} feet in length.`;

            $("#disable-thickness-massage").text(message);
            $("#disable-thickness-massage").css("visibility", "visible");

            return;
          }

          portalContent
            .find("#thickness .radio__container__item")
            .removeClass("active");

          $input.addClass("active");

          pergola.update();
        });
      //#endregion

      //#region HANDLE rafter
      portalContent
        .find("#rafter .radio__container__item ")
        .on("click", function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$(this).attr("id");

          state.rafter = id;

          if ($input.hasClass("disable")) {
            return;
          }

          //REMOVE ACTIVE CLASS
          portalContent
            .find("#rafter .radio__container__item")
            .each(function () {
              $(this).removeClass("active");
            });

          $input.addClass("active");

          pergola.update();
        });
      //#endregion

      //#region HANDLE overhang
      portalContent
        .find("#overhang .radio__container__item ")
        .on("click", function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$(this).attr("id");

          state.overhang = id;

          //REMOVE ACTIVE CLASS
          portalContent
            .find("#overhang .radio__container__item")
            .each(function () {
              $(this).removeClass("active");
            });

          $input.addClass("active");

          pergola.update();
        });
      //#endregion

      //#region HANDLE beam-size
      portalContent
        .find("#beam-size .radio__container__item")
        .on("click", function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$(this).attr("id");
          portalContent.find("#wrap-kit").removeClass("disable");
          portalContent
            .find("#end-cuts")
            .closest(".select-inputs")
            .removeClass("disable");

          state.beamSize = id;

          //REMOVE ACTIVE CLASS
          portalContent
            .find("#beam-size .radio__container__item")
            .each(function () {
              $(this).removeClass("active");
            });

          if (state.beamSize) {
            state.endCuts = 1;

            portalContent
              .find("#end-cuts")
              .closest(".select-inputs")
              .addClass("disable");

            portalContent
              .find("#end-cuts .option")
              .removeClass("active")
              .eq(0)
              .addClass("active");

            portalContent
              .find("#end-cuts .option")
              .eq(0)
              .closest(".interface__group")
              .find(".interface__group__head__param")
              .text($("#end-cuts .option").eq(0).find("input").val());

            portalContent.find("#wrap-kit").addClass("disable");
          }

          $input.addClass("active");

          pergola.setAddOptionWall();
          pergola.update();
        });
      //#endregion

      //#region HANDLE gutter
      portalContent
        .find("#gutter .radio__container__item")
        .on("click", function () {
          if ($(this).hasClass("disable")) {
            return;
          }

          const $input = $(this);
          const id = +$(this).attr("id");

          state.gutter = id;

          //REMOVE ACTIVE CLASS
          portalContent
            .find("#gutter .radio__container__item")
            .each(function () {
              $(this).removeClass("active");
            });

          $input.addClass("active");

          pergola.update();
        });
      //#endregion

      //#region HANDLE remove lettice
      portalContent.find("#remove-lettice").on("click", function () {
        if ($(this).hasClass("disable")) {
          return;
        }

        const $input = $(this);

        $input.toggleClass("active");

        state.removeLettice = !state.removeLettice;

        // if (state.removeLettice) {
        //   portalContent.find("#rain").addClass("disable");
        //   portalContent.find("#rain").removeClass("active");
        //   state.rain = false;
        // } else {
        //   portalContent.find("#rain").removeClass("disable");
        // }

        pergola.update();
      });
      //#endregion

      //#region HANDLE SkyLight
      portalContent.find("#skylight").on("click", function () {
        if ($(this).hasClass("disable")) {
          return;
        }

        const $input = $(this);

        $input.toggleClass("active");

        state.skyLight = !state.skyLight;

        pergola.update();
      });
      //#endregion

      //#region HANDLE Tails
      portalContent.find("#tails").on("click", function () {
        if ($(this).hasClass("disable")) {
          return;
        }
        const $input = $(this);

        $input.toggleClass("active");

        state.tails = !state.tails;

        if (state.roofType === 1) {
          portalContent
            .find("#rafter .radio__container__item")
            .each(function () {
              const $input = $(this);
              const id = +$(this).attr("id");

              $input.removeClass("disable");
              $input.removeClass("active");

              if (!state.tails) {
                $input.addClass("disable");

                state.rafter = 0;
              }

              if (id === state.rafter) {
                $input.addClass("active");
              }
            });
        }

        pergola.update();
      });
      //#endregion

      //#region HANDLE Wrap-kit
      portalContent.find("#wrap-kit").on("click", function () {
        if ($(this).hasClass("disable")) {
          return;
        }
        const $input = $(this);

        $input.toggleClass("active");

        state.wrapKit = !state.wrapKit;

        if (state.wrapKit) {
          portalContent.find("#tails").removeClass("disable");
          portalContent
            .find("#beam-size .radio__container__item")
            .eq(1)
            .addClass("disable");
        } else {
          portalContent
            .find("#tails")
            .addClass("disable")
            .removeClass("active");

          portalContent
            .find("#beam-size .radio__container__item")
            .eq(1)
            .removeClass("disable");

          state.tails = false;
        }

        pergola.update();
      });
      //#endregion

      //#region HANDLE rain
      portalContent.find("#rain").on("click", function () {
        if ($(this).hasClass("disable")) {
          return;
        }
        const $input = $(this);

        $input.toggleClass("active");

        state.rain = !state.rain;

        pergola.update();
      });
      //#endregion

      //#region HANDLE direction
      portalContent.find("#switchButton").on("click", function () {
        const $input = $(this);

        $input.toggleClass("switchButton-active");

        state.directionRoof = !state.directionRoof;

        pergola.setAddOptionWall();
        pergola.update();
      });
      //#endregion

      //#region REMOVE BUTTON
      // removeHandle(portalContent, portalContentTitle, "moodLight", 1, 7);
      //#endregion

      //#region HANDLE COLOR PICKER
      let pickr;

      portalContent.find("#color-box").css("background-color", state.colorLed);

      portalContent.find("#color-picker").on("click", function () {
        if (!pickr) {
          pickr = Pickr.create({
            el: "#color-picker-container",
            theme: "classic",
            default: state.colorLed,

            components: {
              preview: false,
              opacity: false,
              hue: true,
              interaction: {
                hex: false,
                rgba: false,
                input: false,
              },
            },
          });

          pickr.on("change", (color) => {
            const selectedColor = color.toHEXA().toString();
            state.colorLed = selectedColor;

            if (mesh && mesh.material) {
              mesh.material.emissive.set(state.colorLed);

              mesh.children.forEach((child) => {
                if (child.material) {
                  child.material.emissive.set(state.colorLed);
                }
              });
            }

            portalContent
              .find("#color-box")
              .css("background-color", state.colorLed);

            deleteActiveClassFromContainerRadioType(
              portalContent,
              ".type_interface_colors-buttons-led__item",
              activeColorClass
            );

            pergola.update();
          });
        }

        pickr.show();
      });

      // #endregion
    }
    //#endregion

    //#region LED LIGHT
    if ("LED Lights" === portalContentTitle) {
      //#region INIT INPUT
      portalContent.find(".radio__container__item").each(function () {
        const louverGap = +$(this).find(".radio__container__item__text").text();

        if (state.spacing === louverGap) {
          $(this).closest(".radio__container__item").addClass("active");
        }
      });
      //#endregion

      //#region HANDLE INPUTS
      portalContent.find(".radio__container__item").on("click", function () {
        const louverGap = +$(this).find(".radio__container__item__text").text();

        state.spacing = louverGap;

        portalContent.find(".radio__container__item").each(function () {
          $(this).removeClass("active");
        });

        $(this).addClass("active");

        pergola.update();
      });
      //#endregion

      //#region REMOVE BUTTON

      // removeHandle(portalContent, portalContentTitle, "ledLights", 0, 6);
      //#endregion

      //#region HANDLE COLOR PICKER
      let pickr;

      portalContent.find("#color-picker").on("click", function () {
        if (!pickr) {
          pickr = Pickr.create({
            el: "#color-picker-container",
            theme: "classic",
            default: state.colorLed,

            components: {
              preview: false,
              opacity: false,
              hue: true,
              interaction: {
                hex: false,
                rgba: false,
                input: false,
              },
            },
          });

          pickr.on("change", (color) => {
            const selectedColor = color.toHEXA().toString();
            state.colorLed = selectedColor;

            if (mesh && mesh.material) {
              mesh.material.emissive.set(state.colorLed);

              mesh.children.forEach((child) => {
                if (child.material) {
                  child.material.emissive.set(state.colorLed);
                }
              });
            }

            deleteActiveClassFromContainerRadioType(
              portalContent,
              ".type_interface_colors-buttons-led__item",
              activeColorClass
            );
          });
        }

        pickr.show();
      });

      // #endregion
    }
    //#endregion

    //#region ZIP-SHADE
    if (pergolaConst.systemNameString.autoShade === portalContentTitle) {
      //#region INIT RANGE
      const $rangeThumbValue = portalContent.find("#range__thumb-value");

      $rangeThumbValue.text(`${state.zipInput}%`);
      //#endregion

      //#region INIT COLOR PICKER
      portalContent.find("#color-box").css("background-color", state.colorZip);
      //#endregion

      createHandleRange(true, portalContent, "zipInput");

      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        3,
        pergolaConst.systemType.autoShade
      );
    }

    //#endregion

    //#region PRIVACY WALL

    if (pergolaConst.systemNameString.privacyWall === portalContentTitle) {
      //#region SLATS SIZE INIT
      const items = portalContent.find(".radio__container__item");

      items.removeClass("active");

      if (!state.slatsSize) {
        items.eq(0).addClass("active");
      } else {
        items.eq(1).addClass("active");
      }
      //#endregion

      //#region SLATS SIZE HANDLE
      portalContent.find(".radio__container__item").on("click", function () {
        if ($(this).hasClass("active")) return;

        const size = $(this).find(".radio__container__item__text").attr("id");

        state.slatsSize = +size === 60;

        portalContent.find(".radio__container__item").removeClass("active");
        $(this).addClass("active");

        pergola.update();
      });
      //#endregion

      //REMOVE
      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        2,
        pergolaConst.systemType.privacyWall
      );
    }

    // #endregion

    //#enregion

    mainContent.append(portalContent);

    return portalContent;
  }

  const icons = $(`
    <div class="icon_wrap">
    <div class="left_button"></div>

    <div class="icon_container">
       <div class="sun__icon" id="7" data-value="Mood Light">
          <span class="sun__icon__img" id="light-n" style="
              background-image: url(public/img/icons/moodlight_icon.svg);
          "></span>
       </div>

        <div class="sun__icon heaters__icon" id="6" data-value="LED Lights">
          <span class="sun__icon__img" id="heaters-n" style="
              background-image: url(public/img/icons/led_light_icon.svg);
          "></span>
       </div>

       <div class="sun__icon shades__icon" id="${pergolaConst.systemType.autoShade}" data-value="${pergolaConst.systemNameString.autoShade}">
          <span class="sun__icon__img" id="shades-n" style="
              background-image: url(public/img/icons/auto_shade.svg);
          "></span>
       </div>

        <div class="sun__icon" id="${pergolaConst.systemType.sliding_doors}" data-value="Sliding Glass Door">
          <span class="sun__icon__img" id="light-n" style="
              background-image: url(public/img/icons/sliding-door.svg);
          "></span>
       </div>

       <div class="sun__icon screen__icon" id="${pergolaConst.systemType.fix_shutters}" data-value="Fixed Shutters">
          <span class="sun__icon__img" id="screen-n" style="
              background-image: url(public/img/icons/fixed-shutters.svg);
              background-position: center;
          "></span>
       </div>

       <div class="sun__icon shades__icon" id="${pergolaConst.systemType}" data-value="Bi-folding Glass Door">
          <span class="sun__icon__img" id="shades-n" style="
              background-image: url(public/img/icons/bi-doors_icon.svg);
          "></span>
       </div>

       <div class="sun__icon heaters__icon" id="${pergolaConst.systemType.sliding_shutters}" data-value="Sliding Shutters">
          <span class="sun__icon__img" style="
              background-image: url(public/img/icons/sliding-shutters_icon.svg);
          "></span>
       </div>

       <div class="sun__icon screen__icon" id="${pergolaConst.systemType.privacyWall}" data-value="${pergolaConst.systemNameString.privacyWall}">
          <span class="sun__icon__img" id="screen-n" style="
              background-image: url(public/img/icons/privacyWalls.svg);
              background-position: center;
          "></span>
       </div>

       <div class="sun__icon shades__icon" id="${pergolaConst.systemType.slats_frame}" data-value="Fixed Slats">
          <span class="sun__icon__img" id="shades-n" style="
              background-image: url(public/img/icons/privacyWalls.svg);
          "></span>
       </div>

       <div class="sun__icon heaters__icon" id="10" data-value="Solid Roof Settings">
          <span class="sun__icon__img" id="heaters-n" style="
              background-image: url(public/img/icons/roof.svg);
          "></span>
       </div>

       <div class="sun__icon heaters__icon" id="11" data-value="Lattice Roof Settings">
          <span class="sun__icon__img" id="heaters-n" style="
              background-image: url(public/img/icons/roof.svg);
          "></span>
       </div>

       <div class="sun__icon heaters__icon" id="12" data-value="Combo Roof Settings">
          <span class="sun__icon__img" id="heaters-n" style="
              background-image: url(public/img/icons/roof.svg);
          "></span>
       </div>
    </div> 

    <div class="right_button"></div>
    </div>
    `);

  modelId.append(icons);

  function scrollLogic() {
    const $iconContainer = $(".icon_container");
    const $leftButton = $(".left_button");
    const $rightButton = $(".right_button");

    function updateButtonVisibility() {
      $(".icon_container").removeClass("icon_container-mobile");

      if ($iconContainer.scrollLeft() === 0) {
        $leftButton.hide();
      } else {
        $leftButton.show();
        $(".icon_container").addClass("icon_container-mobile");
      }

      if (
        $iconContainer.scrollLeft() + $iconContainer.innerWidth() >=
        $iconContainer[0].scrollWidth - 1
      ) {
        $rightButton.hide();
      } else {
        $rightButton.show();
        $(".icon_container").addClass("icon_container-mobile");
      }
    }

    updateButtonVisibility();

    $leftButton.on("click", function () {
      $iconContainer.animate(
        { scrollLeft: "-=50" },
        100,
        updateButtonVisibility
      );
    });

    $rightButton.on("click", function () {
      $iconContainer.animate(
        { scrollLeft: "+=50" },
        100,
        updateButtonVisibility
      );
    });

    $iconContainer.on("scroll", updateButtonVisibility);
  }

  const activeClassNight = "night-mode";
  const activeClassDay = "day-mode";
  const daySwitch = modelId.find("#daySwitch");
  const nightSwitch = modelId.find("#nightSwitch");
  const toggleTime = modelId.find("#js-toggleDayNight");
  const icon = icons.find(".sun__icon");
  const portalLight = mainContent.find(".portal-light");

  const sunIcon = icons.find("#light");

  //#region INIT TIME SCENE
  if (state.dayMode) {
    toggleTime.removeClass("switch--hight");
    daySwitch.prop("checked", true);
    daySwitch.closest("label").addClass(activeClassDay);
    nightSwitch.closest("label").removeClass(activeClassNight);
    $("body").removeClass("night-mode").addClass("day-mode");

    modelId.find("#switchButton-time").removeClass("switchButton-active");

    // $("#js-showModalShare").removeClass("share-white");
    // $("#js-showModalQRcode").removeClass("ar-white");
    // $(".full-screen").removeClass("full-screen-white");
    // $(".sun__icon").removeClass("sun__icon--night");
    // $("#light-n").removeClass("light-n");
    // $("#screen-n").removeClass("screen-n");
    // $("#shades-n").removeClass("shades-n");
    // $("#heaters-n").removeClass("heaters-n");

    changeSceneTime("Day");
  } else {
    toggleTime.addClass("switch--hight");
    nightSwitch.prop("checked", true);
    nightSwitch.closest("label").addClass(activeClassNight);
    daySwitch.closest("label").removeClass(activeClassDay);
    $("body").removeClass("day-mode").addClass("night-mode");

    modelId.find("#switchButton-time").addClass("switchButton-active");

    // $("#js-showModalShare").addClass("share-white");
    // $("#js-showModalQRcode").addClass("ar-white");
    // $(".full-screen").addClass("full-screen-white");
    // $(".sun__icon").addClass("sun__icon--night");
    // $("#light-n").addClass("light-n");
    // $("#screen-n").addClass("screen-n");
    // $("#shades-n").addClass("shades-n");
    // $("#heaters-n").addClass("heaters-n");

    changeSceneTime("Night");
  }
  //#endregion

  //#region HANDLE TIME SCENE
  modelId.find("#switchButton-time").on("click", function () {
    state.dayMode = !state.dayMode;

    $(this).toggleClass("switchButton-active");
    // const isDay = daySwitch.is(":checked");

    if (state.dayMode) {
      toggleTime.removeClass("switch--hight");
      daySwitch.closest("label").addClass(activeClassDay);
      nightSwitch.closest("label").removeClass(activeClassNight);
      $("body").removeClass("night-mode").addClass("day-mode");

      changeSceneTime("Day");
    } else {
      toggleTime.addClass("switch--hight");
      nightSwitch.closest("label").addClass(activeClassNight);
      daySwitch.closest("label").removeClass(activeClassDay);
      $("body").removeClass("day-mode").addClass("night-mode");

      changeSceneTime("Night");
    }
  });
  //#endregion

  //#region ICON LOGIC
  // INIT POP-UP
  setTimeout(() => {
    icon.each(function () {
      const id = $(this).attr("id");
      const activeClass = `sun__icon-active--${id}`;

      if ($(this).hasClass(activeClass)) {
        $(this).trigger("click");
        return false;
      }
    });
  }, 500);

  icon.each(function () {
    const id = $(this).attr("id");

    $(this).on("click", function () {
      icon.each(function () {
        $(this).removeClass(function (index, className) {
          return (className.match(/sun__icon-active--\S+/g) || []).join(" ");
        });
      });

      state.portalOption = +id;

      //blade rotation
      if (+id !== 10 && +id !== 7 && +id !== 6 && +id !== 11 && +id !== 12) {
        state.currentActiveSystems = +id;
      } else {
        state.currentActiveSystems = null;
      }

      $(this).toggleClass(`sun__icon-active--${id}`);

      const portal = portalGenerete();

      const iconOffset = $(this).offset();

      $(".interface-container").addClass("interface-container-portal");

      const interfaceHeight = $(".interface-container").outerHeight();

      if ($(window).width() <= 1024) {
        portal.css({
          bottom: 0,
          top: "",
          left: "",
        });
      } else {
        const iconOffset = $(this).offset();
        portal.css({
          top: iconOffset.top + $(this).outerHeight() - 30,
          left: iconOffset.left,
          bottom: "",
        });
      }

      pergola.update();
    });
  });

  //#region CLOSE PORTAL
  $(document).on("click", ".portal-container__close", function () {
    $(".interface-container").removeClass("interface-container-portal");
    state.currentActiveSystems = null;

    const existingPortal = mainContent.find(".portal-container");

    if (existingPortal.length > 0) {
      existingPortal.remove();
    }

    icon.each(function () {
      $(this).removeClass(function (index, className) {
        return (className.match(/sun__icon-active--\S+/g) || []).join(" ");
      });
    });

    pergola.checkSystemsInScene();

    pergola.update();
  });

  // #endregion
  //#endregion

  //light range
  const customRange = generateRangeHTML(lightRange[0]);
  const customRangeShades = generateRangeHTML(shadesRange[0]);
  const rangeContainer = mainContent.find(".portal-light__range");
  const rangeContainerShades = mainContent.find(".portal-shades__range");
  const iconBlade = icons.find("#10");

  rangeContainer.append(customRange);
  rangeContainerShades.append(customRangeShades);

  // iconBlade.trigger("click");
  icon.hide();

  //DEFAULT BLADE POP UP
  // setTimeout(() => {
  //   if (state.roofType) {
  //     showIcon(10, true);
  //     $("#interface").addClass("interface-container-portal");
  //   }
  // }, 4000);

  scrollLogic();

  $(window).on("resize", function () {
    $(".icon_container").trigger("scroll");

    icon.each(function () {
      const id = $(this).attr("id");
      const activeClass = `sun__icon-active--${id}`;

      if ($(this).hasClass(activeClass)) {
        $(this).trigger("click");
        return false;
      }
    });
  });

  return { portal: portalLight, sunIcon };
}
