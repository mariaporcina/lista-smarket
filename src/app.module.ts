import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ShoppingListProductModule } from './shopping-list-product/shopping-list-product.module';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    UserModule,
    PrismaModule,
    AuthModule,
    ShoppingListModule,
    UserProfileModule,
    ShoppingListProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
