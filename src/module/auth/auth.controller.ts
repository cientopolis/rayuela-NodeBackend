import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from './users/user.schema';

export interface RegisterUserDTO {
  complete_name: string;
  username: string;
  email: string;
  password: string;
  profile_image?: string;
  role?: UserRole; // Por default es volunteer
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    // Verifica si ambos campos están presentes
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    // Valida el usuario por email y contraseña
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retorna el token de acceso
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const { email } = body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    await this.authService.forgotPassword(email);
    return {
      message:
        'If an account with that email exists, a reset link has been sent',
    };
  }

  @Post('register')
  async register(
    @Body()
    body: RegisterUserDTO,
  ) {
    const { complete_name, username, email, password, profile_image, role } =
      body;

    // Verifica si los campos obligatorios están presentes
    if (!complete_name || !username || !email || !password) {
      throw new BadRequestException(
        'Complete name, username, email, and password are required',
      );
    }

    return this.authService.register({
      complete_name,
      username,
      email,
      password,
      profile_image,
      role,
    });
  }
}
