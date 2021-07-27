import { User } from './user.entity';
import { Controller, Get, Post, Delete, Param, Body, Put} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  create(arg0: { firstName: string; lastName: string; online: boolean; }): any {
      throw new Error("Method not implemented.");
  }
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(){
    return this.usersService.findAll();
  }

  @Post()
  async saveUser(@Body() user:User) {
    return this.usersService.save(user);
  }
  @Get(':id')
  async sendEmail(@Param() id: number) {
    return this.usersService.findOne(id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number)
  {
    return this.usersService.remove(id);
  }
  @Put(':id')
  updateUser(@Param('id') id:number, @Body() user: User)
  {
    return this.usersService.updateUser(id,user);
  }
}


