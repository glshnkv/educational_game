// ============================================================
// GAME.JS — Three.js изометрическая сцена офиса Шмякдекс
// ============================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { UIManager, NPC_DIALOGS } from './ui.js';
import { TASKS } from './tasks.js';
import { OnboardingManager } from './onboarding.js';

// Expose TASKS for onboarding navigation
window.__shmyakdex_tasks = { TASKS };

// ── Setup ────────────────────────────────────────────────────
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a1f14);
scene.fog = new THREE.Fog(0x2a1f14, 35, 65);

// ── Isometric Camera ─────────────────────────────────────────
const aspect = window.innerWidth / window.innerHeight;
const frustum = 14;
const camera = new THREE.OrthographicCamera(
  -frustum * aspect, frustum * aspect,
  frustum, -frustum,
  0.1, 200
);
// Classic isometric angle
camera.position.set(20, 20, 20);
camera.lookAt(0, 0, 0);

// ── UI ───────────────────────────────────────────────────────
const ui = new UIManager();

// ── Controls hint ────────────────────────────────────────────
const hint = document.createElement('div');
hint.id = 'controls-hint';
hint.innerHTML = 'WASD / ←↑↓→ — движение<br>E — взаимодействие';
document.body.appendChild(hint);

// ── Lighting ─────────────────────────────────────────────────
// Warm ambient — уютный офис
const ambient = new THREE.AmbientLight(0xfff0d0, 0.7);
scene.add(ambient);

// Main directional — тёплый верхний свет
const dirLight = new THREE.DirectionalLight(0xffe8b0, 1.4);
dirLight.position.set(12, 22, 18);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 80;
dirLight.shadow.camera.left = -28;
dirLight.shadow.camera.right = 28;
dirLight.shadow.camera.top = 28;
dirLight.shadow.camera.bottom = -28;
scene.add(dirLight);

// No ceiling spotlights — open scene

// Warm fill from window side
const fillLight = new THREE.DirectionalLight(0xffd090, 0.5);
fillLight.position.set(-15, 8, -5);
scene.add(fillLight);

// Subtle cool bounce from floor
const bounceLight = new THREE.DirectionalLight(0xffe8c8, 0.25);
bounceLight.position.set(0, -5, 0);
scene.add(bounceLight);

