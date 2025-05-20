// import { Vec3 } from "cannon-es";
// import $ from "jquery";
// import _ from "lodash";
// import * as THREE from "three";
// import { typeSubSystem } from "../../components/Interface/interfaceItems/interfaceGroup/interfaceGroupInputs/interfaceGroupInputs";
// import {
//   ChangeGlobalMorph,
//   ChangeMaterialOffset,
//   ChangeMaterialTilling,
//   ConvertMorphValue,
//   generateCenterMidpoints,
//   generateMidpoints,
//   GetGroup,
//   GetMesh,
//   modelForExport,
//   ParseMorphByModel,
// } from "../3d-configurator";
// import { log, settingsLouver, state } from "../settings";
// import {
//   resetSpansActive,
//   setAllHotspotsVisibility,
//   setSpansHeaters,
// } from "./subSystemHeaters";
// import {
//   setAllHotspotsVisibilityScreen,
//   setSpansScreen,
//   spansScreen,
// } from "./subSystemScreen";
// import { typePortalOption } from "../../components/portal/portals";

// export function getSize(model) {
//   const box = new THREE.Box3().setFromObject(model);
//   const size = box.getSize(new THREE.Vector3());
// }

// export function getMeters(feet) {
//   const meters = feet * 0.3048;
//   return meters;
// }

// export const clonesForPostSize = [];

// const syncMorphTargets = (source, target) => {
//   if (source.morphTargetInfluences && target.morphTargetInfluences) {
//     for (let i = 0; i < source.morphTargetInfluences.length; i++) {
//       target.morphTargetInfluences[i] = source.morphTargetInfluences[i];
//     }
//   }
// };

// export function getCorners(width, length) {
//   const LBottomWidth = getMeters(width) / 2;
//   const LBottomLenght = getMeters(length) / 2;

//   return {
//     LB_point: { x: -LBottomWidth, z: LBottomLenght }, // LEFT BOTTOM CORNER
//     RB_point: { x: LBottomWidth, z: LBottomLenght }, // RIGHT BOTTOM CORNER
//     LT_point: { x: -LBottomWidth, z: -LBottomLenght }, // LEFT TOP CORNER
//     RT_point: { x: LBottomWidth, z: -LBottomLenght }, // RIGHT TOP CORNER
//   };
// }

// export async function initLouver(inputValue, toggle) {
//   const originalLouver = GetMesh("louver_Y");

//   if (originalLouver) {
//     originalLouver.geometry.computeBoundingBox();
//     const boundingBox = originalLouver.geometry.boundingBox;
//     const widthL = boundingBox.max.x - boundingBox.min.x - 0.03;

//     settingsLouver.width = !state.model ? widthL : widthL / 2.4;

//     const countItem = Math.floor(inputValue / settingsLouver.width);
//     settingsLouver.countLouver = countItem;

//     const correction = (inputValue - countItem * settingsLouver.width) / 2;
//     settingsLouver.correction = correction;
//   }
// }

// //#region ******** LISTENER *********/
// function synchronizeMorphTargets(original, clone) {
//   if (original.morphTargetInfluences && clone.morphTargetInfluences) {
//     clone.onBeforeRender = () => {
//       for (let i = 0; i < original.morphTargetInfluences.length; i++) {
//         clone.morphTargetInfluences[i] = original.morphTargetInfluences[i];
//       }
//     };
//   }
// }

// function resetClones(modelForExport, cloneStorage) {
//   Object.values(cloneStorage).forEach((clone) => {
//     if (Array.isArray(clone)) {
//       clone.forEach((item) => {
//         modelForExport.remove(item);
//       });
//     } else {
//       modelForExport.remove(clone);
//     }
//   });

//   cloneStorage = {};
// }

// export const cloneLouverFirst = [];
// export const cloneLouverSecond = [];
// export const cloneLouverThird = [];
// export let pointLights = [];
// export let lineLight = [];
// export let cloneStorage = {};
// export let clonesScreens = [];

// const fansClones = [];
// const beamFanClones = [];
// export const heatersBottom = [];
// export const heatersTop = [];
// export const heatersLeft = [];
// export const heatersRight = [];

// export const screensClonesBottom = [];
// export const columnClonesBottom = [];

// export const screensClonesLeft = [];
// export const columnClonesLeft = [];

// export const screensClonesTop = [];
// export const columnClonesTop = [];

// export const screensClonesRight = [];
// export const columnClonesRight = [];

// export const clonesLiteShadeColumns = [];
// export const clonesBeamForScreens = [];
// export const clonesScreensTop = [];

// const sunIcon = $("#light");

// const maxWidthScreen = 4;
// const maxLengthScreen = 5;

// let beamX = null;
// let beamZ = null;
// let roof = null;

// let init = true;

// const stepForLouver = 15;
// export let stepForColumn = !state.model ? 17 : 20;

// export async function listenerChange() {
//   resetClones(modelForExport, cloneStorage);
//   stepForColumn = !state.model ? 17 : 20;
//   const morphValueForLiteShade = ConvertMorphValue(state.length, 6, 40);

//   //#region INIT DEPENDENCE MODEL
//   if (!state.model) {
//     ChangeGlobalMorph("screen-slat", 1);
//     ChangeGlobalMorph("titan", 1);
//     ChangeGlobalMorph("lighr_shade", 0);
//     ChangeGlobalMorph("light-shade", 0);

//     GetMesh("titan_header").visible = true;
//     GetMesh("header").visible = false;

//     GetMesh("beam_X").visible = false;
//     GetMesh("titan_beam_X").visible = true;
//     GetMesh("beam_Y").visible = false;
//     GetMesh("titan_beam_Y").visible = true;

//     GetMesh("lattice_Y").visible = false;
//     GetMesh("louver_Y").visible = true;

//     beamX = GetMesh("titan_beam_X");
//     beamZ = GetMesh("titan_beam_Y");
//     roof = GetMesh("louver_Y");
//   } else {
//     ChangeGlobalMorph("screen-slat", 0);
//     ChangeGlobalMorph("titan", 0);
//     ChangeGlobalMorph("lighr_shade", 1);
//     ChangeGlobalMorph("light-shade", 1);

//     GetMesh("titan_header").visible = false;
//     GetMesh("header").visible = true;

//     GetMesh("titan_beam_X").visible = false;
//     GetMesh("beam_X").visible = true;
//     GetMesh("titan_beam_Y").visible = false;
//     GetMesh("beam_Y").visible = true;

//     GetMesh("lattice_Y").visible = true;
//     GetMesh("louver_Y").visible = false;

//     beamX = GetMesh("beam_X");
//     beamZ = GetMesh("beam_Y");
//     roof = GetMesh("lattice_Y");
//   }

//   //#endregion

//   const { LB_point, RB_point, LT_point, RT_point } = getCorners(
//     state.width,
//     state.length
//   );

//   initLouver();

//   const originalMeshes = {
//     louver: roof,
//     columnFC: GetMesh("posr_f_C"),
//     footFC: GetMesh("foot_f_C"),
//     columnBC: GetMesh("posr_b_C"),
//     footBC: GetMesh("foot_b_C"),
//     columnLC: GetMesh("posr_L_C"),
//     footLC: GetMesh("foot_L_C"),
//     columnRC: GetMesh("posr_R_C"),
//     footRC: GetMesh("foot_R_C"),
//     footFL: GetMesh("foot_f_L"),
//     footFR: GetMesh("foot_f_R"),
//     footBL: GetMesh("foot_b_L"),
//     footBR: GetMesh("foot_b_R"),
//     footL: GetMesh("foot_L"),
//     footR: GetMesh("foot_R"),
//     footC: GetMesh("foot_C"),
//     footB: GetMesh("foot_B"),
//     beamZ: beamZ,
//     beamX: beamX,
//     fan: GetGroup("fan"),
//     UFO: GetGroup("UFO"),
//     ledBeam: GetGroup("titan_beam_X_LED"),
//     ledBeamZ: GetGroup("titan_beam_Y_LED"),
//     LED: GetGroup("titan_LED"),
//     leftCenter: GetMesh("posr_L"),
//     leftCenterZ: GetMesh("posr_f_"),
//     rightCenter: GetMesh("posr_R"),
//     rightCenterZ: GetMesh("posr_b"),
//     liteShadePost: GetMesh("posr_4x4"),
//     beamFan: GetMesh("fan_beam"),
//     roofScreen: GetGroup("screen_top"),
//   };

//   const originalLouver = originalMeshes.louver;
//   originalLouver.geometry.computeBoundingBox();
//   const widthLouver = settingsLouver.width;
//   const widthModel = state.width;
//   const lengthModel = state.length;

//   //COUNT ROOF CLONE
//   const countItem = Math.floor(getMeters(widthModel) / widthLouver);

