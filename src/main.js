import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/no-unassigned-import
import 'bootstrap';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
