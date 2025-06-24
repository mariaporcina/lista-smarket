import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfileService } from './user-profile.service';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Get()
  async getCurrentUserProfile(@Req() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const currentUser = await request.user;
    return {
      message: 'Você acessou uma rota protegida!',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: currentUser,
    };
  }

  @Get('lists')
  async findMyLists(@Req() request: any) {
    const userId = await request.user.id;
    return this.userProfileService.findMyLists(userId);
  }

  @Post('lists')
  async addProductToList(@Body() data: any, @Req() request: any) {
    // const userId = await request.user.id;
    const { listId, productsIds } = data;
    return this.userProfileService.addProductToList(listId, productsIds);
  }

  @Delete('lists')
  async removeProductsFromList(@Body() data: any, @Req() request: any) {
    // const userId = await request.user.id;
    const { listId, productsIds } = data;
    return this.userProfileService.removeProductsFromList(listId, productsIds);
  }
}