// ── Materials ─────────────────────────────────────────────────
const MAT = {
  // Floor — тёплая деревянная доска (два оттенка)
  floor:    new THREE.MeshStandardMaterial({ color: 0xb5845a, roughness: 0.75, metalness: 0.0 }),
  floorAlt: new THREE.MeshStandardMaterial({ color: 0xa07248, roughness: 0.75, metalness: 0.0 }),

  // Walls — тёплый бежево-кремовый
  wallSolid:       new THREE.MeshStandardMaterial({ color: 0xf2e8d5, roughness: 0.9 }),
  wallTransparent: new THREE.MeshStandardMaterial({ color: 0xe8d8b8, transparent: true, opacity: 0.22, roughness: 0.5, side: THREE.DoubleSide }),
  wallGlass:       new THREE.MeshStandardMaterial({ color: 0xaad4f0, transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0.1 }),
  wallFrame:       new THREE.MeshStandardMaterial({ color: 0x7a5c3a, metalness: 0.2, roughness: 0.6 }),

  // Ceiling — светлый кремовый
  ceiling: new THREE.MeshStandardMaterial({ color: 0xfaf3e8, roughness: 1.0 }),

  // Desks — дерево
  deskLight: new THREE.MeshStandardMaterial({ color: 0xd4a96a, roughness: 0.5 }),
  deskMid:   new THREE.MeshStandardMaterial({ color: 0xb8864a, roughness: 0.45 }),
  deskDark:  new THREE.MeshStandardMaterial({ color: 0x7a4e28, roughness: 0.4 }),
  deskLeg:   new THREE.MeshStandardMaterial({ color: 0x8a7060, metalness: 0.3, roughness: 0.5 }),

  // Chairs — тёмно-синий/серый
  chairDark:  new THREE.MeshStandardMaterial({ color: 0x2e3a4e, roughness: 0.8 }),
  chairMid:   new THREE.MeshStandardMaterial({ color: 0x3d4f68, roughness: 0.75 }),

  // Monitor
  monitor: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3, metalness: 0.6 }),
  screen:  new THREE.MeshStandardMaterial({ color: 0x1a3a6a, emissive: new THREE.Color(0x0a2040), emissiveIntensity: 0.8 }),
  screenGlow: new THREE.MeshStandardMaterial({ color: 0x4a8aff, emissive: new THREE.Color(0x2a5adf), emissiveIntensity: 1.2 }),

  // Books — яркие корешки
  bookRed:    new THREE.MeshStandardMaterial({ color: 0xd94f3a }),
  bookOrange: new THREE.MeshStandardMaterial({ color: 0xe8843a }),
  bookYellow: new THREE.MeshStandardMaterial({ color: 0xe8c43a }),
  bookGreen:  new THREE.MeshStandardMaterial({ color: 0x4aaa5a }),
  bookBlue:   new THREE.MeshStandardMaterial({ color: 0x3a7ac8 }),

  // Mug
  mugWhite:  new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: 0.4 }),
  mugRed:    new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.4 }),

  // Plants
  plantDark:  new THREE.MeshStandardMaterial({ color: 0x2d6e3a }),
  plantLight: new THREE.MeshStandardMaterial({ color: 0x4aaa5a }),
  pot:        new THREE.MeshStandardMaterial({ color: 0xc87840, roughness: 0.6 }),
  potDark:    new THREE.MeshStandardMaterial({ color: 0x8a4820, roughness: 0.7 }),

  // Decor
  pictureFrame: new THREE.MeshStandardMaterial({ color: 0x7a5c3a, metalness: 0.2 }),
  pictureA:     new THREE.MeshStandardMaterial({ color: 0x4a7aaa }),
  pictureB:     new THREE.MeshStandardMaterial({ color: 0xd4884a }),
  pictureC:     new THREE.MeshStandardMaterial({ color: 0x5aaa6a }),
  acUnit:       new THREE.MeshStandardMaterial({ color: 0xe8e0d0, roughness: 0.7 }),
  acVent:       new THREE.MeshStandardMaterial({ color: 0xc8baa8, roughness: 0.8 }),
  carpet:       new THREE.MeshStandardMaterial({ color: 0x8a6a4a, roughness: 0.95 }),
  skirting:     new THREE.MeshStandardMaterial({ color: 0xd4c4a8, roughness: 0.8 }),

  // Characters — мультяшные тёплые тона
  npcBody: [
    new THREE.MeshStandardMaterial({ color: 0x2c3e5a, roughness: 0.8 }), // boss — тёмно-синий костюм
    new THREE.MeshStandardMaterial({ color: 0xd4884a, roughness: 0.7 }), // Masha — оранжевая кофта
    new THREE.MeshStandardMaterial({ color: 0x4a7a5a, roughness: 0.7 }), // Sasha — зелёная
  ],
  npcLegs: [
    new THREE.MeshStandardMaterial({ color: 0x1a2030, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x3a3040, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x2a3028, roughness: 0.8 }),
  ],
  npcHead:   new THREE.MeshStandardMaterial({ color: 0xf0c090, roughness: 0.6 }),
  npcHair: [
    new THREE.MeshStandardMaterial({ color: 0x1a0a00, roughness: 0.9 }), // boss — лысый/тёмный
    new THREE.MeshStandardMaterial({ color: 0xd4884a, roughness: 0.8 }), // Masha — рыжая
    new THREE.MeshStandardMaterial({ color: 0x3a2010, roughness: 0.8 }), // Sasha — тёмный
  ],

  // Player — красная толстовка как в референсе
  playerBody: new THREE.MeshStandardMaterial({ color: 0xcc3322, roughness: 0.7 }),
  playerLegs: new THREE.MeshStandardMaterial({ color: 0x1a1a2a, roughness: 0.8 }),
  playerHead: new THREE.MeshStandardMaterial({ color: 0xf0c090, roughness: 0.6 }),
  playerHair: new THREE.MeshStandardMaterial({ color: 0x3a2010, roughness: 0.8 }),
  headphones: new THREE.MeshStandardMaterial({ color: 0x1a2a4a, roughness: 0.5, metalness: 0.3 }),
};

function box(w, h, d, mat, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.rotation.set(rx, ry, rz);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// ── Room ──────────────────────────────────────────────────────
const ROOM_W = 22, ROOM_D = 14, ROOM_H = 7;

// Wooden plank floor — тёплые доски
for (let ix = 0; ix < ROOM_W; ix++) {
  for (let iz = 0; iz < ROOM_D; iz++) {
    const isAlt = (ix + iz) % 2 === 0;
    const tile = box(1, 0.1, 1, isAlt ? MAT.floor : MAT.floorAlt);
    tile.position.set(-ROOM_W / 2 + ix + 0.5, 0, -ROOM_D / 2 + iz + 0.5);
    tile.receiveShadow = true;
    scene.add(tile);
  }
}

// Carpet runner in center aisle
const carpetGeo = new THREE.BoxGeometry(4, 0.06, ROOM_D - 1);
const carpetMesh = new THREE.Mesh(carpetGeo, MAT.carpet);
carpetMesh.position.set(0, 0.06, 0);
carpetMesh.receiveShadow = true;
scene.add(carpetMesh);

// No ceiling, no walls — open isometric view

// No skirting boards without walls

// ── Decorations ───────────────────────────────────────────────
// No wall-mounted AC without walls

// No ceiling beam without ceiling

// No wall pictures without walls

// ── West wall — empty ─────────────────────────────────────────
(function buildWestWall() {
  const wallX = -ROOM_W / 2;
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf0e6d0, roughness: 0.9 });
  const wall = box(0.22, ROOM_H, ROOM_D, wallMat);
  wall.position.set(wallX, ROOM_H / 2, 0);
  wall.receiveShadow = true;
  scene.add(wall);
})();

