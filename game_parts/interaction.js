import * as THREE from 'three';

export const INTERACTION_ZONES = [
  {
    id: 'colleague1',
    x: -5,
    z: -0.5,
    radius: 2.2,
    npcId: 'colleague1',
    label: 'Получить подсказку от Маши',
    taskId: 'css-button',
  },
  {
    id: 'colleague2',
    x: -1,
    z: -0.5,
    radius: 2.2,
    npcId: 'colleague2',
    label: 'Получить подсказку от Саши',
    taskId: 'js-counter',
  },
  {
    id: 'dima-desk',
    x: 2.5,
    z: 1.5,
    radius: 3.5,
    npcId: null,
    label: 'Открыть компьютер',
    taskId: null,
  },
];

export function attachZoneIndicators(scene, zones = INTERACTION_ZONES) {
  zones.forEach((zone) => {
    const geo = new THREE.RingGeometry(0.5, 0.68, 28);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffcc44,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(zone.x, 0.07, zone.z);
    scene.add(ring);
    zone.ring = ring;
  });
}

export function getNearZone(player, zones = INTERACTION_ZONES) {
  let best = null;
  let minDist = Infinity;

  zones.forEach((zone) => {
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

export function tryInteract({ ui, player, tasks, zones = INTERACTION_ZONES }) {
  if (ui.isAnyUIOpen()) return;

  const zone = getNearZone(player, zones);
  if (!zone) return;

  if (zone.id === 'dima-desk') {
    const lastTask = ui.getLastOpenedTask();
    const nextUndone = tasks.find((t) => !ui.isTaskDone(t.id));
    const task = lastTask && !ui.isTaskDone(lastTask.id) ? lastTask : nextUndone;

    if (task) {
      ui._openComputer(task);
    } else {
      ui.showDialog('boss', ['Все задания выполнены! Ты настоящий джун Шмякдекса! 🎉']);
    }
    return;
  }

  if (zone.id === 'colleague1' || zone.id === 'colleague2') {
    ui.showColleagueTip(zone.npcId);
  }
}
