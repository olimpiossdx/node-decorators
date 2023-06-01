import fs from 'fs';
import path from 'path';
import Router, { IMiddleware } from 'koa-router';
import { Context, ControllerConstructor, CustomRouter, RouteDefinition } from '../utils/types';


function getRouteDefinitions(Controller: ControllerConstructor): RouteDefinition[] {
  const routeDefinitions: RouteDefinition[] = [];

  if (Controller.prototype.routeDefinitions) {
    for (const routeDefinition of Controller.prototype.routeDefinitions) {
      const prefix = Controller.prototype.controllerPrefix || '';
      routeDefinition.path = prefix + routeDefinition.path;
      routeDefinitions.push(routeDefinition);
    }
  }

  return routeDefinitions;
}

function getRegisterRouter(): CustomRouter {
  const router = new Router<any, Context>({ prefix: '/api' });
  const controllersDir = path.join(__dirname, '../controllers');
  const controllerFiles = fs.readdirSync(controllersDir);

  for (const file of controllerFiles) {
    const controllerPath = path.join(controllersDir, file);
    if (fs.lstatSync(controllerPath).isDirectory()) {
      const Controller = require(controllerPath).default;
      if (Controller) {
        const routeDefinitions = getRouteDefinitions(Controller);
        for (const routeDefinition of routeDefinitions) {
          const { method, path, middleware, methodName } = routeDefinition;
          const handler: IMiddleware<any, Context> = async (ctx, next) => {
            const controllerInstance = new Controller(ctx);
            const controllerMethod = controllerInstance[methodName].bind(controllerInstance);
            await controllerMethod(ctx);
            await next();
          };

          const methodLowerCase = method.toLowerCase();
          (router as CustomRouter)[methodLowerCase](path, ...middleware, handler);
        }
      }
    }
  }

  return router as CustomRouter;
}

export { getRegisterRouter };