//   //#region LOGIC FOR CLONE
//   const clones = {};

//   clones.louver = Array.from({ length: 3 }, (_, index) => {
//     const clone = originalMeshes.louver.clone();
//     clone.name = !state.model ? `louver_${index}` : `lattice_${index}`;
//     synchronizeMorphTargets(originalMeshes.louver, clone);
//     clone.visible = false;
//     modelForExport.add(clone);
//     return clone;
//   });

//   clones.beamFan = Array.from({ length: 2 }, (_, index) => {
//     const beamFanClone = GetMesh("fan_beam").clone();
//     beamFanClone.name = `fan_beam_${index}`;

//     synchronizeMorphTargets(originalMeshes.beamFan, beamFanClone);

//     beamFanClone.visible = false;
//     modelForExport.add(beamFanClone);

//     return beamFanClone;
//   });

//   clones.beamClones = Array.from({ length: 12 }, (_, index) => {
//     const beamClone = GetMesh("beam_Y").clone();
//     beamClone.name = `screen_beam_${index}`;

//     synchronizeMorphTargets(originalMeshes.beamZ, beamClone);

//     beamClone.visible = false;
//     modelForExport.add(beamClone);

//     return beamClone;
//   });

//   clones.beamClonesX = Array.from({ length: 12 }, (_, index) => {
//     const beamClone = GetMesh("beam_X").clone();
//     beamClone.name = `screen_beam_X_${index}`;

//     synchronizeMorphTargets(originalMeshes.beamX, beamClone);

//     beamClone.visible = false;
//     modelForExport.add(beamClone);

//     return beamClone;
//   });

//   if (init) {
//     clonesScreens.push(
//       Array.from({ length: 10 }, (_, index) => {
//         const screens = (clones.roofScreens = Array.from(
//           { length: 12 },
//           (_, index) => {
//             const screens = GetGroup("screen_top").clone();
//             screens.name = `screen_${index}`;

//             screens.renderOrder = 2;
//             screens.children[1].material.depthWrite = false;
//             screens.children[1].material.transparent = true;
//             screens.children[1].material.alphaTest = 0.5;
//             screens.children[1].material.opacity = 0.99;
//             screens.children[1].material.depthWrite = false;

//             console.log(screens);

//             synchronizeMorphTargets(originalMeshes.beamFan, screens);
//             changeColorAndTexture(screens.children[1], false);

//             screens.visible = false;
//             modelForExport.add(screens);

//             return screens;
//           }
//         ));

//         screens.name = `screen_row_${index}`;

//         return screens;
//       })
//     );

//     init = false;
//   }

//   Object.keys(originalMeshes).forEach((key) => {
//     if (key !== "louver" && key !== "beamFan") {
//       const originalMesh = originalMeshes[key];
//       const clone = originalMesh.clone();
//       clone.name = `${key}_clone`;
//       synchronizeMorphTargets(originalMesh, clone);
//       clone.visible = false;
//       modelForExport.add(clone);
//       clones[key] = clone;
//     }
//   });

//   ParseMorphByModel(modelForExport);

//   cloneStorage = clones;
//   //#endregion

//   //#region RESET DEFUALT BEFORE LISTENER
//   originalMeshes.louver.visible = false;
//   originalMeshes.leftCenterZ.visible = false;
//   originalMeshes.rightCenterZ.visible = false;
//   originalMeshes.leftCenter.visible = false;
//   originalMeshes.rightCenter.visible = false;
//   originalMeshes.liteShadePost.visible = false;
//   originalMeshes.fan.visible = false;
//   cloneStorage.fan.visible = false;
//   originalMeshes.beamFan.visible = false;

//   originalMeshes.footFC.visible = false;
//   originalMeshes.footBC.visible = false;
//   originalMeshes.footLC.visible = false;
//   originalMeshes.footRC.visible = false;
//   originalMeshes.footFL.visible = false;
//   originalMeshes.footFR.visible = false;
//   originalMeshes.footBL.visible = false;
//   originalMeshes.footBR.visible = false;
//   originalMeshes.footL.visible = false;
//   originalMeshes.footB.visible = false;
//   originalMeshes.footC.visible = false;
//   originalMeshes.footR.visible = false;

//   cloneStorage.beamFan.forEach((mesh) => (mesh.visible = false));
//   cloneStorage.roofScreen.visible = false;
//   cloneStorage.roofScreen.children.forEach((child) => (child.visible = false));

//   GetGroup("screen_wall_X").visible = false;
//   GetGroup("screen_wall_X").children.forEach(
//     (child) => (child.visible = false)
//   );

//   GetGroup("screen_wall_Y").visible = false;
//   GetGroup("screen_wall_Y").children.forEach(
//     (child) => (child.visible = false)
//   );

//   GetGroup("shades_X").visible = false;
//   GetGroup("shades_X").children.forEach((child) => (child.visible = false));

//   GetGroup("shades_Y").visible = false;
//   GetGroup("shades_Y").children.forEach((child) => (child.visible = false));

//   GetGroup("screen_top").visible = false;
//   GetGroup("screen_top").children.forEach((child) => (child.visible = false));

//   clearClones(modelForExport, fansClones);
//   clearClones(modelForExport, beamFanClones);
//   clearClones(modelForExport, clonesBeamForScreens);
//   clearClones(modelForExport, clonesScreensTop);

//   clonesScreens[0].forEach((row) => {
//     row.forEach((group) => {
//       group.visible = false;
//     });
//   });
//   //#endregion

//   //#region LENGTH LOGIC
//   switch (true) {
//     case lengthModel >= stepForLouver * 2:
//       log && console.log("LENGHT LARGE");
//       const halfForRoof = !state.model ? 3 : 2;
//       const large = lengthModel / halfForRoof;
//       const offsetForEveryPartLarge = 0;
//       let morphValueLargePergola = ConvertMorphValue(
//         large - offsetForEveryPartLarge,
//         6,
//         15
//       );

//       //#region OFFSET LOUVER
//       if (state.length >= 30) {
//         morphValueLargePergola -= morphValueLargePergola * 0.01;
//       }
//       if (state.length >= 33) {
//         morphValueLargePergola -= morphValueLargePergola * 0.012;
//       }
//       if (state.length >= 34) {
//         morphValueLargePergola -= morphValueLargePergola * 0.013;
//       }
//       //#endregion
//       const positionForBeam = getMeters(lengthModel / 3) / 2;

//       //#region LOGIC BEAM

//       cloneStorage.beamX.visible = true;
//       originalMeshes.beamX.visible = true;

//       cloneStorage.beamX.position.z = positionForBeam - 0.01;
//       originalMeshes.beamX.position.z = -positionForBeam + 0.03;

//       if (state.model) {
//         cloneStorage.beamX.visible = false;
//         originalMeshes.beamX.visible = true;

//         originalMeshes.beamX.position.z = 0;
//       }

//       //#endregion

//       //#region LOGIC COLUMN
//       //originalColumn
//       originalMeshes.columnLC.visible = true;
//       originalMeshes.columnRC.visible = true;

//       originalMeshes.columnLC.position.z = 0;
//       originalMeshes.columnRC.position.z = 0;

//       //cloneColumn
//       cloneStorage.columnLC.visible = false;
//       cloneStorage.columnRC.visible = false;
//       //#endregion

//       //#region CONDITION FOR STEP TITAN COLUM
//       if (lengthModel >= stepForColumn * 2) {
//         cloneStorage.beamX.visible = true;
//         originalMeshes.beamX.visible = true;

//         cloneStorage.beamX.position.z = positionForBeam - 0.01;
//         originalMeshes.beamX.position.z = -positionForBeam + 0.03;

//         cloneStorage.columnLC.visible = true;
//         cloneStorage.columnRC.visible = true;

//         cloneStorage.columnLC.position.z = positionForBeam - 0.01;
//         cloneStorage.columnRC.position.z = positionForBeam - 0.01;

//         originalMeshes.columnLC.position.z = -positionForBeam + 0.03;
//         originalMeshes.columnRC.position.z = -positionForBeam + 0.03;
//       }
//       //#endregion

//       //#region LOUVER TITAN COVER
//       if (!state.model) {
//         ChangeGlobalMorph("length_louver", morphValueLargePergola);

//         // Установка для клону лувру 0
//         cloneStorage.louver[0].position.set(
//           LB_point.x + settingsLouver.width + 0.005,
//           getMeters(state.height) + 0.11,
//           LB_point.z - 0.11
//         );
//         if (state.isRotated) {
//           cloneStorage.louver[0].position.set(
//             RT_point.x - settingsLouver.width - 0.005,
//             getMeters(state.height) + 0.11,
//             LT_point.z + 0.12
//           );
//           cloneStorage.louver[0].rotation.y = (Math.PI / 180) * 180;
//         }
//         cloneStorage.louver[0].visible = true;

