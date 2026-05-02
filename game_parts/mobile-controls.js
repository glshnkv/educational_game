const TOUCH_DEVICE_QUERY = '(hover: none), (pointer: coarse)';

function isTouchLikeDevice() {
  return window.matchMedia?.(TOUCH_DEVICE_QUERY).matches || window.navigator.maxTouchPoints > 0;
}

function getActionCaption(label) {
  if (/компьютер/i.test(label)) return 'Компьютер';
  if (/подсказ/i.test(label)) return 'Подсказка';
  return 'Действие';
}

export function createMobileControls({ onInteract, isDisabled }) {
  const root = document.getElementById('mobile-controls');
  const pad = document.getElementById('mobile-stick');
  const knob = document.getElementById('mobile-stick-knob');
  const action = document.getElementById('mobile-action');
  const actionLabel = document.getElementById('mobile-action-label');
  const state = {
    touchActive: false,
    touchDx: 0,
    touchDz: 0,
  };

  if (!root || !pad || !knob || !action || !actionLabel || !isTouchLikeDevice()) {
    root?.classList.add('hidden');
    return {
      state,
      setActionAvailable() {},
      setHidden() {},
    };
  }

  root.classList.remove('hidden');
  root.setAttribute('aria-hidden', 'false');

  let activePointerId = null;
  let centerX = 0;
  let centerY = 0;
  const maxRadius = 42;
  const deadZone = 0.16;

  function resetStick() {
    activePointerId = null;
    state.touchActive = false;
    state.touchDx = 0;
    state.touchDz = 0;
    knob.style.transform = 'translate3d(-50%, -50%, 0)';
    pad.classList.remove('is-active');
  }

  function updateStick(clientX, clientY) {
    if (isDisabled()) {
      resetStick();
      return;
    }

    const rawX = clientX - centerX;
    const rawY = clientY - centerY;
    const distance = Math.hypot(rawX, rawY);
    const limitedDistance = Math.min(maxRadius, distance);
    const angle = Math.atan2(rawY, rawX);
    const visualX = Math.cos(angle) * limitedDistance;
    const visualY = Math.sin(angle) * limitedDistance;
    const normalizedX = distance > 0 ? rawX / Math.max(distance, maxRadius) : 0;
    const normalizedY = distance > 0 ? rawY / Math.max(distance, maxRadius) : 0;
    const strength = Math.hypot(normalizedX, normalizedY);

    knob.style.transform = `translate3d(calc(-50% + ${visualX}px), calc(-50% + ${visualY}px), 0)`;

    if (strength < deadZone) {
      state.touchActive = false;
      state.touchDx = 0;
      state.touchDz = 0;
      return;
    }

    state.touchActive = true;
    state.touchDx = normalizedX + normalizedY;
    state.touchDz = normalizedY - normalizedX;
  }

  pad.addEventListener('pointerdown', (event) => {
    if (isDisabled()) return;
    event.preventDefault();
    const rect = pad.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
    activePointerId = event.pointerId;
    pad.setPointerCapture(event.pointerId);
    pad.classList.add('is-active');
    updateStick(event.clientX, event.clientY);
  });

  pad.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointerId) return;
    event.preventDefault();
    updateStick(event.clientX, event.clientY);
  });

  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    pad.addEventListener(eventName, (event) => {
      if (event.pointerId === activePointerId || eventName === 'lostpointercapture') {
        resetStick();
      }
    });
  }

  action.addEventListener('pointerdown', (event) => {
    event.preventDefault();
  });

  action.addEventListener('click', (event) => {
    event.preventDefault();
    if (!isDisabled() && !action.disabled) onInteract();
  });

  return {
    state,
    setActionAvailable(isAvailable, label = '') {
      action.disabled = !isAvailable;
      actionLabel.textContent = isAvailable ? getActionCaption(label) : 'Подойди ближе';
      action.setAttribute('aria-label', isAvailable ? label || 'Взаимодействовать' : 'Нет доступного действия рядом');
    },
    setHidden(isHidden) {
      root.classList.toggle('is-game-ui-hidden', isHidden);
      if (isHidden) resetStick();
    },
  };
}
