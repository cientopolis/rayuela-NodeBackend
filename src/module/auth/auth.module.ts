import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from './users/user.schema';
import { UsersService } from './users/user.service';
import { UserController } from './users/user.controller';
import { ConfigModule } from '@nestjs/config';
import { UserDao } from './users/user.dao';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Hace que las variables estén disponibles globalmente
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JwtStrategy, UsersService, UserDao],
  controllers: [AuthController,UserController],
})
export class AuthModule {}
