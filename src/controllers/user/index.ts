import { Context } from 'koa';
import { Controller, Get, Post, Put, Delete, Patch } from '../../utils/decorators';
import BaseController from '../../utils/controller';

@Controller('/users')
export default class UserController extends BaseController {
  private users: any[];

  constructor(ctx: Context) {
    super(ctx);
    this.users = new Array<any>();
  }

  @Get('/')
  public async getUsers() {
    const entities = [...this.users];
    this.setResponse(entities);
  }

  @Get('/:id')
  public async getUser() {
    const { id } = this.ctx.params;
    this.setResponse(`Get user with ID ${id}`);
  }

  @Post('/')
  public async createUser() {
    const { ...data } = this.ctx.request.body;
    this.users.push(data)

    this.setResponse(data);
  }

  @Post('/upload')
  public async uploadFile() {
    const { request: { body, files } } = this.ctx;
    // Manipule os arquivos enviados através de `files`
    this.setResponse(`Uploaded files: ${JSON.stringify(files)}`);
  }

  @Put('/:id')
  public async updateUser() {
    const { id } = this.ctx.params;
    const { request: { body } } = this.ctx;
    this.setResponse(`Update user with ID ${id} and body: ${JSON.stringify(body)}`);
  }

  @Delete('/:id')
  public async deleteUser() {
    const { id } = this.ctx.params;
    this.setResponse(`Delete user with ID ${id}`);
  }

  @Patch('/:id')
  public async patchUser() {
    const { id } = this.ctx.params;
    const { request: { body } } = this.ctx;
    this.setResponse(`Patch user with ID ${id} and body: ${JSON.stringify(body)}`);
  }
}
