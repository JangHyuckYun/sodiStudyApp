import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '../../config/typeorm-ex.decorator';
import { UserCreateDto } from '../dto/user.create.dto';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async saveUser(createUserDto: UserCreateDto) {
    const user = this.create({ ...createUserDto });

    await this.save(user);
  }
}
