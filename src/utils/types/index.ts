import { DefaultContext, DefaultState } from 'koa';
import Koa from 'koa';
import Router from 'koa-router';
import BaseController from '../controller';

export type Middleware = Koa.Middleware;

export interface RouteDefinition {
  method: string;
  path: string;
  middleware: Middleware[];
  methodName: string; // Armazena o nome do método decorado
}

export type Context = DefaultContext & {
  // Adicione aqui quaisquer propriedades personalizadas que você deseja incluir no contexto
};

export type AppState = DefaultState & {
  // Adicione aqui quaisquer propriedades personalizadas que você deseja incluir no estado do aplicativo
};


export type ControllerConstructor = new (ctx: Context) => BaseController;

export interface CustomRouter extends Router<any, DefaultContext> {
  [key: string]: any;
}