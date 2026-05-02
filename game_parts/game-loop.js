import * as THREE from 'three';

export function createGameLoop({
  renderer,
  scene,
  camera,
  player,
  room,
  ui,
  npcs,
  zones,
  isOnboardingActive,
  getNearZone,
  animatePlayerRig,
  mobileControls = null,
}) {
  const clock = new THREE.Clock();
  const cameraTarget = new THREE.Vector3();
  const cameraFollow = new THREE.Vector3();
  const cameraLookAt = new THREE.Vector3();
  const camOffset = new THREE.Vector3(20, 20, 20);

  return function animate(input) {
    requestAnimationFrame(() => animate(input));
    const dt = clock.getDelta();
    const t = performance.now() * 0.001;
    let isMoving = false;
    const keys = input.keys || input;
    const touch = input.touch || {};

    if (!ui.isAnyUIOpen() && !isOnboardingActive()) {
      let dx = 0;
      let dz = 0;

      if (keys.KeyW || keys.ArrowUp) {
        dx -= 1;
        dz -= 1;
      }
      if (keys.KeyS || keys.ArrowDown) {
        dx += 1;
        dz += 1;
      }
      if (keys.KeyA || keys.ArrowLeft) {
        dx -= 1;
        dz += 1;
      }
      if (keys.KeyD || keys.ArrowRight) {
        dx += 1;
        dz -= 1;
      }
      if (touch.touchActive) {
        dx += touch.touchDx;
        dz += touch.touchDz;
      }

      if (dx !== 0 || dz !== 0) {
        isMoving = true;
        const len = Math.sqrt(dx * dx + dz * dz);
        dx /= len;
        dz /= len;

        const nx = player.x + dx * player.speed * dt;
        const nz = player.z + dz * player.speed * dt;
        const hw = room.w / 2 - 0.6;
        const hd = room.d / 2 - 0.6;

        player.x = Math.max(-hw, Math.min(hw, nx));
        player.z = Math.max(-hd, Math.min(hd, nz));
        player.mesh.position.set(player.x, 0, player.z);
        player.mesh.rotation.y = Math.atan2(dx, dz);
      }
    }

    player.isMoving = isMoving;
    animatePlayerRig(player, dt, t);

    cameraTarget.set(player.x, 0, player.z);
    cameraFollow.copy(cameraTarget).add(camOffset);
    camera.position.lerp(cameraFollow, 0.08);
    cameraLookAt.copy(camera.position).sub(camOffset);
    camera.lookAt(cameraLookAt);

    const nearZone = getNearZone(player, zones);
    zones.forEach((zone) => {
      if (zone.ring) {
        zone.ring.material.opacity = 0.35 + 0.3 * Math.sin(t * 3.5);
      }
    });

    ui.showInteractPrompt(!!nearZone && !ui.isAnyUIOpen() && !isOnboardingActive());
    ui.setHint(nearZone ? nearZone.label : '');
    mobileControls?.setActionAvailable(!!nearZone && !ui.isAnyUIOpen() && !isOnboardingActive(), nearZone?.label || '');
    mobileControls?.setHidden(ui.isAnyUIOpen() || isOnboardingActive());

    npcs.forEach((npc, i) => {
      npc.position.y = Math.sin(t * 0.8 + i * 1.2) * 0.04;
    });

    renderer.render(scene, camera);
  };
}
