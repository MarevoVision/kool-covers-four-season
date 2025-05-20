import Pickr from "@simonwep/pickr";
import $ from "jquery";
import * as THREE from "three";
import {
  ChangeGlobalMorph,
  GetGroup,
  GetMesh,
  hideIcon,
  pergola,
  pergolaConst,
  setAllHotspotsVisibility,
  showIcon,
  toggleBackWall,
  toggleLeftWall,
  toggleRightWall,
  triggerIconClick,
} from "../../../../../core/3d-configurator";
import {
  removeFromUrlSystemBySide,
  removeFromUrlSystemByType,
} from "../../../../../core/customFunctions/initiSubSystem";
import { state } from "../../../../../core/settings";
import {
  deleteActiveClassFromContainerRadioType,
  groups,
  stringColorType,
  stringPostSize,
  stringRoofType,
  stringTypePegola,
} from "../../../interface";
import "./interfaceGroupInputs.scss";
import { generateRangeHTML } from "./range/generateRange";
import { hostPublicPath, prod } from "../../../../../productionVars";

export const colors = {
  White: "#1C1C1C",
  Grey: "#F5F5F5",
  Black: "#B0B0B0",
  Coffee: "#36454F",
  Oak: "#3F1A00",
};

export const typesInputs = {
  modelType: "manufacturer",
  selectButton: "select",
  range: "button",
  postSize: "post-size",
  colorsButton: "colorsButton",
  electronic: "electro",
  subSystem: "system",
  roofForLite: "liteRoof",
  typePergola: "typePergola",
  roofType: "roofTypes",
};

export let stringNameRoofColor = null;
export let stringNameFrameColor = null;

export const typeSubSystem = {
  "Motorized Zip Screen": "Motorized Zip Screen",
  "Sliding Glass Door": "Sliding Glass Door",
  "Bi-folding Glass Door": "Bi-folding Glass Door",
  "Fixed Shutters": "Fixed Shutters",
  "Sliding Shutters": "Sliding Shutters",
  "Bi-Ffolding Shutters": "Bi-Ffolding Shutters",
  "Fixed Slats": "Fixed Slats",
};

export function updateTextParam(
  customSetting,
  context,
  electro = false,
  onlyText = false,
  subSystem = false,
  walls = false
) {
  const text = [];

  if (!electro) {
    if (customSetting.backWall) {
      text.push("Back Wall");
    }
    if (customSetting.leftWall) {
      text.push("Left Wall");
    }
    if (customSetting.rightWall) {
      text.push("Right Wall");
    }
    if (
      !customSetting.rightWall &&
      !customSetting.leftWall &&
      !customSetting.backWall
    ) {
      text.push("Freestanding");
    }
  }
  if (subSystem) {
    customSetting.subSystem.forEach((option) => text.push(option));
  }
  if (electro) {
    customSetting.electro.forEach((option) => {
      text.push(option);
    });
  }

  let displayText = "";

  if (text.length > 1) {
    displayText = text.join(", ");
    if (displayText.length > 15) {
      displayText = displayText.substring(0, 12) + "...";
    }
  } else {
    displayText = text.length === 1 ? text[0] : "-";
  }
  if (onlyText) {
    return displayText;
  }

  $(context)
    .closest(".interface__group")
    .find(".interface__group__head__param")
    .text(displayText);
}

export function updateMaterialMap(mesh) {
  if (mesh?.material) {
    const isTexture =
      typeof state.colorRoof === "string" &&
      /\.(jpe?g|png|webp)$/i.test(state.colorRoof);

    if (isTexture) {
      const loader = new THREE.TextureLoader();
      loader.load(state.colorRoof, (texture) => {
        mesh.material.map = texture;
        mesh.material.color.set(0xffffff);
        mesh.material.needsUpdate = true;
      });
    } else {
      mesh.material.map = null;
      mesh.material.color.set(state.colorRoof);
      mesh.material.needsUpdate = true;
    }
  }
}

