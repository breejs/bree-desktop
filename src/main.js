import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { listen } from '@tauri-apps/api/event';

import App from './app.vue';
import router from './router';
import { useBreeStore } from './stores/bree';

// eslint-disable-next-line import/no-unassigned-import
import 'bootstrap';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// setup event listener for bree store
const breeStore = useBreeStore();

listen('bree://worker-created', ({ payload }) => {
  breeStore.processEvent('worker-created', payload);
});

listen('bree://worker-deleted', ({ payload }) => {
  breeStore.processEvent('worker-deleted', payload);
});

app.mount('#app');
