import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './users/user.schema';
import { UserService } from './users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from './users/user.entity';
import { RegisterUserDTO } from './auth.controller';

export interface UserJWT {
  userId: string;
  username: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmailOrUsername('', username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterUserDTO): Promise<User> {
    // Verifica que el correo y el username no estén ya en uso
    const existingUser = await this.usersService.findByEmailOrUsername(
      registerDto.email,
      registerDto.username,
    );
    if (existingUser) {
      throw new BadRequestException('Email or Username already in use');
    }
    const pw = await this.hashPassword(registerDto.password);

    return await this.usersService.create(
      new User(
        registerDto.complete_name,
        0,
        registerDto.username,
        registerDto.email,
        pw,
        registerDto.profile_image,
        false,
        registerDto.role,
        [],
      ),
    );
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
