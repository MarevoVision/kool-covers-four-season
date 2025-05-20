import Pickr from "@simonwep/pickr";
import $ from "jquery";
import {
  changeSceneTime,
  GetGroup,
  hideIcon,
  pergola,
  pergolaConst,
  showIcon,
} from "../../core/3d-configurator";
import { removeFromUrlSystemBySideAndtype } from "../../core/customFunctions/initiSubSystem";
import { state } from "../../core/settings";
import { deleteActiveClassFromContainerRadioType } from "../Interface/interface";
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
    initialValue: state.recessedLighting,
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
    title: "Roof Settings",
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

function removeHandleSystem(
  portalContainer,
  portalContentTitle,
  key,
  indexOfMenu,
  typeIndex
) {
  portalContainer.find(".portal-container__remove").on("click", function () {
    const lastSpan = pergola.getLastActiveSpan(state.currentActiveSystems)[0];

    console.log(lastSpan);

    pergola.removeSystemFromSpan(lastSpan);

    removeFromUrlSystemBySideAndtype(
      lastSpan.side,
      state.currentActiveSystems,
      lastSpan.number
    );

    if (!pergola.checkSystemInAllSpans(state.currentActiveSystems)) {
      hideIcon(typeIndex);
      $(".portal-container").hide();

      const subSystems = $("#last-group").find(".option").eq(indexOfMenu);

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

      // case pergolaConst.systemType.sliding_doors:
      //   portaInnerHtml = `
      //     <h3 class="portal-container__title">${pergolaConst.systemNameString.sliding_doors}</h3>

      //     <div class="portal-container__range" id="sliding-door-range_wrap">
      //     ${slidingDoorRange}
      //     </div>

      //     <span class="portal-container__remove">Remove</span>
      //   `;
      //   break;

      // case pergolaConst.systemType.autoShade:
      //   portaInnerHtml = `
      //     <h3 class="portal-container__title">${pergolaConst.systemNameString.autoShade}</h3>

      //     <div class="portal-container__range" id="blade-range_wrap">
      //     ${shadesRange}
      //     </div>
      //     <span class="portal-container__remove">Remove</span>
      //   `;
      //   break;

      // case pergolaConst.systemType.sliding_shutters:
      //   portaInnerHtml = `
      //     <h3 class="portal-container__title">${pergolaConst.systemNameString.sliding_shutters}</h3>

      //     <div class="portal-container__range" id="sl-rotate-range_wrap">
      //      ${shuttersRotateRange}
      //     </div>

      //     <div class="portal-container__range" id="sl-open-range_wrap">
      //      ${slidingShuttersRange}
      //     </div>

      //     <span class="portal-container__remove">Remove</span>
      //   `;
      //   break;

      // case pergolaConst.systemType.fix_shutters:
      //   portaInnerHtml = `
      //     <h3 class="portal-container__title">${pergolaConst.systemNameString.fix_shutters}</h3>

      //     <div class="portal-container__range" id="sl-rotate-range_wrap">
      //      ${fixShuttersRotateRange}
      //     </div>

      //     <span class="portal-container__remove">Remove</span>
      //   `;
      //   break;

      // case pergolaConst.systemType.privacyWall:
      //   portaInnerHtml = `
      //     <h3 class="portal-container__title">${pergolaConst.systemNameString.bifold_shutters}</h3>

      //     <div class="portal-container__range" id="bs-open-range_wrap">
      //     ${biFoldShattersRange}
      //     </div>

      //     <div class="portal-container__range" id="bs-rotate-range_wrap">
      //     ${biFoldShattersRotateRange}
      //     </div>
      //     <span class="portal-container__remove">Remove</span>
      //   `;
      //   break;

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
          <h3 class="portal-container__title">${bladeRotation[0].title}</h3>

          <div class="canvas_menu__title canvas_menu__title--blade-r">Blade Rotation</div>

          <div class="portal-container__range" id="blade-range_wrap">
          ${bladeRange}
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
        `;

        break;

      default:
        break;
    }

    const portalContent = $(`
      <div class="portal-container">
        <span class="portal-container__close"></span>
        ${portaInnerHtml}
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

    //#region MOOD LIGHT
    if ("Mood Light" === portalContentTitle) {
      const mesh = GetGroup("base").children[1];

      //#region INIT INPUT
      portalContent
        .find(".type_interface_colors-buttons-led__item")
        .each(function () {
          const backgroundColor = pergola.rgbToHex(
            $(this)
              .closest(".type_interface_colors-buttons-led__item")
              .find(".image-container")
              .css("background-color")
          );

          if (state.colorLed === backgroundColor) {
            $(this)
              .closest(".type_interface_colors-buttons-led__item")
              .addClass(activeColorClass);
            $(this).prop("checked", true);
          }
        });
      //#endregion

      //#region HANDLE INPUTS
      portalContent
        .find(".type_interface_colors-buttons-led__item")
        .on("click", function () {
          const backgroundColor = pergola.rgbToHex(
            $(this)
              .closest(".type_interface_colors-buttons-led__item") // оновлений селектор
              .find(".image-container")
              .css("background-color")
          );

          state.colorLed = backgroundColor;

          // Додаємо активний клас
          $(this)
            .closest(".type_interface_colors-buttons-led__item") // оновлений селектор
            .addClass(activeColorClass);

          // Видаляємо активний клас у всіх інших елементах
          $(this)
            .closest(".type_interface_colors-buttons-led") // оновлений селектор
            .find(".type_interface_colors-buttons-led__item") // оновлений селектор
            .not($(this).closest(".type_interface_colors-buttons-led__item")) // оновлений селектор
            .removeClass(activeColorClass);

          // Зміна емісії кольору в mesh
          if (mesh && mesh.material) {
            mesh.material.emissive.set(state.colorLed);

            mesh.children.forEach((child) => {
              if (child.material) {
                child.material.emissive.set(state.colorLed);
              }
            });
          }
        });
      //#endregion

      //#region REMOVE BUTTON
      removeHandle(portalContent, portalContentTitle, "moodLight", 1, 7);
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

        if (state.recessedLighting === louverGap) {
          $(this).closest(".radio__container__item").addClass("active");
        }
      });
      //#endregion

      //#region HANDLE INPUTS
      portalContent.find(".radio__container__item").on("click", function () {
        const louverGap = +$(this).find(".radio__container__item__text").text();

        state.recessedLighting = louverGap;

        portalContent.find(".radio__container__item").each(function () {
          $(this).removeClass("active");
        });

        $(this).addClass("active");

        pergola.update();
      });
      //#endregion

      //#region REMOVE BUTTON

      removeHandle(portalContent, portalContentTitle, "ledLights", 0, 6);
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
      //#region INIT INPUT
      // //#region INIT COLOR
      // portalContent
      //   .find(".type_interface_colors-buttons-led__item")
      //   .each(function () {
      //     const backgroundColor = pergola.rgbToHex(
      //       $(this)
      //         .closest(".type_interface_colors-buttons-led__item")
      //         .find(".image-container")
      //         .css("background-color")
      //     );

      //     if (state.colorZip === backgroundColor) {
      //       $(this)
      //         .closest(".type_interface_colors-buttons-led__item")
      //         .addClass(activeColorClass);
      //       $(this).prop("checked", true);
      //     }
      //   });
      // //#endregion

      // //#region transparency
      // portalContent.find(".radio__container__item").each(function () {
      //   const transparency = $(this)
      //     .find(".radio__container__item__text")
      //     .attr("id");

      //   if (state.transparency === transparency) {
      //     $(this).closest(".radio__container__item").addClass("active");
      //   }
      // });
      // //#endregion

      //#region INIT RANGE
      const $rangeThumbValue = portalContent.find("#range__thumb-value");

      $rangeThumbValue.text(`${state.zipInput}%`);
      //#endregion

      //#region INIT COLOR PICKER
      portalContent.find("#color-box").css("background-color", state.colorZip);
      //#endregion

      //#endregion

      //#region HANDLE INPUTS
      // //#region COLOR HANDLE
      // portalContent
      //   .find(".type_interface_colors-buttons-led__item")
      //   .on("click", function () {
      //     const backgroundColor = pergola.rgbToHex(
      //       $(this)
      //         .closest(".type_interface_colors-buttons-led__item") // оновлений селектор
      //         .find(".image-container")
      //         .css("background-color")
      //     );

      //     state.colorZip = backgroundColor;

      //     $(this)
      //       .closest(".type_interface_colors-buttons-led__item")
      //       .addClass(activeColorClass);

      //     $(this)
      //       .closest(".type_interface_colors-buttons-led")
      //       .find(".type_interface_colors-buttons-led__item")
      //       .not($(this).closest(".type_interface_colors-buttons-led__item")) // оновлений селектор
      //       .removeClass(activeColorClass);

      //     pergola.update();
      //   });
      // //#endregion

      // //#region transparency INPUTS
      // portalContent.find(".radio__container__item").on("click", function () {
      //   const transparency = $(this)
      //     .find(".radio__container__item__text")
      //     .attr("id");

      //   state.transparency = transparency;

      //   portalContent.find(".radio__container__item").each(function () {
      //     $(this).removeClass("active");
      //   });

      //   $(this).addClass("active");

      //   pergola.update();
      // });
      // //#endregion

      //#region open INPUTS

      createHandleRange(true, portalContent, "zipInput");
      //#endregion

      //#region REMOVE BUTTON
      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        4,
        pergolaConst.systemType.autoShade
      );

      //#endregion
      //#endregion
    }
    //#endregion

    //#region SLIDING DOOR
    if (pergolaConst.systemNameString.sliding_doors === portalContentTitle) {
      createHandleRange(true, portalContent, "slidingDoorInput");

      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        1,
        pergolaConst.systemType.sliding_doors
      );
    }

    //#endregion

    //#region BI-FOLD DOOR
    if (pergolaConst.systemNameString.bifold_doors === portalContentTitle) {
      createHandleRange(true, portalContent, "biFoldDoorInput");

      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        2,
        pergolaConst.systemType.autoShade
      );
    }

    //#endregion

    //#region SLIDING-SHATTERS
    if (pergolaConst.systemNameString.sliding_shutters === portalContentTitle) {
      //OPEN
      createHandleRange(
        true,
        portalContent,
        "slidingShuttersInput",
        "#sl-open-range_wrap .range__input"
      );

      //ROTATE
      createHandleRange(
        true,
        portalContent,
        "slidingShuttersRotate",
        "#sl-rotate-range_wrap .range__input"
      );

      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        4,
        pergolaConst.systemType.sliding_shutters
      );
    }

    //#endregion

    //#region FIX SHATTERS
    if (pergolaConst.systemNameString.fix_shutters === portalContentTitle) {
      //ROTATE
      createHandleRange(
        true,
        portalContent,
        "slidingFixShuttersRotate",
        ".range__input"
      );

      //REMOVE
      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        3,
        pergolaConst.systemType.fix_shutters
      );
    }
    //#endregion

    //#region BI-FOLD-SHATTERS
    if (pergolaConst.systemNameString.bifold_shutters === portalContentTitle) {
      //OPEN
      createHandleRange(
        true,
        portalContent,
        "biFoldDoorShattersInput",
        "#bs-open-range_wrap .range__input"
      );

      //ROTATE
      createHandleRange(
        true,
        portalContent,
        "biFoldDoorShattersRotate",
        "#bs-rotate-range_wrap .range__input"
      );

      //REMOVE
      removeHandleSystem(
        portalContent,
        portalContentTitle,
        "subSystem",
        5,
        pergolaConst.systemType.privacyWall
      );
    }
    // #endregion

    // #region SLATS

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
        3,
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

       <div class="sun__icon heaters__icon" id="10" data-value="Blade Rotation">
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
      if (+id !== 10 && +id !== 7 && +id !== 6) {
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
  setTimeout(() => {
    if (state.roofType) {
      showIcon(10, true);
      $("#interface").addClass("interface-container-portal");
    }
  }, 4000);

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
