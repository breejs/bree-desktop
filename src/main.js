import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app.vue';
import router from './router';
import tooltip from './directives/tooltip';
import { useBreeStore } from './stores/bree';

// eslint-disable-next-line import/no-unassigned-import
import 'bootstrap';

const app = createApp(App);

// directives
app.directive('tooltip', tooltip);

app.use(createPinia());
app.use(router);

const breeStore = useBreeStore();

breeStore.setup().catch((err) => console.error(err));

app.mount('#app');