export function interfaceGroupInputsComponent(
  type,
  ranges,
  initValue = false,
  title
) {
  switch (type) {
    case typesInputs.modelType:
      const radioModelInputs = $(`
                <form class="type_interface_radio-model">
                  <div class="type_interface_radio-model_item option">
                    <input data-value="0" class="type_interface_radio-model_option type_interface_radio-model_option--azenco" 
                        type="radio" id="Azenco" name="fav_language" value="Azenco">
                    <label class="type_interface_radio-model_label" for="Azenco">Azenco</label>
                  </div>

                  <div class="type_interface_radio-model_item option">
                    <input data-value="1" class="type_interface_radio-model_option type_interface_radio-model_option--four-seasons" 
                        type="radio" id="four-seasons" name="fav_language" value="four-seasons">
                    <label class="type_interface_radio-model_label" for="four-seasons">Four Seasons</label>
                  </div>

                  <div class="type_interface_radio-model_item option">
                    <input data-value="2" class="type_interface_radio-model_option type_interface_radio-model_option--4K" 
                        type="radio" id="4K" name="fav_language" value="4K">
                    <label class="type_interface_radio-model_label" for="4K">4K</label>
                  </div>
                </form>`);

      const activeModelClass = "type_interface_radio-model_item--active";

      // //INIT MODEL
      // if (!state.model) {
      //   $("#param-light").show();
      //   // $('.interface__group').eq(3).hide();
      // } else {
      //   $("#param-light").hide();
      //   // $('.interface__group').eq(3).show();
      // }

      radioModelInputs
        .find('.type_interface_radio-model_item input[type="radio"]')
        .each(function () {
          const radioButton = $(this);
          const type = +$(this).attr("data-value");

          console.log("INIT MODEL", state.type3Dmodel);

          if (state.type3Dmodel === type) {
            radioButton
              .closest(".type_interface_radio-model_item")
              .addClass(activeModelClass);
          }
        });

      //#region HANDLE MODEL
      radioModelInputs
        .find('.type_interface_radio-model_item input[type="radio"]')
        .on("change", function () {
          // CHANGE STATE
          state.type3Dmodel = +$(this).attr("data-value");

          const parentItem = $(this).closest(
            ".type_interface_radio-model_item"
          );

          // updateRoofInputs(roofGroup);

          updateUIAfterModelChange(parentItem);

          // updatePostSize();

          pergola.update();
        });

      //#region ROOF PARAMS
      function createRoofGroup() {
        return {
          title: "Roof",
          param: !state.model ? "Louvered" : state.moodLight,
          type: !state.model ? typesInputs.range : typesInputs.roofForLite,
          ranges: [
            {
              title: "Rotation",
              min: 0,
              max: 90,
              step: 1,
              thumb: false,
              initialValue: state.currentRotationZ,
              showLabels: true,
              showSwitchAngle: true,
            },
          ],
        };
      }
      //#endregion

      //#region ADD ROOF GROUP
      function updateRoofInputs(roofGroup) {
        const inputsRoof = $($(".interface__group")[2]).find(
          ".interface__group__inputs"
        );
        const newInputs = interfaceGroupInputsComponent(
          roofGroup.type,
          roofGroup.ranges,
          roofGroup.initValuePostSize,
          roofGroup.title
        );

        inputsRoof
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text(roofGroup.param);

        inputsRoof.empty();
        inputsRoof.append(newInputs);
      }
      //#endregion

      //#region UPDATE UI
      function updateUIAfterModelChange(parentItem) {
        groups[0].param = $(parentItem).find("label").text();
        $(parentItem)
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text(groups[0].param);

        radioModelInputs
          .find(".type_interface_radio-model_item")
          .removeClass(activeModelClass);

        parentItem.addClass(activeModelClass);
      }
      //#endregion

      //#region UPDATE POST
      function updatePostSize() {
        const postSizeOptions = $(".type_interface_post-size_item");
        const activeClass = "type_interface_post-size_item--active";
        const param = !state.model ? `8" x 8"` : `4" x 4"`;

        ChangeGlobalMorph("4-8", 0.5);

        postSizeOptions.eq(0).addClass(activeClass);
        postSizeOptions.eq(1).removeClass(activeClass);

        state.initValuePostSize = "6";
        postSizeOptions.eq(1).text(param);

        $(".interface__group")
          .find(".interface__group__head__param")
          .eq(5)
          .text('6" x 6"');

        if (!state.model) {
          $("#param-light").show();
        } else {
          $("#param-light").hide();
        }
      }
      //#endregion
      //#endregion

      return radioModelInputs;

    case typesInputs.roofType:
      const radioRoofTypeContent = $(`
                <form class="type_interface_radio-model">
                  <div class="type_interface_radio-model_item option">
                    <input data-value="0" class="type_interface_radio-model_option type_interface_radio-model_option--shade" 
                        type="radio" id="shade" name="fav_language" value="${stringRoofType[0]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="shade">${stringRoofType[0]}</label>
                  </div>

                  <div class="type_interface_radio-model_item option">
                    <input data-value="1" class="type_interface_radio-model_option type_interface_radio-model_option--blade" 
                        type="radio" id="blade" name="fav_language" value="${stringRoofType[1]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="blade">${stringRoofType[1]}</label>
                  </div>
                </form>`);

      const activeRoofTypeClass = "type_interface_radio-model_item--active";

      // //INIT MODEL
      radioRoofTypeContent
        .find('.type_interface_radio-model_item input[type="radio"]')
        .each(function () {
          const radioButton = $(this);
          const type = +$(this).attr("data-value");

          // showIcon(10, true);

          // if (!state.roofType) {
          //   hideIcon(10);
          // }

          if (state.roofType === type) {
            radioButton
              .closest(".type_interface_radio-model_item")
              .addClass(activeRoofTypeClass);
          }

          setTimeout(() => {
            if (!state.roofType) {
              $("#wood-toggle").hide();
              state.colorRoof = "#000000";
              updateMaterialMap(pergola.roof.solidRoof[0].object);
            } else {
              $("#wood-toggle").show();
            }
          }, 1000);
        });

      //#region HANDLE MODEL
      radioRoofTypeContent
        .find('.type_interface_radio-model_item input[type="radio"]')
        .on("change", function () {
          // CHANGE STATE
          state.roofType = +$(this).attr("data-value");

          showIcon(10, true);

          if (!state.roofType) {
            hideIcon(10);
            state.colorRoof = "#000000";

            $("#wood-toggle").hide();
            setTimeout(() => {
              pergola.setSolidRoof();
            }, 300);

            console.log("hide WOOD");
          } else {
            $("#wood-toggle").show();
          }

          const parentItem = $(this).closest(
            ".type_interface_radio-model_item"
          );

          radioRoofTypeContent
            .find(".type_interface_radio-model_item")
            .removeClass(activeRoofTypeClass);

          parentItem.addClass(activeRoofTypeClass);

          $(parentItem)
            .closest(".interface__group")
            .find(".interface__group__head__param")
            .text($(this).val());

          // updatePostSize();

          pergola.update();
        });
      //#endregion

      return radioRoofTypeContent;

    case typesInputs.selectButton:
      const selectWalls = $(`
              <form class="type_interface_checkbox-wall">
                <div class="type_interface_checkbox-wall_item option" id="back"> 
                  <div class="type_interface_checkbox-wall_item-img type_interface_checkbox-wall_item-img--back"></div>

                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="back">Back Wall</label>
                  </div> 
                </div>
           
                <div class="type_interface_checkbox-wall_item option" id="left"> 
                  <div class="type_interface_checkbox-wall_item-img type_interface_checkbox-wall_item-img--left"></div>

                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="left">Left Wall</label>
                  </div> 
                </div>
             
                <div class="type_interface_checkbox-wall_item option" id="right"> 
                  <div class="type_interface_checkbox-wall_item-img type_interface_checkbox-wall_item-img--right"></div>

                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="right">Right Wall</label>
                  </div> 
                </div>
              </form>
               `);

      const activeWallClass = "type_interface_checkbox-wall_item--active";
      const backWall = selectWalls.find("#back");
      const leftWall = selectWalls.find("#left");
      const rightWall = selectWalls.find("#right");

      function toggleClass(item, settings) {
        if (settings) {
          item.addClass(activeWallClass);
        } else {
          item.removeClass(activeWallClass);
        }
      }

      // INIT BUTTONS WALL
      toggleBackWall(state.backWall);
      toggleLeftWall(state.leftWall);
      toggleRightWall(state.rightWall);

      updateTextParam(state, backWall);

      if (state.backWall) {
        toggleClass(backWall, state.backWall);
      }
      if (state.leftWall) {
        toggleClass(leftWall, state.leftWall);
      }
      if (state.rightWall) {
        toggleClass(rightWall, state.rightWall);
      }

      // HANDLE BUTTONS WALL
      backWall.on("click", function () {
        state.backWall = !state.backWall;
        removeFromUrlSystemBySide(pergolaConst.side.Back);

        pergola.update();

        toggleBackWall(state.backWall);
        toggleClass($(this), state.backWall);

        // spansScreen
        //   .filter((span) => span.side === "top")
        //   .forEach((span) => {
        //     span.isScreen = false;
        //     span.isShades = false;

        //     span.columns &&
        //       span.columns.forEach((column) => (column.visible = false));

        //     span.prepareScreens.forEach((data) => {
        //       data.screen.visible = false;

        //       data.screen.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     });

        //     span.prepareShades.forEach((data) => {
        //       data.shade.visible = false;

        //       data.shade.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     });
        //   });

        // spansHeaters
        //   .filter((span) => span.side === "top")
        //   .forEach((span, index) => {
        //     span.isHeater = false;

        //     const UFO = modelForExport.children.find(
        //       (group) =>
        //         group.name.includes(`clone_ufo`) &&
        //         group.name.includes(span.side)
        //     );

        //     if (UFO) {
        //       UFO.visible = false;
        //       UFO.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     }
        //   });

        // state.currentActiveSpans = state.currentActiveSpans.filter(
        //   (id) => !id.includes("top")
        // );

        updateTextParam(state, this);
        // setAllHotspotsVisibility(false);
      });

      leftWall.on("click", function () {
        state.leftWall = !state.leftWall;
        removeFromUrlSystemBySide(pergolaConst.side.Left);

        pergola.update();

        toggleLeftWall(state.leftWall);
        toggleClass($(this), state.leftWall);

        // spansScreen
        //   .filter((span) => span.side === "left")
        //   .forEach((span) => {
        //     span.isScreen = false;
        //     span.isShades = false;

        //     span.columns &&
        //       span.columns.forEach((column) => (column.visible = false));

        //     span.prepareScreensZ.forEach((data) => {
        //       data.screen.visible = false;

        //       data.screen.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     });

        //     span.prepareShadesZ.forEach((data) => {
        //       data.shadeZ.visible = false;

        //       data.shadeZ.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     });
        //   });

        // state.currentActiveSpans = state.currentActiveSpans.filter(
        //   (id) => !id.includes("left")
        // );

        // spansHeaters
        //   .filter((span) => span.side === "left")
        //   .forEach((span, index) => {
        //     span.isHeater = false;

        //     const UFO = modelForExport.children.find(
        //       (group) =>
        //         group.name.includes(`clone_ufo`) &&
        //         group.name.includes(span.side)
        //     );

        //     if (UFO) {
        //       UFO.visible = false;
        //       UFO.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     }
        //   });

        updateTextParam(state, this);
        // setAllHotspotsVisibility(false);
      });

      rightWall.on("click", function () {
        state.rightWall = !state.rightWall;
        removeFromUrlSystemBySide(pergolaConst.side.Right);

        pergola.update();

        toggleRightWall(state.rightWall);
        toggleClass($(this), state.rightWall);

        // spansScreen
        //   .filter((span) => span.side === "right")
        //   .forEach((span) => {
        //     span.isScreen = false;
        //     span.isShades = false;

        //     span.columns &&
        //       span.columns.forEach((column) => (column.visible = false));

        //     span.prepareScreensZ.forEach((data) => {
        //       data.screen.visible = false;

        //       data.screen.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     });

        //     span.prepareShadesZ.forEach((data) => {
        //       data.shadeZ.visible = false;

        //       data.shadeZ.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     });
        //   });

        // state.currentActiveSpans = state.currentActiveSpans.filter(
        //   (id) => !id.includes("right")
        // );

        // spansHeaters
        //   .filter((span) => span.side === "right")
        //   .forEach((span, index) => {
        //     span.isHeater = false;

        //     const UFO = modelForExport.children.find(
        //       (group) =>
        //         group.name.includes(`clone_ufo`) &&
        //         group.name.includes(span.side)
        //     );

        //     if (UFO) {
        //       UFO.visible = false;
        //       UFO.children.forEach((child) => {
        //         child.visible = false;
        //       });
        //     }
        //   });

        updateTextParam(state, this);
        // setAllHotspotsVisibility(false);
      });

      return selectWalls;

    case typesInputs.range:
      let rangesResult = $(``);

      if (ranges.length) {
        ranges.forEach((range) => {
          rangesResult = rangesResult.add(generateRangeHTML(range));
        });
      }

      return rangesResult;

    case typesInputs.postSize:
      const postSizeContent = $(`
              <form class="type_interface_post-size">
                  <div class="type_interface_post-size_item option">
                      <input class="type_interface_post-size_option" type="radio" id="0" name="fav_language" value="${stringPostSize[0]}">
                      <label for="0">6.5" x 6.5"</label>
                  </div>
             
                  <div class="type_interface_post-size_item option">
                      <input class="type_interface_post-size_option" type="radio" id="1" name="fav_language" value="${stringPostSize[1]}">
                      <label for="1">8" x 8"</label>
                 </div>
              </form>
          `);

      const activeClass = "type_interface_post-size_item--active";

      // //INIT INPUT
      postSizeContent.find(".type_interface_post-size_item").each(function () {
        $(this).removeClass(activeClass);

        if (state.postSize === +$(this).find("input").attr("id")) {
          $(this).addClass(activeClass);
        }
      });

      //HANDLE INPUT
      postSizeContent
        .find(".type_interface_post-size_item")
        .on("click", function () {
          postSizeContent
            .find(".type_interface_post-size_item")
            .removeClass(activeClass);

          const paramLabel = $(this).find("input").val();
          state.postSize = +$(this).find("input").attr("id");

          $(this).addClass(activeClass);

          const $groupHeadParam = $(this)
            .closest(".interface__group")
            .find(".interface__group__head__param");

          $groupHeadParam.text(paramLabel);

          pergola.update();
        });

      return postSizeContent;

    case typesInputs.typePergola:
      const typePergolaContent = $(`
          <form class="type_interface_post-size">
              <div class="type_interface_post-size_item option">
                  <input class="type_interface_post-size_option" type="radio" id="0" name="fav_language" value="${stringTypePegola[0]}">
                  <label for="0">${stringTypePegola[0]}</label>
              </div>
         
              <div class="type_interface_post-size_item option">
                  <input class="type_interface_post-size_option" type="radio" id="1" name="fav_language" value="${stringTypePegola[1]}">
                  <label for="1">${stringTypePegola[1]}</label>
             </div>
          </form>
      `);

      const activeClassTypePergola = "type_interface_post-size_item--active";

      // //INIT INPUT
      typePergolaContent
        .find(".type_interface_post-size_item")
        .each(function () {
          $(this).removeClass(activeClassTypePergola);

          if (state.typePergola === +$(this).find("input").attr("id")) {
            $(this).addClass(activeClassTypePergola);
          }
        });

      //HANDLE INPUT
      typePergolaContent
        .find(".type_interface_post-size_item")
        .on("click", function () {
          typePergolaContent
            .find(".type_interface_post-size_item")
            .removeClass(activeClassTypePergola);

          const paramLabel = $(this).find("input").val();
          state.typePergola = +$(this).find("input").attr("id");

          $(this).addClass(activeClassTypePergola);

          const $groupHeadParam = $(this)
            .closest(".interface__group")
            .find(".interface__group__head__param");

          $groupHeadParam.text(paramLabel);

          toggleBackWall(state.backWall);
          toggleLeftWall(state.leftWall);
          toggleRightWall(state.rightWall);

          // updatePostSizeParams.call(this, selectedIndex);
        });

      return typePergolaContent;

    case typesInputs.colorsButton:
      const colorButtonContent = $(`
                    <form class="type_interface_colors-buttons">
                    
                    <div class="colors_container">
                       <div class="type_interface_colors-buttons_item option">
                            <label class="type_interface_colors-buttons_label">
                                <div class="image-container" style="background-color: #FFFFFF">
                                </div>
                                <span class="color-name">White</span>
                                <input class="type_interface_colors-buttons_option" type="radio" id="TexturedBlack" name="fav_language" value="White">
                            </label>
                        </div>
                        
                        <div class="type_interface_colors-buttons_item option">
                            <label class="type_interface_colors-buttons_label">
                                <div class="image-container"  style="background-color: #000000 ">
                                </div>
                                <span class="color-name">Black</span>
                                <input class="type_interface_colors-buttons_option" type="radio" id="TexturedWhite" name="fav_language" value="Black">
                            </label>
                        </div>
                
                        <div class="type_interface_colors-buttons_item option">
                            <label class="type_interface_colors-buttons_label">
                                <div class="image-container" style="background-color: #3A3A3A">
                                </div>
                                <span class="color-name">Dark Gray</span>
                                <input class="type_interface_colors-buttons_option" type="radio" id="IndustrialGrey" name="fav_language" value="Dark Gray">
                            </label>
                        </div>
                
                        <div class="type_interface_colors-buttons_item option">
                            <label class="type_interface_colors-buttons_label">
                                <div class="image-container" style="background-color: #312C2F">
                                </div>
                                <span class="color-name">Bronze</span>
                                <input class="type_interface_colors-buttons_option" type="radio" id="Charcoal" name="fav_language" value="Bronze">
                            </label>
                        </div>
                
                        <div class="type_interface_colors-buttons_item option">
                            <label class="type_interface_colors-buttons_label">
                                <div class="image-container" style="background-color: #694123">
                                </div>
                                <span class="color-name">Wood Grain</span>
                                <input class="type_interface_colors-buttons_option" type="radio" id="C34Bronze" name="fav_language" value="Wood Grain">
                            </label>
                        </div>
                    </div>
                    
               
                    <div class="color-bottom">
                      <div class="colors_picker_container">
                      <div id="color-box" class="colors_picker_color" style="background-color: ${
                        title === "Frame Color"
                          ? state.colorBody
                          : state.colorRoof
                      }"></div>
                      
                      <div class="colors_picker_button" id="color-picker">
                        Color Picker
                      </div>
                
                      <div id="color-picker-container"></div>
                     </div>

                     <p class="add-info">*additional cost</p>
                    </div>
                    
                    </form>
                `);

      const colorButtonRoof = $(`
                  <form class="type_interface_colors-buttons">
                    <div class="type_interface_post-size">
                  <div class="type_interface_post-size_item option">
                      <input class="type_interface_post-size_option" type="radio" id="0" name="fav_language" value="${
                        stringColorType[0]
                      }">
                      <label for="0">${stringColorType[0]}</label>
                  </div>
             
                  <div class="type_interface_post-size_item option" id="wood-toggle">
                      <input class="type_interface_post-size_option" type="radio" id="1" name="fav_language" value="${
                        stringColorType[1]
                      }">
                      <label for="0">${stringColorType[1]}</label>
                 </div>
              </div>
                
                    <div class="colors_container" id="standart-color">
                      ${[
                        { color: "#FFFFFF", name: "White" },
                        { color: "#000000", name: "Black" },
                        { color: "#3A3A3A", name: "Dark Gray" },
                        { color: "#312C2F", name: "Bronze" },
                        { color: "#694123", name: "Wood Grain" },
                      ]
                        .map(
                          (item, i) => `
                        <div class="type_interface_colors-buttons_item option">
                          <label class="type_interface_colors-buttons_label">
                            <div class="image-container" style="background-color: ${item.color}"></div>
                            <span class="color-name">${item.name}</span>
                            <input class="type_interface_colors-buttons_option" type="radio" id="standard-color-${i}" name="color_option" value="${item.name}">
                          </label>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                
                    <div class="colors_container" id="textured-color">
                    ${[
                      "Bamboo",
                      "Teak",
                      "Golden Oak",
                      "Dark Oak",
                      "Oak",
                      "Knotty Pine",
                      "National Walnut",
                      "Dark Walnut",
                      "American Douglas",
                      "Cherry",
                      "Cherry Half Flame",
                      "Europian Cherry",
                      "Mediterranean Cherry",
                      "Cherry With Flame",
                    ]
                      .map((name, i) => {
                        const nameFormat = name
                          .toLowerCase()
                          .replace(/\s+/g, "_");
                        const imagePath = `public/img/textures/wood_${nameFormat}.jpg`;

                        return `
                        <div class="type_interface_colors-buttons_item option">
                          <label class="type_interface_colors-buttons_label">
                            <div class="image-container" style="background-image: url('${imagePath}'); background-size: cover;"></div>
                            <span class="color-name">${name}</span>
                            <input class="type_interface_colors-buttons_option" type="radio" id="textured-color-${i}" name="color_option" value="${name}">
                          </label>
                        </div>
                      `;
                      })
                      .join("")}
                    
                    </div>
                
                    <div class="color-bottom">
                      <div class="colors_picker_container">
                      <div id="color-box" class="colors_picker_color" style="background-color: ${
                        title === "Frame Color"
                          ? state.colorBody
                          : state.colorRoof
                      }"></div>
                      
                      <div class="colors_picker_button" id="color-picker">
                        Color Picker
                      </div>
                
                      <div id="color-picker-container"></div>
                     </div>

                     <p class="add-info">*additional cost</p>
                    </div>
                 

                  </form>
                `);

      const colorSwitch = colorButtonRoof.find(`.type_interface_post-size`);
      const standartColor = colorButtonRoof.find("#standart-color");
      const texuredColor = colorButtonRoof.find("#textured-color");

      const activeColorClass = "type_interface_colors-buttons_item--active";

      const activeColorTypeClass = "type_interface_post-size_item--active";

      //LOGIC FOR FRAME COLOR
      if (title === "Frame Color") {
        const mesh = GetMesh("header");

        //INIT INPUT
        colorButtonContent.find('input[type="radio"]').each(function () {
          const backgroundColor = pergola.rgbToHex(
            $(this)
              .closest(".type_interface_colors-buttons_item")
              .find(".image-container")
              .css("background-color")
          );

          const nameOfColor = $(this).val();

          if (state.colorBody === backgroundColor) {
            $(this)
              .closest(".type_interface_colors-buttons_item")
              .addClass(activeColorClass);
            $(this).prop("checked", true);
            stringNameFrameColor = nameOfColor;

            setTimeout(() => {
              $(this)
                .closest(".interface__group")
                .find(".interface__group__head__param")
                .text(`${nameOfColor}`);
            }, 400);
          }

          if (mesh && mesh.material) {
            mesh.material.color.set(state.colorBody);
          }
        });

        //HANDLE INPUTS
        colorButtonContent.find('input[type="radio"]').on("click", function () {
          const nameOfColor = $(this).val();
          stringNameFrameColor = nameOfColor;

          const backgroundColor = pergola.rgbToHex(
            $(this)
              .closest(".type_interface_colors-buttons_item")
              .find(".image-container")
              .css("background-color")
          );

          state.colorBody = backgroundColor;

          $(this)
            .closest(".type_interface_colors-buttons_item")
            .addClass(activeColorClass);

          $(this)
            .closest(".type_interface_colors-buttons")
            .find(".type_interface_colors-buttons_item")
            .not($(this).closest(".type_interface_colors-buttons_item"))
            .removeClass(activeColorClass);

          $(this)
            .closest(".interface__group")
            .find(".interface__group__head__param")
            .text(`${nameOfColor}`);

          if (mesh && mesh.material) {
            mesh.material.color.set(state.colorBody);
            mesh.children.forEach((child) => {
              if (child.material) {
                child.material.color.set(state.colorBody);
              }
            });

            pergola.update();
          }
        });

        //#region HANDLE COLOR PICKER
        let pickr;

        colorButtonContent.find("#color-picker").on("click", function () {
          if (!pickr) {
            pickr = Pickr.create({
              el: "#color-picker-container", // Елемент, до якого пікер буде прив'язаний
              theme: "classic", // Стиль пікера
              default: state.colorBody, // Початковий колір

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
              state.colorBody = selectedColor;
              stringNameFrameColor = state.colorBody;

              $(this)
                .closest(".interface__group")
                .find(".interface__group__head__param")
                .text(`${state.colorBody}`);

              console.log(mesh);

              if (mesh && mesh.material) {
                mesh.material.color.set(state.colorBody);

                mesh.children.forEach((child) => {
                  if (child.material) {
                    child.material.color.set(state.colorBody);
                  }
                });
              }

              colorButtonContent
                .find("#color-box")
                .css("background-color", state.colorBody);

              deleteActiveClassFromContainerRadioType(
                colorButtonContent,
                ".type_interface_colors-buttons_item",
                activeColorClass
              );

              pergola.update();
            });
          }

          pickr.show();
        });

        // #endregion
      }

      //LOGIC FOR ROOF COLOR
      if (title === "Roof Color") {
        const mesh = GetMesh("louver_X");

        //#region INIT INPUT
        colorButtonRoof
          .find(".type_interface_colors-buttons_option")
          .each(function () {
            const $this = $(this);
            const $item = $this.closest(".type_interface_colors-buttons_item");
            const $imgContainer = $item.find(".image-container");

            const bgColor = $imgContainer.css("background-color");
            const bgImage = $imgContainer.css("background-image");

            const nameOfColor = $this.val();

            const extractPublicPath = (url) => {
              const match = url.match(/\/public\/.+$/);
              return match ? match[0] : url; // Якщо не знайдено — вертає як є
            };

            const backgroundColor = (() => {
              const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
              if (bgImage && bgImage !== "none" && match && match[1]) {
                return "/" + match[1].trim().replace(/^\/+/, ""); // гарантуємо початок з одного /
              } else {
                return pergola.rgbToHex(bgColor); // "#ffffff"
              }
            })();

            const normalizedStateColor = extractPublicPath(state.colorRoof);

            // DEBUG
            console.log("COMPARE INIT", {
              fromState: normalizedStateColor,
              fromInput: backgroundColor,
            });

            if (normalizedStateColor === backgroundColor) {
              // Match!
            }

            if (normalizedStateColor === backgroundColor) {
              $item.addClass(activeColorClass);
              $this.prop("checked", true);
              stringNameRoofColor = nameOfColor;

              setTimeout(() => {
                $this
                  .closest(".interface__group")
                  .find(".interface__group__head__param")
                  .text(nameOfColor);

                console.log("URL COLOR INIT");
              }, 400);
            }

            updateMaterialMap(mesh);

            pergola.update();
          });

        //#endregion

        //#region HANDLE INPUTS
        colorButtonRoof
          .find(".type_interface_colors-buttons_option")
          .on("change", function () {
            const $this = $(this);
            const $item = $this.closest(".type_interface_colors-buttons_item");
            const $imgContainer = $item.find(".image-container");

            const bgColor = $imgContainer.css("background-color");
            const bgImage = $imgContainer.css("background-image");

            let backgroundColor;
            const match = bgImage.match(/url\(["']?(.*?)["']?\)/);

            if (bgImage !== "none" && match && match[1]) {
              backgroundColor = match[1]; // Це шлях
            } else {
              backgroundColor = pergola.rgbToHex(bgColor); // Це HEX
            }

            // Записуємо URL або HEX в state
            state.colorRoof = backgroundColor;

            const nameOfColor = $this.val(); // Завжди показуємо значення value
            stringNameRoofColor = nameOfColor;

            // Додаємо активний клас
            $item.addClass(activeColorClass);
            $this
              .closest(".type_interface_colors-buttons")
              .find(".type_interface_colors-buttons_item")
              .not($item)
              .removeClass(activeColorClass);

            // Вивід у header
            $this
              .closest(".interface__group")
              .find(".interface__group__head__param")
              .text(nameOfColor);

            // Оновлення матеріалу
            updateMaterialMap(mesh);

            pergola.update();
          });

        // #endregion

        //#region HANDLE COLOR PICKER
        let pickr;

        colorButtonRoof.find("#color-picker").on("click", function () {
          const $button = $(this);
          const $interfaceGroup = $button.closest(".interface__group");

          if (!pickr) {
            pickr = Pickr.create({
              el: "#color-picker-container",
              theme: "classic",
              default: state.colorRoof,

              components: {
                preview: false,
                opacity: false,
                hue: true,
                interaction: {
                  hex: true,
                  rgba: false,
                  input: true,
                  clear: false,
                  save: true,
                },
              },
            });

            pickr.on("change", (color) => {
              const selectedColor = color.toHEXA().toString();
              state.colorRoof = selectedColor;
              stringNameRoofColor = selectedColor;

              //  title
              $interfaceGroup
                .find(".interface__group__head__param")
                .text(selectedColor);

              // Update input color
              colorButtonRoof
                .find("#color-box")
                .css("background-color", selectedColor);

              // remove active class
              colorButtonRoof
                .find(".type_interface_colors-buttons_item")
                .removeClass(activeColorClass);
              colorButtonRoof
                .find(".type_interface_colors-buttons_option")
                .prop("checked", false);

              // update mesh
              updateMaterialMap(mesh);

              pergola.update();
            });
          }

          // Відкриваємо пікер
          pickr.show();
        });
        // #endregion

        // #region COLOR TYPE
        // console.log(colorSwitch);

        colorSwitch.find('input[type="radio"]').each(function () {
          const $input = $(this);
          const id = +$input.attr("id");

          //INIT
          console.log($input, id);

          $(this).removeClass(activeColorTypeClass);

          console.log();
          if (state.roofColorType === id) {
            console.log("ADD CLASs");
            $(this).parent().addClass(activeColorTypeClass);
          }

          if (!state.roofColorType) {
            standartColor.show();
            texuredColor.hide();

            colorButtonRoof.find(".color-bottom").show();
          } else {
            texuredColor.show();
            standartColor.hide();

            colorButtonRoof.find(".color-bottom").hide();
          }

          // console.log($(this));

          $(this)
            .parent()
            .on("click", function () {
              const id = +$(this).find('input[type="radio"]').attr("id");
              state.roofColorType = id;

              colorSwitch.find('input[type="radio"]').each(function () {
                $(this).parent().removeClass(activeColorTypeClass);
              });

              colorButtonRoof.find(".colors_container");
              $(this).addClass(activeColorTypeClass);

              standartColor.hide();
              texuredColor.hide();

              if (!state.roofColorType) {
                standartColor.show();
                texuredColor.hide();

                colorButtonRoof.find(".color-bottom").show();
              } else {
                texuredColor.show();
                standartColor.hide();

                colorButtonRoof.find(".color-bottom").hide();
              }
            });
        });

        // #endregion
      }

      return title === "Roof Color" ? colorButtonRoof : colorButtonContent;

    case typesInputs.electronic:
      const electronicContent = $(`
                <form class="type_interface_electronic">
                  <div class="type_interface_electronic_item option">
                    <label class="type_interface_electronic_label">
                       <div class="image-container">
                           <img src="public/img/electro/led-light.svg" alt="Textured Black" class="color-image">
                       </div>
                       
                       <span class="electronic-name">LED Lights</span>
                       <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="LED Lights">
                    </label>
                  </div>

                  <div class="type_interface_electronic_item option">
                    <label class="type_interface_electronic_label">
                       <div class="image-container">
                           <img src="public/img/electro/mood-light.svg" alt="Textured Black" class="color-image">
                       </div>
                       
                       <span class="electronic-name">Mood Light</span>
                       <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="Mood Light">
                    </label>
                  </div>

                  <div class="type_interface_electronic_item option">
                    <label class="type_interface_electronic_label">
                       <div class="image-container">
                           <img src="public/img/electro/fans.svg" alt="Textured Black" class="color-image">
                       </div>
                       
                       <span class="electronic-name">Fans</span>
                       <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="Fans">
                    </label>
                  </div>

                  <div class="type_interface_electronic_item option">
                    <label class="type_interface_electronic_label">
                       <div class="image-container">
                           <img src="public/img/electro/Rectangle-3.svg" alt="Textured Black" class="color-image">
                       </div>
                       
                       <span class="electronic-name">Heaters</span>
                       <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="Heaters">
                    </label>
                  </div>
                </form>
            `);

      const activeStyle = "type_interface_electronic_item--active";
      const portalLight = $(".portal-light");
      const portalHeaters = $(".portal-heaters");
      const sunIcon = $("#light");
      const heatersIcon = $("#heaters");
      const paramLight = electronicContent.find("#param-light");

      const closeButtonLight = $(".portal-light__close");
      const closeButtonHeaters = $(".portal-heaters__close");
      const closeButtonScreenElectro = $(".portal-screen__close");

      // INIT INPUT
      electronicContent.find('input[type="radio"]').each(function () {
        const $currentInput = $(this);
        const inputValue = $currentInput.val();

        switch (true) {
          case state.electro.has("Mood Light") && inputValue === "Mood Light":
            $currentInput.prop("checked", true);
            $currentInput
              .closest(".type_interface_electronic_item")
              .addClass(activeStyle);

            state.moodLight = true;
            triggerIconClick(7);

            break;

          case state.electro.has("LED Lights") && inputValue === "LED Lights":
            $currentInput.prop("checked", true);
            $currentInput
              .closest(".type_interface_electronic_item")
              .addClass(activeStyle);

            state.ledLights = true;
            triggerIconClick(6);

            break;

          case state.electro.has("Fans") && inputValue === "Fans":
            $currentInput.prop("checked", true);
            $currentInput
              .closest(".type_interface_electronic_item")
              .addClass(activeStyle);

            state.fans = true;

            break;

          case state.electro.has("Heaters") && inputValue === "Heaters":
            $currentInput.prop("checked", true);
            $currentInput
              .closest(".type_interface_electronic_item")
              .addClass(activeStyle);

            state.heaters = true;

            break;
        }

        pergola.update();

        updateTextParam(state, this, true);
      });

      // HANDLE INPUTS
      electronicContent.find('input[type="radio"]').on("click", function () {
        const $currentInput = $(this);
        const inputValue = $currentInput.val();

        switch (inputValue) {
          case "Mood Light":
            state.moodLight = !state.moodLight;
            state.electro.add(inputValue);

            if (!state.moodLight) {
              $currentInput.prop("checked", false);
              $currentInput
                .closest(".type_interface_electronic_item")
                .removeClass(activeStyle);
              state.electro.delete(inputValue);
              hideIcon(7);
            } else {
              $currentInput.prop("checked", true);
              $currentInput
                .closest(".type_interface_electronic_item")
                .addClass(activeStyle);
              state.electro.add(inputValue);
              triggerIconClick(7);
            }

            break;

          case "LED Lights":
            state.ledLights = !state.ledLights;
            state.electro.add(inputValue);

            if (!state.ledLights) {
              $currentInput.prop("checked", false);
              $currentInput
                .closest(".type_interface_electronic_item")
                .removeClass(activeStyle);
              state.electro.delete(inputValue);
              hideIcon(6);
            } else {
              $currentInput.prop("checked", true);
              $currentInput
                .closest(".type_interface_electronic_item")
                .addClass(activeStyle);
              state.electro.add(inputValue);
              triggerIconClick(6);
            }

            break;

          case "Fans":
            state.fans = !state.fans;
            state.electro.add(inputValue);

            if (!state.fans) {
              $currentInput.prop("checked", false);
              $currentInput
                .closest(".type_interface_electronic_item")
                .removeClass(activeStyle);
              state.electro.delete(inputValue);
            } else {
              $currentInput.prop("checked", true);
              $currentInput
                .closest(".type_interface_electronic_item")
                .addClass(activeStyle);
              state.electro.add(inputValue);
            }

            break;

          case "Heaters":
            state.heaters = !state.heaters;
            state.electro.add(inputValue);

            if (!state.heaters) {
              $currentInput.prop("checked", false);
              $currentInput
                .closest(".type_interface_electronic_item")
                .removeClass(activeStyle);
              state.electro.delete(inputValue);
            } else {
              $currentInput.prop("checked", true);
              $currentInput
                .closest(".type_interface_electronic_item")
                .addClass(activeStyle);
              state.electro.add(inputValue);
            }
            break;
        }

        updateTextParam(state, this, true);
        pergola.update();
      });

      return electronicContent;

    case typesInputs.subSystem:
      const subSystemContent = $(`
          <form class="type_interface_electronic" id="last-group">
            <div class="type_interface_electronic_item option" id="${pergolaConst.option.LEDRampLight}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/led-ramp-light.png" alt="${pergolaConst.optionNameString.LEDRampLight}" class="color-image">
                </div>
                <span class="electronic-name">${pergolaConst.optionNameString.LEDRampLight}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.optionNameString.LEDRampLight}">
              </label>
            </div>
      
            <div class="type_interface_electronic_item option" id="${pergolaConst.option.LEDRecessed}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/led-recessed.png" alt="${pergolaConst.optionNameString.LEDRecessed}" class="color-image">
                </div>
                <span class="electronic-name">${pergolaConst.optionNameString.LEDRecessed}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.optionNameString.LEDRecessed}">
              </label>
            </div>
      
            <div class="type_interface_electronic_item option" id="${pergolaConst.option.LEDStrip}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/led-strip.png" alt="${pergolaConst.optionNameString.LEDStrip}" class="color-image">
                </div>
                <span class="electronic-name">${pergolaConst.optionNameString.LEDStrip}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.optionNameString.LEDStrip}">
              </label>
            </div>
      
            <div class="type_interface_electronic_item option" id="${pergolaConst.systemType.privacyWall}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/privacy-wall.png" alt="${pergolaConst.systemNameString.privacyWall}" class="color-image">
                </div>
                
                <span class="electronic-name">${pergolaConst.systemNameString.privacyWall}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.systemNameString.privacyWall}">
              </label>
            </div>
      
            <div class="type_interface_electronic_item option" id="${pergolaConst.systemType.autoShade}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/auto-screen.png" alt="${pergolaConst.systemNameString.autoShade}" class="color-image">
                </div>
                <span class="electronic-name">${pergolaConst.systemNameString.autoShade}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.systemNameString.autoShade}">
              </label>
            </div>
      
            <div class="type_interface_electronic_item option" id="${pergolaConst.option.fans}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/fan.png" alt="${pergolaConst.optionNameString.fans}" class="color-image">
                </div>
                <span class="electronic-name">${pergolaConst.optionNameString.fans}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.optionNameString.fans}">
              </label>
            </div>
          </form>
        `);

      const activeStyleSubSystem = "type_interface_electronic_item--active";
      const screenIcon = $("#screen");
      const shadesIcon = $("#shades");
      const portalScreen = $(".portal-screen");
      const portalShades = $(".portal-shades");
      const closeButtonScreen = $(".portal-screen__close");
      const closeButtonShades = $(".portal-shades__close");

      function handleInputChange($input, init = false) {
        const inputValue = $input.val();

        setAllHotspotsVisibility(true);
        pergola.update();

        switch (inputValue) {
          case pergolaConst.systemNameString.autoShade:
            state.currentActiveSystems = pergolaConst.systemType.autoShade;
            break;

          case pergolaConst.systemNameString.privacyWall:
            state.currentActiveSystems = pergolaConst.systemType.privacyWall;
            break;

          default:
            break;
        }

        const isElectroOption = [
          pergolaConst.optionNameString.LEDRampLight,
          pergolaConst.optionNameString.LEDRecessed,
          pergolaConst.optionNameString.LEDStrip,
          pergolaConst.optionNameString.fans,
        ].includes(inputValue);

        const activateInput = ($input) => {
          $input.prop("checked", true);
          $input
            .closest(".type_interface_electronic_item")
            .addClass(activeStyleSubSystem);
        };

        const deactivateInput = ($input) => {
          $input.prop("checked", false);
          $input
            .closest(".type_interface_electronic_item")
            .removeClass(activeStyleSubSystem);
        };

        const handleElectroOption = () => {
          if (state.electro.has(inputValue) && !init) {
            state.electro.delete(inputValue);
            deactivateInput($input);
            console.log("delete OPTION");
          } else {
            state.electro.add(inputValue);
            activateInput($input);
            state.currentActiveSystems = null;
          }
        };

        const handleSubSystemOption = () => {
          if (state.subSystem.has(inputValue) && !init) {
            state.subSystem.delete(inputValue);
            deactivateInput($input);

            pergola.removeSystemFromSpanType(state.currentActiveSystems);
            removeFromUrlSystemByType(state.currentActiveSystems);
            hideIcon(state.currentActiveSystems);

            state.currentActiveSystems = null;
          } else {
            state.subSystem.add(inputValue);
            activateInput($input);

            showIcon(state.currentActiveSystems);
          }
        };

        if (isElectroOption) {
          handleElectroOption();
        } else {
          handleSubSystemOption();
        }

        pergola.update();

        $input
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text(`${updateTextParam(state, $input[0], true, true, true)}`);
      }

      //#region INIT INPUT
      subSystemContent.find('input[type="radio"]').each(function () {
        const $input = $(this);
        const inputValue = $input.val();

        if (state.subSystem.has(inputValue) || state.electro.has(inputValue)) {
          handleInputChange($input, true);
        }
      });
      //#endregion

      //#region HANDLE INPUTS
      subSystemContent.find('input[type="radio"]').on("click", function () {
        handleInputChange($(this));
      });
      //#endregion

      return subSystemContent;

    case typesInputs.roofForLite:
      const roofContent = $(`
                <form class="type_interface_electronic">
                  <div class="type_interface_electronic_item option">
                    <label class="type_interface_electronic_label">
                       <div class="image-container">
                           <img src="public/img/sletted.png" alt="Screens" class="color-image">
                       </div>
                       
                       <span class="electronic-name">Slatted</span>
                       <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="Slatted">
                    </label>
                  </div>

                  <div class="type_interface_electronic_item option">
                    <label class="type_interface_electronic_label">
                       <div class="image-container">
                           <img src="public/img/screen-roof.png" alt="Textured Black" class="color-image">
                       </div>
                       
                       <span class="electronic-name">Screens</span>
                       <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="Screens">
                    </label>
                  </div>
                </form>
                `);

      const activeStyleRoof = "type_interface_electronic_item--active";

      // INIT INPUT
      roofContent.find('input[type="radio"]').each(function () {
        const inputValue = $(this).val();

        if (state.moodLight === inputValue) {
          $(this)
            .closest(".type_interface_electronic_item")
            .addClass(activeStyleRoof);
          $(this).prop("checked", true);
        }
      });

      // HANDLE INPUTS
      roofContent.find('input[type="radio"]').on("click", function () {
        const inputValue = $(this).val();
        state.moodLight = inputValue;

        // CURRENT OPTION
        $(this).prop("checked", true);
        $(this)
          .closest(".type_interface_electronic_item")
          .addClass(activeStyleRoof);

        // ALL OPTION
        $(this)
          .closest(".type_interface_electronic")
          .find(".type_interface_electronic_item")
          .not($(this).closest(".type_interface_electronic_item"))
          .removeClass(activeStyleRoof);

        // UPDATE TEXT
        $(this)
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text(`${state.moodLight}`);

        pergola.update();
      });

      //#region SCREEN BUTTON HANDLE
      roofContent
        .find(".type_interface_electronic_item")
        .eq(1)
        .on("click", () => {
          const roofTypes = $(".interface__group").eq(3);

          roofTypes.show();
          pergola.update();
        });
      //#endregion

      //#region SLATTED HANDLE
      roofContent
        .find(".type_interface_electronic_item")
        .eq(0)
        .on("click", () => {
          const roofTypes = $(".interface__group").eq(3);

          roofTypes.hide();
          pergola.update();
        });
      //#endregion

      return roofContent;

    // case typesInputs.typePergola:
    //   const roofButtonContent = $(`
    //         <form class="type_interface_roof-buttons">
    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/branch-1.svg" alt="Branch" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Branch</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Branch" name="fav_roof" value="Branch">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/breeze.svg" alt="Breeze" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Breeze</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Breeze" name="fav_roof" value="Breeze">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/dash.svg" alt="Dash" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Dash</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Dash" name="fav_roof" value="Dash">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/hexx.svg" alt="Hexx" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Hexx</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Hexx" name="fav_roof" value="Hexx">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/horizon.svg" alt="Horizon" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Horizon</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Horizon" name="fav_roof" value="Horizon">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/maui.svg" alt="Maui" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Maui</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Maui" name="fav_roof" value="Maui">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/moderna.svg" alt="Moderna" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Moderna</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Moderna" name="fav_roof" value="Moderna">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/rain.svg" alt="Rain" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Rain</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Rain" name="fav_roof" value="Rain">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/river-rock.svg" alt="River Rock" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">River Rock</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="River Rock" name="fav_roof" value="River Rock">
    //                 </label>
    //             </div>

    //             <div class="type_interface_roof-buttons_item option">
    //                 <label class="type_interface_roof-buttons_label">
    //                     <div class="image-container">
    //                         <img src="public/img/roof-types-icon/solid.svg" alt="Solid" class="roof-image">
    //                     </div>

    //                     <span class="roof-name">Solid</span>
    //                     <input class="type_interface_roof-buttons_option" type="radio" id="Solid" name="fav_roof" value="Solid">
    //                 </label>
    //             </div>
    //         </form>
    //     `);
    //   const activeClassRoof = "type_interface_roof-buttons_item--active";
    //   const inputButtons = roofButtonContent.find(
    //     ".type_interface_roof-buttons_item"
    //   );

    //   function initializeActiveClass() {
    //     const selectedValue = state.fans;

    //     if (selectedValue) {
    //       const selectedButton = inputButtons.filter(function () {
    //         return $(this).find("input").val() === selectedValue;
    //       });

    //       if (selectedButton.length > 0) {
    //         selectedButton.addClass(activeClassRoof);
    //       }
    //     }
    //   }

    //   initializeActiveClass();

    //   //#region HANDLE
    //   inputButtons.on("click", function () {
    //     state.fans = $(this).find("input").val();

    //     inputButtons.removeClass(activeClassRoof);

    //     $(this).addClass(activeClassRoof);

    //     changeTextureTop();
    //     $(this)
    //       .closest(".interface__group")
    //       .find(".interface__group__head__param")
    //       .text(`${state.fans}`);
    //   });
    //   //#endregion

    //   return roofButtonContent;

    default:
      return `< div > NON HTML</div > `;
  }
}
