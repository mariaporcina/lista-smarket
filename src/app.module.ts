import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/v1/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/v1/auth.module';
import { ShoppingListModule } from './shopping-list/v1/shopping-list.module';
import { ShoppingListProductModule } from './shopping-list-product/v1/shopping-list-product.module';
import { ErrorsModule } from './errors/errors.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SharedModule,
    CoreModule,
    UserModule,
    PrismaModule,
    AuthModule,
    ShoppingListModule,
    ShoppingListProductModule,
    UserModule,
    ErrorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes('*');
  // }
}
