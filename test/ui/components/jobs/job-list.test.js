import { app } from '@storybook/vue3';
import { test, expect } from 'vitest';
import { storyTests } from '../../_story-tests';

import * as stories from '@/components/jobs/job-list.stories';

test('expect directive to exist', () => {
  expect(Object.keys(app._context.directives)).toEqual(['tooltip']);
});

storyTests(stories);
