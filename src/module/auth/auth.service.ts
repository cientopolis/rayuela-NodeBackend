import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user._doc.username, sub: user._doc._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: { username: string; password: string }) {
    const { username, password } = userData;

    if (username.length < 4) {
      throw new BadRequestException('Username must be at least 4 characters long.');
    }

    if (password.length < 4) {
      throw new BadRequestException('Password must be at least 4 characters long.');
    }

    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new BadRequestException('Username is already taken.');
    }

    // Si pasa las validaciones, crea el usuario
    return this.usersService.create(userData);
  }
}
