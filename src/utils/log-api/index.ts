import koa from 'koa';

const loggerAsync = async (ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>,
  next: koa.Next): Promise<void> => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
};

const xResponseTime = async (ctx: koa.ParameterizedContext<koa.DefaultState, koa.DefaultContext, any>, next: koa.Next): Promise<void> => {
  await next();

  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
};


export { loggerAsync, xResponseTime };