// ── North wall with dashboards & sticky notes ─────────────────
(function buildNorthWall() {
  const wallZ = -ROOM_D / 2;
  const wallY = ROOM_H / 2;

  // Wall panel itself — тёплый бежевый
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf0e6d0, roughness: 0.9 });
  const wall = box(ROOM_W, ROOM_H, 0.22, wallMat);
  wall.position.set(0, wallY, wallZ);
  wall.receiveShadow = true;
  scene.add(wall);

  // ── Whiteboard / Dashboard helper ──
  function addBoard(x, y, w, h, bgColor, titleColor) {
    const g = new THREE.Group();
    // Frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x7a5c3a, roughness: 0.5 });
    const frame = box(w + 0.14, h + 0.14, 0.06, frameMat);
    frame.position.set(0, 0, 0.01);
    g.add(frame);
    // Board surface
    const boardMat = new THREE.MeshStandardMaterial({ color: bgColor, roughness: 0.7 });
    const board = box(w, h, 0.05, boardMat);
    board.position.set(0, 0, 0.04);
    g.add(board);
    // Horizontal lines (data rows)
    const lineMat = new THREE.MeshStandardMaterial({ color: titleColor, roughness: 0.8, transparent: true, opacity: 0.35 });
    for (let i = 0; i < 4; i++) {
      const line = box(w * 0.82, 0.04, 0.02, lineMat);
      line.position.set(0, h / 2 - 0.22 - i * (h * 0.18), 0.07);
      g.add(line);
    }
    // Title bar at top
    const titleMat = new THREE.MeshStandardMaterial({ color: titleColor, roughness: 0.6 });
    const titleBar = box(w, 0.18, 0.03, titleMat);
    titleBar.position.set(0, h / 2 - 0.1, 0.06);
    g.add(titleBar);
    // Bar chart columns
    const barColors = [0xe05a3a, 0x4aaa5a, 0x4a8aff, 0xffcc44];
    barColors.forEach((c, i) => {
      const bh = 0.1 + Math.random() * 0.3;
      const barMat = new THREE.MeshStandardMaterial({ color: c });
      const bar = box(0.08, bh, 0.03, barMat);
      bar.position.set(-0.2 + i * 0.14, -h / 2 + 0.1 + bh / 2, 0.07);
      g.add(bar);
    });
    g.position.set(x, y, wallZ + 0.14);
    scene.add(g);
    return g;
  }

  // Dashboard 1 — Kanban board (teal)
  addBoard(-7.5, 3.2, 3.2, 2.4, 0xd8ede8, 0x2a8a7a);
  // Dashboard 2 — Sprint board (warm blue)
  addBoard(-3.5, 3.2, 3.0, 2.4, 0xd8e4f0, 0x2a5a9a);
  // Dashboard 3 — Metrics (warm orange)
  addBoard(0.5, 3.2, 2.8, 2.4, 0xf0e8d8, 0xb86a2a);
  // Dashboard 4 — small (green)
  addBoard(4.0, 3.4, 2.0, 2.0, 0xe8f0d8, 0x4a8a2a);

  // ── Sticky notes helper ──
  const STICKY_COLORS = [0xffee58, 0xff8a65, 0x81d4fa, 0xa5d6a7, 0xce93d8, 0xffcc80];
  function addSticky(x, y, rot, colorIdx) {
    const mat = new THREE.MeshStandardMaterial({ color: STICKY_COLORS[colorIdx % STICKY_COLORS.length], roughness: 0.85 });
    const s = box(0.32, 0.32, 0.03, mat);
    s.position.set(x, y, wallZ + 0.14);
    s.rotation.z = rot;
    scene.add(s);
    // Line on sticky
    const lineMat = new THREE.MeshStandardMaterial({ color: 0x00000, transparent: true, opacity: 0.18 });
    for (let i = 0; i < 3; i++) {
      const l = box(0.22, 0.025, 0.01, lineMat);
      l.position.set(x, y - 0.06 + i * 0.07, wallZ + 0.16);
      l.rotation.z = rot;
      scene.add(l);
    }
  }

  // Scatter stickies around the boards
  const stickies = [
    [-6.2, 2.0, 0.08, 0], [-5.5, 1.7, -0.12, 1], [-6.8, 1.8, 0.05, 2],
    [-2.8, 2.1, -0.07, 3], [-3.6, 1.75, 0.1, 4], [-2.2, 1.9, -0.05, 5],
    [1.2, 2.0, 0.09, 0],  [0.4, 1.8, -0.08, 2],  [1.8, 1.75, 0.06, 1],
    [4.8, 2.2, -0.1, 3],  [5.4, 1.9, 0.07, 4],   [3.5, 2.0, -0.06, 5],
    [-7.0, 4.2, 0.1, 1],  [-4.5, 4.3, -0.09, 0], [2.2, 4.2, 0.08, 3],
    [5.8, 3.8, -0.07, 2], [6.5, 4.0, 0.11, 4],   [-1.0, 4.3, -0.05, 5],
  ];
  stickies.forEach(([x, y, rot, ci]) => addSticky(x, y, rot, ci));

  // ── Pin dots on stickies ──
  stickies.forEach(([x, y]) => {
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 6, 5),
      new THREE.MeshStandardMaterial({ color: 0xcc3322, metalness: 0.4 })
    );
    pin.position.set(x, y + 0.12, wallZ + 0.18);
    scene.add(pin);
  });
})();

