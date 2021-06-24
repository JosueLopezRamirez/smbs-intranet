import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { config } from 'dotenv';

config();

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'smbsdatabase',
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
