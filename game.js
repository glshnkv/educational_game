// ============================================================
// GAME.JS — Three.js изометрическая сцена офиса Шмякдекс
// ============================================================
import * as THREE from 'three';
import { UIManager, NPC_DIALOGS } from './ui.js';
import { TASKS } from './tasks.js';
import { OnboardingManager } from './onboarding.js';
import { STORAGE_KEYS } from './core/constants.js';
import { validateTasksSchema } from './core/task-schema.js';
import { getPlayerName, applyPlayerName, showNameScreen } from './game_parts/player-name.js';
import {
  INTERACTION_ZONES,
  attachZoneIndicators,
  getNearZone,
  tryInteract,
} from './game_parts/interaction.js';
import { createGameLoop } from './game_parts/game-loop.js';
import {
  createResizeHandler,
  installResizeListener,
  disposeSceneResources,
} from './game_parts/lifecycle.js';
import { buildOfficeScene } from './game_parts/scene-builder.js';

const taskSchemaErrors = validateTasksSchema(TASKS);
if (taskSchemaErrors.length > 0) {
  throw new Error(`Invalid TASKS schema:\n${taskSchemaErrors.join('\n')}`);
}

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
let onboarding = null;
const isOnboardingActive = () => onboarding?.isActive() === true;

// ── Controls hint ────────────────────────────────────────────
const hint = document.createElement('div');
hint.id = 'controls-hint';
hint.innerHTML = 'WASD / ←↑↓→ — движение<br>E — взаимодействие';
document.body.appendChild(hint);


const {
  room,
  player,
  npcs,
  animatePlayerRig,
  avatarTextures,
  boxGeoCache,
} = buildOfficeScene({ scene, renderer });

// ── Interaction zones ─────────────────────────────────────────
attachZoneIndicators(scene, INTERACTION_ZONES);

// ── Input ─────────────────────────────────────────────────────
const keys = {};
window.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'KeyE' && !isOnboardingActive()) {
    tryInteract({ ui, player, tasks: TASKS, zones: INTERACTION_ZONES });
  }
});
window.addEventListener('keyup', e => { keys[e.code] = false; });
// ── Game loop ─────────────────────────────────────────────────
const animate = createGameLoop({
  renderer,
  scene,
  camera,
  player,
  room,
  ui,
  npcs,
  zones: INTERACTION_ZONES,
  isOnboardingActive,
  getNearZone,
  animatePlayerRig,
});

// ── Resize ────────────────────────────────────────────────────
const handleResize = createResizeHandler({ camera, frustum, renderer });
installResizeListener(handleResize);

window.addEventListener('beforeunload', () => {
  disposeSceneResources({
    scene,
    renderer,
    avatarTextures,
    boxGeoCache,
  });
});

animate(keys);

// ── Onboarding — запускаем после старта игры ──────────────────
onboarding = new OnboardingManager(ui, TASKS);

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
  showNameScreen(STORAGE_KEYS.playerName, (name) => {
    applyPlayerName(name);
    onboarding.start(() => {
      setTimeout(() => {
        const d = NPC_DIALOGS.boss;
        ui.showDialog(d.npcId, d.lines, d.taskId);
      }, 600);
    });
  });
}
