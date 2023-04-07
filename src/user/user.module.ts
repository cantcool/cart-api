import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), UserModule],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
})
export class UserModule {}
