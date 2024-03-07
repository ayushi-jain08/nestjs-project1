import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { RabbitMqserviceModule } from './rabbit-mqservice/rabbit-mqservice.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }), MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // set to true if using SSL/TLS
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    },
  }), ProductModule, UserModule, AuthModule, OrderModule, RabbitMqserviceModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
