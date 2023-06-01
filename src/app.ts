import Koa, { Context, ParameterizedContext } from 'koa';
import koaBody from 'koa-body';
import { getRegisterRouter } from './router';
import { handlerError } from './utils/error';
import { loggerAsync, xResponseTime } from './utils/log-api';
import { AppState } from './utils/types';

const app = new Koa<Context, AppState>();
const PORT = process.env.PORT || 3333;

// Middlewares globais
app.use(koaBody({ multipart: true }));
app.use(xResponseTime);
app.use(loggerAsync);
// app.use(ensureAuthenticatedAsync);
app.on('error', handlerError);

// Criar o contexto
app.use(async (ctx: ParameterizedContext, next) => {
  const req = ctx.req;
  const res = ctx.res;
  ctx = app.createContext(req, res);
  await next();
});

// Registrar o roteador
const router = getRegisterRouter();
app.use(router.routes());
app.use(router.allowedMethods());

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`);
});