//         makeClones(countItem, cloneLouverFirst, 0, originalMeshes);

//         // Установка для клону лувру 1
//         cloneStorage.louver[1].position.set(
//           LB_point.x + settingsLouver.width + 0.005,
//           getMeters(state.height) + 0.11,
//           positionForBeam - 0.06
//         );
//         if (state.isRotated) {
//           cloneStorage.louver[1].position.set(
//             RT_point.x - settingsLouver.width - 0.005,
//             getMeters(state.height) + 0.11,
//             -positionForBeam + 0.09
//           );
//           cloneStorage.louver[1].rotation.y = (Math.PI / 180) * 180;
//           // cloneStorage.louver[1].rotation.x = (Math.PI / 180) * 180;
//         }
//         cloneStorage.louver[1].visible = true;

//         makeClones(countItem, cloneLouverSecond, 1, originalMeshes);

//         // Установка для клону лувру 2
//         cloneStorage.louver[2].position.set(
//           LB_point.x + settingsLouver.width + 0.005,
//           getMeters(state.height) + 0.11,
//           -positionForBeam - 0.02
//         );
//         if (state.isRotated) {
//           cloneStorage.louver[2].position.set(
//             RT_point.x - settingsLouver.width + 0.005,
//             getMeters(state.height) + 0.11,
//             positionForBeam + 0.02
//           );
//           cloneStorage.louver[2].rotation.y = (Math.PI / 180) * 180;
//         }
//         cloneStorage.louver[2].visible = true;

//         makeClones(countItem, cloneLouverThird, 2, originalMeshes);
//       } else {
//         ChangeGlobalMorph("length_lattice_Y", morphValueForLiteShade);

//         // Установка для клону лувру 0
//         cloneStorage.louver[0].position.set(
//           LB_point.x + settingsLouver.width + 0.005,
//           getMeters(state.height) + 0.086,
//           LB_point.z - 0.06
//         );
//         cloneStorage.louver[0].visible = true;
//         makeClones(countItem, cloneLouverFirst, 0, originalMeshes);

//         cloneStorage.louver[1].visible = false;
//         clearClones(modelForExport, cloneLouverSecond);

//         cloneStorage.louver[2].visible = false;
//         clearClones(modelForExport, cloneLouverThird);
//       }

//       //#endregion

//       break;

//     case lengthModel >= stepForLouver:
//       const medium = lengthModel / 1.985;
//       const offsetForEveryPartMedium = 0;
//       let morphValueMediumPergola = ConvertMorphValue(
//         medium - offsetForEveryPartMedium,
//         6,
//         15
//       );
//       const posZLite = !state.model ? LB_point.z - 0.11 : LB_point.z - 0.06;
//       const posYLite = !state.model
//         ? getMeters(state.height) + 0.11
//         : getMeters(state.height) + 0.086;

//       //#region OFFSET LOUVER
//       if (state.length >= 17) {
//         morphValueMediumPergola -= morphValueMediumPergola * 0.023;
//       }

//       if (state.length >= 19) {
//         morphValueMediumPergola -= morphValueMediumPergola * 0.019;
//       }

//       if (state.length >= 21) {
//         morphValueMediumPergola -= morphValueMediumPergola * 0.0075;
//       }

//       if (state.length >= 24) {
//         morphValueMediumPergola -= morphValueMediumPergola * 0.008;
//       }
//       //#endregion

//       if (lengthModel >= stepForColumn) {
//         originalMeshes.columnLC.visible = true;
//         originalMeshes.columnLC.position.z = 0;

//         originalMeshes.columnRC.visible = true;
//         originalMeshes.columnRC.position.z = 0;
//       } else {
//         originalMeshes.columnLC.visible = false;
//         originalMeshes.columnRC.visible = false;
//       }

//       cloneStorage.beamX.visible = false;
//       cloneStorage.columnLC.visible = false;
//       cloneStorage.columnRC.visible = false;

//       originalMeshes.beamX.position.z = 0;
//       originalMeshes.beamX.visible = true;

//       //#region LOUVER TITAN COVER
//       ChangeGlobalMorph("length_louver", morphValueMediumPergola);

//       // Установка для клону лувру 0
//       cloneStorage.louver[0].position.set(
//         LB_point.x + settingsLouver.width + 0.005,
//         posYLite,
//         posZLite
//       );
//       if (state.isRotated) {
//         cloneStorage.louver[0].position.set(
//           RT_point.x - settingsLouver.width - 0.005,
//           getMeters(state.height) + 0.11,
//           LT_point.z + 0.11
//         );
//         cloneStorage.louver[0].rotation.y = (Math.PI / 180) * 180;
//       }
//       cloneStorage.louver[0].visible = true;

//       makeClones(countItem, cloneLouverFirst, 0, originalMeshes);

//       // Установка для клону лувру 1
//       cloneStorage.louver[1].position.set(
//         LB_point.x + settingsLouver.width + 0.005,
//         posYLite,
//         -0.05
//       );
//       if (state.isRotated) {
//         cloneStorage.louver[1].position.set(
//           RT_point.x - settingsLouver.width - 0.005,
//           posYLite,
//           0.05
//         );
//         cloneStorage.louver[1].rotation.y = (Math.PI / 180) * 180;
//         // cloneStorage.louver[1].rotation.x = (Math.PI / 180) * 180;
//       }
//       cloneStorage.louver[1].visible = true;

//       makeClones(countItem, cloneLouverSecond, 1, originalMeshes);

//       //#endregion

//       //handle other clones
//       cloneStorage.louver[2].visible = false;
//       clearClones(modelForExport, cloneLouverThird);

//       if (state.model) {
//         ChangeGlobalMorph("length_lattice_Y", morphValueForLiteShade);

//         cloneStorage.louver[1].visible = false;
//         clearClones(modelForExport, cloneLouverSecond);
//       }

//       break;

//     default:
//       const small = lengthModel;
//       const offsetForEveryPartSmall = 0;
//       let morphValueSmallPergola = ConvertMorphValue(
//         small - offsetForEveryPartSmall,
//         6,
//         15
//       );
//       const posZLiteSmall = !state.model
//         ? LB_point.z - 0.11
//         : LB_point.z - 0.06;
//       const posYLiteSmall = !state.model
//         ? getMeters(state.height) + 0.11
//         : getMeters(state.height) + 0.086;

//       //#region OFFSET LOUVER
//       if (state.length >= 8) {
//         morphValueSmallPergola -= morphValueSmallPergola * 0.07;
//       }
//       //#endregion

//       originalMeshes.beamX.visible = false;

//       //#region LOUVER TITAN COVER

//       ChangeGlobalMorph("length_louver", morphValueSmallPergola);

//       // Установка для клону лувру 0
//       cloneStorage.louver[0].position.set(
//         LB_point.x + settingsLouver.width + 0.005,
//         posYLiteSmall,
//         posZLiteSmall
//       );
//       if (state.isRotated) {
//         cloneStorage.louver[0].position.set(
//           RT_point.x - settingsLouver.width - 0.005,
//           getMeters(state.height) + 0.11,
//           LT_point.z + 0.11
//         );
//         cloneStorage.louver[0].rotation.y = (Math.PI / 180) * 180;
//       }
//       cloneStorage.louver[0].visible = true;

//       makeClones(countItem, cloneLouverFirst, 0, originalMeshes);

//       //#endregion

//       //handle other clones
//       if (state.model) {
//         ChangeGlobalMorph("length_lattice_Y", morphValueForLiteShade);
//       }

//       cloneStorage.louver[1].visible = false;
//       clearClones(modelForExport, cloneLouverSecond);

//       //column handle
//       originalMeshes.columnLC.visible = false;
//       originalMeshes.columnRC.visible = false;

//       break;
//   }
//   //#endregion

//   //#region WIDTH LOGIC
//   switch (true) {
//     case widthModel >= stepForColumn * 2:
//       const position = getMeters(widthModel / 3) / 2;

//       cloneStorage.columnBC.visible = true;
//       cloneStorage.columnFC.visible = true;
//       cloneStorage.beamZ.visible = true;

//       originalMeshes.columnBC.visible = true;
//       originalMeshes.columnFC.visible = true;
//       originalMeshes.beamZ.visible = true;

//       cloneStorage.columnBC.position.x = -position;
//       cloneStorage.columnFC.position.x = -position;
//       cloneStorage.beamZ.position.x = -position;

//       originalMeshes.columnFC.position.x = position;
//       originalMeshes.columnBC.position.x = position;
//       originalMeshes.beamZ.position.x = position;

//       break;

//     case widthModel >= stepForColumn:
//       if (widthModel >= stepForColumn) {
//         log &&
//           console.log(
//             "WIDTH MEDOUM",
//             clonesBeamForScreens,
//             originalMeshes.beamZ.position
//           );

