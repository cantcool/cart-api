import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

dotenv.config();

const DB_CONNECTION = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...DB_CONNECTION,
      autoLoadModels: true,
      synchronize: true,
      repositoryMode: true,
    }),
    AuthModule,
    CartModule,
    CartItemModule,
    ProductModule,
    OrderModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
