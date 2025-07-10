import $ from "jquery";
import LZString from "lz-string";
import pako from "pako";
import { log, state } from "../settings";

const splitState = "state=";

export function encodeStateToURL(state) {
  const stateCopy = {
    t3: state.type3Dmodel,
    ec: state.endCuts,
    ov: state.overhang,
    tb: state.typePergola,
    rt: state.roofType,
    dr: state.directionRoof ? 1 : 0,
    rc: state.roofColorType,
    pos: state.postSize,
    post: state.postType,
    bm: state.beam,
    wo: state.wallOption,
    st: state.steel,
    wk: state.wrapKit,
    tl: state.tails,
    bs: state.beamSize,
    gt: state.gutter,
    rz: state.currentRotationZ,
    isRot: state.isRotated ? 1 : 0,
    h: state.height,
    l: state.length,
    w: state.width,
    ivps: state.initValuePostSize,
    bw: state.backWall ? 1 : 0,
    lw: state.leftWall ? 1 : 0,
    rw: state.rightWall ? 1 : 0,
    cr: state.colorRoof,
    crs: state.colorRoofSolid,
    cb: state.colorBody,
    cl: state.colorLed,
    e: [...state.electro.values()],
    dm: state.dayMode ? 1 : 0,
    sp: state.spacing,
    rn: state.rain,
    tlsr: state.typeLiteShadeRoof,
    css: state.currentSubSystem,
    fah: state.fanAvatarHeight,
    faw: state.fanAvatarWidth,
    po: state.portalOption ?? 0,
    rsc: state.roofScreenColor,
    ss: [...state.subSystem.values()],
    ssu: [...state.subSystemUrl.values()],
    ps: state.patternScreen,
    psr: state.patternScreenRoof,
    cs: state.colorScreen,
    zipi: state.zipInput,
    sls: state.slatsSize,
    sld: state.slidingDoorInput,
    ofs: state.offsetForShade,
    bii: state.biFoldDoorInput,
    thi: state.thickness,
    rf: state.rafter,
    sl: state.skyLight,
    rml: state.removeLettice,
    bisi: state.biFoldDoorShattersInput,
    bisr: state.biFoldDoorShattersRotate,
    mpsz: state.midPointForScreenZ,
    mpsx: state.midPointForScreenX,
    trc: state.transparency ?? 0,
    cz: state.colorZip,
    cas: state.currentActiveSpans,
    img: state.imgForPdf ?? 0,
  };

  const jsonString = JSON.stringify(stateCopy);
  const compressed = pako.deflate(jsonString, { to: "string" });

  const base64String = arrayBufferToBase64(compressed);

  return base64String;
}

function arrayBufferToBase64(buffer) {
  const binary = Array.from(buffer)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return window.btoa(binary);
}

export function decodeURLToState(url) {
  try {
    const decompressedBase64 = atob(url);
    const decompressedArray = new Uint8Array(
      decompressedBase64.split("").map((c) => c.charCodeAt(0))
    );

    const decompressed = pako.inflate(decompressedArray, { to: "string" });

    const decodedState = JSON.parse(decompressed);

    return {
      type3Dmodel: decodedState.t3,
      endCuts: decodedState.ec,
      overhang: decodedState.ov,
      typePergola: decodedState.tb,
      directionRoof: decodedState.dr === 1,
      roofColorType: decodedState.rc,
      roofType: decodedState.rt,
      postSize: decodedState.pos,
      postType: decodedState.post,
      beam: decodedState.bm,
      steel: decodedState.st,
      wrapKit: decodedState.wk,
      beamSize: decodedState.bs,
      tails: decodedState.tl,
      gutter: decodedState.gt,
      rain: decodedState.rn,
      skyLight: decodedState.sl,
      currentRotationZ: decodedState.rz,
      isRotated: decodedState.isRot === 1,
      height: decodedState.h,
      length: decodedState.l,
      width: decodedState.w,
      initValuePostSize: decodedState.ivps,
      backWall: decodedState.bw === 1,
      leftWall: decodedState.lw === 1,
      rightWall: decodedState.rw === 1,
      wallOption: decodedState.wo,
      colorRoof: decodedState.cr,
      colorRoofSolid: decodedState.crs,
      colorBody: decodedState.cb,
      colorLed: decodedState.cl,
      electro: new Set(decodedState.e),
      dayMode: decodedState.dm === 1,
      spacing: decodedState.sp,
      typeLiteShadeRoof: decodedState.tlsr,
      currentSubSystem: decodedState.css,
      fanAvatarHeight: decodedState.fah,
      fanAvatarWidth: decodedState.faw,
      portalOption: decodedState.po === 0 ? null : decodedState.po,
      roofScreenColor: decodedState.rsc,
      subSystem: new Set(decodedState.ss),
      subSystemUrl: new Set(decodedState.ssu),
      patternScreen: decodedState.ps,
      patternScreenRoof: decodedState.psr,
      colorScreen: decodedState.cs,
      slatsSize: decodedState.sls,
      zipInput: decodedState.zipi,
      slidingDoorInput: decodedState.sld,
      biFoldDoorInput: decodedState.bii,
      biFoldDoorShattersInput: decodedState.bisi,
      biFoldDoorShattersRotate: decodedState.bisr,
      thickness: decodedState.thi,
      rafter: decodedState.rf,
      removeLettice: decodedState.rml,
      offsetForShade: decodedState.ofs,
      midPointForScreenZ: decodedState.mpsz,
      midPointForScreenX: decodedState.mpsx,
      transparency: decodedState.trc === 0 ? null : decodedState.trc,
      colorZip: decodedState.cz,
      currentActiveSpans: decodedState.cas,
      imgForPdf: decodedState.img === 0 ? null : decodedState.img,
    };
  } catch (error) {
    console.error("Помилка при декодуванні стану:", error);
    return {};
  }
}

export function changeURL() {
  const url = encodeStateToURL(state);
  const newUrl = `${window.location.origin}${window.location.pathname}?${splitState}${url}`;
  history.pushState({}, "", newUrl);
}

export async function initStateFromUrl() {
  const urlParams = window.location.search;
  const stateParam = urlParams.split(`${splitState}`)[1];

  if (stateParam) {
    try {
      const decodedState = decodeURLToState(stateParam);

      for (const key in decodedState) {
        state[key] = decodedState[key];
      }

      // log && console.log("Стан завантажено з URL:", state);
    } catch (error) {
      // log && console.error("Помилка при декодуванні стану з URL:", error);
    }
  } else {
    // log && console.log("Використовуємо дефолтний стан:", state);
  }
}
