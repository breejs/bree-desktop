function get(ctx) {
  const { bree } = ctx;

  ctx.body = bree.config;
}

const config = {
  get
};

export default config;
