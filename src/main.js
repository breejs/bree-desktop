import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { listen } from '@tauri-apps/api/event';

import App from './app.vue';
import router from './router';
import { useBreeStore, EVENTS_TO_ACTIONS } from './stores/bree';
import tooltip from './directives/tooltip';

// eslint-disable-next-line import/no-unassigned-import
import 'bootstrap';

const app = createApp(App);

// directives
app.directive('tooltip', tooltip);

app.use(createPinia());
app.use(router);

// setup event listener for bree store
const breeStore = useBreeStore();

for (const [event, action] of EVENTS_TO_ACTIONS) {
  listen(`bree://${event}`, ({ payload }) => {
    breeStore[action](payload);
  });
}

app.mount('#app');
