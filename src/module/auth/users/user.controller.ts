import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth.guard';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../role.decorator';
import { UserRole } from './user.schema';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin) // Solo usuarios con rol Admin pueden acceder a esta ruta
  @Get()
  getUserInfo(@Req() req) {
    return req.user;
  }
}
