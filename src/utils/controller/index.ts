import Koa from "koa";

//TODO: Adicionar interfaces
interface INotfication {
  status: 'successs' | 'warning' | 'error';
  message: string;
}
class BaseController {
  public ctx: Koa.Context;
  public notifications: INotfication[];

  constructor(ctx: Koa.Context) {
    this.ctx = ctx;
    this.notifications = [];
  }

  setResponse(data: any) {
    if (!this.notifications.length) {
      this.AddNotification({ status: 'successs', message: 'Usuario criado com sucesso' });
    }

    const status = this.notifications.some(s => s.status !== 'successs') ? 'error' : 'successs';

    this.ctx.response.body =
    {
      status,
      notifications: this.notifications,
      data
    };
  }

  AddNotification(notification: INotfication) {
    this.notifications.push(notification);
  }
};

export default BaseController
