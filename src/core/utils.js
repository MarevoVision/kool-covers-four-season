import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin("anonymous");
export const textureCache = {};

export async function preloadTextures() {
  const texturePromises = [];
  for (const part in TEXTURES) {
    for (const color in TEXTURES[part]) {
      for (const type in TEXTURES[part][color]) {
        const path = TEXTURES[part][color][type];
        // console.log(path, "texture Path");

        texturePromises.push(loadTextureAsync({ type, path }));
      }
    }
  }

  try {
    await Promise.all(texturePromises);
    console.log("All textures preloaded successfully");
  } catch (error) {
    console.error("Failed to preload some textures:", error);
  }
}

function loadTextureAsync(texture) {
  return new Promise((resolve, reject) => {
    if (!texture.path || textureCache[texture.path]) {
      resolve();
      return;
    }
    textureLoader.load(
      texture.path,
      (loadedTexture) => {
        loadedTexture.magFilter = THREE.NearestFilter;
        loadedTexture.minFilter = THREE.NearestMipmapNearestFilter;
        loadedTexture.anisotropy = 16;
        loadedTexture.flipY = false;
        setTiling(loadedTexture, 1);
        textureCache[texture.path] = loadedTexture;
        resolve();
      },
      undefined,
      (error) => {
        console.error(`Error loading texture ${texture.path}:`, error);
        reject(error);
      }
    );
  });
}

function setTiling(texture, tiling) {
  texture.repeat.set(tiling, tiling);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
}

export function setMaterialTexture(
  model,
  materialNames,
  textureValue,
  tilingValue = 1
) {
  model?.traverse((o) => {
    if (o.material) {
      for (let i = 0; i < materialNames.length; i++) {
        if (o.material.name === materialNames[i]) {
          applyTexture(o.material, textureValue, tilingValue);
        }
      }
    }
  });

  function applyTexture(material, textureValue, tilingValue) {
    const textureProperties = {
      Map: {
        apply: (material, texture) => {
          if (texture) {
            // texture.encoding = sRGBEncoding;
            material.map = texture;
            material.map.needsUpdate = true;
          } else if (texture === null) {
            material.map = null;
            // material.color.set(0xffffff);
            material.needsUpdate = true;
          }
        },
      },
      Normal: {
        apply: (material, texture) => {
          if (texture) {
            material.normalMap = texture;
            material.normalMap.needsUpdate = true;
          } else if (texture === null) {
            material.normalMap = null;
            material.needsUpdate = true;
          }
        },
      },
      Roughness: {
        apply: (material, texture) => {
          if (texture) {
            material.roughnessMap = texture;
            material.roughnessMap.needsUpdate = true;
          } else if (texture === null) {
            material.roughnessMap = null;
            material.needsUpdate = true;
          }
        },
      },
      Metalness: {
        apply: (material, texture) => {
          if (texture) {
            material.metalnessMap = texture;
            material.metalnessMap.needsUpdate = true;
          } else if (texture === null) {
            material.metalnessMap = null;
            material.needsUpdate = true;
          }
        },
      },
      Emission: {
        apply: (material, texture) => {
          if (texture) {
            material.emissiveMap = texture;
            material.emissiveMap.needsUpdate = true;
          } else if (texture === null) {
            material.emissiveMap = null;
            material.needsUpdate = true;
          }
        },
      },
      AO: {
        apply: (material, texture) => {
          if (texture) {
            material.aoMap = texture;
            material.aoMap.needsUpdate = true;
          } else if (texture === null) {
            material.aoMap = null;
            material.needsUpdate = true;
          }
        },
      },
      Gloss: {
        apply: (material) => {
          material.metalness = 1;
          material.roughness = 0.2;
          material.needsUpdate = true;
        },
      },
    };

    for (const node in textureProperties) {
      const key = node.toLowerCase();
      const value = textureValue[key];

      if (value === undefined) {
        continue;
      }

      if (value === null) {
        textureProperties[node].apply(material, null);
        continue;
      }

      if (!textureCache[value]) {
        textureLoader.load(
          value,
          (texture) => {
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestMipmapNearestFilter;
            texture.anisotropy = 16;
            texture.flipY = false;
            setTiling(texture, tilingValue);
            textureCache[value] = texture;
            textureProperties[node].apply(material, texture);
            material.needsUpdate = true;
          },
          undefined,
          () => {
            console.error(`Error loading texture ${value}`);
          }
        );
      } else {
        textureProperties[node].apply(material, textureCache[value]);
        material.needsUpdate = true;
      }
    }
  }
}

export function setMaterialProperty(name, property, value) {
  let mat = null;
  scene.traverse((o) => {
    if (o.isMesh) {
      if (o.material.name == name) {
        mat = o.material;
        if (property === "color" && typeof value === "string") {
          mat[property] = new THREE.Color(value);
        } else if (Object.prototype.hasOwnProperty.call(mat, property)) {
          mat[property] = value;
        }
      }
    }
  });
}

export const TEXTURES = {
  inner: {
    //! WALLS
    wallCommercial: {
      map: "public/img/wall-textures/red_brick_diff_1k.jpg",
      normal: "public/img/wall-textures/red_brick_nor_gl_1k.jpg",
      roughness: "public/img/wall-textures/red_brick_rough_1k.jpg",
    },
  },
};
