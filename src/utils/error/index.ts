import koa from "koa";

class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly context: koa.Context;

  constructor(message: string, statusCode: number = 400, context: koa.Context) {
    this.message = message;
    this.statusCode = statusCode;
    this.context = context;
  };
};

const handlerError: (...args: any[]) => void = (err, ctx: koa.Context) => {
  if (err instanceof AppError) {
    ctx.status = err.statusCode;
    ctx.body = { status: 'error', message: err.message };
    return ctx;
  };

  console.error('Internal server error', err);

  ctx.status = 500;
  ctx.body = { status: 500, message: 'Internal server error' };

  return ctx;
};



export { AppError, handlerError };