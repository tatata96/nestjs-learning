import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

// @Get('all')       // GET /user/all
// @Get(':id')       // GET /user/:id - dynamic segment
// @Post()           // POST /user
// @Put(':id')       // PUT /user/:id
// @Delete(':id')    // DELETE /user/:id

// user is the rouute prefix
@Controller('user')
export class UserController {
  // constructor injection which gets access to the user service, it assignes the injected service
  constructor(private readonly userService: UserService) {}

  // always put static routes at the top
  @Get()
  getUsers(@Query('name') name: string) {
    return this.userService.findAllUsers(name);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    // http://localhost:3000/user/1
    return this.userService.findOneUser(Number(id));
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), UpdateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
