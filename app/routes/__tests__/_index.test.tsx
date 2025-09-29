import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';

import Index from '../_index';

describe('Index route', () => {
  it('renders the sandbox heading and counter value', () => {
    const html = renderToString(<Index />);
    expect(html).toContain('Remix meets Vite');
    expect(html).toContain('0');
  });
});