//         cloneStorage.columnBC.visible = false;
//         cloneStorage.columnFC.visible = false;

//         originalMeshes.columnFC.visible = true;
//         originalMeshes.columnBC.visible = true;
//         originalMeshes.beamZ.visible = true;

//         originalMeshes.columnFC.position.x = 0;
//         originalMeshes.columnBC.position.x = 0;
//         originalMeshes.beamZ.position.x = 0;
//       } else {
//         originalMeshes.columnFC.visible = false;
//         originalMeshes.columnBC.visible = false;
//         originalMeshes.beamZ.visible = false;
//       }

//       break;

//     default:
//       originalMeshes.beamZ.visible = false;
//       cloneStorage.beamZ.visible = false;
//       originalMeshes.columnFC.visible = false;
//       originalMeshes.columnBC.visible = false;
//       originalMeshes.UFO.visible = false;
//       cloneStorage.UFO.visible = false;

//       break;
//   }
//   //#endregion

//   //#region LISTENER ADITIONAL COLUMN (center column)
//   switch (true) {
//     case originalMeshes.columnFC.visible && originalMeshes.columnLC.visible:
//       const centerColumn_1 = originalMeshes.rightCenter;
//       const centerColumn_2 = originalMeshes.rightCenterZ;
//       const centerColumn_3 = originalMeshes.leftCenter;
//       const centerColumn_4 = originalMeshes.leftCenterZ;

//       const foot_1 = originalMeshes.footC;
//       const foot_2 = originalMeshes.footB;
//       const foot_3 = originalMeshes.footL;
//       const foot_4 = originalMeshes.footR;

//       centerColumn_1.visible = true;
//       centerColumn_1.visible = true;
//       centerColumn_2.visible =
//         cloneStorage.columnLC.visible && cloneStorage.columnFC.visible;
//       centerColumn_3.visible = cloneStorage.columnBC.visible;
//       centerColumn_4.visible = cloneStorage.columnRC.visible;

//       centerColumn_1.position.set(
//         originalMeshes.columnFC.position.x,
//         centerColumn_1.position.y,
//         originalMeshes.columnLC.position.z
//       );
//       centerColumn_2.position.set(
//         cloneStorage.columnFC.position.x,
//         centerColumn_2.position.y,
//         cloneStorage.columnLC.position.z
//       );
//       centerColumn_3.position.set(
//         cloneStorage.columnBC.position.x,
//         centerColumn_3.position.y,
//         originalMeshes.columnRC.position.z
//       );
//       centerColumn_4.position.set(
//         originalMeshes.columnFC.position.x,
//         centerColumn_3.position.y,
//         cloneStorage.columnRC.position.z
//       );

//       if (state.initValuePostSize.includes("4")) {
//         foot_1.visible = true;
//         foot_1.visible = true;
//         foot_2.visible =
//           cloneStorage.columnLC.visible && cloneStorage.columnFC.visible;
//         foot_3.visible = cloneStorage.columnBC.visible;
//         foot_4.visible = cloneStorage.columnRC.visible;

//         foot_1.position.set(
//           originalMeshes.columnFC.position.x,
//           foot_1.position.y,
//           originalMeshes.columnLC.position.z
//         );
//         foot_2.position.set(
//           cloneStorage.columnFC.position.x,
//           foot_2.position.y,
//           cloneStorage.columnLC.position.z
//         );
//         foot_3.position.set(
//           cloneStorage.columnBC.position.x,
//           foot_3.position.y,
//           originalMeshes.columnRC.position.z
//         );
//         foot_4.position.set(
//           originalMeshes.columnFC.position.x,
//           foot_3.position.y,
//           cloneStorage.columnRC.position.z
//         );
//       }

//       break;
//   }
//   //#endregion

//   //#region LIGHT OPTIONS
//   function addPointLightWithVisual(x, z, offsetX, offseZ) {
//     const cloneSpotLight = GetGroup("point-light").clone();

//     cloneSpotLight.position.set(
//       x + offsetX,
//       cloneSpotLight.position.y,
//       z + offseZ
//     );
//     cloneSpotLight.visible = true;
//     cloneSpotLight.children.forEach((child) => (child.visible = true));

//     modelForExport.add(cloneSpotLight);
//     pointLights.push(cloneSpotLight);
//   }

//   if (state.electro.has("Recessed Lighting")) {
//     const countSpanLenght =
//       state.length >= stepForColumn * 2 ||
//       (state.length >= stepForLouver * 2 && !state.model)
//         ? 2
//         : 1;
//     const startLenght =
//       state.length >= stepForColumn * 2 ||
//       (state.length >= stepForLouver * 2 && !state.model)
//         ? 1
//         : 0;
//     const countSpanWidth = state.width >= stepForColumn * 2 ? 2 : 1;
//     const startWidth = state.width >= stepForColumn * 2 ? 1 : 0;

//     const rightSide = { start: RB_point, end: RT_point };
//     const leftSide = { start: LB_point, end: LT_point };
//     const topSide = { start: LT_point, end: RT_point };
//     const botSide = { start: LB_point, end: RB_point };

//     const midLenght_Z_1 = {
//       start: generateMidpoints(LB_point, RB_point, countSpanWidth)[startWidth],
//       end: generateMidpoints(LT_point, RT_point, countSpanWidth)[startWidth],
//     };
//     const midLenght_Z_2 = {
//       start: generateMidpoints(LB_point, RB_point, countSpanWidth)[0],
//       end: generateMidpoints(LT_point, RT_point, countSpanWidth)[0],
//     };

//     const midLenght_X_1 = {
//       start: generateMidpoints(LB_point, LT_point, countSpanLenght)[
//         startLenght
//       ],
//       end: generateMidpoints(RB_point, RT_point, countSpanLenght)[startLenght],
//     };

//     const midLenght_X_2 = {
//       start: generateMidpoints(LB_point, LT_point, countSpanLenght)[0],
//       end: generateMidpoints(RB_point, RT_point, countSpanLenght)[0],
//     };

//     sunIcon.show();

//     function makeSpotLightCloneIndependent(
//       columnPosition,
//       startLenght,
//       side,
//       direction,
//       louver = false,
//       offsetX = 0,
//       offsetZ = 0
//     ) {
//       let pointsToAdd = [];

//       switch (true) {
//         //LOGIC FOR LOUVER COLUMN
//         case state.length >= stepForLouver * 2 &&
//           state.length <= stepForLouver * 2 + 3 &&
//           louver &&
//           !state.model:
//           const countLightMediumLouver = Math.floor(
//             direction / 2 / state.recessedLighting
//           );

//           columnPosition[0] = {
//             ...columnPosition[0],
//             z: 0,
//           };

//           const pointLightLeftMediumLouver = generateMidpoints(
//             side.start,
//             columnPosition[0],
//             countLightMediumLouver
//           );
//           const pointLightLeftMedium_1_lover = generateMidpoints(
//             columnPosition[0],
//             side.end,
//             countLightMediumLouver
//           );

//           pointsToAdd = pointsToAdd.concat(
//             pointLightLeftMediumLouver,
//             pointLightLeftMedium_1_lover
//           );
//           break;
//         //3 SPAN
//         case direction >= stepForColumn * 2:
//           const countLightLarge = Math.floor(
//             direction / 2 / state.recessedLighting
//           );
//           const pointLightLeft = generateMidpoints(
//             side.start,
//             columnPosition[0],
//             countLightLarge
//           );
//           const pointLightLeft_1 = generateMidpoints(
//             columnPosition[startLenght],
//             side.end,
//             countLightLarge
//           );
//           const pointLightLeft_2 = generateMidpoints(
//             columnPosition[0],
//             columnPosition[1],
//             countLightLarge
//           );

//           pointsToAdd = pointsToAdd.concat(
//             pointLightLeft,
//             pointLightLeft_1,
//             pointLightLeft_2
//           );
//           break;

//         // 2 SPAN
//         case direction >= stepForColumn && !state.model:
//           const countLightMedium = Math.floor(
//             direction / 2 / state.recessedLighting
//           );
//           const pointLightLeftMedium = generateMidpoints(
//             side.start,
//             columnPosition[0],
//             countLightMedium
//           );
//           const pointLightLeftMedium_1 = generateMidpoints(
//             columnPosition[startLenght],
//             side.end,
//             countLightMedium
//           );

//           pointsToAdd = pointsToAdd.concat(
//             pointLightLeftMedium,
//             pointLightLeftMedium_1
//           );
//           break;

//         // 1 SPAN
//         default:
//           const countLight = Math.floor(direction / state.recessedLighting);
//           const pointLightLeft_3 = generateMidpoints(
//             side.start,
//             side.end,
//             countLight
//           );

