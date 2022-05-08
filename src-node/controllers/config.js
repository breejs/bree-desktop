import bree from '../bree';

function get(ctx) {
  ctx.body = bree.config;
}

const config = {
  get
};

export default config;
