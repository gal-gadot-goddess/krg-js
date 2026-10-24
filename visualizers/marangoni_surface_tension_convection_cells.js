// visualizers/marangoni_surface_tension_convection_cells.js
// Marangoni Thermal Surface Tension Convection Hexagons
// Generated for 3D Three.js 60 FPS Cinematic Reels Suite

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.marangoni_surface_tension_convection_cells = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  return {
    id: "marangoni_surface_tension_convection_cells",
    title: "Marangoni Thermal Surface Tension Convection Hexagons",
    fileName: "marangoni_convection.js",
    category: "Fluid Dynamics & Plasma",
    genre: "plasma",
    caption: "\ud83c\udf6f Thermocapillary Marangoni effect: surface tension gradients driving hexagonal B\u00e9nard convection cells in Three.js! Follow @kreggsjs for daily reels! \ud83d\udd2c\u2728\n\n#threejs #webgl #marangoni #surfacetension #convection #fluidmechanics #codeart",
    
    displayCode: "// Marangoni Number: Ma = - (d_gamma/dT) * Delta_T * L / (rho * nu * alpha)\nfunction marangoniStress(dGamma_dT, gradT) {\n  return -dGamma_dT * gradT;\n}",

    defaultParams: {
    "primaryColor": [
        1.0,
        0.45,
        0.2
    ],
    "secondaryColor": [
        0.25,
        0.85,
        1.0
    ],
    "cells": 7
},

    init: function(THREE, scene, camera, renderer, params) {
      params = Object.assign({}, this.defaultParams, params || {});

      // Clear existing objects
      while (scene.children.length > 0) {
        const obj = scene.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        scene.remove(obj);
      }

      // Camera base config
      camera.fov = 50;
      camera.aspect = 1080 / 1920;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();

      const group = new THREE.Group();
      scene.add(group);

      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 22,000 Hexagonal Bénard Marangoni Particles
      const pCount = 22000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      for (let i = 0; i < pCount; i++) {
        const u = (Math.random() - 0.5) * 14.0;
        const v = (Math.random() - 0.5) * 14.0;
        const hex = Math.cos(u) + Math.cos(0.5*u + 0.866*v) + Math.cos(0.5*u - 0.866*v);
        const y = hex * 0.8;

        pPos[i * 3] = u; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = v;

        const col = c1.clone().lerp(c2, (hex + 1.5) / 3.0);
        pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const cells = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
      group.add(cells);

      scene.userData = { group, cells, params };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      data.group.rotation.y = t * 0.25;
      camera.position.x = Math.sin(t * 0.25) * 19;
      camera.position.z = Math.cos(t * 0.25) * 19;
      camera.position.y = 8 + Math.sin(t * 0.2) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
  };
});