//           pointsToAdd = pointsToAdd.concat(pointLightLeft_3);

//           break;
//       }

//       pointsToAdd.forEach((point) => {
//         addPointLightWithVisual(point.x, point.z, offsetX, offsetZ);
//       });
//     }

//     const columnPositionLeft = generateMidpoints(
//       leftSide.start,
//       leftSide.end,
//       countSpanLenght
//     );
//     const columnPositionRight = generateMidpoints(
//       rightSide.start,
//       rightSide.end,
//       countSpanLenght
//     );
//     const columnPositionTop = generateMidpoints(
//       topSide.start,
//       topSide.end,
//       countSpanWidth
//     );
//     const columnPositionBottom = generateMidpoints(
//       botSide.start,
//       botSide.end,
//       countSpanWidth
//     );

//     const columnLenghtMid_Z_1 = generateMidpoints(
//       midLenght_Z_1.start,
//       midLenght_Z_1.end,
//       countSpanLenght
//     );
//     const columnLenghtMid_Z_2 = generateMidpoints(
//       midLenght_Z_2.start,
//       midLenght_Z_2.end,
//       countSpanLenght
//     );

//     const columnLenghtMid_X_1 = generateMidpoints(
//       midLenght_X_1.start,
//       midLenght_X_1.end,
//       countSpanWidth
//     );
//     const columnLenghtMid_X_2 = generateMidpoints(
//       midLenght_X_2.start,
//       midLenght_X_2.end,
//       countSpanWidth
//     );

//     //INIT CLONES
//     clearClones(modelForExport, pointLights);

//     //Z 1.LEFT 2.RIGHT
//     makeSpotLightCloneIndependent(
//       columnPositionLeft,
//       startLenght,
//       leftSide,
//       state.length,
//       true,
//       0.03,
//       0
//     );
//     makeSpotLightCloneIndependent(
//       columnPositionRight,
//       startLenght,
//       rightSide,
//       state.length,
//       true,
//       -0.03,
//       0
//     );

//     //Z BEAM
//     originalMeshes.beamZ.visible &&
//       makeSpotLightCloneIndependent(
//         columnLenghtMid_Z_1,
//         startLenght,
//         midLenght_Z_1,
//         state.length,
//         true,
//         null
//       );
//     cloneStorage.beamZ.visible &&
//       makeSpotLightCloneIndependent(
//         columnLenghtMid_Z_2,
//         startLenght,
//         midLenght_Z_2,
//         state.length,
//         true,
//         null
//       );

//     //X 1.TOP 2.BOTTOM
//     makeSpotLightCloneIndependent(
//       columnPositionTop,
//       startWidth,
//       topSide,
//       state.width,
//       false,
//       0,
//       0.03
//     );
//     makeSpotLightCloneIndependent(
//       columnPositionBottom,
//       startWidth,
//       botSide,
//       state.width,
//       false,
//       0,
//       -0.03
//     );

//     //X BEAM
//     originalMeshes.beamX.visible &&
//       makeSpotLightCloneIndependent(
//         columnLenghtMid_X_1,
//         startWidth,
//         midLenght_X_1,
//         state.width,
//         false,
//         null
//       );
//     cloneStorage.beamX.visible &&
//       makeSpotLightCloneIndependent(
//         columnLenghtMid_X_2,
//         startWidth,
//         midLenght_X_2,
//         state.width,
//         false,
//         null
//       );
//   } else {
//     clearClones(modelForExport, pointLights);
//   }

//   function handleElementVisibility(element, condition, positionY = 0.03) {
//     if (element) {
//       element.visible = condition;
//       element.children.forEach((child, index) => {
//         if (index === 0) {
//           child.visible = true;
//         } else {
//           child.visible = condition;
//           child.position.y = positionY;
//         }
//       });
//     }
//   }

//   if (state.electro.has("Perimeter Lights") && !state.model) {
//     handleElementVisibility(originalMeshes.LED, true);

//     handleElementVisibility(
//       originalMeshes.ledBeam,
//       state.length >= stepForColumn
//     );

//     handleElementVisibility(
//       originalMeshes.ledBeamZ,
//       state.width >= stepForColumn
//     );

//     originalMeshes.ledBeam.position.z = originalMeshes.beamX.position.z;
//     originalMeshes.ledBeamZ.position.x = originalMeshes.beamZ.position.x;

//     cloneStorage.ledBeam.visible = state.length >= 30;
//     cloneStorage.ledBeamZ.visible = state.width >= stepForColumn * 2;

//     cloneStorage.ledBeam.position.z = cloneStorage.beamX.position.z;
//     cloneStorage.ledBeamZ.position.x = cloneStorage.beamZ.position.x;
//   } else {
//     handleElementVisibility(originalMeshes.LED, false);
//     handleElementVisibility(originalMeshes.ledBeam, false);
//     handleElementVisibility(originalMeshes.ledBeamZ, false);

//     cloneStorage.ledBeam.visible = false;
//     cloneStorage.ledBeamZ.visible = false;
//   }

//   //#endregion

//   //#region ELECTRONIC AND ACCESORIES
//   //#region FANS
//   fansClones.forEach((clone) => animateGroup(clone, false));

//   if (state.electro.has("Fans")) {
//     let countFan = 1;
//     if (state.width >= stepForColumn) countFan = 3;
//     if (state.width >= stepForColumn * 2) countFan = 5;

//     const pointStart = generateCenterMidpoints(LB_point, LT_point, 1);
//     const pointEnd = generateCenterMidpoints(RB_point, RT_point, 1);

//     const pointForFan = generateMidpoints(pointStart[0], pointEnd[0], countFan);

//     const countBeam = generateMidpoints(LB_point, LT_point, 5);

//     const correctHight = !state.model ? 0.3 : 0.25;

//     originalMeshes.beamFan.visible = true;
//     originalMeshes.fan.visible = true;
//     originalMeshes.fan.position.y = getMeters(state.height) - correctHight;
//     originalMeshes.fan.children.forEach((child) => (child.visible = true));

//     switch (true) {
//       case state.length >= stepForLouver * 2:
//         cloneStorage.beamFan.forEach((beamFan) => {
//           beamFan.visible = false;
//         });

//         cloneStorage.beamFan[0].visible = true;
//         cloneStorage.beamFan[0].position.z = countBeam[4].z;
//         cloneStorage.beamFan[1].visible = true;
//         cloneStorage.beamFan[1].position.z = -countBeam[4].z;

//         [countBeam[4].z, 0, -countBeam[4].z].forEach((zPos) => {
//           pointForFan.forEach((point, index) => {
//             if (index % 2 === 0) {
//               const groupFanClone = originalMeshes.fan.clone();
//               syncMorphTargets(originalMeshes.fan, groupFanClone);
//               animateGroup(originalMeshes.fan, true);
//               groupFanClone.position.x = point.x;
//               groupFanClone.position.z = zPos;

//               animateGroup(groupFanClone, true);
//               modelForExport.add(groupFanClone);
//               fansClones.push(groupFanClone);
//             }
//           });
//         });

//         originalMeshes.fan.visible = false;
//         originalMeshes.fan.children.forEach((child) => (child.visible = false));

//         break;

//       default:
//         originalMeshes.fan.position.z = 0;

//         pointForFan.forEach((point, index) => {
//           if (index % 2 === 0) {
//             const groupFanClone = originalMeshes.fan.clone();
//             syncMorphTargets(originalMeshes.fan, groupFanClone);
//             animateGroup(originalMeshes.fan, true);
//             groupFanClone.position.x = point.x;
//             groupFanClone.position.z = point.z;

//             animateGroup(groupFanClone, true);
//             modelForExport.add(groupFanClone);
//             fansClones.push(groupFanClone);
//           }
//         });

//         originalMeshes.fan.visible = false;
//         originalMeshes.fan.children.forEach((child) => (child.visible = false));
//         break;
//     }
//   } else {
//     originalMeshes.beamFan.visible = false;
//     clearClones(modelForExport, fansClones);
//   }
//   //#endregion

//   //#region Heaters
//   const portalHeaters = $(".portal-heaters");

//   if (state.electro.has("Heaters")) {
//     setSpansHeaters();
//     if (state.portalOption !== "heaters") setAllHotspotsVisibility(false);
//   } else {
//     resetSpansActive();
//     setAllHotspotsVisibility(false);

//     clearClones(modelForExport, heatersBottom);
//     clearClones(modelForExport, heatersTop);
//     clearClones(modelForExport, heatersLeft);
//     clearClones(modelForExport, heatersRight);
//   }
//   //#endregion

//   //#region SCREENS
//   if (state.subSystem.has(typeSubSystem.screen)) {
//     setSpansScreen();