// Potted plants — warm terracotta pots
function addPlant(x, z, scale = 1) {
  const g = new THREE.Group();
  // Pot
  const potMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * scale, 0.16 * scale, 0.55 * scale, 10), MAT.pot);
  potMesh.position.set(0, 0.28 * scale, 0);
  potMesh.castShadow = true;
  g.add(potMesh);
  // Soil
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * scale, 0.2 * scale, 0.06, 10), MAT.potDark);
  soil.position.set(0, 0.54 * scale, 0);
  g.add(soil);
  // Leaves — rounded blobs
  const leafCount = Math.floor(5 + scale * 2);
  for (let i = 0; i < leafCount; i++) {
    const angle = (i / leafCount) * Math.PI * 2;
    const r = (0.18 + Math.random() * 0.12) * scale;
    const leafMat = i % 2 === 0 ? MAT.plantDark : MAT.plantLight;
    const leafGeo = new THREE.SphereGeometry(0.14 * scale + Math.random() * 0.06 * scale, 7, 6);
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.position.set(Math.cos(angle) * r, (0.7 + Math.random() * 0.4) * scale, Math.sin(angle) * r);
    leaf.castShadow = true;
    g.add(leaf);
  }
  // Top center leaf cluster
  const topLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.18 * scale, 7, 6), MAT.plantLight);
  topLeaf.position.set(0, 1.1 * scale, 0);
  g.add(topLeaf);

  g.position.set(x, 0, z);
  scene.add(g);
  return g;
}

addPlant(ROOM_W / 2 - 1.2, ROOM_D / 2 - 1.5, 1.2);
addPlant(-ROOM_W / 2 + 1.0, ROOM_D / 2 - 1.2, 0.9);
addPlant(ROOM_W / 2 - 1.0, -ROOM_D / 2 + 1.2, 1.0);

// Water cooler (back corner)
function addWaterCooler(x, z) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 1.1, 10),
    new THREE.MeshStandardMaterial({ color: 0xe8e0d0, roughness: 0.5 }));
  body.position.set(0, 0.55, 0);
  body.castShadow = true;
  g.add(body);
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.55, 10),
    new THREE.MeshStandardMaterial({ color: 0x88c8f0, transparent: true, opacity: 0.7, roughness: 0.1 }));
  bottle.position.set(0, 1.38, 0);
  g.add(bottle);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 10),
    new THREE.MeshStandardMaterial({ color: 0x4488cc }));
  cap.position.set(0, 1.12, 0);
  g.add(cap);
  g.position.set(x, 0, z);
  scene.add(g);
}
addWaterCooler(-ROOM_W / 2 + 1.5, -ROOM_D / 2 + 1.0);

