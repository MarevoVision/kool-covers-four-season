import $ from "jquery";
import {
  ChangeGlobalMorph,
  ConvertMorphValue,
  pergola,
  pergolaConst,
} from "../../../../../../core/3d-configurator";
import { MORPH_DATA, state } from "../../../../../../core/settings";
import { lightRange, shadesRange } from "../../../../../portal/rangeArrays";
import "./generateRange.scss";
import { countVisibleObjectsByName } from "../../../../../summary/summary-page/summaryPage";
import { updateTextParam } from "../interfaceGroupInputs";

export function capitalize(str) {
  if (str && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return str;
}

export const typesDirection = {
  width: "width",
  length: "length",
  height: "heigth",
};

export function generateRangeHTML(range) {
  const customRangeHTML = `
    <div class="range">
        <label class="range__label" for="range__input">${range.title}</label>

        <div class="range__wrapper">
            <input 
                type="range" 
                id="range__input" 
                class="range__input" 
                min="${range.min}" 
                max="${range.max}" 
                step="${range.step}" 
                value="${range.initialValue}">

            ${
              range.thumb
                ? `<div class="range__thumb-value" id="range__thumb-value">${range.initialValue}</div>`
                : ""
            }

            ${
              range.showLabels
                ? `
                      <div class="range__values">
                          <span class="range__value range__value--min" id="range__min">${
                            range.labelMin ? range.labelMin : range.min
                          }</span>
                          <span class="range__value range__value--max" id="range__max">${
                            range.labelMax ? range.labelMax : range.max
                          }</span>
                      </div>`
                : ""
            }
        </div>
    </div>

    ${
      range.showSwitchAngle &&
      `
         <div class="direction">
             <label class="range__label" for="range__input">Direction</label>

             <div class="direction__switch">
                <p class="direction__switch-off switch_active">Clockwise</p>
        
                <label class="switch">
                    <input type="checkbox" class="switch__input" id="switch-input">
                    <span class="switch__slider"></span>
                </label>
    
                <p class="direction__switch-on">Counter clockwise</p>
             </div>
         </div>
        `
    }
  `;

  const activeSwitchClass = "switch_active";
  const $customRange = $(customRangeHTML);
  const $switchInput = $customRange.find(".switch__input");
  const $rangeLabel = $customRange.find(".range__label");
  const $rangeInputId = $customRange.find("#range__input");
  const $rangeInput = $customRange.find(".range__input");
  const $rangeThumbValue = $customRange.find(".range__thumb-value");

  // INIT SWITCH BUTTON
  const $slider = $(this).next(".switch__slider");

  function updateSwitchState(isRotated) {
    if (isRotated) {
      $slider.addClass(activeSwitchClass);
      $customRange
        .find(".direction__switch-off")
        .removeClass(activeSwitchClass);
      $customRange.find(".direction__switch-on").addClass(activeSwitchClass);
      $switchInput.prop("checked", true);
    } else {
      $slider.removeClass(activeSwitchClass);
      $customRange.find(".direction__switch-off").addClass(activeSwitchClass);
      $customRange.find(".direction__switch-on").removeClass(activeSwitchClass);
      $switchInput.prop("checked", false);
    }
  }

  // // updateSwitchState(state.isRotated);

  // // HANDLE SWITCH
  // $switchInput.on("change", function () {
  //   state.isRotated = !state.isRotated;
  //   pergola.update();
  //   // updateSwitchState(state.isRotated);
  // });

  //THUMB HANDLE
  function updateThumbValue(trigger) {
    const min = parseInt($rangeInput.attr("min"), 10);
    const max = parseInt($rangeInput.attr("max"), 10);
    const value = parseInt($rangeInput.val(), 10);

    const labelInputs = $rangeLabel.text().trim();

    let newHeaderText = "";

    //update Param Head
    if (range.thumb) {
      switch (labelInputs) {
        case capitalize(typesDirection.width):
          MORPH_DATA.width.initValue = value;
          newHeaderText = `${MORPH_DATA.width.initValue}' x ${MORPH_DATA.length.initValue}' x ${MORPH_DATA.height.initValue}'`;
          break;

        case capitalize(typesDirection.length):
          MORPH_DATA.length.initValue = value;
          newHeaderText = `${MORPH_DATA.width.initValue}' x ${MORPH_DATA.length.initValue}' x ${MORPH_DATA.height.initValue}'`;
          break;

        case capitalize(typesDirection.height):
          MORPH_DATA.height.initValue = value;
          newHeaderText = `${MORPH_DATA.width.initValue}' x ${MORPH_DATA.length.initValue}' x ${MORPH_DATA.height.initValue}'`;
          break;
      }

      $(trigger)
        .closest(".interface__group")
        .find(".interface__group__head__param")
        .text(newHeaderText);
    }

    //calc thumb value position
    const borderForHide = 2;
    const borderForHideMax = 4;

    if (range.thumb) {
      if (
        (value >= min &&
          value <= min + borderForHide &&
          max - min > borderForHide * 2) ||
        (value >= max - borderForHideMax &&
          value <= max &&
          max - min > borderForHideMax * 2)
      ) {
        $rangeThumbValue.hide();
      } else {
        $rangeThumbValue.show();
        $rangeThumbValue.text(
          range.inch ? value.toString().concat(`'`) : value
        );

        const percent = ((value - min) / (max - min)) * 100;
        const thumbOffset = $rangeThumbValue.outerWidth() / 2;
        $rangeThumbValue.css("left", `calc(${percent}% - ${thumbOffset}px)`);
      }

      if (value === min || value === max) {
        $rangeThumbValue.hide();
      }
    }

    $rangeInput.css(
      "background",
      `linear-gradient(to right, #0B70A2 ${
        ((value - min) / (max - min)) * 100
      }%, #0B70A24D ${((value - min) / (max - min)) * 100}%)`
    );
  }

  //init calc
  updateThumbValue();

  async function changeMorph(directions, inputValue, range, modelForExport) {
    switch (directions) {
      case typesDirection.width:
        const valueInt = ConvertMorphValue(inputValue, range.min, range.max);

        ChangeGlobalMorph("width", valueInt);
        ChangeGlobalMorph("width_wall", valueInt);

        await pergola.update();

        break;

      case typesDirection.length:
        const valueIntLength = ConvertMorphValue(
          inputValue,
          range.min,
          range.max
        );

        ChangeGlobalMorph("length", valueIntLength);
        ChangeGlobalMorph("length_wall", valueIntLength);

        await pergola.update();

        break;

      case typesDirection.height:
        const valueIntHeigth = ConvertMorphValue(
          inputValue,
          range.min,
          range.max
        );

        ChangeGlobalMorph("height", valueIntHeigth);

        await pergola.update();

        break;

      default:
        return console.log("non correct directions");
    }
  }

  $rangeInput.on("input", function () {
    updateThumbValue(this);
  });

  // //HANDLE Spacing LIGHT
  if (range.title === shadesRange[0].title) {
    $rangeInputId.on("input", function (event) {
      state.zipInput = event.target.value;

      let correctMorphForShade = 0;

      const morphOffsets = {
        8: { morph: 0, offset: 0 },
        9: { morph: 0.12, offset: 0 },
        10: { morph: 0.26, offset: 0 },
        11: { morph: 0.38, offset: 0 },
        12: { morph: 0.52, offset: 0 },
      };

      if (morphOffsets[state.height]) {
        correctMorphForShade = morphOffsets[state.height].morph;
      }

      let baseMorph = ConvertMorphValue(
        event.target.value,
        1,
        90,
        0,
        1 + correctMorphForShade
      );

      state.ledLights = baseMorph;

      ChangeGlobalMorph("close", baseMorph);
    });
  }

  //HANDLE Spacing LIGHT
  if (range.title === lightRange[0].title) {
    $rangeInputId.on("input", function (event) {
      state.spacing = event.target.value;
      pergola.update();
    });
  }

  //CONECT 'Rotation' input to MODEL
  if (range.title === "Rotation") {
    console.log($rangeInputId, "range");

    $rangeInputId.on("input", function (event) {
      state.currentRotationZ = event.target.value;
      console.log(event.target.value);
      applyRotationToClones(event.target.value);
    });
  }

  //CHANGE WIDTH
  if (range.title === capitalize(typesDirection.width)) {
    //INIT WIDTH
    setTimeout(() => {
      // #region ROOF TYPE LOGIC
      if (state.width < 15) {
        if (state.roofType === 2) {
          state.roofType = 1;
          $("#solid-roof input").trigger("click");
        }

        $("#combo-roof").removeClass("active");
        $("#combo-roof").addClass("disable");
      } else {
        $("#combo-roof").removeClass("disable");
      }
      // #endregion
    }, 0);

    //HANDLE WIDTH
    $rangeInputId.on("input", async function (event) {
      state.width = +event.target.value;

      // #region ROOF TYPE LOGIC
      if (state.width < 15) {
        if (state.roofType === 2) {
          state.roofType = 1;
          $("#solid-roof input").trigger("click");
        }

        $("#combo-roof").removeClass("active");
        $("#combo-roof").addClass("disable");
      } else {
        $("#combo-roof").removeClass("disable");
      }
      // #endregion

      //#region SKY LIGHT LOGIC
      if (state.width < 10) {
        state.skyLight = false;

        $("#skylight").removeClass("active");
        $("#skylight").addClass("disable");
      } else {
        $("#skylight").removeClass("disable");
      }
      // #endregion

      pergola.update();
    });
  }

  //CHANGE LENGHT
  if (range.title === capitalize(typesDirection.length)) {
    //HANDLE LENGHT
    $rangeInputId.on("input", async function (event) {
      state.length = +event.target.value;

      if (state.roofType === 1) {
        $("#thickness .radio__container__item ").each(function () {
          const $input = $(this);
          const id = +$(this).attr("id");

          $input.removeClass("disable");
          $input.removeClass("active");

          //LOGIC FOR SOLID
          switch (true) {
            case id === 3 && state.length > 16 && state.length <= 20:
              $input.addClass("disable");
              $input.removeClass("active");

              state.thickness = state.thickness === 3 ? 4 : state.thickness;
              break;

            case id === 3 && 20 < state.length:
            case id === 4 && 20 < state.length:
              $input.addClass("disable");
              $input.removeClass("active");

              state.thickness = 6;
              break;
          }

          if (id === state.thickness) {
            $input.addClass("active");
          }
        });
      }

      pergola.update();
    });
  }

  //CHANGE HEIGTH
  if (range.title === capitalize(typesDirection.height)) {
    //INIT HEIGTH
    // changeMorph(typesDirection.height, state.height, range, modelForExport);

    //INIT HEIGTH
    $rangeInputId.on("input", async function (event) {
      state.height = +event.target.value;

      // await changeMorph(
      //   typesDirection.height,
      //   event.target.value,
      //   range,
      //   modelForExport
      // );

      pergola.update();
    });
  }

  return $customRange;
}
