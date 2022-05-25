function get(ctx) {
  const { bree } = ctx;

  ctx.body = bree.config.jobs;
}

const jobs = {
  get
};

export default jobs;
