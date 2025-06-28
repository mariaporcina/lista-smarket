import { Module } from '@nestjs/common';
import { ShoppingListProductController } from './shopping-list-product.controller';
import { ShoppingListProductService } from './shopping-list-product.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/v1/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/roles.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minha_chave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ShoppingListProductController],
  providers: [
    ShoppingListProductService,
    AuthService,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ]
})
export class ShoppingListProductModule {}
