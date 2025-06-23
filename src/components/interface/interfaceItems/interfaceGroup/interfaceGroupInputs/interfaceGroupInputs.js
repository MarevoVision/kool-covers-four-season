import $ from "jquery";
import * as THREE from "three";
import {
  ChangeGlobalMorph,
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
  groups,
  stringEndCuts,
  stringPostType,
  stringRoofType,
  stringTypePegola,
} from "../../../interface";
import "./interfaceGroupInputs.scss";
import { generateRangeHTML } from "./range/generateRange";

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
  endCuts: "endCuts",
};

export let stringNameRoofLetticeColor = null;
export let stringNameRoofSolidColor = null;
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

export const wallAddOptionString = {
  0: "Freestanding",
  1: "Wall-mounted",
  2: "Fascia-mounted",
  3: "Roof-mounted",
  4: "Cantilever",
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
      text.push(`${wallAddOptionString[state.wallOption]}`);
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

export function updateMaterialMap(mesh, hex = false) {
  if (mesh?.material) {
    const isTexture =
      typeof state.colorRoof === "string" &&
      /\.(jpe?g|png|webp)$/i.test(state.colorRoof);

    if (isTexture && !hex) {
      const loader = new THREE.TextureLoader();
      loader.load(state.colorRoof, (texture) => {
        mesh.material.map = texture;
        mesh.material.color.set(0xffffff);
        mesh.material.needsUpdate = true;
      });
    } else {
      mesh.material.map = null;
      mesh.material.color.set(hex);
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

      const activeModelClass = "active";

      //INIT MODEL
      // if (!state.model) {
      //   $("#param-light").show();
      //   // $('.interface__group').eq(3).hide();
      // } else {
      //   $("#param-light").hide();
      //   // $('.interface__group').eq(3).show();
      // }

      //REDIRECT LOGIC
      const azenco = radioModelInputs.find(".option").eq(0);
      const fourSeason = radioModelInputs.find(".option").eq(1);
      const fourK = radioModelInputs.find(".option").eq(2);

      azenco.on("click", function () {
        const link =
          "https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/Marevo-OM/Kool+Covers+-+links/azenco/dist/index.html";
        window.location.href = link;
      });

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
                  <div class="type_interface_radio-model_item option" id="lattice-roof">
                    <input data-value="0" class="type_interface_radio-model_option type_interface_radio-model_option--lattice" 
                        type="radio" id="shade" name="fav_language" value="${stringRoofType[0]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="shade">${stringRoofType[0]}</label>
                  </div>

                  <div class="type_interface_radio-model_item option" id="solid-roof">
                    <input data-value="1" class="type_interface_radio-model_option type_interface_radio-model_option--solid" 
                        type="radio" id="blade" name="fav_language" value="${stringRoofType[1]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="blade">${stringRoofType[1]}</label>
                  </div>

                  <div class="type_interface_radio-model_item option" id="combo-roof">
                    <input data-value="2" class="type_interface_radio-model_option type_interface_radio-model_option--combo" 
                        type="radio" id="blade" name="fav_language" value="${stringRoofType[2]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="blade">${stringRoofType[2]}</label>
                  </div>
                </form>`);

      const activeRoofTypeClass = "active";

      //INIT ROOF
      radioRoofTypeContent
        .find('.type_interface_radio-model_item input[type="radio"]')
        .each(function () {
          const radioButton = $(this);
          const type = +$(this).attr("data-value");
          const typeLattice = state.roofType === 0;
          const typeSolid = state.roofType === 1;
          const typeCombo = state.roofType === 2;

          // jQuery("#Bronze").closest("label").hide();

          hideIcon(10);
          hideIcon(11);
          hideIcon(12);

          $("#solid").show();

          if (typeLattice) {
            showIcon(11);
          }

          if (typeSolid) {
            showIcon(10);
            state.rain = false;
            state.directionRoof = false;
          }

          if (typeCombo) {
            showIcon(12);
            state.rain = false;
            state.directionRoof = false;
          }

          if (state.roofType === type) {
            radioButton
              .closest(".type_interface_radio-model_item")
              .addClass(activeRoofTypeClass);
          }

          setTimeout(() => {
            if (typeLattice) {
              $("#solid").hide();
            }
            if (typeSolid) {
              $("#lettice").hide();
            }
          }, 0);
        });

      //#region HANDLE ROOF
      radioRoofTypeContent
        .find('.type_interface_radio-model_item input[type="radio"]')
        .on("change", function () {
          // CHANGE STATE
          state.roofType = +$(this).attr("data-value");

          const typeLattice = state.roofType === 0;
          const typeSolid = state.roofType === 1;
          const typeCombo = state.roofType === 2;

          state.directionRoof = false;

          hideIcon(10);
          hideIcon(11);
          hideIcon(12);

          $("#solid").show();
          $("#lettice").show();

          if (typeLattice) {
            showIcon(11);
            state.thickness = 0;
            $("#solid").hide();
            $("#lettice .option")
              .eq($("#lettice .option").length - 1)
              .trigger("change");
          }

          if (typeSolid) {
            showIcon(10);
            $("#lettice").hide();
            state.thickness = 3;
            state.rain = false;
            $("#solid .option")
              .eq($("#lettice .option").length)
              .trigger("change");
          }

          if (typeCombo) {
            showIcon(12);
            state.thickness = 0;
            state.rain = false;
            $("#solid .option")
              .eq($("#lettice .option").length)
              .trigger("change");
            $("#lettice .option")
              .eq($("#lettice .option").length - 1)
              .trigger("change");
          }

          // #region RE-INIT thickness
          $(".portal-container")
            .find("#thickness .radio__container__item ")
            .each(function () {
              const $input = $(this);
              const id = +$(this).attr("id");

              //LOGIC FOR SOLID
              if (state.roofType === 1) {
                switch (true) {
                  case id === 3 && state.length > 16 && state.length <= 20:
                    $input.addClass("disable");

                    state.thickness =
                      state.thickness === 3 ? 4 : state.thickness;
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

          // #endregion

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
              <form class="type_interface_checkbox-wall type_interface_checkbox-wall--four-season">
                <div class="wrapp-wall-add-option">
                  <div class="type_interface_post-size_item option" id="0">
                      <input class="type_interface_post-size_option" type="radio"  name="fav_language" value="${stringPostType[0]}">
                      <label for="0">Freestanding</label>
                  </div>
             
                  <div class="type_interface_post-size_item option" id="1">
                      <input class="type_interface_post-size_option" type="radio"  name="fav_language" value="${stringPostType[1]}">
                      <label for="1">Wall-mounted</label>
                 </div>

                  <div class="type_interface_post-size_item option" id="2">
                      <input class="type_interface_post-size_option" type="radio"  name="fav_language" value="${stringPostType[0]}">
                      <label for="0">Fascia-mounted</label>
                  </div>
             
                  <div class="type_interface_post-size_item option" id="3">
                      <input class="type_interface_post-size_option" type="radio"  name="fav_language" value="${stringPostType[1]}">
                      <label for="1">Roof-mounted</label>
                 </div>
                </div>
              
                <div class="wrapp-wall" id="wall-option">
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
              </div>
              </form>
               `);

      const activeWallClass = "active";
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

      //INIT ADD OTPION
      selectWalls.find(".wrapp-wall-add-option .option").each(function () {
        const id = +$(this).attr("id");
        const $item = $(this);

        if (state.wallOption === id) {
          $item.addClass("active");

          setTimeout(() => {
            pergola.setAddOptionWall();
          }, 300);
        }
      });

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

        const backBeam = GetMesh("back_beam_wall");
        const backBeamL = GetMesh("beam_wall_L");
        const backBeamR = GetMesh("beam_wall_L001");
        backBeam.visible = false;
        backBeamL.visible = false;
        backBeamR.visible = false;

        if (state.wallOption === 2) {
          if (state.backWall) backBeam.visible = true;
          if (state.leftWall) backBeamL.visible = true;
          if (state.rightWall) backBeamR.visible = true;
        }

        pergola.update();

        toggleBackWall(state.backWall);
        toggleClass($(this), state.backWall);

        updateTextParam(state, this);
        // setAllHotspotsVisibility(false);
      });

      leftWall.on("click", function () {
        state.leftWall = !state.leftWall;
        removeFromUrlSystemBySide(pergolaConst.side.Left);

        const backBeam = GetMesh("back_beam_wall");
        const backBeamL = GetMesh("beam_wall_L");
        const backBeamR = GetMesh("beam_wall_L001");
        backBeam.visible = false;
        backBeamL.visible = false;
        backBeamR.visible = false;

        if (state.wallOption === 2) {
          if (state.backWall) backBeam.visible = true;
          if (state.leftWall) backBeamL.visible = true;
          if (state.rightWall) backBeamR.visible = true;
        }

        pergola.update();

        toggleLeftWall(state.leftWall);
        toggleClass($(this), state.leftWall);

        updateTextParam(state, this);
        // setAllHotspotsVisibility(false);
      });

      rightWall.on("click", function () {
        state.rightWall = !state.rightWall;
        removeFromUrlSystemBySide(pergolaConst.side.Right);

        const backBeam = GetMesh("back_beam_wall");
        const backBeamL = GetMesh("beam_wall_L");
        const backBeamR = GetMesh("beam_wall_L001");
        backBeam.visible = false;
        backBeamL.visible = false;
        backBeamR.visible = false;

        if (state.wallOption === 2) {
          if (state.backWall) backBeam.visible = true;
          if (state.leftWall) backBeamL.visible = true;
          if (state.rightWall) backBeamR.visible = true;
        }

        pergola.update();

        toggleRightWall(state.rightWall);
        toggleClass($(this), state.rightWall);

        updateTextParam(state, this);
        // setAllHotspotsVisibility(false);
      });

      selectWalls
        .find(".wrapp-wall-add-option .option")
        .on("click", function () {
          const id = +$(this).attr("id");
          const $item = $(this);

          state.wallOption = id;

          selectWalls
            .find(".wrapp-wall-add-option .option")
            .removeClass("active");

          $item.addClass("active");

          pergola.setAddOptionWall();

          pergola.update();

          updateTextParam(state, this);
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
              <div class="wrapp_post-type"> 
                  <div class="type_interface_radio-model_item option" id="0">
                    <input data-value="0" class="type_interface_radio-model_option type_interface_post-size_option--standart" 
                        type="radio" id="shade" name="fav_language" value="${stringPostType[0]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="shade">${stringPostType[0]}</label>
                  </div>

                  <div class="type_interface_radio-model_item option" id="1">
                    <input data-value="1" class="type_interface_radio-model_option type_interface_post-size_option--square" 
                        type="radio" id="blade" name="fav_language" value="${stringPostType[1]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="blade">${stringPostType[1]}</label>
                  </div>

                  <div class="type_interface_radio-model_item option" id="2">
                    <input data-value="1" class="type_interface_radio-model_option type_interface_post-size_option--round" 
                        type="radio" id="blade" name="fav_language" value="${stringPostType[2]}"
                        style="height: 90px"
                        >
                    <label class="type_interface_radio-model_label" for="blade">${stringPostType[2]}</label>
                  </div>
              </div>
              
              <div class="wrapp_post-add">
                <div class="radio-inputs"> 
                 <div class="main_container" style="margin: 0" id="slats_radio">
                  <div class="canvas_menu__title">Size</div>

                  <ul class="radio__container">
                    <li class="radio__container__item" id="8">
                      <div class="radio__container__item__cyrcle"></div>

                      <span class="radio__container__item__text">8"</span>
                     </li>
      
                     <li class="radio__container__item" id="10">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text" >10"</span>
                    </li>

                     <li class="radio__container__item" id="12">
                       <div class="radio__container__item__cyrcle"></div>
      
                       <span class="radio__container__item__text">12"</span>
                    </li>
                  </ul>
                 </div>
                </div>
                
                <div class="select-inputs">
                 <div class="type_interface_checkbox-wall_item option" id="double-header"> 
                    <div class="type_interface_checkbox-wall_bottom">
                      <input class="type_interface_checkbox-wall_option" type="checkbox">
                      <label for="back">Double Header</label>
                    </div> 
                  </div>
                </div>
              </div>

              </form>
          `);

      const activeClass = "active";

      // INIT POST TYPE INPUT
      postSizeContent.find(".wrapp_post-type .option").each(function () {
        if (state.postType === +$(this).attr("id")) {
          $(this).addClass(activeClass);
          postSizeContent.find(".radio-inputs").hide();

          if (state.postType) {
            state.beam = true;
            postSizeContent.find("#double-header").addClass("active");
            postSizeContent.find("#double-header").addClass("disable-radio");
            postSizeContent.find(".radio-inputs").show();
          }

          setTimeout(() => {
            const paramLabel = $(this).find("input").val();

            const $groupHeadParam = $(this)
              .closest(".interface__group")
              .find(".interface__group__head__param");

            $groupHeadParam.text(paramLabel);
          }, 0);
        }
      });

      //INIT POST SIZE
      postSizeContent.find(".radio__container__item").each(function () {
        if (state.postSize === +$(this).attr("id")) {
          $(this).addClass(activeClass);
        }
      });

      //INIT DOUBLE HEADER
      postSizeContent.find("#double-header").each(function () {
        if (state.beam) {
          $(this).addClass(activeClass);
        }
      });

      //HANDLE POST TYPE
      postSizeContent.find(".wrapp_post-type .option").on("click", function () {
        postSizeContent
          .find(".wrapp_post-type .option")
          .removeClass(activeClass);

        const paramLabel = $(this).find("input").val();
        state.postType = +$(this).attr("id");

        //CHANGE BEAM DEPENDENCE TYPE
        state.beam = false;
        postSizeContent.find("#double-header").removeClass("active");
        postSizeContent.find("#double-header").removeClass("disable-radio");
        postSizeContent.find(".radio-inputs").hide();

        if (state.postType) {
          state.beam = true;
          postSizeContent.find("#double-header").addClass("active");
          postSizeContent.find("#double-header").addClass("disable-radio");
          postSizeContent.find(".radio-inputs").show();
        }

        $(this).addClass(activeClass);

        const $groupHeadParam = $(this)
          .closest(".interface__group")
          .find(".interface__group__head__param");

        $groupHeadParam.text(paramLabel);

        pergola.update();
      });

      //HANDLE POST SIZE
      postSizeContent.find(".radio__container__item").on("click", function () {
        postSizeContent
          .find(".radio__container__item")
          .removeClass(activeClass);

        state.postSize = +$(this).attr("id");

        $(this).addClass(activeClass);

        pergola.update();
      });

      //HANDLE DOUBLE HEADER
      postSizeContent.find("#double-header").on("click", function () {
        $(this).toggleClass(activeClass);
        state.beam = !state.beam;

        pergola.update();
      });

      return postSizeContent;

    case typesInputs.typePergola:
      const typePergolaContent = $(`
          <form class="type_interface_post-size" style="flex-direction: row;">
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

      const activeClassTypePergola = "active";

      // //INIT INPUT
      typePergolaContent
        .find(".type_interface_post-size_item")
        .each(function () {
          $(this).removeClass(activeClassTypePergola);

          pergola.changeWallMaterials();

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

          pergola.changeWallMaterials();

          $(this).addClass(activeClassTypePergola);

          const $groupHeadParam = $(this)
            .closest(".interface__group")
            .find(".interface__group__head__param");

          $groupHeadParam.text(paramLabel);
          pergola.update();

          // toggleBackWall(state.backWall);
          // toggleLeftWall(state.leftWall);
          // toggleRightWall(state.rightWall);

          // updatePostSizeParams.call(this, selectedIndex);
        });

      return typePergolaContent;

    case typesInputs.colorsButton:
      const colorsRoofSolid = [
        {
          name: "Matte White",
          value: "Matte White",
          image: "matte-white.png",
          id: "MatteWhite",
          hex: "#CAC6C5",
        },
        {
          name: "White",
          value: "White",
          image: "white.png",
          id: "White",
          hex: "#D7D1D0",
        },
        {
          name: "Adobe",
          value: "Adobe",
          image: "adobe.png",
          id: "Adobe",
          hex: "#998F7A",
        },
        {
          name: "Wheat",
          value: "Wheat",
          image: "wheat.png",
          id: "Wheat",
          hex: "#9C9481",
        },
        {
          name: "Ivory",
          value: "Ivory",
          image: "ivory.png",
          id: "Ivory",
          hex: "#C7C2A9",
        },
        {
          name: "Bronze",
          value: "Bronze",
          image: "bronze.png",
          id: "Bronze",
          hex: "#58544F",
        },
        {
          name: "Brown",
          value: "Brown",
          image: "bronze.png",
          id: "Brown",
          hex: "#804030",
        },
        {
          name: "Sand",
          value: "Sand",
          image: "bronze.png",
          id: "Sand",
          hex: "#F6D7B0",
        },
      ];

      const colorsRoofLettice = [
        {
          name: "White",
          value: "White",
          image: "white.png",
          id: "White",
          hex: "#D7D1D0",
        },
        {
          name: "Adobe",
          value: "Adobe",
          image: "adobe.png",
          id: "Adobe",
          hex: "#998F7A",
        },
        {
          name: "Wheat",
          value: "Wheat",
          image: "wheat.png",
          id: "Wheat",
          hex: "#9C9481",
        },
        {
          name: "Ivory",
          value: "Ivory",
          image: "ivory.png",
          id: "Ivory",
          hex: "#C7C2A9",
        },
        {
          name: "Brown",
          value: "Brown",
          image: "bronze.png",
          id: "Brown",
          hex: "#804030",
        },
        {
          name: "Sand",
          value: "Sand",
          image: "bronze.png",
          id: "Sand",
          hex: "#F6D7B0",
        },
      ];

      const colorsFrame = [
        {
          name: "White",
          value: "White",
          image: "white.png",
          id: "White",
          hex: "#D7D1D0",
        },
        {
          name: "Adobe",
          value: "Adobe",
          image: "adobe.png",
          id: "Adobe",
          hex: "#998F7A",
        },
        {
          name: "Wheat",
          value: "Wheat",
          image: "wheat.png",
          id: "Wheat",
          hex: "#9C9481",
        },
        {
          name: "Ivory",
          value: "Ivory",
          image: "ivory.png",
          id: "Ivory",
          hex: "#C7C2A9",
        },
        {
          name: "Brown",
          value: "Brown",
          image: "bronze.png",
          id: "Brown",
          hex: "#804030",
        },
        {
          name: "Sand",
          value: "Sand",
          image: "bronze.png",
          id: "Sand",
          hex: "#F6D7B0",
        },
      ];

      const colorItemsRoofSolid = colorsRoofSolid
        .map(
          (color) => `
        <div class="type_interface_colors-buttons_item option" data-hex="${color.hex}">
          <label class="type_interface_colors-buttons_label">
            <div class="image-container" style="background-color: ${color.hex}"></div>
            <span class="color-name">${color.name}</span>
            <input class="type_interface_colors-buttons_option" type="radio" id="${color.id}" name="fav_language" value="${color.value}">
          </label>
        </div>
      `
        )
        .join("");

      const colorItemsRoofLettice = colorsRoofLettice
        .map(
          (color) => `
        <div class="type_interface_colors-buttons_item option" data-hex="${color.hex}">
          <label class="type_interface_colors-buttons_label">
            <div class="image-container" style="background-color: ${color.hex}"></div>
            <span class="color-name">${color.name}</span>
            <input class="type_interface_colors-buttons_option" type="radio" id="${color.id}" name="fav_language" value="${color.value}">
          </label>
        </div>
      `
        )
        .join("");

      const colorItemsFrame = colorsFrame
        .map(
          (color) => `
        <div class="type_interface_colors-buttons_item option" data-hex="${color.hex}">
          <label class="type_interface_colors-buttons_label">
            <div class="image-container" style="background-color: ${color.hex}"></div>
            <span class="color-name">${color.name}</span>
            <input class="type_interface_colors-buttons_option" type="radio" id="${color.id}" name="fav_language" value="${color.value}">
          </label>
        </div>
      `
        )
        .join("");

      const frameColorContent = $(`
        <form class="type_interface_colors-buttons">
          <div class="colors_container">
            ${colorItemsFrame}
          </div>
        </form>
      `);

      const roofColorContent = $(`
        <form class="type_interface_colors-buttons">
          <div id="lettice">
            <p class="colors_container-title" style="margin-bottom: 20px">Lattice:</p>

            <div class="colors_container" >            
              ${colorItemsRoofLettice}
            </div>
          </div>
        
          
          <div id="solid">
            <p class="colors_container-title" style="margin-bottom: 20px">Solid:</p>

            <div class="colors_container" >
              ${colorItemsRoofSolid}
            </div>
          </div>
        
        </form>
      `);

      const colorSwitch = roofColorContent.find(`.type_interface_post-size`);
      const standartColor = roofColorContent.find("#standart-color");
      const texuredColor = roofColorContent.find("#textured-color");

      const activeColorClass = "active";

      const activeColorTypeClass = "active";

      //LOGIC FOR FRAME COLOR
      if (title === "Frame Color") {
        const header = GetMesh("head_bevel_2");

        //#region INIT INPUT
        frameColorContent.find(".option").each(function () {
          const $this = $(this);
          const hex = $(this).attr("data-hex");

          const $item = $this.closest(".type_interface_colors-buttons_item");
          const $imgContainer = $item.find(".image-container");

          const bgColor = $imgContainer.css("background-color");
          const bgImage = $imgContainer.css("background-image");

          const nameOfColor = $this.find("input").val();

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

          const normalizedStateColor = extractPublicPath(state.colorBody);

          if (normalizedStateColor === backgroundColor) {
            $item.addClass(activeColorClass);
            $this.prop("checked", true);
            stringNameFrameColor = nameOfColor;

            setTimeout(() => {
              $this
                .closest(".interface__group")
                .find(".interface__group__head__param")
                .text(nameOfColor);

              updateMaterialMap(header, hex);
            }, 400);
          }

          pergola.update();
        });

        //#endregion

        //#region HANDLE ROOF INPUTS
        frameColorContent.find(".option").on("change", function () {
          const $this = $(this);
          const hex = $(this).attr("data-hex");

          const $item = $this.closest(".type_interface_colors-buttons_item");
          const $imgContainer = $item.find(".image-container");

          const bgColor = $imgContainer.css("background-color");
          const bgImage = $imgContainer.css("background-image");

          let backgroundColor;
          const match = bgImage.match(/url\(["']?(.*?)["']?\)/);

          if (bgImage !== "none" && match && match[1]) {
            backgroundColor = match[1];
          } else {
            backgroundColor = pergola.rgbToHex(bgColor);
          }

          state.colorBody = backgroundColor;

          const nameOfColor = $this.find("input").val();
          stringNameFrameColor = nameOfColor;

          frameColorContent.find(".option").removeClass(activeColorClass);

          $item.addClass(activeColorClass);

          $this
            .closest(".interface__group")
            .find(".interface__group__head__param")
            .text(nameOfColor);

          updateMaterialMap(header, hex);

          pergola.update();
        });
        // #endregion
      }

      //LOGIC FOR ROOF COLOR
      if (title === "Roof Color") {
        const lettice = GetMesh("lattice_3x3_X");
        const headerLettice = GetMesh("rafter_bevel_1");
        const beamLettice = GetMesh("beam");
        const backBeam = GetMesh("back_beam");

        const solid = GetMesh("wrap_kit");

        let letticeColorString = "";
        let solidColorString = "";

        //#region INIT SOLID & LATTICE INPUTS
        const extractImagePath = (bgImage, bgColor) => {
          const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
          if (bgImage && bgImage !== "none" && match && match[1]) {
            return "/" + match[1].trim().replace(/^\/+/, "");
          } else {
            return pergola.rgbToHex(bgColor);
          }
        };

        // Normalize state values
        const normalizedSolidColor = (() => {
          const match = state.colorRoofSolid?.match(/\/public\/.+$/);
          return match ? match[0] : state.colorRoofSolid;
        })();

        const normalizedLatticeColor = (() => {
          const match = state.colorRoof?.match(/\/public\/.+$/);
          return match ? match[0] : state.colorRoof;
        })();

        window.colorSolidInit = function () {
          console.log("init SOLID color");

          // #region Init Solid * MAIN INIT COLOR
          roofColorContent.find("#solid .option").each(function () {
            const $this = $(this);
            const hex = $(this).attr("data-hex");
            const typeSolid = state.roofType === 1;
            const typeLettice = !state.roofType;

            const $item = $this.closest(".type_interface_colors-buttons_item");
            const $imgContainer = $item.find(".image-container");

            const bgColor = $imgContainer.css("background-color");
            const bgImage = $imgContainer.css("background-image");

            const inputColorValue = extractImagePath(bgImage, bgColor);
            const nameOfColor = $this.find("input").val();

            if (inputColorValue === normalizedSolidColor) {
              $item.addClass(activeColorClass);
              $this.find("input").prop("checked", true);
              stringNameRoofSolidColor = nameOfColor;
              solidColorString = nameOfColor;

              //MAIN INIT COLOR
              setTimeout(() => {
                const resultColorRoof = typeSolid
                  ? solidColorString
                  : typeLettice
                  ? letticeColorString
                  : `${letticeColorString},${solidColorString || ""}`;

                $this
                  .closest(".interface__group")
                  .find(".interface__group__head__param")
                  .text(resultColorRoof);

                updateMaterialMap(solid, hex);
              }, 100);
            }
          });
          // #endregion
        };

        window.colorLattice = function () {
          console.log("init LATTICE color");

          // #region Init Lattice
          roofColorContent.find("#lettice .option").each(function () {
            const $this = $(this);
            const hex = $(this).attr("data-hex");
            const typeLettice = !state.roofType;

            const $item = $this.closest(".type_interface_colors-buttons_item");
            const $imgContainer = $item.find(".image-container");

            const bgColor = $imgContainer.css("background-color");
            const bgImage = $imgContainer.css("background-image");

            const inputColorValue = extractImagePath(bgImage, bgColor);
            const nameOfColor = $this.find("input").val();

            if (inputColorValue === normalizedLatticeColor) {
              $item.addClass(activeColorClass);
              $this.find("input").prop("checked", true);
              stringNameRoofLetticeColor = nameOfColor;
              letticeColorString = nameOfColor;

              const resultColorRoof = typeLettice
                ? letticeColorString
                : `${letticeColorString},${solidColorString || ""}`;

              updateMaterialMap(lettice, hex);
              updateMaterialMap(headerLettice, hex);
              updateMaterialMap(beamLettice, hex);
              updateMaterialMap(backBeam, hex);

              setTimeout(() => {
                $this
                  .closest(".interface__group")
                  .find(".interface__group__head__param")
                  .text(resultColorRoof);
              }, 0);
            }
          });
          // #endrigion
        };

        window.colorSolidInit();
        window.colorLattice();

        //#region HANDLE SOLID INPUTS
        roofColorContent.find("#solid .option").on("change", function () {
          console.log("CLICK ON COLOR SOLID");

          const $this = $(this);
          const hex = $(this).attr("data-hex");
          const $item = $this.closest(".type_interface_colors-buttons_item");
          const $imgContainer = $item.find(".image-container");
          const typeSolid = state.roofType === 1;

          const bgColor = $imgContainer.css("background-color");
          const bgImage = $imgContainer.css("background-image");

          let backgroundColor;
          const match = bgImage.match(/url\(["']?(.*?)["']?\)/);

          if (bgImage !== "none" && match && match[1]) {
            backgroundColor = match[1];
          } else {
            backgroundColor = pergola.rgbToHex(bgColor);
          }

          state.colorRoofSolid = backgroundColor;

          const nameOfColor = $this.find("input").val();
          stringNameRoofSolidColor = nameOfColor;

          solidColorString = nameOfColor;
          const resultColorRoof = typeSolid
            ? solidColorString
            : letticeColorString + "," + solidColorString;

          roofColorContent.find("#solid .option").removeClass(activeColorClass);

          $item.addClass(activeColorClass);

          $this
            .closest(".interface__group")
            .find(".interface__group__head__param")
            .text(resultColorRoof);

          console.log(resultColorRoof, "HEADER CLICK");
          updateMaterialMap(solid, hex);

          pergola.update();
        });
        // #endregion

        //#region HANDLE LATTICE INPUTS
        roofColorContent.find("#lettice .option").on("change", function () {
          console.log("CLICK ON COLOR LATTICE");

          const $this = $(this);
          const hex = $(this).attr("data-hex");
          const typeLettice = !state.roofType;

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

          const nameOfColor = $this.find("input").val(); // Завжди показуємо значення value
          stringNameRoofLetticeColor = nameOfColor;
          letticeColorString = nameOfColor;
          const resultColorRoof = typeLettice
            ? letticeColorString
            : letticeColorString + "," + solidColorString;

          roofColorContent
            .find("#lettice .option")
            .removeClass(activeColorClass);

          // Додаємо активний клас
          $item.addClass(activeColorClass);

          // Вивід у header
          $this
            .closest(".interface__group")
            .find(".interface__group__head__param")
            .text(resultColorRoof);

          // Оновлення матеріалу
          updateMaterialMap(lettice, hex);
          updateMaterialMap(headerLettice, hex);
          updateMaterialMap(beamLettice, hex);
          updateMaterialMap(backBeam, hex);

          pergola.update();
        });
        // #endregion

        // #region COLOR TYPE
        colorSwitch.find('input[type="radio"]').each(function () {
          const $input = $(this);
          const id = +$input.attr("id");

          //INIT
          $(this).removeClass(activeColorTypeClass);

          console.log();
          if (state.roofColorType === id) {
            console.log("ADD CLASs");
            $(this).parent().addClass(activeColorTypeClass);
          }

          if (!state.roofColorType) {
            standartColor.show();
            texuredColor.hide();

            roofColorContent.find(".color-bottom").show();
          } else {
            texuredColor.show();
            standartColor.hide();

            roofColorContent.find(".color-bottom").hide();
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

              roofColorContent.find(".colors_container");
              $(this).addClass(activeColorTypeClass);

              standartColor.hide();
              texuredColor.hide();

              if (!state.roofColorType) {
                standartColor.show();
                texuredColor.hide();

                roofColorContent.find(".color-bottom").show();
              } else {
                texuredColor.show();
                standartColor.hide();

                roofColorContent.find(".color-bottom").hide();
              }
            });
        });

        // #endregion
      }

      return title === "Roof Color" ? roofColorContent : frameColorContent;

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

    case typesInputs.endCuts:
      const endCutsContent = $(`
                  <form class="type_interface_radio-model">
                    <div class="type_interface_radio-model_item option" id="1">
                      <input data-value="0" class="type_interface_radio-model_option ends-cut--bevel" 
                          type="radio" name="fav_language" value="${stringEndCuts[0]}"
                          style="height: 80px"
                          >
                      <label class="type_interface_radio-model_label" for="shade">${stringEndCuts[0]}</label>
                    </div>
  
                    <div class="type_interface_radio-model_item option" id="2">
                      <input data-value="1" class="type_interface_radio-model_option ends-cut--mitre" 
                          type="radio" name="fav_language" value="${stringEndCuts[1]}"
                          style="height: 80px"
                          >
                      <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[1]}</label>
                    </div>
  
                    <div class="type_interface_radio-model_item option" id="3">
                      <input data-value="1" class="type_interface_radio-model_option ends-cut--corbel" 
                          type="radio" name="fav_language" value="${stringEndCuts[2]}"
                          style="height: 80px"
                          >
                      <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[2]}</label>
                    </div>

                    <div class="type_interface_radio-model_item option" id="4">
                      <input data-value="1" class="type_interface_radio-model_option ends-cut--scallop" 
                          type="radio" name="fav_language" value="${stringEndCuts[3]}"
                          style="height: 80px"
                          >
                      <label class="type_interface_radio-model_label" for="blade">${stringEndCuts[3]}</label>
                    </div>
                  </form>`);

      // //INIT MODEL
      endCutsContent.find(".option").each(function () {
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

      //#region HANDLE MODEL
      endCutsContent.find(".option").on("click", function () {
        const parentItem = $(this).closest(".type_interface_radio-model_item");
        const id = +$(this).attr("id");

        state.endCuts = id;

        endCutsContent.find(".option").removeClass("active");

        parentItem.addClass("active");

        $(parentItem)
          .closest(".interface__group")
          .find(".interface__group__head__param")
          .text($(this).find("input").val());

        pergola.update();
      });
      //#endregion

      return endCutsContent;

    case typesInputs.subSystem:
      const subSystemContent = $(`
          <form class="type_interface_electronic" id="last-group">
            <div class="type_interface_electronic_item option" id="${pergolaConst.option.LEDRampLight}">
              <label class="type_interface_electronic_label">
                <div class="image-container">
                  <img src="public/img/light.png" alt="${pergolaConst.optionNameString.LEDRampLight}" class="color-image">
                </div>
                <span class="electronic-name">${pergolaConst.optionNameString.LEDRampLight}</span>
                <input class="type_interface_electronic_option" type="radio" id="TexturedBlack" name="fav_language" value="${pergolaConst.optionNameString.LEDRampLight}">
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

    default:
      return `< div > NON HTML</div > `;
  }
}
