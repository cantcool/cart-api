import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { Product } from './product.model';
import { ProductService } from './product.service';

import { jwtConstants } from '../constants';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [ProductService],
  exports: [SequelizeModule, ProductService],
})
export class ProductModule {}
