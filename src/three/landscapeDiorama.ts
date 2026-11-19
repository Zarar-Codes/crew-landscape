import * as THREE from 'three';
import {
  PavingFinish,
  PavingMaterialTextures,
  createAggregateTexture,
  createGrassTexture,
  createPavingTextures,
  createRadialShadowTexture,
  createWoodTexture,
} from './proceduralTextures';

export type LightingPreset = 'morning' | 'golden' | 'twilight';

export interface LandscapeDioramaHandles {
  root: THREE.Group;
  layers: {
    base: THREE.Group;
    terrace: THREE.Group;
    structures: THREE.Group;
    foliage: THREE.Group;
  };
  pavingMaterial: THREE.MeshStandardMaterial;
  waterUniforms: { uTime: { value: number } };
  fireLight: THREE.PointLight;
  emberMesh: THREE.Mesh;
  flameGroup: THREE.Group;
  bollardEmissiveMaterial: THREE.MeshStandardMaterial;
  bollardLights: THREE.PointLight[];
  setPavingFinish: (finish: PavingFinish) => void;
  dispose: () => void;
}

export function buildLandscapeDiorama(
  maxAnisotropy: number,
  isSoftwareGl: boolean
): LandscapeDioramaHandles {
  const root = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  // Pre-generate all 3 paving texture sets so switching finishes is instantaneous
  const finishTextures: Record<PavingFinish, PavingMaterialTextures> = {
    bluestone: createPavingTextures('bluestone', maxAnisotropy),
    brick: createPavingTextures('brick', maxAnisotropy),
    limestone: createPavingTextures('limestone', maxAnisotropy),
  };
  Object.values(finishTextures).forEach((set) => {
    track(set.albedo);
    track(set.bump);
    track(set.roughness);
  });

  const grassTex = track(createGrassTexture(maxAnisotropy));
  const woodTex = track(createWoodTexture(maxAnisotropy));
  const aggregateTex = track(createAggregateTexture(maxAnisotropy));
  const contactShadowTex = track(createRadialShadowTexture());

  // Shared PBR Materials with deliberate roughness/metalness contrast
  const lawnMat = track(
    new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.94,
      metalness: 0.0,
    })
  );

  const aggregateMat = track(
    new THREE.MeshStandardMaterial({
      map: aggregateTex,
      roughness: 0.95,
      metalness: 0.0,
    })
  );

  const pavingMaterial = track(
    new THREE.MeshStandardMaterial({
      map: finishTextures.bluestone.albedo,
      bumpMap: finishTextures.bluestone.bump,
      bumpScale: 0.035,
      roughnessMap: finishTextures.bluestone.roughness,
      roughness: 0.82,
      metalness: 0.04,
    })
  );

  const borderStoneMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x3b4447,
      roughness: 0.78,
      metalness: 0.08,
    })
  );

  const limestoneMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xd4d0c7,
      roughness: 0.84,
      metalness: 0.02,
    })
  );

  const copingMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xe3dfd6,
      roughness: 0.68,
      metalness: 0.05,
    })
  );

  const cedarMat = track(
    new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.76,
      metalness: 0.02,
    })
  );

  const darkBronzeMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x24292b,
      roughness: 0.28,
      metalness: 0.86,
    })
  );

  const brushedBrassMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xb79256,
      roughness: 0.26,
      metalness: 0.88,
    })
  );

  const basaltMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x32383b,
      roughness: 0.86,
      metalness: 0.06,
    })
  );

  const soilMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x3a2f27,
      roughness: 0.96,
      metalness: 0.0,
    })
  );

  const birchBarkMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xd8d5cc,
      roughness: 0.88,
      metalness: 0.0,
    })
  );

  const bollardEmissiveMaterial = track(
    new THREE.MeshStandardMaterial({
      color: 0xffe6b8,
      emissive: new THREE.Color(0xffa947),
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.05,
    })
  );

  // =========================================================================
  // 0. NATURAL OUTDOOR SURROUND & CONTACT SHADOW GROUNDING
  // =========================================================================
  const surroundGeo = track(new THREE.CircleGeometry(72, 64));
  const surroundMesh = new THREE.Mesh(surroundGeo, lawnMat);
  surroundMesh.rotation.x = -Math.PI / 2;
  surroundMesh.position.y = -0.02;
  surroundMesh.receiveShadow = true;
  root.add(surroundMesh);

  // Soft radial contact shadow under the courtyard footprint
  const shadowPlaneGeo = track(new THREE.PlaneGeometry(18.5, 14.5));
  const shadowPlaneMat = track(
    new THREE.MeshBasicMaterial({
      map: contactShadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.44,
    })
  );
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.set(0, 0.005, 0);
  root.add(shadowPlane);

  // =========================================================================
  // LAYER 1: COMPACTED AGGREGATE SUB-BASE & DRAINAGE FOUNDATION
  // =========================================================================
  const baseGroup = new THREE.Group();
  const baseSlabGeo = track(new THREE.BoxGeometry(11.6, 0.24, 8.6));
  const baseSlab = new THREE.Mesh(baseSlabGeo, aggregateMat);
  baseSlab.position.set(0, 0.12, 0);
  baseSlab.receiveShadow = true;
  baseSlab.castShadow = true;
  baseGroup.add(baseSlab);

  // Drainage pipe stub details along base edge
  const pipeGeo = track(new THREE.CylinderGeometry(0.06, 0.06, 11.7, 12));
  const pipeMat = track(
    new THREE.MeshStandardMaterial({ color: 0x202526, roughness: 0.6, metalness: 0.1 })
  );
  const drainPipe = new THREE.Mesh(pipeGeo, pipeMat);
  drainPipe.rotation.z = Math.PI / 2;
  drainPipe.position.set(0, 0.11, 4.1);
  baseGroup.add(drainPipe);

  root.add(baseGroup);

  // =========================================================================
  // LAYER 2: INTERLOCKING PAVER TERRACE, BORDER SOLDIER COURSE & STEPS
  // =========================================================================
  const terraceGroup = new THREE.Group();

  // Main terrace slab (bottom flush on aggregate base at Y = 0.24)
  const terraceGeo = track(new THREE.BoxGeometry(11.0, 0.16, 8.0));
  const terraceMesh = new THREE.Mesh(terraceGeo, pavingMaterial);
  terraceMesh.position.set(0, 0.32, 0);
  terraceMesh.receiveShadow = true;
  terraceMesh.castShadow = true;
  terraceGroup.add(terraceMesh);

  // Architectural soldier-course dark stone border strips (4 sides)
  const borderNGeo = track(new THREE.BoxGeometry(11.36, 0.18, 0.2));
  const borderN = new THREE.Mesh(borderNGeo, borderStoneMat);
  borderN.position.set(0, 0.32, -4.1);
  borderN.receiveShadow = true;
  borderN.castShadow = true;
  terraceGroup.add(borderN);

  const borderS = new THREE.Mesh(borderNGeo, borderStoneMat);
  borderS.position.set(0, 0.32, 4.1);
  borderS.receiveShadow = true;
  borderS.castShadow = true;
  terraceGroup.add(borderS);

  const borderEGeo = track(new THREE.BoxGeometry(0.2, 0.18, 8.4));
  const borderE = new THREE.Mesh(borderEGeo, borderStoneMat);
  borderE.position.set(5.58, 0.32, 0);
  borderE.receiveShadow = true;
  borderE.castShadow = true;
  terraceGroup.add(borderE);

  const borderW = new THREE.Mesh(borderEGeo, borderStoneMat);
  borderW.position.set(-5.58, 0.32, 0);
  borderW.receiveShadow = true;
  borderW.castShadow = true;
  terraceGroup.add(borderW);

  // Entry stepping stones extending cleanly into the lawn
  const stepGeo = track(new THREE.BoxGeometry(1.75, 0.12, 0.72));
  for (let i = 0; i < 4; i++) {
    const step = new THREE.Mesh(stepGeo, copingMat);
    step.position.set(-0.8 + i * 0.18, 0.08, 4.85 + i * 0.95);
    step.receiveShadow = true;
    step.castShadow = true;
    terraceGroup.add(step);
  }

  // Reflecting water basin built flush into east edge of terrace
  const waterGroup = new THREE.Group();
  waterGroup.position.set(3.55, 0.4, 1.35);

  const basinRimGeo = track(new THREE.BoxGeometry(2.9, 0.24, 3.6));
  const basinRim = new THREE.Mesh(basinRimGeo, borderStoneMat);
  basinRim.position.y = 0.12;
  basinRim.receiveShadow = true;
  basinRim.castShadow = true;
  waterGroup.add(basinRim);

  const basinInnerGeo = track(new THREE.BoxGeometry(2.5, 0.26, 3.2));
  const basinInnerMat = track(
    new THREE.MeshStandardMaterial({ color: 0x00373d, roughness: 0.4, metalness: 0.1 })
  );
  const basinInner = new THREE.Mesh(basinInnerGeo, basinInnerMat);
  basinInner.position.y = 0.13;
  waterGroup.add(basinInner);

  const waterUniforms = { uTime: { value: 0 } };
  const waterGeo = track(new THREE.PlaneGeometry(2.46, 3.16, 20, 24));
  const waterMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x085b63,
      roughness: 0.12,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.88,
    })
  );
  if (!isSoftwareGl) {
    waterMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = waterUniforms.uTime;
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>\nuniform float uTime;`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           transformed.z += sin(transformed.x * 3.8 + uTime * 1.9) * 0.014
                          + cos(transformed.y * 4.4 - uTime * 1.4) * 0.011;`
        );
    };
  }
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = 0.275;
  waterGroup.add(waterMesh);
  terraceGroup.add(waterGroup);

  root.add(terraceGroup);

  // =========================================================================
  // LAYER 3: ARCHITECTURAL STRUCTURES (PERGOLA, FIRE FEATURE, SEAT WALL, BOLLARDS)
  // =========================================================================
  const structuresGroup = new THREE.Group();

  // --- A. Composite Cedar Louvered Pergola (12+ parts) ---
  const pergolaGroup = new THREE.Group();
  pergolaGroup.position.set(-2.35, 0.4, -1.15);

  const plinthGeo = track(new THREE.BoxGeometry(0.46, 0.34, 0.46));
  const bracketGeo = track(new THREE.BoxGeometry(0.24, 0.14, 0.24));
  const postGeo = track(new THREE.BoxGeometry(0.2, 2.85, 0.2));

  const postCoords: Array<[number, number]> = [
    [-2.1, -1.65],
    [2.1, -1.65],
    [-2.1, 1.65],
    [2.1, 1.65],
  ];

  postCoords.forEach(([px, pz]) => {
    const plinth = new THREE.Mesh(plinthGeo, limestoneMat);
    plinth.position.set(px, 0.17, pz);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    pergolaGroup.add(plinth);

    const bracket = new THREE.Mesh(bracketGeo, darkBronzeMat);
    bracket.position.set(px, 0.41, pz);
    bracket.castShadow = true;
    pergolaGroup.add(bracket);

    const post = new THREE.Mesh(postGeo, cedarMat);
    post.position.set(px, 0.4 + 1.425, pz);
    post.castShadow = true;
    post.receiveShadow = true;
    pergolaGroup.add(post);

    // Top steel tie collar
    const collar = new THREE.Mesh(bracketGeo, darkBronzeMat);
    collar.position.set(px, 3.16, pz);
    pergolaGroup.add(collar);
  });

  // Main longitudinal beams (front & back)
  const mainBeamGeo = track(new THREE.BoxGeometry(4.85, 0.24, 0.14));
  [-1.65, 1.65].forEach((bz) => {
    const beam = new THREE.Mesh(mainBeamGeo, cedarMat);
    beam.position.set(0, 3.24, bz);
    beam.castShadow = true;
    beam.receiveShadow = true;
    pergolaGroup.add(beam);
  });

  // Architectural dark steel perimeter fascia rails
  const sideFasciaGeo = track(new THREE.BoxGeometry(0.1, 0.22, 3.7));
  [-2.38, 2.38].forEach((fx) => {
    const fascia = new THREE.Mesh(sideFasciaGeo, darkBronzeMat);
    fascia.position.set(fx, 3.36, 0);
    fascia.castShadow = true;
    pergolaGroup.add(fascia);
  });

  // 11 Louvered Cedar Roof Rafters
  const louverGeo = track(new THREE.BoxGeometry(0.08, 0.16, 3.85));
  for (let i = 0; i < 11; i++) {
    const lx = -2.1 + i * 0.42;
    const louver = new THREE.Mesh(louverGeo, cedarMat);
    louver.position.set(lx, 3.42, 0);
    louver.castShadow = true;
    pergolaGroup.add(louver);
  }

  // Minimalist Architectural Lounge Bench inside Pergola (composite parts)
  const benchGroup = new THREE.Group();
  benchGroup.position.set(0, 0, -0.85);
  const benchBaseGeo = track(new THREE.BoxGeometry(2.6, 0.28, 0.82));
  const benchBase = new THREE.Mesh(benchBaseGeo, darkBronzeMat);
  benchBase.position.y = 0.16;
  benchBase.castShadow = true;
  benchGroup.add(benchBase);

  const cushionMat = track(
    new THREE.MeshStandardMaterial({ color: 0xbcc4c6, roughness: 0.9, metalness: 0.0 })
  );
  const cushionGeo = track(new THREE.BoxGeometry(2.45, 0.18, 0.76));
  const cushion = new THREE.Mesh(cushionGeo, cushionMat);
  cushion.position.y = 0.39;
  cushion.castShadow = true;
  benchGroup.add(cushion);

  const backrestGeo = track(new THREE.BoxGeometry(2.45, 0.38, 0.18));
  const backrest = new THREE.Mesh(backrestGeo, cushionMat);
  backrest.position.set(0, 0.62, -0.32);
  backrest.castShadow = true;
  benchGroup.add(backrest);

  // Brand-signature Crew Teal accent pillows
  const tealPillowMat = track(
    new THREE.MeshStandardMaterial({ color: 0x005b63, roughness: 0.88, metalness: 0.0 })
  );
  const pillowGeo = track(new THREE.BoxGeometry(0.42, 0.34, 0.14));
  [-0.9, 0.9].forEach((px, idx) => {
    const pillow = new THREE.Mesh(pillowGeo, tealPillowMat);
    pillow.position.set(px, 0.62, -0.14);
    pillow.rotation.y = idx === 0 ? 0.18 : -0.18;
    pillow.castShadow = true;
    benchGroup.add(pillow);
  });
  pergolaGroup.add(benchGroup);
  structuresGroup.add(pergolaGroup);

  // --- B. Sculptural Basalt Fire Feature (Composite + Instanced Lava Stones) ---
  const fireFeatureGroup = new THREE.Group();
  fireFeatureGroup.position.set(-1.35, 0.4, 2.05);

  // Stepped bevelled base + main monolith surround
  const firePlinthGeo = track(new THREE.BoxGeometry(2.35, 0.16, 1.45));
  const firePlinth = new THREE.Mesh(firePlinthGeo, borderStoneMat);
  firePlinth.position.y = 0.08;
  firePlinth.castShadow = true;
  firePlinth.receiveShadow = true;
  fireFeatureGroup.add(firePlinth);

  const fireBodyGeo = track(new THREE.BoxGeometry(2.1, 0.38, 1.2));
  const fireBody = new THREE.Mesh(fireBodyGeo, basaltMat);
  fireBody.position.y = 0.35;
  fireBody.castShadow = true;
  fireBody.receiveShadow = true;
  fireFeatureGroup.add(fireBody);

  // Dark steel recessed burner rim
  const burnerPanGeo = track(new THREE.BoxGeometry(1.5, 0.06, 0.62));
  const burnerPan = new THREE.Mesh(burnerPanGeo, darkBronzeMat);
  burnerPan.position.y = 0.55;
  fireFeatureGroup.add(burnerPan);

  // Glowing ember strip
  const emberGeo = track(new THREE.BoxGeometry(1.22, 0.05, 0.34));
  const emberMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xff6b24,
      emissive: new THREE.Color(0xff5a12),
      emissiveIntensity: 2.2,
      roughness: 0.4,
    })
  );
  const emberMesh = new THREE.Mesh(emberGeo, emberMat);
  emberMesh.position.y = 0.57;
  fireFeatureGroup.add(emberMesh);

  // Instanced volcanic lava stones (42 stones)
  const stoneGeo = track(new THREE.DodecahedronGeometry(0.065, 0));
  const stoneMat = track(
    new THREE.MeshStandardMaterial({ color: 0x26292c, roughness: 0.92, metalness: 0.04 })
  );
  const lavaStones = new THREE.InstancedMesh(stoneGeo, stoneMat, 42);
  const dummy = new THREE.Object3D();
  const stoneColor = new THREE.Color();
  for (let i = 0; i < 42; i++) {
    const col = i % 14;
    const row = Math.floor(i / 14);
    dummy.position.set(
      -0.66 + col * 0.1 + ((i * 17) % 10) * 0.004,
      0.6,
      -0.2 + row * 0.19 + ((i * 23) % 10) * 0.005
    );
    dummy.rotation.set(i * 0.7, i * 1.1, i * 0.4);
    const s = 0.85 + ((i * 13) % 10) * 0.03;
    dummy.scale.set(s * 1.15, s * 0.72, s);
    dummy.updateMatrix();
    lavaStones.setMatrixAt(i, dummy.matrix);
    const shade = 0.14 + ((i * 7) % 10) * 0.012;
    stoneColor.setRGB(shade, shade, shade + 0.01);
    lavaStones.setColorAt(i, stoneColor);
  }
  lavaStones.instanceMatrix.needsUpdate = true;
  if (lavaStones.instanceColor) lavaStones.instanceColor.needsUpdate = true;
  lavaStones.computeBoundingSphere();
  fireFeatureGroup.add(lavaStones);

  // Subtle geometric flame tongues (animated in render loop)
  const flameGroup = new THREE.Group();
  flameGroup.position.y = 0.62;
  const flameGeo = track(new THREE.ConeGeometry(0.06, 0.28, 6));
  const flameMat = track(
    new THREE.MeshBasicMaterial({
      color: 0xffa63d,
      transparent: true,
      opacity: 0.82,
    })
  );
  for (let i = 0; i < 7; i++) {
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(-0.48 + i * 0.16, 0.11, (i % 2 === 0 ? 1 : -1) * 0.03);
    flame.scale.set(0.9, 0.8 + (i % 3) * 0.22, 0.9);
    flameGroup.add(flame);
  }
  fireFeatureGroup.add(flameGroup);

  const fireLight = new THREE.PointLight(0xff8c38, 1.4, 7.5, 1.8);
  fireLight.position.set(0, 0.95, 0);
  fireFeatureGroup.add(fireLight);

  structuresGroup.add(fireFeatureGroup);

  // --- C. Architectural Limestone Seat Wall & Raised Planter ---
  const wallGroup = new THREE.Group();
  wallGroup.position.set(0, 0.4, 0);

  // Back L-shaped masonry wall behind water basin & east perimeter
  const wallBackGeo = track(new THREE.BoxGeometry(5.6, 0.62, 0.56));
  const wallBack = new THREE.Mesh(wallBackGeo, limestoneMat);
  wallBack.position.set(2.4, 0.31, -3.55);
  wallBack.castShadow = true;
  wallBack.receiveShadow = true;
  wallGroup.add(wallBack);

  const copingBackGeo = track(new THREE.BoxGeometry(5.76, 0.09, 0.68));
  const copingBack = new THREE.Mesh(copingBackGeo, copingMat);
  copingBack.position.set(2.4, 0.665, -3.55);
  copingBack.castShadow = true;
  copingBack.receiveShadow = true;
  wallGroup.add(copingBack);

  // Raised corner planter box
  const planterWallGeo = track(new THREE.BoxGeometry(2.6, 0.56, 2.2));
  const planterWall = new THREE.Mesh(planterWallGeo, limestoneMat);
  planterWall.position.set(3.85, 0.28, -2.05);
  planterWall.castShadow = true;
  planterWall.receiveShadow = true;
  wallGroup.add(planterWall);

  const planterSoilGeo = track(new THREE.BoxGeometry(2.3, 0.08, 1.9));
  const planterSoil = new THREE.Mesh(planterSoilGeo, soilMat);
  planterSoil.position.set(3.85, 0.55, -2.05);
  wallGroup.add(planterSoil);

  const planterCopingGeo = track(new THREE.BoxGeometry(2.74, 0.08, 2.34));
  const planterCoping = new THREE.Mesh(planterCopingGeo, copingMat);
  planterCoping.position.set(3.85, 0.6, -2.05);
  planterCoping.castShadow = true;
  wallGroup.add(planterCoping);

  structuresGroup.add(wallGroup);

  // --- D. 6 Multi-Part Low-Voltage Brass Path Bollards ---
  const bollardLights: THREE.PointLight[] = [];
  const bollardBaseGeo = track(new THREE.CylinderGeometry(0.09, 0.11, 0.04, 12));
  const bollardStemGeo = track(new THREE.CylinderGeometry(0.045, 0.05, 0.46, 12));
  const bollardLensGeo = track(new THREE.CylinderGeometry(0.042, 0.042, 0.11, 12));
  const bollardCapGeo = track(new THREE.CylinderGeometry(0.068, 0.068, 0.045, 12));

  const bollardPositions: Array<[number, number, number]> = [
    [-4.9, 0.4, 3.6],
    [-2.0, 0.4, 3.6],
    [1.1, 0.4, 3.6],
    [4.95, 0.4, 3.5],
    [1.9, 0.4, -3.0],
    [-5.0, 0.4, -3.4],
  ];

  bollardPositions.forEach(([bx, by, bz], idx) => {
    const bollard = new THREE.Group();
    bollard.position.set(bx, by, bz);

    const flange = new THREE.Mesh(bollardBaseGeo, darkBronzeMat);
    flange.position.y = 0.02;
    bollard.add(flange);

    const stem = new THREE.Mesh(bollardStemGeo, brushedBrassMat);
    stem.position.y = 0.27;
    stem.castShadow = true;
    bollard.add(stem);

    const lens = new THREE.Mesh(bollardLensGeo, bollardEmissiveMaterial);
    lens.position.y = 0.54;
    bollard.add(lens);

    const cap = new THREE.Mesh(bollardCapGeo, darkBronzeMat);
    cap.position.y = 0.61;
    bollard.add(cap);

    // Add 2 warm architectural wash point lights on representative bollards
    if (idx === 1 || idx === 3) {
      const pLight = new THREE.PointLight(0xffcf88, 0.35, 5.5, 2);
      pLight.position.set(0, 0.62, 0);
      bollard.add(pLight);
      bollardLights.push(pLight);
    }

    structuresGroup.add(bollard);
  });

  root.add(structuresGroup);

  // =========================================================================
  // LAYER 4: ARCHITECTURAL PLANTING (MULTI-STEM BIRCH TREES, HEDGES, GRASSES)
  // =========================================================================
  const foliageGroup = new THREE.Group();

  // Helper to build a multi-part multi-stem architectural birch tree
  const canopyLeafGeo = track(new THREE.IcosahedronGeometry(0.42, 1));
  const canopyLeafMat = track(
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, metalness: 0.0 })
  );

  const treeCenters: Array<[number, number, number]> = [
    [3.85, 0.96, -2.05], // Inside raised limestone planter
    [-6.6, 0.0, -3.8],   // Northwest specimen anchor
    [6.5, 0.0, -3.9],    // Northeast perimeter tree
    [-6.9, 0.0, 2.4],    // Southwest framing tree
  ];

  const leafMatrices: THREE.Matrix4[] = [];
  const leafColors: THREE.Color[] = [];
  const leafPalette = [0x3d5c45, 0x4b6e4d, 0x2f4d3b, 0x5c7c52, 0x355443];

  const trunkGeo = track(new THREE.CylinderGeometry(0.055, 0.095, 2.5, 8));
  const branchGeo = track(new THREE.CylinderGeometry(0.025, 0.05, 1.35, 7));

  treeCenters.forEach(([tx, ty, tz], tIdx) => {
    const tree = new THREE.Group();
    tree.position.set(tx, ty, tz);
    const scaleFactor = tIdx === 0 ? 0.92 : 1.12;
    tree.scale.setScalar(scaleFactor);

    // 3 gracefully splayed multi-stem birch trunks
    const stems = [
      { rx: 0.08, rz: 0.14, x: -0.08, z: 0.04, h: 1.0 },
      { rx: -0.1, rz: -0.12, x: 0.1, z: -0.06, h: 1.12 },
      { rx: 0.11, rz: -0.08, x: 0.0, z: 0.1, h: 0.88 },
    ];

    stems.forEach((st, sIdx) => {
      const trunk = new THREE.Mesh(trunkGeo, birchBarkMat);
      trunk.position.set(st.x, 1.22 * st.h, st.z);
      trunk.rotation.set(st.rx, sIdx * 1.4, st.rz);
      trunk.scale.y = st.h;
      trunk.castShadow = true;
      tree.add(trunk);

      const branch = new THREE.Mesh(branchGeo, birchBarkMat);
      branch.position.set(st.x * 2.4, 2.35 * st.h, st.z * 2.4);
      branch.rotation.set(st.rx * 2.4, sIdx * 2.1, st.rz * 2.5);
      branch.castShadow = true;
      tree.add(branch);

      // Cluster organic canopy puffs around upper branches
      for (let c = 0; c < 6; c++) {
        const angle = (c / 6) * Math.PI * 2 + tIdx * 0.9 + sIdx;
        const rad = 0.42 + (c % 3) * 0.24;
        const localPos = new THREE.Vector3(
          st.x * 3.0 + Math.cos(angle) * rad,
          2.65 * st.h + (c % 3) * 0.34,
          st.z * 3.0 + Math.sin(angle) * rad
        );
        localPos.multiplyScalar(scaleFactor);
        localPos.add(new THREE.Vector3(tx, ty, tz));

        dummy.position.copy(localPos);
        dummy.rotation.set(c * 0.5, angle, sIdx * 0.4);
        const s = (0.85 + ((c * 19 + tIdx * 7) % 10) * 0.045) * scaleFactor;
        dummy.scale.set(s * 1.2, s * 0.88, s * 1.15);
        dummy.updateMatrix();
        leafMatrices.push(dummy.matrix.clone());
        leafColors.push(new THREE.Color(leafPalette[(c + sIdx + tIdx) % leafPalette.length]));
      }
    });

    foliageGroup.add(tree);
  });

  // Structured architectural boxwood hedging along rear & west planting beds
  const boxwoodPositions: Array<[number, number, number, number]> = [
    [-5.95, 0.34, -2.1, 0.65],
    [-5.95, 0.34, -0.9, 0.72],
    [-5.95, 0.34, 0.3, 0.64],
    [-5.95, 0.34, 1.5, 0.68],
    [-3.6, 0.34, -4.65, 0.72],
    [-2.4, 0.34, -4.65, 0.66],
    [-1.2, 0.34, -4.65, 0.74],
    [0.1, 0.34, -4.65, 0.68],
    [1.4, 0.34, -4.65, 0.72],
    [3.1, 0.98, -2.55, 0.48],
    [4.45, 0.98, -1.55, 0.46],
    [5.95, 0.34, 0.2, 0.66],
    [5.95, 0.34, 1.4, 0.7],
    [5.95, 0.34, 2.6, 0.64],
  ];

  boxwoodPositions.forEach(([bx, by, bz, bs], idx) => {
    dummy.position.set(bx, by, bz);
    dummy.rotation.set(0, idx * 0.6, 0);
    dummy.scale.set(bs * 1.55, bs * 1.15, bs * 1.45);
    dummy.updateMatrix();
    leafMatrices.push(dummy.matrix.clone());
    leafColors.push(new THREE.Color(idx % 2 === 0 ? 0x2c4b39 : 0x355942));
  });

  const foliageInstanced = new THREE.InstancedMesh(
    canopyLeafGeo,
    canopyLeafMat,
    leafMatrices.length
  );
  leafMatrices.forEach((mat, i) => {
    foliageInstanced.setMatrixAt(i, mat);
    foliageInstanced.setColorAt(i, leafColors[i]);
  });
  foliageInstanced.instanceMatrix.needsUpdate = true;
  if (foliageInstanced.instanceColor) foliageInstanced.instanceColor.needsUpdate = true;
  foliageInstanced.castShadow = true;
  foliageInstanced.receiveShadow = true;
  foliageInstanced.computeBoundingSphere();
  foliageGroup.add(foliageInstanced);

  // Architectural ornamental feather-reed grasses (InstancedMesh > 50 tufts)
  const grassBladeGeo = track(new THREE.ConeGeometry(0.055, 0.72, 5));
  const grassBladeMat = track(
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.0 })
  );
  const grassClusters = [
    [-4.6, 0.0, 4.7],
    [-3.6, 0.0, 4.75],
    [-2.6, 0.0, 4.7],
    [1.6, 0.0, 4.7],
    [2.7, 0.0, 4.75],
    [3.8, 0.0, 4.7],
    [5.85, 0.0, -1.3],
    [5.85, 0.0, -2.5],
  ];
  const grassCount = grassClusters.length * 9;
  const grassInstanced = new THREE.InstancedMesh(grassBladeGeo, grassBladeMat, grassCount);
  const grassTint = new THREE.Color();
  let gIdx = 0;
  grassClusters.forEach(([cx, cy, cz], cIdx) => {
    for (let k = 0; k < 9; k++) {
      const ang = (k / 9) * Math.PI * 2 + cIdx;
      const dist = 0.08 + (k % 3) * 0.09;
      dummy.position.set(cx + Math.cos(ang) * dist, cy + 0.32, cz + Math.sin(ang) * dist);
      dummy.rotation.set(Math.sin(ang) * 0.24, ang, Math.cos(ang) * 0.24);
      const s = 0.8 + ((k * 11 + cIdx) % 5) * 0.1;
      dummy.scale.set(1, s, 1);
      dummy.updateMatrix();
      grassInstanced.setMatrixAt(gIdx, dummy.matrix);
      grassTint.setHex(k % 3 === 0 ? 0x9aa472 : k % 2 === 0 ? 0x677c50 : 0x7e8f5f);
      grassInstanced.setColorAt(gIdx, grassTint);
      gIdx++;
    }
  });
  grassInstanced.instanceMatrix.needsUpdate = true;
  if (grassInstanced.instanceColor) grassInstanced.instanceColor.needsUpdate = true;
  grassInstanced.computeBoundingSphere();
  foliageGroup.add(grassInstanced);

  root.add(foliageGroup);

  const setPavingFinish = (finish: PavingFinish) => {
    const tex = finishTextures[finish];
    pavingMaterial.map = tex.albedo;
    pavingMaterial.bumpMap = tex.bump;
    pavingMaterial.roughnessMap = tex.roughness;
    pavingMaterial.needsUpdate = true;
  };

  const dispose = () => {
    disposables.forEach((item) => item.dispose());
  };

  return {
    root,
    layers: {
      base: baseGroup,
      terrace: terraceGroup,
      structures: structuresGroup,
      foliage: foliageGroup,
    },
    pavingMaterial,
    waterUniforms,
    fireLight,
    emberMesh,
    flameGroup,
    bollardEmissiveMaterial,
    bollardLights,
    setPavingFinish,
    dispose,
  };
}
