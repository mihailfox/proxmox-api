import { describe, expect, it } from 'vitest';
import { formatCount, setupCounter } from './counter';

describe('formatCount', () => {
  it('formats numbers with grouping separators', () => {
    expect(formatCount(12345)).toBe('12,345');
  });
});

describe('setupCounter', () => {
  it('increments the counter on click', () => {
    const button = document.createElement('button');
    setupCounter(button);

    button.click();
    button.click();

    expect(button.textContent).toBe('Clicked 2 times');
  });
});
