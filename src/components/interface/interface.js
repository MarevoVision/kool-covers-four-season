import $ from "jquery";
import { capitalize } from "lodash";
import { MORPH_DATA, state } from "../../core/settings";
import { summaryButtonComponent } from "../summary/summary-button/summaryButton";
import interfaceHTML from "./interface.html";
import "./interface.scss";
import { interfaceGroupComponent } from "./interfaceItems/interfaceGroup/interfacGroup";
import {
  interfaceGroupInputsComponent,
  typesInputs,
  updateTextParam,
} from "./interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";
import { typesDirection } from "./interfaceItems/interfaceGroup/interfaceGroupInputs/range/generateRange";

export const step = !state.model ? 17 : 20;

const textWall = updateTextParam(state, this, false, true);
const textElectro = updateTextParam(state, this, true, true);
const textSub = updateTextParam(state, this, true, true, true);

export function deleteActiveClassFromContainerRadioType(
  container,
  firstSelector,
  activeClass
) {
  container.find(firstSelector).each(function () {
    $(this).closest(firstSelector).removeClass(activeClass);
  });
}

export const stringTypeModel = {
  0: "Azenco",
  1: "Four Seasons",
  2: "4K Aluminum Patio Covers",
};

export const stringTypePegola = {
  0: "Residential",
  1: "Commercial",
};

export const stringRoofType = {
  0: "R-SHADE™",
  1: "R-BLADE™",
};

export const stringPostSize = {
  0: `6.5&quot x 6.5&quot`,
  1: `8&quot x 8&quot`,
};

export const stringColorType = {
  0: `Standart Colors`,
  1: `Wood Colors`,
};

export const groups = [
  {
    title: "Manufacturer",
    param: stringTypeModel[state.type3Dmodel],
    type: typesInputs.modelType,
    // ranges: [
    //   {
    //     title: "Rotation",
    //     min: 0,
    //     max: 90,
    //     step: 1,
    //     thumb: false,
    //     initialValue: state.currentRotationZ,
    //     showLabels: true,
    //     showSwitchAngle: true,
    //   },
    // ],
  },
  { title: "Mounted", param: textWall, type: typesInputs.selectButton },
  {
    title: "Type",
    param: stringTypePegola[state.typePergola],
    type: typesInputs.typePergola,
  },
  {
    title: "Roof Type",
    param: stringRoofType[state.roofType],
    type: typesInputs.roofType,
  },
  {
    title: "Dimensions",
    param: `${state.width}' x ${state.length}' x ${state.height}'`,
    type: typesInputs.range,
    ranges: [
      {
        title: capitalize(typesDirection.width),
        labelMin: `4'`,
        labelMax: `60'`,
        min: MORPH_DATA.width.min,
        max: MORPH_DATA.width.max,
        step: 1,
        thumb: true,
        initialValue: state.width,
        showLabels: true,
        showSwitchAngle: false,
        inch: true,
      },
      {
        title: capitalize(typesDirection.length),
        labelMin: `4'`,
        labelMax: `60'`,
        min: MORPH_DATA.length.min,
        max: MORPH_DATA.length.max,
        step: 1,
        thumb: true,
        initialValue: state.length,
        showLabels: true,
        showSwitchAngle: false,
        inch: true,
      },
      {
        title: capitalize(typesDirection.height),
        labelMin: `8'`,
        labelMax: `12'`,
        min: MORPH_DATA.height.min,
        max: MORPH_DATA.height.max,
        step: 1,
        thumb: true,
        initialValue: state.height,
        showLabels: true,
        showSwitchAngle: false,
        inch: true,
      },
    ],
  },
  {
    title: "Post Size",
    param: stringPostSize[state.postSize],
    type: typesInputs.postSize,
    initValuePostSize: state.postSize,
  },
  {
    title: "Frame Color",
    param: state.colorBody,
    type: typesInputs.colorsButton,
  },
  {
    title: "Roof Color",
    param: state.colorRoof,
    type: typesInputs.colorsButton,
  },
  // {
  //   title: "Electrical Options",
  //   param: textElectro,
  //   type: typesInputs.electronic,
  // },
  { title: "Extra Options", param: textSub, type: typesInputs.subSystem },
];

export function interfaceComponent(container) {
  const componentContent = $(
    '<div class="interface-container" id="interface"></div>'
  );

  const interfaceElement = $(interfaceHTML);

  groups.forEach((group) => {
    const groupComponent = interfaceGroupComponent(group.title, group.param);
    const groupComponentInputs = $(
      '<div class="interface__group__inputs"></div>'
    );
    groupComponentInputs.append(
      interfaceGroupInputsComponent(
        group.type,
        group?.ranges,
        group?.initValuePostSize,
        group.title
      )
    );
    groupComponent.append(groupComponentInputs);

    groupComponentInputs.hide();

    interfaceElement.append(groupComponent);
  });

  $(componentContent).append(interfaceElement);

  summaryButtonComponent(componentContent);
  $(container).append(componentContent);
}