//     if (state.portalOption !== typePortalOption.screens)
//       setAllHotspotsVisibilityScreen(false);
//   } else {
//     setAllHotspotsVisibilityScreen(false);

//     clearClones(modelForExport, screensClonesBottom);
//     clearClones(modelForExport, columnClonesBottom);

//     clearClones(modelForExport, screensClonesLeft);
//     clearClones(modelForExport, columnClonesLeft);

//     clearClones(modelForExport, screensClonesTop);
//     clearClones(modelForExport, columnClonesTop);

//     clearClones(modelForExport, screensClonesRight);
//     clearClones(modelForExport, columnClonesRight);
//   }
//   //#endregion

//   //#region SHADES
//   if (
//     state.subSystem.has(typeSubSystem.shades) ||
//     state.subSystem.has(typeSubSystem.screen)
//   ) {
//     setSpansScreen();

//     if (
//       state.portalOption !== typePortalOption.screens &&
//       state.portalOption !== typePortalOption.shades
//     )
//       setAllHotspotsVisibilityScreen(false);
//   } else {
//     setAllHotspotsVisibilityScreen(false);

//     clearClones(modelForExport, screensClonesBottom);
//     clearClones(modelForExport, columnClonesBottom);

//     clearClones(modelForExport, screensClonesLeft);
//     clearClones(modelForExport, columnClonesLeft);

//     clearClones(modelForExport, screensClonesTop);
//     clearClones(modelForExport, columnClonesTop);

//     clearClones(modelForExport, screensClonesRight);
//     clearClones(modelForExport, columnClonesRight);
//   }
//   //#endregion

//   changeColumn(originalMeshes);

//   //#region HIDE ALL LETTICE AND BEAM IF WE HAVE ROOF-SCREENS
//   if (state.typeLiteShadeRoof === "Screens" && state.model) {
//     modelForExport.traverse(function (object) {
//       if (object.isMesh && object.name.toLowerCase().includes("lattice")) {
//         object.visible = false;
//       }
//     });
//   }
//   //#endregion
//   //#endregion

//   //#region ROOF SCREEN
//   if (state.typeLiteShadeRoof === "Screens" && state.model) {
//     //#region LENGHT
//     switch (true) {
//       case state.length >= stepForColumn * 2:
//         //#region LOGIC SCREENS ROOF
//         if (state.typeLiteShadeRoof === "Screens" && state.model) {
//           const countBeamOnOneSpan = Math.ceil(
//             state.length / 3 / maxLengthScreen - 1
//           );

//           const midColumns = generateMidpoints(LB_point, LT_point, 2);
//           const firstColumn = midColumns[0];
//           const secondColumn = midColumns[1];

//           const pointForFirstSpan = generateMidpoints(
//             LB_point,
//             firstColumn,
//             countBeamOnOneSpan
//           );

//           const pointForSecondSpan = generateMidpoints(
//             firstColumn,
//             secondColumn,
//             countBeamOnOneSpan
//           );
//           const pointForThirdSpan = generateMidpoints(
//             secondColumn,
//             LT_point,
//             countBeamOnOneSpan
//           );

//           //#region FIND MID POINT SCREENS
//           const pointWithCorner = [
//             LB_point,
//             ...pointForFirstSpan,
//             firstColumn,
//             ...pointForSecondSpan,
//             secondColumn,
//             ...pointForThirdSpan,
//             LT_point,
//           ];

//           function findMidpoint(pointA, pointB) {
//             return {
//               x: (pointA.x + pointB.x) / 2,
//               y: (pointA.y + pointB.y) / 2,
//               z: (pointA.z + pointB.z) / 2,
//             };
//           }

//           const midpointsForScreen = [];

//           for (let i = 0; i < pointWithCorner.length - 1; i++) {
//             const midpoint = findMidpoint(
//               pointWithCorner[i],
//               pointWithCorner[i + 1]
//             );
//             midpointsForScreen.push(midpoint);
//           }

//           state.midPointForScreenZ = midpointsForScreen;
//           //#endregion
//           const totalBeams = cloneStorage.beamClonesX.length;

//           const points = [
//             pointForFirstSpan,
//             pointForSecondSpan,
//             pointForThirdSpan,
//           ];

//           points.forEach((pointArray, spanIndex) => {
//             pointArray.forEach((point, index) => {
//               const beamIndex = spanIndex * pointArray.length + index;
//               if (beamIndex < totalBeams) {
//                 const beam = cloneStorage.beamClonesX[beamIndex];
//                 beam.visible = true;
//                 beam.position.z = point.z;
//               }
//             });
//           });
//         }
//         //#endregion

//         break;

//       case state.length >= stepForColumn:
//         //#region LOGIC SCREENS ROOF
//         if (state.typeLiteShadeRoof === "Screens" && state.model) {
//           const countBeamOnOneSpan = Math.ceil(
//             state.length / 2 / maxLengthScreen - 1
//           );

//           const midColumns = generateMidpoints(LB_point, LT_point, 2);
//           const firstColumn = new Vec3(0);

//           const pointForFirstSpan = generateMidpoints(
//             LB_point,
//             firstColumn,
//             countBeamOnOneSpan
//           );

//           const pointForSecondSpan = generateMidpoints(
//             firstColumn,
//             LT_point,
//             countBeamOnOneSpan
//           );

//           //#region FIND MID POINT SCREENS
//           const pointWithCorner = [
//             LB_point,
//             ...pointForFirstSpan,
//             firstColumn,
//             ...pointForSecondSpan,
//             LT_point,
//           ];

//           function findMidpoint(pointA, pointB) {
//             return {
//               x: (pointA.x + pointB.x) / 2,
//               y: (pointA.y + pointB.y) / 2,
//               z: (pointA.z + pointB.z) / 2,
//             };
//           }

//           const midpointsForScreen = [];

//           for (let i = 0; i < pointWithCorner.length - 1; i++) {
//             const midpoint = findMidpoint(
//               pointWithCorner[i],
//               pointWithCorner[i + 1]
//             );
//             midpointsForScreen.push(midpoint);
//           }

//           state.midPointForScreenZ = midpointsForScreen;
//           //#endregion
//           const totalBeams = cloneStorage.beamClonesX.length;

//           const points = [pointForFirstSpan, pointForSecondSpan];

//           points.forEach((pointArray, spanIndex) => {
//             pointArray.forEach((point, index) => {
//               const beamIndex = spanIndex * pointArray.length + index;
//               if (beamIndex < totalBeams) {
//                 const beam = cloneStorage.beamClonesX[beamIndex];
//                 beam.visible = true;
//                 beam.position.z = point.z;
//               }
//             });
//           });
//         }
//         //#endregion

//         break;

//       default:
//         //#region LOGIC SCREENS ROOF
//         if (state.typeLiteShadeRoof === "Screens" && state.model) {
//           const countBeamOnOneSpan = Math.ceil(
//             state.length / maxLengthScreen - 1
//           );

//           const pointForFirstSpan = generateMidpoints(
//             LB_point,
//             LT_point,
//             countBeamOnOneSpan
//           );

//           //#region FIND MID POINT SCREENS
//           const pointWithCorner = [LB_point, ...pointForFirstSpan, LT_point];

//           function findMidpoint(pointA, pointB) {
//             return {
//               x: (pointA.x + pointB.x) / 2,
//               y: (pointA.y + pointB.y) / 2,
//               z: (pointA.z + pointB.z) / 2,
//             };
//           }

//           const midpointsForScreen = [];

//           for (let i = 0; i < pointWithCorner.length - 1; i++) {
//             const midpoint = findMidpoint(
//               pointWithCorner[i],
//               pointWithCorner[i + 1]
//             );
//             midpointsForScreen.push(midpoint);
//           }

//           state.midPointForScreenZ = midpointsForScreen;
//           //#endregion
//           const totalBeams = cloneStorage.beamClonesX.length;

//           const points = [pointForFirstSpan];

//           points.forEach((pointArray, spanIndex) => {
//             pointArray.forEach((point, index) => {
//               const beamIndex = spanIndex * pointArray.length + index;
//               if (beamIndex < totalBeams) {
//                 const beam = cloneStorage.beamClonesX[beamIndex];
//                 beam.visible = true;
//                 beam.position.z = point.z;
//               }
//             });
//           });
//         }
//         //#endregion

//         originalMeshes.beamX.visible = false;
//         break;
//     }
//     //#endregion

//     //#region WIDTH
//     switch (true) {
//       case state.width >= stepForColumn * 2:
//         //#region LOGIC SCREENS ROOF
//         if (state.typeLiteShadeRoof === "Screens" && state.model) {
//           const countBeamOnOneSpan = Math.ceil(
//             state.width / 3 / maxWidthScreen - 1
//           );

