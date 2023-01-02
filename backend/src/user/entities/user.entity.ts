import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id', comment: '유저 idx' })
  uidx: number;

  @Column({ name: 'user_login_id', comment: '유저 로그인 아이디 ( email )' })
  userId: string;

  @Column({ name: 'user_login_password', comment: '유저 로그인 비밀번호' })
  userPassword: string;

  @Column({ name: 'user_name', comment: '유저 이름' })
  userName: string;

  @Column({ name: 'is_active', comment: '유저 활성화 여부', default: true })
  isActive: boolean;
}
