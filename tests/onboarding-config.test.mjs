import test from 'node:test';
import assert from 'node:assert/strict';

import { buildOnboardingSteps } from '../data/onboarding-steps.js';

test('onboarding has core flow screens', () => {
  const steps = buildOnboardingSteps();
  const navigations = new Set(steps.map((s) => s.navigateTo).filter(Boolean));

  assert.equal(steps.length > 5, true);
  assert.equal(navigations.has('kanban'), true);
  assert.equal(navigations.has('editor'), true);
});

test('onboarding has exactly one final closeComputer step', () => {
  const steps = buildOnboardingSteps();
  const closeSteps = steps.filter((s) => s.closeComputer);
  assert.equal(closeSteps.length, 1);
});
