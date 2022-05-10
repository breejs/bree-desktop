import bree from '../bree';

function get(ctx) {
  ctx.body = bree.config.jobs;
}

const jobs = {
  get
};

export default jobs;