//           const midColumns = generateMidpoints(LB_point, RB_point, 2);

//           const firstColumn = midColumns[0];
//           const secondColumn = midColumns[1];

//           const pointForFirstSpan = generateMidpoints(
//             LB_point,
//             firstColumn,
//             countBeamOnOneSpan
//           );
//           const pointForSecondSpan = generateMidpoints(
//             firstColumn,
//             secondColumn,
//             countBeamOnOneSpan
//           );
//           const pointForThirdSpan = generateMidpoints(
//             secondColumn,
//             RB_point,
//             countBeamOnOneSpan
//           );

//           //#region FIND MID POINT SCREENS
//           const pointWithCorner = [
//             LB_point,
//             ...pointForFirstSpan,
//             firstColumn,
//             ...pointForSecondSpan,
//             secondColumn,
//             ...pointForThirdSpan,
//             RB_point,
//           ];

//           function findMidpoint(pointA, pointB) {
//             return {
//               x: (pointA.x + pointB.x) / 2,
//               y: (pointA.y + pointB.y) / 2,
//               z: (pointA.z + pointB.z) / 2,
//             };
//           }

//           const midpointsForScreen = [];

//           for (let i = 0; i < pointWithCorner.length - 1; i++) {
//             const midpoint = findMidpoint(
//               pointWithCorner[i],
//               pointWithCorner[i + 1]
//             );
//             midpointsForScreen.push(midpoint);
//           }

//           state.midPointForScreenX = midpointsForScreen;
//           //#endregion

//           const totalBeams = cloneStorage.beamClones.length;

//           const points = [
//             pointForFirstSpan,
//             pointForSecondSpan,
//             pointForThirdSpan,
//           ];

//           points.forEach((pointArray, spanIndex) => {
//             pointArray.forEach((point, index) => {
//               const beamIndex = spanIndex * pointArray.length + index;
//               if (beamIndex < totalBeams) {
//                 const beam = cloneStorage.beamClones[beamIndex];
//                 beam.visible = true;
//                 beam.position.x = point.x;
//               }
//             });
//           });
//         }
//         //#endregion

//         break;

//       case state.width >= stepForColumn:
//         //#region LOGIC SCREENS ROOF
//         if (state.typeLiteShadeRoof === "Screens" && state.model) {
//           const countBeamOnOneSpan = Math.ceil(
//             state.width / 2 / maxWidthScreen - 1
//           );

//           const firstColumn = new Vec3(0);

//           const pointForFirstSpan = generateMidpoints(
//             LB_point,
//             firstColumn,
//             countBeamOnOneSpan
//           );
//           const pointForSecondSpan = generateMidpoints(
//             firstColumn,
//             RB_point,
//             countBeamOnOneSpan
//           );

//           //#region FIND MID POINT SCREENS
//           const pointWithCorner = [
//             LB_point,
//             ...pointForFirstSpan,
//             firstColumn,
//             ...pointForSecondSpan,
//             RB_point,
//           ];

//           function findMidpoint(pointA, pointB) {
//             return {
//               x: (pointA.x + pointB.x) / 2,
//               y: (pointA.y + pointB.y) / 2,
//               z: (pointA.z + pointB.z) / 2,
//             };
//           }

//           const midpointsForScreen = [];

//           for (let i = 0; i < pointWithCorner.length - 1; i++) {
//             const midpoint = findMidpoint(
//               pointWithCorner[i],
//               pointWithCorner[i + 1]
//             );
//             midpointsForScreen.push(midpoint);
//           }

//           state.midPointForScreenX = midpointsForScreen;
//           //#endregion

//           const totalBeams = cloneStorage.beamClones.length;

//           const points = [pointForFirstSpan, pointForSecondSpan];

//           points.forEach((pointArray, spanIndex) => {
//             pointArray.forEach((point, index) => {
//               const beamIndex = spanIndex * pointArray.length + index;
//               if (beamIndex < totalBeams) {
//                 const beam = cloneStorage.beamClones[beamIndex];
//                 beam.visible = true;
//                 beam.position.x = point.x;
//               }
//             });
//           });
//         }
//         //#endregion

//         break;

//       default:
//         //#region LOGIC SCREENS ROOF
//         if (state.typeLiteShadeRoof === "Screens" && state.model) {
//           const countBeamOnOneSpan = Math.ceil(
//             state.width / maxWidthScreen - 1
//           );

//           const pointForFirstSpan = generateMidpoints(
//             LB_point,
//             RB_point,
//             countBeamOnOneSpan
//           );

//           //#region FIND MID POINT SCREENS
//           const pointWithCorner = [LB_point, ...pointForFirstSpan, RB_point];

//           function findMidpoint(pointA, pointB) {
//             return {
//               x: (pointA.x + pointB.x) / 2,
//               y: (pointA.y + pointB.y) / 2,
//               z: (pointA.z + pointB.z) / 2,
//             };
//           }

//           const midpointsForScreen = [];

//           for (let i = 0; i < pointWithCorner.length - 1; i++) {
//             const midpoint = findMidpoint(
//               pointWithCorner[i],
//               pointWithCorner[i + 1]
//             );
//             midpointsForScreen.push(midpoint);
//           }

//           state.midPointForScreenX = midpointsForScreen;
//           //#endregion

//           const totalBeams = cloneStorage.beamClones.length;

//           const points = [pointForFirstSpan];

//           points.forEach((pointArray, spanIndex) => {
//             pointArray.forEach((point, index) => {
//               const beamIndex = spanIndex * pointArray.length + index;
//               if (beamIndex < totalBeams) {
//                 const beam = cloneStorage.beamClones[beamIndex];
//                 beam.visible = true;
//                 beam.position.x = point.x;
//               }
//             });
//           });
//         }
//         //#endregion

//         break;
//     }
//     //#endregion
//     if (state.typeLiteShadeRoof === "Screens" && state.model) {
//       state.midPointForScreenZ.forEach((pointZ, indexZ) => {
//         state.midPointForScreenX.forEach((pointX, indexX) => {
//           clonesScreens[0][indexZ][indexX].position.x = pointX.x;
//           clonesScreens[0][indexZ][indexX].position.z = pointZ.z;
//           clonesScreens[0][indexZ][indexX].position.y =
//             getMeters(state.height) + 0.11;
//           clonesScreens[0][indexZ][indexX].visible = true;
//           clonesScreens[0][indexZ][indexX].children.forEach(
//             (child) => (child.visible = true)
//           );
//         });
//       });
//     }
//   }

//   //#region TALLING AND MORPH
//   const x = 0.508001;
//   const xMax = 0.965201;
//   const z = 0.762001;
//   const zMax = 1.4732;

//   const screenLength =
//     getMeters(state.length / state.midPointForScreenZ.length) - 0.05;
//   const screenWidth =
//     getMeters(state.width / state.midPointForScreenX.length) - 0.05;

//   const screenMorphWidth = ConvertMorphValue(screenWidth, x, xMax);
//   const screenMorphLength = ConvertMorphValue(screenLength, z, zMax);

//   state.xTalScreen = state.width / state.midPointForScreenX.length / 4;
//   state.zTalScreen = state.length / state.midPointForScreenZ.length / 5;

//   if (state.typeLiteShadeRoof === "Screens" && state.model) {
//     ChangeGlobalMorph("screen-slat", 1);
//     ChangeGlobalMorph("width_screen_top", screenMorphWidth);
//     ChangeGlobalMorph("length_screen_top", screenMorphLength);
//   }

//   ChangeMaterialTilling("screen_top", state.zTalScreen, state.xTalScreen);

//   const minTile = 3.5;
//   const maxTile = 4;
//   const minOffset = 0;
//   const maxOffset = 0.057;

//   ChangeMaterialOffset(
//     "screen_top",
//     0,
//     ConvertMorphValue(
//       state.width / state.midPointForScreenX.length,
//       maxTile,
//       minTile,
//       minOffset,
//       maxOffset
//     )
//   );
//   //#endregion
//   //#endregion
//   //#endregion
// }

// export function clearClones(modelForExport, array) {
//   array.forEach((element) => {
//     modelForExport.remove(element);
//   });

//   array.length = 0;
// }

// function makeClones(count, array, item, originalMeshes) {
//   const valueInDegrees = parseFloat(state.currentRotationZ);
//   state.currentRotationZ = valueInDegrees;

//   const rotationInRadians = (valueInDegrees * Math.PI) / 180;
//   cloneStorage.louver[item].rotation.z = rotationInRadians;

//   const { LB_point, RT_point, RB_point, LT_point } = getCorners(
//     state.width,
//     state.length
//   );

//   clearClones(modelForExport, array);

//   let spacingFactor = 1;

//   if (state.width % 2 !== 0) {
//     spacingFactor = 0.983;
//   }

