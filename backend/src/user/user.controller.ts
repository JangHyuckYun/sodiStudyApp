import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: UserCreateDto) {
    console.log('createUserDto', createUserDto);
    return await this.userService.save(createUserDto);
  }
}
