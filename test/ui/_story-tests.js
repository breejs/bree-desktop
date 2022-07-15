import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';

import { breeRestart, breeStop, breeStart, removeConnection } from '@/symbols';
import tooltip from '@/directives/tooltip';

export function storyTests(stories) {
  describe('story snapshots', () => {
    test.each(Object.entries(composeStories(stories)))('%s', (_, fn) => {
      expect(
        render(fn(), {
          global: {
            provide: {
              [breeRestart]() {},
              [breeStop]() {},
              [breeStart]() {},
              [removeConnection]() {}
            },
            directives: { tooltip }
          }
        }).html()
      ).toMatchSnapshot();
    });
  });
}
