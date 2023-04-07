import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CartItemService } from '../cart_item/cart_item.service';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

import { Cart } from './cart.model';
import { CartItem } from '../cart_item/cart_item.model';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';

import { jwtConstants } from '../constants';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, CartItem, Order, Product]),
    AuthModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [CartService, CartItemService, OrderService, ProductService],
  controllers: [CartController],
  exports: [SequelizeModule, CartService],
})
export class CartModule {}
