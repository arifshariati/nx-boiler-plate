import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@nx-boiler-plate/guards';
import { JwtStrategy } from '@nx-boiler-plate/strategies';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.EXPIRES_IN }
      })
    }),
    ConfigModule
  ],
  controllers: [],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule { }
