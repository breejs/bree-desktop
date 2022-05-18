import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';

export function storyTests(stories) {
  describe('story snapshots', () => {
    test.each(Object.entries(composeStories(stories)))('%s', (_, fn) => {
      expect(render(fn()).html()).toMatchSnapshot();
    });
  });
}
