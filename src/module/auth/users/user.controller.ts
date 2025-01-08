import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth.guard';
import { RolesGuard } from '../roles.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUserInfo(@Req() req) {
    return await this.userService.findByEmailOrUsername('', req.user.username);
  }
}