// ── Furniture helpers ─────────────────────────────────────────
function addDesk(x, z, dark = false, rotY = 0) {
  const g = new THREE.Group();
  const topMat = dark ? MAT.deskDark : MAT.deskLight;
  const sideMat = dark ? MAT.deskMid : MAT.deskMid;

  // Desktop surface
  const top = box(2.5, 0.1, 1.3, topMat);
  top.position.set(0, 0.78, 0);
  g.add(top);

  // Front edge strip (darker wood)
  const edge = box(2.5, 0.06, 0.06, sideMat);
  edge.position.set(0, 0.72, 0.62);
  g.add(edge);

  // Side panels (solid desk body)
  [-1.1, 1.1].forEach(lx => {
    const panel = box(0.08, 0.72, 1.2, sideMat);
    panel.position.set(lx, 0.36, 0);
    g.add(panel);
  });
  // Back panel
  const backPanel = box(2.34, 0.72, 0.08, sideMat);
  backPanel.position.set(0, 0.36, -0.56);
  g.add(backPanel);
  // Bottom shelf
  const shelf = box(2.34, 0.06, 1.1, topMat);
  shelf.position.set(0, 0.08, 0);
  g.add(shelf);

  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.castShadow = true;
  scene.add(g);
  return g;
}

function addChair(x, z, rotY = 0) {
  const g = new THREE.Group();
  const mat = MAT.chairDark;

  // Seat cushion — rounded
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.12, 0.72), mat);
  seat.position.set(0, 0.52, 0);
  g.add(seat);

  // Backrest
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.75, 0.1), MAT.chairMid);
  back.position.set(0, 0.98, -0.31);
  g.add(back);

  // Headrest
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.08), mat);
  head.position.set(0, 1.42, -0.3);
  g.add(head);

  // Armrests
  [-0.38, 0.38].forEach(ax => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.5), MAT.deskLeg);
    arm.position.set(ax, 0.72, -0.1);
    g.add(arm);
  });

  // Central column
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), MAT.deskLeg);
  col.position.set(0, 0.25, 0);
  g.add(col);

  // Star base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 5), MAT.deskLeg);
  base.position.set(0, 0.03, 0);
  g.add(base);

  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  scene.add(g);
  return g;
}

function addMonitor(x, y, z, rotY = 0) {
  const g = new THREE.Group();

  // Screen bezel
  const bezel = box(1.05, 0.72, 0.06, MAT.monitor);
  bezel.position.set(0, 0, 0.01);
  g.add(bezel);

  // Screen glow
  const screen = box(0.92, 0.6, 0.04, MAT.screen);
  screen.position.set(0, 0.02, 0.02);
  g.add(screen);

  // Stand neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8), MAT.monitor);
  neck.position.set(0, -0.48, 0);
  g.add(neck);

  // Stand base
  const standBase = box(0.38, 0.05, 0.24, MAT.monitor);
  standBase.position.set(0, -0.62, 0.04);
  g.add(standBase);

  g.position.set(x, y, z);
  g.rotation.y = rotY;
  scene.add(g);
  return g;
}

const BOOK_MATS = [MAT.bookRed, MAT.bookOrange, MAT.bookYellow, MAT.bookGreen, MAT.bookBlue];

function addBooks(x, y, z) {
  let ox = 0;
  BOOK_MATS.forEach((mat) => {
    const h = 0.26 + Math.random() * 0.12;
    const b = box(0.07, h, 0.2, mat);
    b.position.set(x + ox, y + h / 2, z);
    scene.add(b);
    ox += 0.09;
  });
}

function addMug(x, y, z, matOverride) {
  const mat = matOverride || (Math.random() > 0.5 ? MAT.mugWhite : MAT.mugRed);
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.13, 10), mat);
  mug.position.set(x, y + 0.065, z);
  mug.castShadow = true;
  scene.add(mug);
  // Handle
  const handleGeo = new THREE.TorusGeometry(0.045, 0.012, 6, 10, Math.PI);
  const handle = new THREE.Mesh(handleGeo, mat);
  handle.position.set(x + 0.08, y + 0.065, z);
  handle.rotation.y = Math.PI / 2;
  scene.add(handle);
}

// Cardboard box (storage)
function addBox(x, z) {
  const b = box(0.5, 0.45, 0.4, new THREE.MeshStandardMaterial({ color: 0xd4a855, roughness: 0.9 }));
  b.position.set(x, 0.225, z);
  b.castShadow = true;
  scene.add(b);
}
addBox(ROOM_W / 2 - 1.5, -ROOM_D / 2 + 1.0);
addBox(ROOM_W / 2 - 2.2, -ROOM_D / 2 + 1.0);
addBox(ROOM_W / 2 - 1.5, -ROOM_D / 2 + 1.6);

// ── Office Layout ─────────────────────────────────────────────
// Boss desk (back-right, dark wood L-shape)
addDesk(5, -4, true, 0);
addDesk(6.8, -3.2, true, Math.PI / 2);
addChair(5, -3, Math.PI);
addMonitor(5, 1.12, -4.3);
addBooks(4.2, 0.84, -4.3);
addMug(5.8, 0.84, -3.8, MAT.mugWhite);

