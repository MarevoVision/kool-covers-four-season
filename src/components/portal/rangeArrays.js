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
    title: "Blade Rotation",
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
    title: "Rotate",
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
