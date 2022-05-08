import Router from '@koa/router';
import config from './controllers/config';

const router = new Router();

router.get('/config', config.get);

export default router;
