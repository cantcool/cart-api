import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from '../constants';

import { User } from '../user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [SequelizeModule, SequelizeModule],
})
export class AuthModule {}
