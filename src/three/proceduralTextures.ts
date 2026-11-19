import * as THREE from 'three';

export type PavingFinish = 'bluestone' | 'brick' | 'limestone';

export interface PavingMaterialTextures {
  albedo: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createPavingTextures(
  finish: PavingFinish,
  maxAnisotropy: number
): PavingMaterialTextures {
  const size = 512;
  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const aCtx = albedoCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d')!;

  const rand = seededRandom(finish === 'bluestone' ? 1041 : finish === 'brick' ? 2089 : 3191);

  if (finish === 'bluestone') {
    // Dark grout joints
    aCtx.fillStyle = '#4c5457';
    aCtx.fillRect(0, 0, size, size);
    bCtx.fillStyle = '#202020';
    bCtx.fillRect(0, 0, size, size);
    rCtx.fillStyle = '#ececec';
    rCtx.fillRect(0, 0, size, size);

    const rows = 4;
    const cols = 3;
    const pad = 5;
    const cellH = size / rows;
    const cellW = size / cols;

    const tones = ['#7e8c91', '#88969b', '#748288', '#8d989b', '#7a878c'];

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (cellW * 0.5);
      for (let c = -1; c <= cols; c++) {
        const x = c * cellW + offset + pad;
        const y = r * cellH + pad;
        const w = cellW - pad * 2;
        const h = cellH - pad * 2;

        aCtx.fillStyle = tones[Math.floor(rand() * tones.length)];
        aCtx.fillRect(x, y, w, h);

        bCtx.fillStyle = '#cfcfcf';
        bCtx.fillRect(x, y, w, h);

        const rVal = Math.floor(165 + rand() * 38);
        rCtx.fillStyle = `rgb(${rVal},${rVal},${rVal})`;
        rCtx.fillRect(x, y, w, h);

        // Subtle stone mineral grain
        for (let g = 0; g < 65; g++) {
          const gx = x + rand() * w;
          const gy = y + rand() * h;
          const gw = 4 + rand() * 16;
          const gh = 2 + rand() * 8;
          aCtx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,35,0.05)';
          aCtx.fillRect(gx, gy, gw, gh);
          bCtx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
          bCtx.fillRect(gx, gy, gw, gh);
        }
      }
    }
  } else if (finish === 'brick') {
    // Polymeric sand joint background
    aCtx.fillStyle = '#5f5a53';
    aCtx.fillRect(0, 0, size, size);
    bCtx.fillStyle = '#1c1c1c';
    bCtx.fillRect(0, 0, size, size);
    rCtx.fillStyle = '#f0f0f0';
    rCtx.fillRect(0, 0, size, size);

    const rows = 8;
    const cols = 4;
    const pad = 4;
    const cellH = size / rows;
    const cellW = size / cols;
    const tones = ['#a39383', '#968678', '#8b7e72', '#aba093', '#7f756d'];

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (cellW * 0.5);
      for (let c = -1; c <= cols; c++) {
        const x = c * cellW + offset + pad;
        const y = r * cellH + pad;
        const w = cellW - pad * 2;
        const h = cellH - pad * 2;

        aCtx.fillStyle = tones[Math.floor(rand() * tones.length)];
        aCtx.fillRect(x, y, w, h);

        bCtx.fillStyle = '#d4d4d4';
        bCtx.fillRect(x, y, w, h);

        const rVal = Math.floor(195 + rand() * 35);
        rCtx.fillStyle = `rgb(${rVal},${rVal},${rVal})`;
        rCtx.fillRect(x, y, w, h);

        for (let g = 0; g < 24; g++) {
          const gx = x + rand() * w;
          const gy = y + rand() * h;
          aCtx.fillStyle = rand() > 0.5 ? 'rgba(255,248,238,0.06)' : 'rgba(35,30,26,0.07)';
          aCtx.fillRect(gx, gy, 5, 3);
        }
      }
    }
  } else {
    // Architectural Honed Limestone
    aCtx.fillStyle = '#9aa09e';
    aCtx.fillRect(0, 0, size, size);
    bCtx.fillStyle = '#2a2a2a';
    bCtx.fillRect(0, 0, size, size);
    rCtx.fillStyle = '#e0e0e0';
    rCtx.fillRect(0, 0, size, size);

    const rows = 3;
    const cols = 2;
    const pad = 4;
    const cellH = size / rows;
    const cellW = size / cols;
    const tones = ['#d9d6cd', '#d1cec5', '#dedbd2', '#ccc9c0'];

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (cellW * 0.35);
      for (let c = -1; c <= cols; c++) {
        const x = c * cellW + offset + pad;
        const y = r * cellH + pad;
        const w = cellW - pad * 2;
        const h = cellH - pad * 2;

        aCtx.fillStyle = tones[Math.floor(rand() * tones.length)];
        aCtx.fillRect(x, y, w, h);

        bCtx.fillStyle = '#d8d8d8';
        bCtx.fillRect(x, y, w, h);

        const rVal = Math.floor(148 + rand() * 30);
        rCtx.fillStyle = `rgb(${rVal},${rVal},${rVal})`;
        rCtx.fillRect(x, y, w, h);

        for (let g = 0; g < 70; g++) {
          const gx = x + rand() * w;
          const gy = y + rand() * h;
          aCtx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.07)' : 'rgba(90,88,80,0.04)';
          aCtx.fillRect(gx, gy, 14, 3);
        }
      }
    }
  }

  const albedo = new THREE.CanvasTexture(albedoCanvas);
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.repeat.set(3.2, 2.4);
  albedo.anisotropy = maxAnisotropy;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(3.2, 2.4);
  bump.anisotropy = maxAnisotropy;

  const roughness = new THREE.CanvasTexture(roughCanvas);
  roughness.wrapS = THREE.RepeatWrapping;
  roughness.wrapT = THREE.RepeatWrapping;
  roughness.repeat.set(3.2, 2.4);
  roughness.anisotropy = maxAnisotropy;

  return { albedo, bump, roughness };
}