// Row 1 (back)
addDesk(-5, -3.5, false, 0);
addChair(-5, -2.5, Math.PI);
addMonitor(-5, 1.12, -3.8);
addBooks(-5.6, 0.84, -3.8);
addMug(-4.4, 0.84, -3.5);

addDesk(-1, -3.5, false, 0);
addChair(-1, -2.5, Math.PI);
addMonitor(-1, 1.12, -3.8);
addBooks(-1.6, 0.84, -3.8);
addMug(-0.4, 0.84, -3.5);

addDesk(2.5, -3.5, false, 0);
addChair(2.5, -2.5, Math.PI);
addMonitor(2.5, 1.12, -3.8);
addBooks(1.9, 0.84, -3.8);
addMug(3.1, 0.84, -3.5);

// Row 2 (middle)
addDesk(-5, 0.5, false, 0);
addChair(-5, 1.5, Math.PI);
addMonitor(-5, 1.12, 0.2);
addBooks(-5.6, 0.84, 0.2);
addMug(-4.4, 0.84, 0.5);

addDesk(-1, 0.5, false, 0);
addChair(-1, 1.5, Math.PI);
addMonitor(-1, 1.12, 0.2);
addBooks(-1.6, 0.84, 0.2);
addMug(-0.4, 0.84, 0.5);

// Dima's desk — highlighted with warm glow
addDesk(2.5, 0.5, false, 0);
addChair(2.5, 1.5, Math.PI);
addMonitor(2.5, 1.12, 0.2);
addBooks(1.9, 0.84, 0.2);
addMug(3.1, 0.84, 0.5, MAT.mugRed);

// Dima's desk warm glow on floor
const glowGeo = new THREE.PlaneGeometry(2.8, 1.6);
const glowMat = new THREE.MeshBasicMaterial({ color: 0xffcc44, transparent: true, opacity: 0.1 });
const glow = new THREE.Mesh(glowGeo, glowMat);
glow.rotation.x = -Math.PI / 2;
glow.position.set(2.5, 0.06, 0.5);
scene.add(glow);

// ── NPC Characters ────────────────────────────────────────────
function createCharacter(bodyMat, legMat, headMat, hairMat, x, z, rotY = 0, label = '', isPlayer = false, hasHeadphones = false) {
  const g = new THREE.Group();

  // Legs
  [-0.13, 0.13].forEach(lx => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 0.22), legMat);
    leg.position.set(lx, 0.52, 0);
    leg.castShadow = true;
    g.add(leg);
    // Shoe
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x1a1010, roughness: 0.8 }));
    shoe.position.set(lx, 0.22, 0.04);
    g.add(shoe);
  });

  // Body / torso
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.68, 0.34), bodyMat);
  body.position.set(0, 1.18, 0);
  body.castShadow = true;
  g.add(body);

  // Arms
  [-0.36, 0.36].forEach(ax => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.52, 0.2), bodyMat);
    arm.position.set(ax, 1.1, 0);
    arm.castShadow = true;
    g.add(arm);
    // Hand
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 7, 6), headMat);
    hand.position.set(ax, 0.8, 0);
    g.add(hand);
  });

  // Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.14, 8), headMat);
  neck.position.set(0, 1.6, 0);
  g.add(neck);

  // Head — rounded box
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.38), headMat);
  head.position.set(0, 1.88, 0);
  head.castShadow = true;
  g.add(head);

  // Hair
  if (hairMat) {
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.4), hairMat);
    hair.position.set(0, 2.06, -0.02);
    g.add(hair);
    // Side hair
    [-0.22, 0.22].forEach(hx => {
      const sideHair = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.36), hairMat);
      sideHair.position.set(hx, 1.9, -0.01);
      g.add(sideHair);
    });
  }

  // Eyes (simple dots)
  [-0.1, 0.1].forEach(ex => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5),
      new THREE.MeshStandardMaterial({ color: 0x1a1010 }));
    eye.position.set(ex, 1.9, 0.19);
    g.add(eye);
  });

  // Headphones for player
  if (hasHeadphones) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 6, 16, Math.PI),
      MAT.headphones);
    band.position.set(0, 2.1, 0);
    band.rotation.z = Math.PI;
    g.add(band);
    [-0.24, 0.24].forEach(hx => {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 10),
        MAT.headphones);
      cup.position.set(hx, 1.88, 0);
      cup.rotation.z = Math.PI / 2;
      g.add(cup);
    });
  }

  // Name label sprite
  if (label) {
    const c2 = document.createElement('canvas');
    c2.width = 320; c2.height = 72;
    const ctx = c2.getContext('2d');
    ctx.fillStyle = 'rgba(20,12,5,0.82)';
    ctx.roundRect(4, 4, 312, 64, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,150,60,0.7)';
    ctx.lineWidth = 2;
    ctx.roundRect(4, 4, 312, 64, 14);
    ctx.stroke();
    ctx.fillStyle = '#ffe8a0';
    ctx.font = 'bold 24px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(label, 160, 44);
    const tex = new THREE.CanvasTexture(c2);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(2.0, 0.5, 1);
    sprite.position.set(0, 2.55, 0);
    g.add(sprite);
  }

  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.castShadow = true;
  scene.add(g);
  return g;
}

