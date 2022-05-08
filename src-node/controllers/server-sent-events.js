import bree from '../bree';

export function breeEvents(ctx) {
  if (ctx.sse && ctx.url === '/events') {
    for (const event of ['worker created', 'worker deleted']) {
      // listen to events from bree
      bree.on(event, (name) => {
        // pass on to client
        ctx.sse.send({
          data: { name },
          event
        });
      });

      ctx.sse.on('close', () => {
        ctx.logger.error('sse closed');
      });
    }
  }
}
