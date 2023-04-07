import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CartModule } from '../cart/cart.module';

import { CartService } from '../cart/cart.service';
import { OrderService } from './order.service';
import { UserService } from '../user/user.service';

import { Cart } from '../cart/cart.model';
// import { CartItem } from '../cart_item/cart_item.model';
import { User } from '../user/user.model';
import { Order } from './order.model';

import { jwtConstants } from '../constants';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Order, User]),
    AuthModule,
    CartModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [CartService, OrderService, UserService],
  exports: [SequelizeModule, OrderService],
})
export class OrderModule {}