export function createGrassTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const rand = seededRandom(8821);

  ctx.fillStyle = '#4b6344';
  ctx.fillRect(0, 0, size, size);

  // Subtle architectural lawn mowing bands
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'rgba(18,32,20,0.035)';
    ctx.fillRect(i * (size / 8), 0, size / 8, size);
  }

  // Natural turf grain
  for (let i = 0; i < 3600; i++) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.fillStyle =
      rand() > 0.5 ? 'rgba(128,158,96,0.16)' : 'rgba(34,52,32,0.16)';
    ctx.fillRect(x, y, 2, 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function createWoodTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const rand = seededRandom(4421);

  ctx.fillStyle = '#8b5f3d';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 2) {
    const delta = Math.sin(y * 0.14) * 10 + (rand() - 0.5) * 10;
    const r = Math.min(255, Math.max(0, 136 + delta));
    const g = Math.min(255, Math.max(0, 92 + delta * 0.7));
    const b = Math.min(255, Math.max(0, 58 + delta * 0.5));
    ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
    ctx.fillRect(0, y, size, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 3);
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function createAggregateTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const rand = seededRandom(6123);

  ctx.fillStyle = '#8f9698';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 2400; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const v = 105 + Math.floor(rand() * 75);
    ctx.fillStyle = `rgb(${v},${v + 2},${v + 3})`;
    ctx.fillRect(x, y, 2 + rand() * 3, 2 + rand() * 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 4);
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function createRadialShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.14,
    size / 2,
    size / 2,
    size * 0.49
  );
  grad.addColorStop(0, 'rgba(12, 18, 20, 0.52)');
  grad.addColorStop(0.65, 'rgba(12, 18, 20, 0.22)');
  grad.addColorStop(1, 'rgba(12, 18, 20, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
