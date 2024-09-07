import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument, UserRole } from './users/user.schema';
import { UsersService } from './users/user.service';
import * as bcrypt from 'bcrypt';
import { Roles } from './role.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailOrUsername("",username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: any): Promise<UserDocument> {
    // Verifica que el correo y el username no estén ya en uso
    const existingUser = await this.usersService.findByEmailOrUsername(registerDto.email, registerDto.username);
    if (existingUser) {
      throw new BadRequestException('Email or Username already in use');
    }

    return await this.usersService.create({
      complete_name: registerDto.complete_name,
      username: registerDto.username,
      email: registerDto.email,
      password: await this.hashPassword(registerDto.password),
      profile_image: registerDto.profile_image || null,
      role: registerDto.role || UserRole.Volunteer,
      verified: false,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async login(user: any) {
    const payload = { username: user._doc.username, sub: user._doc._id, role: user._doc.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
