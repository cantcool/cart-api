import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/product.model';

import { CartItem } from './cart_item.model';

import { CartItemService } from './cart_item.service';

import { jwtConstants } from '../constants';

@Module({
  imports: [
    SequelizeModule.forFeature([CartItem, Product]),
    AuthModule,
    CartModule,
    ProductModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [CartItemService],
  exports: [SequelizeModule, CartItemService],
})
export class CartItemModule {}