// Boss — dark suit
const bossNPC = createCharacter(MAT.npcBody[0], MAT.npcLegs[0], MAT.npcHead, MAT.npcHair[0], 5, -2.2, Math.PI, 'Артём (Тимлид)');
// Colleague 1 (Masha) — orange top
const col1NPC = createCharacter(MAT.npcBody[1], MAT.npcLegs[1], MAT.npcHead, MAT.npcHair[1], -5, -1.5, Math.PI * 0.8, 'Маша');
// Colleague 2 (Sasha) — green
const col2NPC = createCharacter(MAT.npcBody[2], MAT.npcLegs[2], MAT.npcHead, MAT.npcHair[2], -1, -1.5, Math.PI * 1.1, 'Саша');

// Player (Dima) — red hoodie + headphones
const playerMesh = createCharacter(MAT.playerBody, MAT.playerLegs, MAT.playerHead, MAT.playerHair, 2.5, 2.5, Math.PI, '', false, true);
const player = { mesh: playerMesh, x: 2.5, z: 2.5, speed: 4 };

// ── Interaction zones ─────────────────────────────────────────
const INTERACT_ZONES = [
  {
    id: 'colleague1',
    x: -5, z: -0.5,
    radius: 2.2,
    npcId: 'colleague1',
    label: 'Получить подсказку от Маши',
    taskId: 'css-button',
  },
  {
    id: 'colleague2',
    x: -1, z: -0.5,
    radius: 2.2,
    npcId: 'colleague2',
    label: 'Получить подсказку от Саши',
    taskId: 'js-counter',
  },
  {
    id: 'dima-desk',
    x: 2.5, z: 1.5,
    radius: 3.5,
    npcId: null,
    label: 'Открыть компьютер',
    taskId: null,
  },
];

// Zone indicators (glowing circles on floor)
INTERACT_ZONES.forEach(zone => {
  const geo = new THREE.RingGeometry(0.5, 0.68, 28);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffcc44, transparent: true, opacity: 0.55, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(geo, mat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(zone.x, 0.07, zone.z);
  scene.add(ring);
  zone.ring = ring;
});

// ── Input ─────────────────────────────────────────────────────
const keys = {};
window.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'KeyE' && !window.__onboarding_active) tryInteract();
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

// ── Camera follow ─────────────────────────────────────────────
const CAM_OFFSET = new THREE.Vector3(20, 20, 20);

// ── Interaction logic ─────────────────────────────────────────

function getNearZone() {
  let best = null;
  let minDist = Infinity;
  INTERACT_ZONES.forEach(zone => {
    const dx = player.x - zone.x;
    const dz = player.z - zone.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < zone.radius && dist < minDist) {
      minDist = dist;
      best = zone;
    }
  });
  return best;
}

function tryInteract() {
  if (ui.isAnyUIOpen()) return;

  const zone = getNearZone();
  if (!zone) return;

  if (zone.id === 'dima-desk') {
    // Reopen last task the player had open; if none or all done, pick next undone
    const lastTask = ui.getLastOpenedTask();
    const nextUndone = TASKS.find(t => !ui.isTaskDone(t.id));
    const task = (lastTask && !ui.isTaskDone(lastTask.id)) ? lastTask : nextUndone;
    if (task) {
      ui._openComputer(task);
    } else {
      ui.showDialog('boss', ['Все задания выполнены! Ты настоящий джун Шмякдекса! 🎉']);
    }
    return;
  }

  // Colleagues give hints for the active task
  if (zone.id === 'colleague1' || zone.id === 'colleague2') {
    ui.showColleagueTip(zone.npcId);
    return;
  }
}

