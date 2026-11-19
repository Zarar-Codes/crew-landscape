import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import {
  LightingPreset,
  buildLandscapeDiorama,
} from '../three/landscapeDiorama';
import { PavingFinish } from '../three/proceduralTextures';

type CameraPreset = 'overview' | 'firepit' | 'pergola' | 'plan';

interface CameraPresetConfig {
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: Record<CameraPreset, CameraPresetConfig> = {
  overview: {
    label: 'Overview',
    position: [12.4, 7.6, 13.4],
    target: [0, 0.85, 0],
  },
  firepit: {
    label: 'Fire Feature',
    position: [3.2, 2.7, 7.2],
    target: [-1.35, 0.95, 2.05],
  },
  pergola: {
    label: 'Pergola Lounge',
    position: [-8.6, 3.6, 5.4],
    target: [-2.1, 1.45, -1.0],
  },
  plan: {
    label: 'Plan View',
    position: [0.2, 16.8, 3.4],
    target: [0, 0.4, 0],
  },
};

const LIGHTING_CONFIG: Record<
  LightingPreset,
  {
    label: string;
    skyHex: number;
    fogDensity: number;
    sunColor: number;
    sunIntensity: number;
    sunPos: [number, number, number];
    hemiSky: number;
    hemiGround: number;
    hemiIntensity: number;
    fireIntensity: number;
    bollardEmissive: number;
    bollardLightIntensity: number;
    exposure: number;
  }
> = {
  morning: {
    label: 'Morning',
    skyHex: 0xdbe5e7,
    fogDensity: 0.014,
    sunColor: 0xfff5e4,
    sunIntensity: 2.35,
    sunPos: [14, 18, 11],
    hemiSky: 0xd4e6ed,
    hemiGround: 0x5c6458,
    hemiIntensity: 0.85,
    fireIntensity: 0.9,
    bollardEmissive: 0.25,
    bollardLightIntensity: 0.1,
    exposure: 1.08,
  },
  golden: {
    label: 'Golden Hour',
    skyHex: 0xc2b8ac,
    fogDensity: 0.017,
    sunColor: 0xffba75,
    sunIntensity: 2.6,
    sunPos: [-15, 7.2, 10],
    hemiSky: 0xd9c2ae,
    hemiGround: 0x3b4445,
    hemiIntensity: 0.72,
    fireIntensity: 2.6,
    bollardEmissive: 1.4,
    bollardLightIntensity: 0.65,
    exposure: 1.05,
  },
  twilight: {
    label: 'Twilight',
    skyHex: 0x16292d,
    fogDensity: 0.022,
    sunColor: 0x7aa4b8,
    sunIntensity: 0.85,
    sunPos: [-10, 12, -11],
    hemiSky: 0x264852,
    hemiGround: 0x12191b,
    hemiIntensity: 0.55,
    fireIntensity: 4.2,
    bollardEmissive: 2.8,
    bollardLightIntensity: 1.35,
    exposure: 1.12,
  },
};

// Reusable scratch vectors outside the render loop (zero per-frame GC)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export const LandscapeStudio3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [lighting, setLighting] = useState<LightingPreset>('golden');
  const [paving, setPaving] = useState<PavingFinish>('bluestone');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview');
  const [exploded, setExploded] = useState<number>(0);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);

  // Mutable ref bridge so React UI state never tears down WebGL
  const stateRef = useRef({
    lighting: 'golden' as LightingPreset,
    paving: 'bluestone' as PavingFinish,
    explodedTarget: 0,
    explodedCurrent: 0,
    cameraTransitionActive: false,
    targetCamPos: new THREE.Vector3(...CAMERA_PRESETS.overview.position),
    targetLookAt: new THREE.Vector3(...CAMERA_PRESETS.overview.target),
  });

  const apiRef = useRef<{
    applyLighting: (preset: LightingPreset) => void;
    applyPaving: (finish: PavingFinish) => void;
    triggerCameraPreset: (preset: CameraPreset) => void;
    resize: () => void;
  } | null>(null);

  // Keyboard shortcut 'H' to toggle HUD dock & 'Escape' to exit fullscreen
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (event.key === 'h' || event.key === 'H') {
        setDockCollapsed((prev) => !prev);
      } else if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when expanded fullscreen and trigger canvas resize
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    const id = window.requestAnimationFrame(() => apiRef.current?.resize());
    return () => {
      document.body.style.overflow = '';
      window.cancelAnimationFrame(id);
    };
  }, [isFullscreen]);

  // Initialize Three.js scene once in isolated ref container
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const initialW = container.clientWidth || 960;
    const initialH = container.clientHeight || 560;
    renderer.setSize(initialW, initialH);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initialLightCfg = LIGHTING_CONFIG[stateRef.current.lighting];
    scene.background = new THREE.Color(initialLightCfg.skyHex);
    scene.fog = new THREE.FogExp2(initialLightCfg.skyHex, initialLightCfg.fogDensity);

    // Mandatory studio environment map via RoomEnvironment on every device
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, initialW / initialH, 0.2, 160);
    camera.position.set(...CAMERA_PRESETS.overview.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.overview.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 5.0;
    controls.maxDistance = 26.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minPolarAngle = 0.14;
    controls.enablePan = true;
    controls.update();

    // Cancel camera preset glide as soon as user interacts manually
    const onControlStart = () => {
      stateRef.current.cameraTransitionActive = false;
    };
    controls.addEventListener('start', onControlStart);

    // 3-Point Architectural Daylight Rig
    const hemiLight = new THREE.HemisphereLight(
      initialLightCfg.hemiSky,
      initialLightCfg.hemiGround,
      initialLightCfg.hemiIntensity
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(
      initialLightCfg.sunColor,
      initialLightCfg.sunIntensity
    );
    keyLight.position.set(...initialLightCfg.sunPos);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 52;
    const d = 14;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8ec1c7, 0.42);
    rimLight.position.set(-12, 9, -14);
    scene.add(rimLight);

    // Build Composite Architectural Landscape Diorama
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const diorama = buildLandscapeDiorama(maxAnisotropy, isSoftwareGl);
    scene.add(diorama.root);

    const applyLighting = (preset: LightingPreset) => {
      stateRef.current.lighting = preset;
      const cfg = LIGHTING_CONFIG[preset];
      (scene.background as THREE.Color).setHex(cfg.skyHex);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(cfg.skyHex);
        scene.fog.density = cfg.fogDensity;
      }
      keyLight.color.setHex(cfg.sunColor);
      keyLight.intensity = cfg.sunIntensity;
      keyLight.position.set(...cfg.sunPos);
      hemiLight.color.setHex(cfg.hemiSky);
      hemiLight.groundColor.setHex(cfg.hemiGround);
      hemiLight.intensity = cfg.hemiIntensity;
      diorama.fireLight.intensity = cfg.fireIntensity;
      diorama.bollardEmissiveMaterial.emissiveIntensity = cfg.bollardEmissive;
      diorama.bollardLights.forEach((l) => {
        l.intensity = cfg.bollardLightIntensity;
      });
      renderer.toneMappingExposure = cfg.exposure;
    };

    const applyPaving = (finish: PavingFinish) => {
      stateRef.current.paving = finish;
      diorama.setPavingFinish(finish);
    };

    const triggerCameraPreset = (preset: CameraPreset) => {
      const cfg = CAMERA_PRESETS[preset];
      stateRef.current.targetCamPos.set(...cfg.position);
      stateRef.current.targetLookAt.set(...cfg.target);
      stateRef.current.cameraTransitionActive = true;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    apiRef.current = {
      applyLighting,
      applyPaving,
      triggerCameraPreset,
      resize: handleResize,
    };

    applyLighting(stateRef.current.lighting);
    applyPaving(stateRef.current.paving);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const onContextLost = (event: Event) => {
      event.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    // Paced animation loop (using afterDraw GPU sync fence when on software WebGL)
    let disposed = false;
    let frameId = 0;
    let timeoutId = 0;
    const clock = new THREE.Clock();

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 80);
        }
      };
      timeoutId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();

      // Update procedural water ripple uniform & subtle fire shimmer
      diorama.waterUniforms.uTime.value = elapsed;
      const baseFireIntensity = LIGHTING_CONFIG[stateRef.current.lighting].fireIntensity;
      diorama.fireLight.intensity =
        baseFireIntensity * (0.94 + Math.sin(elapsed * 6.8) * 0.06);

      diorama.flameGroup.children.forEach((child, idx) => {
        child.scale.y = 0.78 + Math.sin(elapsed * 7.5 + idx * 1.4) * 0.24;
      });

      // Smooth exponential damping for exploded architectural layer study
      stateRef.current.explodedCurrent = THREE.MathUtils.damp(
        stateRef.current.explodedCurrent,
        stateRef.current.explodedTarget,
        6.5,
        delta
      );
      const ex = stateRef.current.explodedCurrent;
      diorama.layers.base.position.y = 0;
      diorama.layers.terrace.position.y = ex * 0.85;
      diorama.layers.structures.position.y = ex * 1.85;
      diorama.layers.foliage.position.y = ex * 2.55;

      // Smooth damped camera preset transitions
      if (stateRef.current.cameraTransitionActive) {
        _targetCamPos.copy(stateRef.current.targetCamPos);
        _targetLookAt.copy(stateRef.current.targetLookAt);
        const factor = 1 - Math.exp(-5.5 * delta);
        camera.position.lerp(_targetCamPos, factor);
        controls.target.lerp(_targetLookAt, factor);

        if (
          camera.position.distanceToSquared(_targetCamPos) < 0.002 &&
          controls.target.distanceToSquared(_targetLookAt) < 0.002
        ) {
          camera.position.copy(_targetCamPos);
          controls.target.copy(_targetLookAt);
          stateRef.current.cameraTransitionActive = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      diorama.dispose();
      envTarget.dispose();
      renderer.dispose();
      apiRef.current = null;
    };
  }, []);

  const handleLightingChange = useCallback((preset: LightingPreset) => {
    setLighting(preset);
    apiRef.current?.applyLighting(preset);
  }, []);

  const handlePavingChange = useCallback((finish: PavingFinish) => {
    setPaving(finish);
    apiRef.current?.applyPaving(finish);
  }, []);

  const handleCameraChange = useCallback((preset: CameraPreset) => {
    setCameraPreset(preset);
    apiRef.current?.triggerCameraPreset(preset);
  }, []);

  const handleExplodedChange = useCallback((value: number) => {
    setExploded(value);
    stateRef.current.explodedTarget = value;
  }, []);

  const handleReset = useCallback(() => {
    setExploded(0);
    stateRef.current.explodedTarget = 0;
    setCameraPreset('overview');
    apiRef.current?.triggerCameraPreset('overview');
  }, []);

  if (webglUnavailable) {
    return (
      <div className="flex h-[420px] w-full flex-col items-center justify-center bg-[#151A1B] p-8 text-center text-white">
        <p className="font-display text-sm font-bold tracking-[0.2em] uppercase text-[#B6C0C2]">
          3D Architectural Study
        </p>
        <p className="mt-3 max-w-md font-sans text-sm text-[#EDF1F1]/80">
          Interactive WebGL rendering is unavailable on this browser. Contact Crew Landscapes to
          review 3D site design studies in person.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-[80] h-screen w-screen bg-[#151A1B]'
          : 'relative h-[520px] sm:h-[600px] lg:h-[660px] w-full overflow-hidden bg-[#151A1B] border border-[#202526]/12'
      }
    >
      {/* Isolated WebGL Canvas Mount — zero React children inside */}
      <div
        ref={mountRef}
        aria-label="Interactive 3D architectural outdoor living concept model — drag to orbit, scroll to zoom"
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Minimal Top-Left Context Label + Top-Right Fullscreen Button */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 z-10 flex items-start justify-between gap-4">
        <div
          className="pointer-events-auto px-3.5 py-2.5 text-white border border-white/15"
          style={{ backgroundColor: 'rgba(21, 26, 27, 0.88)' }}
        >
          <p className="font-display text-[11px] font-bold tracking-[0.18em] uppercase text-white">
            3D DESIGN-BUILD COURTYARD STUDY
          </p>
          <p className="mt-0.5 font-sans text-[11px] text-[#B6C0C2]">
            Drag to orbit · Scroll to zoom · Inspect construction layers
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFullscreen((prev) => !prev)}
          aria-label={isFullscreen ? 'Exit fullscreen 3D view' : 'Expand 3D view to fullscreen'}
          className="pointer-events-auto inline-flex items-center gap-2 border border-white/20 px-3.5 py-2.5 font-display text-[11px] font-bold tracking-[0.14em] uppercase text-white transition-colors hover:border-white hover:bg-[#005B63] cursor-pointer whitespace-nowrap"
          style={{ backgroundColor: 'rgba(21, 26, 27, 0.88)' }}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>EXIT FULLSCREEN</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>FULLSCREEN</span>
            </>
          )}
        </button>
      </div>

      {/* Unified Collapsible Bottom Control Dock (Solid/RGBA only — zero backdrop-filter over WebGL) */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex w-[94%] max-w-[920px] -translate-x-1/2 flex-col items-center">
        {/* Collapse / Expand Handle */}
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          aria-expanded={!dockCollapsed}
          className="pointer-events-auto inline-flex items-center gap-1.5 border border-b-0 border-white/20 px-3.5 py-1.5 font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#EDF1F1] transition-colors hover:text-white cursor-pointer whitespace-nowrap"
          style={{ backgroundColor: 'rgba(21, 26, 27, 0.92)' }}
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Hide Controls</span>
            </>
          )}
        </button>

        {/* Main Horizontal Control Dock */}
        {!dockCollapsed && (
          <div
            className="pointer-events-auto w-full border border-white/20 px-4 py-3 text-white shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
            style={{ backgroundColor: 'rgba(21, 26, 27, 0.94)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
              {/* Paving Finish Switcher */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#B6C0C2] whitespace-nowrap">
                  Paving
                </span>
                <div className="flex items-center gap-1">
                  {(
                    [
                      ['bluestone', 'Bluestone'],
                      ['brick', 'Brick'],
                      ['limestone', 'Limestone'],
                    ] as Array<[PavingFinish, string]>
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handlePavingChange(key)}
                      className={`px-2.5 py-1.5 font-sans text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        paving === key
                          ? 'bg-[#005B63] text-white'
                          : 'bg-white/10 text-[#EDF1F1]/80 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting Mood Switcher */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#B6C0C2] whitespace-nowrap">
                  Light
                </span>
                <div className="flex items-center gap-1">
                  {(['morning', 'golden', 'twilight'] as LightingPreset[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleLightingChange(key)}
                      className={`px-2.5 py-1.5 font-sans text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        lighting === key
                          ? 'bg-[#005B63] text-white'
                          : 'bg-white/10 text-[#EDF1F1]/80 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {LIGHTING_CONFIG[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Presets */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#B6C0C2] whitespace-nowrap">
                  View
                </span>
                <div className="flex items-center gap-1">
                  {(Object.keys(CAMERA_PRESETS) as CameraPreset[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleCameraChange(key)}
                      className={`px-2.5 py-1.5 font-sans text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        cameraPreset === key
                          ? 'bg-[#005B63] text-white'
                          : 'bg-white/10 text-[#EDF1F1]/80 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {CAMERA_PRESETS[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Architectural Layer Separation Slider & Reset */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#B6C0C2] whitespace-nowrap">
                    Layers
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={exploded}
                    onChange={(e) => handleExplodedChange(Number(e.target.value))}
                    aria-label="Separate architectural construction layers"
                    className="h-1 w-20 accent-[#08717A] cursor-pointer"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset 3D camera and layers"
                  title="Reset view"
                  className="inline-flex h-7 w-7 items-center justify-center bg-white/10 text-[#EDF1F1] transition-colors hover:bg-[#005B63] hover:text-white cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