//   if (cloneStorage.louver[item].name.includes("lattice")) {
//     cloneStorage.louver[item].rotation.z = 0;
//   }

//   const conditionOffset = !state.isRotated ? 0 : 1;
//   let currentX = state.isRotated ? RT_point.x : LB_point.x;
//   let offsetCorrection = 0;

//   function generateCLone(start, count) {
//     for (let i = 1; i < count; i++) {
//       const clone = cloneStorage.louver[item].clone();

//       const offset =
//         settingsLouver.width * (1 + spacingFactor * i) + offsetCorrection;

//       if (state.isRotated) {
//         clone.position.x = start - offset;
//       } else {
//         clone.position.x = start + offset;
//       }

//       if (clone.name.includes("lattice")) {
//         clone.rotation.z = 0;
//       }

//       synchronizeMorphTargets(cloneStorage.louver[item], clone);

//       array.push(clone);
//       modelForExport.add(clone);

//       clone.visible = true;
//     }
//   }

//   if (state.typeLiteShadeRoof !== "Screens" || !state.model) {
//     switch (true) {
//       case state.width >= stepForColumn * 2 && !state.model:
//         const offset = !state.isRotated ? 0.25 : -0.25;
//         const offsetThird = !state.isRotated ? -0.25 : 0.25;

//         const secondStart = getMeters(state.width / 3) / 2 + offset;
//         const thirdStart = getMeters(state.width / 3) / 2 + offsetThird;
//         generateCLone(currentX, Math.floor(count / 3));
//         generateCLone(-secondStart + 0.025, Math.floor(count / 3) + 1);
//         generateCLone(thirdStart, Math.floor(count / 3) + 1);

//         break;

//       case state.width >= stepForColumn && !state.model:
//         const offsetStart = state.isRotated ? 0.25 : -0.25;

//         generateCLone(currentX, Math.floor(count / 2));
//         generateCLone(offsetStart, Math.floor(count / 2) + 1);

//         break;

//       case state.model:
//         for (let i = 1; i < getMeters(state.width) / 0.1; i++) {
//           const clone = cloneStorage.louver[item].clone();

//           const offset = 0.1 * i + offsetCorrection;

//           clone.position.x = LB_point.x + offset;

//           if (clone.name.includes("lattice")) {
//             clone.rotation.z = 0;
//           }

//           synchronizeMorphTargets(cloneStorage.louver[item], clone);

//           array.push(clone);
//           modelForExport.add(clone);

//           clone.visible = true;
//         }

//         break;

//       default:
//         generateCLone(currentX, count);

//         break;
//     }
//   }
// }

// export function toggleVisibleGroup(toggle, group) {
//   group.visible = toggle;

//   group.children.forEach((child) => {
//     child.visible = toggle;
//   });
// }

// const animationStates = new WeakMap();

// function animateGroup(group, startAnimation) {
//   const child = group.children[0] || group;
//   if (!child) return;

//   const isAnimating = animationStates.get(group);

//   if (startAnimation) {
//     if (isAnimating) return;
//     animationStates.set(group, true);

//     const rotateChild = () => {
//       if (!animationStates.get(group)) return;
//       child.rotation.y += 0.05;
//       child.rotation.y %= Math.PI * 2;
//       requestAnimationFrame(rotateChild);
//     };

//     rotateChild();
//   } else {
//     animationStates.set(group, false);
//   }
// }

// export function changeColorAndTexture(target, wall = true) {
//   const textureLoader = new THREE.TextureLoader();

//   const prepareForUrl = wall
//     ? state.patternScreen.toLocaleLowerCase().replaceAll(" ", "_")
//     : state.patternScreenRoof.toLocaleLowerCase().replaceAll(" ", "_");

//   const isSolid = prepareForUrl === "solid";
//   const colorForSolidScreen =
//     state.colorScreen === "White" ? "#d9d9d9" : "#525252";

//   function setSolidMaterial() {
//     target.material.alphaMap = null;
//     target.material.map = null;

//     if (wall) {
//       target.material.color.set(colorForSolidScreen);
//     }

//     console.log(target.material);
//   }

//   function loadTextureAndApply(url) {
//     return new Promise((resolve, reject) => {
//       textureLoader.load(
//         url,
//         (texture) => resolve(texture),
//         undefined,
//         (error) => reject(error)
//       );
//     });
//   }

//   if (isSolid) {
//     setSolidMaterial();
//   } else {
//     const type = wall ? "wall" : "top";
//     const texturePath = `public/screens/${type}_${prepareForUrl}.png`;

//     loadTextureAndApply(texturePath)
//       .then((texture) => {
//         const colorForScreen =
//           state.colorScreen === "White" ? "#d9d9d9" : "#525252";

//         const material = target.material;
//         material.map = texture;
//         // material.alphaMap = texture;

//         if (wall) {
//           target.material.color.set(colorForScreen);
//         }

//         ChangeMaterialTilling("screen_top", state.zTalScreen, state.xTalScreen);

//         const minTile = 3.5;
//         const maxTile = 4;
//         const minOffset = 0;
//         const maxOffset = 0.057;

//         const offsetValue = ConvertMorphValue(
//           state.width / state.midPointForScreenX.length,
//           maxTile,
//           minTile,
//           minOffset,
//           maxOffset
//         );

//         ChangeMaterialOffset("screen_top", 0, offsetValue);
//       })
//       .catch((error) => {
//         console.error(`Error loading texture: ${error}`);
//       });
//   }
// }

// export function changeColorForAllScreen() {
//   const allSpanWithScreens = spansScreen;

//   allSpanWithScreens.forEach((span) => {
//     span.prepareScreens &&
//       span.prepareScreens.forEach((data) => {
//         changeColorAndTexture(data.screen.children[1]);
//       });

//     span.prepareScreensZ &&
//       span.prepareScreensZ.forEach((data) => {
//         changeColorAndTexture(data.screen.children[1]);
//       });
//   });
// }

// export function changeTextureTop() {
//   clonesScreens[0].forEach((row) => {
//     row.forEach((group) => {
//       changeColorAndTexture(group.children[1], false);
//     });
//   });
// }

// //#region LOGIC POST-SIZE 4x4
// export function changeColumn(original) {
//   clearClones(modelForExport, clonesLiteShadeColumns);

//   modelForExport.traverse((mesh) => {
//     if (
//       mesh.name &&
//       mesh.name.includes("posr") &&
//       state.initValuePostSize.includes("4") &&
//       state.model
//     ) {
//       const name = mesh.name;
//       if (name === "posr_b_R" && mesh.visible) original.footBR.visible = true;
//       if (name === "posr_b_L" && mesh.visible) original.footBL.visible = true;
//       if (name === "posr_f_L" && mesh.visible) original.footFL.visible = true;
//       if (name === "posr_f_R" && mesh.visible) original.footFR.visible = true;

//       if (name === "posr_f_C" && mesh.visible) {
//         original.footFC.visible = true;
//         original.footFC.position.x = mesh.position.x;
//         cloneStorage.footFC.visible = cloneStorage.columnFC.visible;
//         cloneStorage.footFC.position.x = cloneStorage.columnFC.position.x;
//       }

//       if (name === "posr_b_C" && mesh.visible) {
//         original.footBC.visible = true;
//         original.footBC.position.x = mesh.position.x;
//         cloneStorage.footBC.visible = cloneStorage.columnBC.visible;
//         cloneStorage.footBC.position.x = cloneStorage.columnBC.position.x;
//       }

//       if (name === "posr_L_C" && mesh.visible) {
//         original.footLC.visible = true;
//         original.footLC.position.z = mesh.position.z;
//         cloneStorage.footLC.visible = cloneStorage.columnLC.visible;
//         cloneStorage.footLC.position.z = cloneStorage.columnLC.position.z;
//       }

//       if (name === "posr_R_C" && mesh.visible) {
//         original.footRC.visible = true;
//         original.footRC.position.z = mesh.position.z;
//         cloneStorage.footRC.visible = cloneStorage.columnRC.visible;
//         cloneStorage.footRC.position.z = cloneStorage.columnRC.position.z;
//       }
//     }
//   });
// }
// //#endregion

// export function getBrowserBarHeight() {
//   let browserBarHeight = 0;

//   if ("visualViewport" in window) {
//     const visualViewport = window.visualViewport;
//     const viewportHeight = visualViewport.height;
//     const windowHeight = window.innerHeight;

//     browserBarHeight = windowHeight - viewportHeight;

//     if (browserBarHeight > 100) {
//       console.log("Схоже, що це клавіатура.");
//     }
//   } else {
//     const windowHeight = window.innerHeight;
//     const documentHeight = document.documentElement.clientHeight;

//     browserBarHeight = windowHeight - documentHeight;
//   }

//   return browserBarHeight || 50;
// }
