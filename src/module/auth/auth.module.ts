import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserTemplate, UserSchema } from './users/user.schema';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { ConfigModule } from '@nestjs/config';
import { UserDao } from './users/user.dao';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: UserTemplate.collectionName(), schema: UserSchema },
    ]),
  ],
  providers: [AuthService, JwtStrategy, UserService, UserDao],
  controllers: [AuthController, UserController],
  exports: [AuthService, JwtStrategy, UserService, UserDao],
})
export class AuthModule {}
