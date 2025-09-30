import { describe, expect, it } from 'vitest';

import { ARTIFACT_BASELINES } from '../../tools/automation/src/regression/baselines';
import {
  computeArtifactState,
  computeRegressionSummary
} from '../../tools/automation/src/regression/summary';

describe('artifact baselines', () => {
  for (const baseline of ARTIFACT_BASELINES) {
    it(`matches the recorded checksum for ${baseline.label}`, () => {
      const state = computeArtifactState(baseline);

      expect(state.matches).toBe(true);
      expect(state.actualSha256).toBe(baseline.sha256);
      expect(state.byteLength).toBeGreaterThan(0);
    });
  }
});

describe('regression summary parity', () => {
  const summary = computeRegressionSummary();

  it('keeps normalized counts aligned with the raw snapshot', () => {
    expect(summary.snapshotStats.endpointCount).toBeGreaterThan(0);
    expect(summary.normalizedSummary.endpointCount).toBe(summary.snapshotStats.endpointCount);
    expect(summary.normalizedSummary.groupCount).toBeGreaterThanOrEqual(
      summary.snapshotStats.rootGroupCount
    );
  });

  it('ensures OpenAPI operations match normalized methods', () => {
    expect(summary.openApiOperationCount).toBe(summary.normalizedSummary.methodCount);
    expect(summary.parity.methodCountMatches).toBe(true);
  });

  it('produces consistent OpenAPI documents across formats', () => {
    expect(summary.parity.jsonMatchesYaml).toBe(true);
    expect(summary.tagCount).toBeGreaterThan(0);
  });
});
