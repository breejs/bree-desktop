import Router from '@koa/router';
import config from './controllers/config';
import jobs from './controllers/jobs';

const router = new Router();

//
// config
//
router.get('/config', config.get);

//
// jobs
//
router.get('/jobs', jobs.get);

export default router;
