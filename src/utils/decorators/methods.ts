// Decorators.ts
import { Middleware } from 'koa';

export interface RouteDefinition {
  method: string;
  path: string;
  middleware: Middleware[];
  methodName: string; // Armazena o nome do método decorado
}

function createRouteDecorator(method: string) {
  return function (path: string = '') {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const routeDefinition: RouteDefinition = {
        method,
        path,
        middleware: [],
        methodName: propertyKey, // Armazena o nome do método decorado
      };

      if (!target.routeDefinitions) {
        target.routeDefinitions = [];
      }

      target.routeDefinitions.push(routeDefinition);
    };
  };
}

export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');
export const Patch = createRouteDecorator('patch');
