import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfileService } from './user-profile.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Get()
  async getUserProfile(@Req() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const currentUser = await request.user;
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: currentUser,
    };
  }

  @Get('lists')
  async findMyLists(@Req() request: any) {
    const userId = await request.user.id;
    return this.userProfileService.findMyLists(userId);
  }
}
