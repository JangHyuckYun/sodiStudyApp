import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async save(userCreateDto: UserCreateDto) {
    const salt = await bcrypt.genSalt();
    console.log('salt', salt);
    userCreateDto.userPassword = await bcrypt.hash(
      userCreateDto.userPassword,
      salt,
    );

    await this.userRepository.save(userCreateDto);
  }
}
