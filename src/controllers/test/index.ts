import { Context } from 'koa';
import { Controller, Get } from '../../utils/decorators';
import BaseController from '../../utils/controller';

@Controller('/test')
export default class UserController extends BaseController {
  constructor(ctx: Context) {
    super(ctx);
  }

  @Get('/')
  public async geTest() {
    this.setResponse(`Hello word test controller`);
  }
}
