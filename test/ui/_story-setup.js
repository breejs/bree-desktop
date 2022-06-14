import { beforeAll } from 'vitest';
import { setGlobalConfig } from '@storybook/testing-vue3';

beforeAll(async () => {
  const globalStorybookConfig = await import('../../.storybook/preview');

  setGlobalConfig(globalStorybookConfig);
});
