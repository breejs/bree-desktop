import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import App from './app.vue';
import router from './router';
import tooltip from './directives/tooltip';
import { useBreeStore } from './stores/bree';
import {
  breeRestart,
  breeStop,
  breeStart,
  removeConnection,
  startSSE,
  stopSSE
} from './symbols';

// eslint-disable-next-line import/no-unassigned-import
import 'bootstrap';

const app = createApp(App);

// directives
app.directive('tooltip', tooltip);

// setup pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);

// setup router
app.use(router);

// bree setup
const breeStore = useBreeStore();

breeStore.setup().catch((err) => console.error(err));

app.provide(breeRestart, breeStore.restart);
app.provide(breeStop, breeStore.stop);
app.provide(breeStart, breeStore.start);
app.provide(removeConnection, breeStore.removeConnection);
app.provide(startSSE, breeStore.startSSE);
app.provide(stopSSE, breeStore.stopSSE);

app.mount('#app');
