import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { StudyEnglishModule } from './study_english/study_english.module';
import { EnglishEntity } from './study_english/entities/english.entity';
import { EnglishCpEntity } from './study_english/entities/english_cp.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        timezone: config.get('TZ'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [UserEntity, EnglishEntity, EnglishCpEntity],
        // synchronize: true,
        logging: true,
        autoLoadEntities: true,
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    StudyEnglishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
