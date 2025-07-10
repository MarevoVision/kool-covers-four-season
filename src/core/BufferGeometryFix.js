import * as THREE from "three";

console.log('Applying BufferGeometry patch after scripts loaded...');
  THREE.BufferGeometry.prototype.computeBoundingSphere = (function (original) {
    return function () {
      console.log(`Computing bounding sphere for geometry ${this.uuid} (${this.type})`);

      if (!this.attributes.position || !this.attributes.position.array) {
        console.warn(`Geometry ${this.name || this.uuid} has no position attribute. Attributes:`, this.attributes);
        this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
        return this;
      }

      const positions = this.attributes.position.array;
      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i]) || !isFinite(positions[i])) {
          console.warn(`Geometry ${this.name || this.uuid} has invalid value ${positions[i]} at index ${i}. Positions:`, positions);
          this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
          return this;
        }
      }

      if (this.attributes.normal) {
        const normals = this.attributes.normal.array;
        for (let i = 0; i < normals.length; i++) {
          if (isNaN(normals[i]) || !isFinite(normals[i])) {
            console.warn(`Geometry ${this.name || this.uuid} has invalid normal ${normals[i]} at index ${i}. Normals:`, normals);
            this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
            return this;
          }
        }
      }

      if (this.attributes.uv) {
        const uvs = this.attributes.uv.array;
        for (let i = 0; i < uvs.length; i++) {
          if (isNaN(uvs[i]) || !isFinite(uvs[i])) {
            console.warn(`Geometry ${this.name || this.uuid} has invalid UV ${uvs[i]} at index ${i}. UVs:`, uvs);
            this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
            return this;
          }
        }
      }

      try {
        original.apply(this, arguments);
      } catch (e) {
        console.warn(`Error computing bounding sphere for geometry ${this.name || this.uuid}:`, e);
        this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
      }
      return this;
    };
  })(THREE.BufferGeometry.prototype.computeBoundingSphere);
