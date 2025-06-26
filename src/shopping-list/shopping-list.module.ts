import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShoppingListProductService } from 'src/shopping-list-product/shopping-list-product.service';
import { ShoppingListService } from './shopping-list.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minha_chave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ShoppingListController],
  providers: [
    ShoppingListService,
    AuthService,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    ShoppingListProductService
  ]
})
export class ShoppingListModule {}
