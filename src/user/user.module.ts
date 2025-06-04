import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
})
export class UserModule {}