// ── Game loop ─────────────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();

  // Player movement (only when UI closed)
  if (!ui.isAnyUIOpen() && !(window.__onboarding_active)) {
    let dx = 0, dz = 0;
    // Isometric WASD mapping
    if (keys['KeyW'] || keys['ArrowUp'])    { dx -= 1; dz -= 1; }
    if (keys['KeyS'] || keys['ArrowDown'])  { dx += 1; dz += 1; }
    if (keys['KeyA'] || keys['ArrowLeft'])  { dx -= 1; dz += 1; }
    if (keys['KeyD'] || keys['ArrowRight']) { dx += 1; dz -= 1; }

    if (dx !== 0 || dz !== 0) {
      const len = Math.sqrt(dx * dx + dz * dz);
      dx /= len; dz /= len;
      const nx = player.x + dx * player.speed * dt;
      const nz = player.z + dz * player.speed * dt;
      // Bounds
      const hw = ROOM_W / 2 - 0.6, hd = ROOM_D / 2 - 0.6;
      player.x = Math.max(-hw, Math.min(hw, nx));
      player.z = Math.max(-hd, Math.min(hd, nz));
      player.mesh.position.set(player.x, 0, player.z);
      // Face direction
      player.mesh.rotation.y = Math.atan2(dx, dz);
    }
  }

  // Camera follow player — maintain fixed isometric angle
  const target = new THREE.Vector3(player.x, 0, player.z);
  const camTarget = target.clone().add(CAM_OFFSET);
  camera.position.lerp(camTarget, 0.08);
  // Always look at the point directly "below" the camera in isometric space
  camera.lookAt(camera.position.clone().sub(CAM_OFFSET));

  // Check interaction zones
  const nearZone = getNearZone();
  INTERACT_ZONES.forEach(zone => {
    // Warm gold pulse
    if (zone.ring) {
      zone.ring.material.opacity = 0.35 + 0.3 * Math.sin(Date.now() * 0.0035);
    }
  });

  ui.showInteractPrompt(!!nearZone && !ui.isAnyUIOpen() && !window.__onboarding_active);
  if (nearZone) {
    ui.setHint(nearZone.label);
  } else {
    ui.setHint('');
  }

  // Animate NPC idle bob
  const t = Date.now() * 0.001;
  [bossNPC, col1NPC, col2NPC].forEach((npc, i) => {
    npc.position.y = Math.sin(t * 0.8 + i * 1.2) * 0.04;
  });

  renderer.render(scene, camera);
}

// ── Resize ────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  const a = window.innerWidth / window.innerHeight;
  camera.left = -frustum * a;
  camera.right = frustum * a;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// ── Player name ───────────────────────────────────────────────
const PLAYER_NAME_KEY = 'shmyakdex_player_name';

function getPlayerName() {
  return localStorage.getItem(PLAYER_NAME_KEY) || 'Игрок';
}

function applyPlayerName(name) {
  // HUD
  const hudName = document.getElementById('hud-player-name');
  if (hudName) hudName.textContent = name;
  // Computer home greeting
  const homeTitle = document.getElementById('home-title');
  if (homeTitle) homeTitle.textContent = `Добро пожаловать, ${name}!`;
}

function showNameScreen(onDone) {
  const screen = document.getElementById('name-screen');
  const input  = document.getElementById('name-input');
  const submit = document.getElementById('name-submit');
  const error  = document.getElementById('name-error');

  if (!screen) { onDone(); return; }

  input.focus();

  function confirm() {
    const name = input.value.trim();
    if (!name) {
      error.classList.remove('hidden');
      input.classList.add('input-error');
      input.focus();
      return;
    }
    error.classList.add('hidden');
    input.classList.remove('input-error');
    localStorage.setItem(PLAYER_NAME_KEY, name);
    screen.style.opacity = '0';
    screen.style.transition = 'opacity 0.3s';
    setTimeout(() => { screen.remove(); onDone(name); }, 300);
  }

  submit.addEventListener('click', confirm);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirm(); });
  input.addEventListener('input', () => {
    error.classList.add('hidden');
    input.classList.remove('input-error');
  });
}

// ── Onboarding — запускаем после старта игры ──────────────────
const onboarding = new OnboardingManager(ui);

if (onboarding.isCompleted()) {
  // Повторный запуск — экран имени не нужен, сразу приветствие
  document.getElementById('name-screen')?.remove();
  const name = getPlayerName();
  applyPlayerName(name);

  const allDone = TASKS.every(t => ui.isTaskDone(t.id));
  setTimeout(() => {
    if (allDone) {
      ui.showDialog('boss', [`С возвращением, ${name}! Все задания выполнены — ты настоящий джун Шмякдекса! 🎉`]);
    } else {
      const nextTask = TASKS.find(t => !ui.isTaskDone(t.id));
      ui.showDialog('boss', [`С возвращением, ${name}! Задания ждут тебя — садись за компьютер и продолжай. 💪`], nextTask?.id ?? null);
    }
  }, 600);
} else {
  // Первый запуск — показываем экран ввода имени, потом онбординг
  showNameScreen((name) => {
    applyPlayerName(name);
    onboarding.start(() => {
      setTimeout(() => {
        const d = NPC_DIALOGS.boss;
        ui.showDialog(d.npcId, d.lines, d.taskId);
      }, 600);
    });
  });
}
