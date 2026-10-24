// visualizers/kerr_black_hole_ergosphere.js
// Spinning Kerr Black Hole Ergosphere, Gargantua Accretion Disk & Penrose Jets
// Masterpiece Cinematic 3D Three.js 60 FPS Visualizer

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VISUALIZERS = root.VISUALIZERS || {};
    root.VISUALIZERS.kerr_black_hole_ergosphere = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {

  // Helper: Create soft radial glow sprite texture for luminous particles
  function createGlowSprite() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  return {
    id: "kerr_black_hole_ergosphere",
    title: "Spinning Kerr Black Hole Ergosphere & Penrose Jets",
    fileName: "kerr_ergosphere.js",
    category: "Astrophysics & Relativity",
    genre: "cosmic",
    caption: "🌌 Relativistic Gargantua Kerr rotating black hole with glowing Keplerian accretion disk, gravitational lensing halo, oblate ergosphere & Penrose plasma jets rendered live at 60 FPS in Three.js! Follow @kreggsjs for daily 3D code reels! ⚡🕳️\n\n#threejs #webgl #blackhole #kerrblackhole #astrophysics #creativecoding #codeart #javascript #interstellar",
    
    displayCode: "// Kerr Metric Ergosphere Boundary & Frame Dragging\nfunction kerrErgosphere(M, a, theta) {\n  // r_E(theta) = M + sqrt(M^2 - a^2 * cos^2(theta))\n  const spin = a * Math.cos(theta);\n  return M + Math.sqrt(Math.max(0, M * M - spin * spin));\n}\n// Relativistic Keplerian Orbital Velocity\nconst v_kepler = Math.sqrt(M) / (Math.pow(r, 0.75) + a);",

    defaultParams: {
      primaryColor: [0.22, 0.85, 1.0],   // Electric Cyan
      secondaryColor: [1.0, 0.18, 0.55], // Hot Magenta / Crimson
      spinParam: 0.98,
      mass: 2.8
    },

    init: function(THREE, scene, camera, renderer, params) {
      params = Object.assign({}, this.defaultParams, params || {});

      while (scene.children.length > 0) {
        const obj = scene.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        scene.remove(obj);
      }

      camera.fov = 48;
      camera.aspect = 1080 / 1920;
      camera.near = 0.1;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      camera.position.set(0, 5, 20);

      const group = new THREE.Group();
      scene.add(group);

      const glowTex = createGlowSprite();
      const c1 = new THREE.Color(params.primaryColor[0], params.primaryColor[1], params.primaryColor[2]);
      const c2 = new THREE.Color(params.secondaryColor[0], params.secondaryColor[1], params.secondaryColor[2]);

      // 1. EVENT HORIZON CORE (Total Absorbance Sphere)
      const horizonGeo = new THREE.SphereGeometry(2.5, 64, 64);
      const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const horizon = new THREE.Mesh(horizonGeo, horizonMat);
      group.add(horizon);

      // 2. BLAZING PHOTON SPHERE RING (r = 2.8, blinding white-hot emission)
      const photonGeo = new THREE.TorusGeometry(2.7, 0.08, 32, 128);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      });
      const photonRing = new THREE.Mesh(photonGeo, photonMat);
      photonRing.rotation.x = Math.PI / 2;
      group.add(photonRing);

      // 3. OBLATE ERGOSPHERE SPHEROID (Spacetime dragging shell)
      const ergoGeo = new THREE.SphereGeometry(4.2, 64, 64);
      ergoGeo.scale(1.42, 0.88, 1.42); // Oblate equatorial frame dragging
      const ergoMat = new THREE.MeshStandardMaterial({
        color: c1,
        emissive: c1,
        emissiveIntensity: 0.85,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const ergosphere = new THREE.Mesh(ergoGeo, ergoMat);
      group.add(ergosphere);

      // 4. RELATIVISTIC KEPLERIAN ACCRETION DISK (32,000 Particles)
      const diskCount = 32000;
      const diskPos = new Float32Array(diskCount * 3);
      const diskCol = new Float32Array(diskCount * 3);
      const diskData = []; // { r, angle, speed, verticalOffset }

      for (let i = 0; i < diskCount; i++) {
        // Density distribution: high concentration near inner radius (3.0 - 13.5)
        const u = Math.random();
        const r = 3.0 + Math.pow(u, 1.8) * 11.5;
        const angle = Math.random() * Math.PI * 2;
        // Keplerian orbital angular velocity: v ~ 1 / r^1.5
        const speed = (2.8 / Math.pow(r, 1.45)) * 1.8;
        const vSpread = (r / 14.5) * 0.45;
        const y = (Math.random() - 0.5) * vSpread;

        diskPos[i * 3]     = Math.cos(angle) * r;
        diskPos[i * 3 + 1] = y;
        diskPos[i * 3 + 2] = Math.sin(angle) * r;

        // Color temperature gradient: inner = white-hot / cyan, outer = violet / fiery crimson
        const normR = (r - 3.0) / 11.5;
        let col;
        if (normR < 0.25) {
          // Inner ultra-hot: blend pure white with primary cyan
          col = new THREE.Color(1.0, 1.0, 1.0).lerp(c1, normR * 4.0);
        } else if (normR < 0.65) {
          // Mid disk: blend cyan with secondary magenta
          col = c1.clone().lerp(c2, (normR - 0.25) / 0.4);
        } else {
          // Outer edge: deep crimson / fiery amber
          col = c2.clone().lerp(new THREE.Color(1.0, 0.4, 0.1), (normR - 0.65) / 0.35);
        }

        diskCol[i * 3]     = col.r;
        diskCol[i * 3 + 1] = col.g;
        diskCol[i * 3 + 2] = col.b;

        diskData.push({ r, angle, speed, yBase: y, baseCol: col });
      }

      const diskGeo = new THREE.BufferGeometry();
      diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
      diskGeo.setAttribute('color', new THREE.BufferAttribute(diskCol, 3));

      const diskMat = new THREE.PointsMaterial({
        size: 0.32,
        map: glowTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const accretionDisk = new THREE.Points(diskGeo, diskMat);
      group.add(accretionDisk);

      // 5. GRAVITATIONAL LENSING HALO ARCS (14,000 Warped Particles)
      // Simulates light rays from the rear disk bent over the top and bottom of the event horizon
      const lensCount = 14000;
      const lensPos = new Float32Array(lensCount * 3);
      const lensCol = new Float32Array(lensCount * 3);
      const lensData = [];

      for (let i = 0; i < lensCount; i++) {
        const u = Math.random();
        const r = 2.9 + Math.pow(u, 1.6) * 7.5;
        const angle = Math.random() * Math.PI * 2;
        const speed = (2.5 / Math.pow(r, 1.45)) * 1.6;
        const sign = Math.random() < 0.5 ? 1 : -1;

        // Gravitational lensing warp profile (parabolic arch over poles)
        const warpY = sign * (Math.sqrt(Math.max(0, r * r - 2.6 * 2.6)) * 0.9 + 0.2);
        const warpX = Math.cos(angle) * r * 0.92;
        const warpZ = Math.sin(angle) * (r * 0.35);

        lensPos[i * 3]     = warpX;
        lensPos[i * 3 + 1] = warpY;
        lensPos[i * 3 + 2] = warpZ;

        const normR = (r - 2.9) / 7.5;
        const col = c1.clone().lerp(c2, normR);
        lensCol[i * 3]     = col.r * 1.2;
        lensCol[i * 3 + 1] = col.g * 1.2;
        lensCol[i * 3 + 2] = col.b * 1.2;

        lensData.push({ r, angle, speed, sign });
      }

      const lensGeo = new THREE.BufferGeometry();
      lensGeo.setAttribute('position', new THREE.BufferAttribute(lensPos, 3));
      lensGeo.setAttribute('color', new THREE.BufferAttribute(lensCol, 3));

      const lensMat = new THREE.PointsMaterial({
        size: 0.30,
        map: glowTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const lensHalo = new THREE.Points(lensGeo, lensMat);
      group.add(lensHalo);

      // 6. RELATIVISTIC BIPOLAR PENROSE PLASMA JETS (8,000 Particles)
      const jetCount = 8000;
      const jetPos = new Float32Array(jetCount * 3);
      const jetCol = new Float32Array(jetCount * 3);
      const jetData = [];

      for (let i = 0; i < jetCount; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const progress = Math.random();
        const dist = 1.8 + progress * 24.0;
        const helixAngle = progress * Math.PI * 18.0 + Math.random() * 0.4;
        const beamRadius = 0.35 + Math.pow(progress, 1.4) * 2.8;

        jetPos[i * 3]     = Math.cos(helixAngle) * beamRadius;
        jetPos[i * 3 + 1] = sign * dist;
        jetPos[i * 3 + 2] = Math.sin(helixAngle) * beamRadius;

        // Shock knots and energetic plasma coloration
        const col = (progress < 0.25)
          ? new THREE.Color(1.0, 1.0, 1.0)
          : c1.clone().lerp(c2, progress);

        jetCol[i * 3]     = col.r;
        jetCol[i * 3 + 1] = col.g;
        jetCol[i * 3 + 2] = col.b;

        jetData.push({ sign, progress, speed: 1.2 + Math.random() * 0.8, helixAngle, beamRadius });
      }

      const jetGeo = new THREE.BufferGeometry();
      jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPos, 3));
      jetGeo.setAttribute('color', new THREE.BufferAttribute(jetCol, 3));

      const jetMat = new THREE.PointsMaterial({
        size: 0.26,
        map: glowTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const jets = new THREE.Points(jetGeo, jetMat);
      group.add(jets);

      scene.userData = {
        group,
        ergosphere,
        photonRing,
        accretionDisk,
        diskData,
        lensHalo,
        lensData,
        jets,
        jetData,
        params,
        glowTex
      };
    },

    render: function(THREE, scene, camera, renderer, t, params) {
      const data = scene.userData;
      if (!data) return;

      // 1. Oblate Ergosphere spacetime rotation
      data.ergosphere.rotation.y = t * 1.4;
      data.ergosphere.rotation.z = Math.sin(t * 0.6) * 0.12;

      // 2. Accretion Disk Keplerian Orbital Motion with Doppler Beaming
      const diskPos = data.accretionDisk.geometry.attributes.position.array;
      const diskCol = data.accretionDisk.geometry.attributes.color.array;
      const dItems = data.diskData;

      for (let i = 0; i < dItems.length; i++) {
        const item = dItems[i];
        const curAngle = item.angle + t * item.speed;
        const curX = Math.cos(curAngle) * item.r;
        const curZ = Math.sin(curAngle) * item.r;

        diskPos[i * 3]     = curX;
        diskPos[i * 3 + 1] = item.yBase;
        diskPos[i * 3 + 2] = curZ;

        // Doppler Beaming: Approaching particles (curX < 0) are boosted in brightness
        const doppler = Math.max(0.4, 1.0 - (curX / item.r) * 0.55);
        diskCol[i * 3]     = Math.min(1.0, item.baseCol.r * doppler);
        diskCol[i * 3 + 1] = Math.min(1.0, item.baseCol.g * doppler);
        diskCol[i * 3 + 2] = Math.min(1.0, item.baseCol.b * doppler);
      }
      data.accretionDisk.geometry.attributes.position.needsUpdate = true;
      data.accretionDisk.geometry.attributes.color.needsUpdate = true;

      // 3. Gravitational Lensing Halo Motion
      const lensPos = data.lensHalo.geometry.attributes.position.array;
      const lItems = data.lensData;
      for (let i = 0; i < lItems.length; i++) {
        const item = lItems[i];
        const curAngle = item.angle + t * item.speed;
        lensPos[i * 3]     = Math.cos(curAngle) * item.r * 0.92;
        lensPos[i * 3 + 2] = Math.sin(curAngle) * (item.r * 0.35);
      }
      data.lensHalo.geometry.attributes.position.needsUpdate = true;

      // 4. Helical Penrose Plasma Jets Propagation
      const jetPos = data.jets.geometry.attributes.position.array;
      const jItems = data.jetData;
      for (let i = 0; i < jItems.length; i++) {
        const item = jItems[i];
        // Fully deterministic forward flight
        const p = (item.progress + t * item.speed * 0.25) % 1.0;
        const dist = 1.8 + p * 24.0;
        const angle = item.helixAngle + t * 4.5 * item.sign;
        const rad = 0.35 + Math.pow(p, 1.4) * 2.8;

        jetPos[i * 3]     = Math.cos(angle) * rad;
        jetPos[i * 3 + 1] = item.sign * dist;
        jetPos[i * 3 + 2] = Math.sin(angle) * rad;
      }
      data.jets.geometry.attributes.position.needsUpdate = true;

      // 5. Cinematic Orbital Camera Choreography
      // Smoothly swoops from high-angle view down toward accretion disk plane
      const camRadius = 18.0 + Math.sin(t * 0.35) * 2.5;
      const camElev = 4.5 + Math.cos(t * 0.45) * 3.5;
      const camAzimuth = t * 0.35;

      camera.position.x = Math.sin(camAzimuth) * camRadius;
      camera.position.z = Math.cos(camAzimuth) * camRadius;
      camera.position.y = camElev;
      camera.lookAt(0, 0.4, 0);

      // Group subtle inclination
      data.group.rotation.z = Math.sin(t * 0.25) * 0.12;

      renderer.render(scene, camera);
    }
  };
});
