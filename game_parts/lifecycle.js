export function createResizeHandler({ camera, frustum, renderer }) {
  return function handleResize() {
    const a = window.innerWidth / window.innerHeight;
    camera.left = -frustum * a;
    camera.right = frustum * a;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
}

export function installResizeListener(handleResize) {
  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      handleResize();
    });
  });
}

export function disposeSceneResources({ scene, renderer, avatarTextures, boxGeoCache }) {
  const disposedGeometries = new Set();
  const disposedMaterials = new Set();

  scene.traverse((obj) => {
    if (obj.geometry && typeof obj.geometry.dispose === 'function' && !disposedGeometries.has(obj.geometry)) {
      disposedGeometries.add(obj.geometry);
      obj.geometry.dispose();
    }

    if (obj.material) {
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      materials.forEach((mat) => {
        if (!mat || disposedMaterials.has(mat)) return;
        disposedMaterials.add(mat);
        mat.dispose?.();
      });
    }
  });

  Object.values(avatarTextures).forEach((tex) => tex.dispose?.());
  boxGeoCache?.forEach((geometry) => geometry.dispose());
  renderer.dispose();
}
