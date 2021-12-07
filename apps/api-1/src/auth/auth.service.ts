import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IJwtUser } from '@nx-boiler-plate/interfaces';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) { }
  
  // generate JWT Token
  async generateJWT(jwt_user: IJwtUser): Promise<string> {
    const expiresIn =  process.env.EXPIRES_IN
    return await this.jwtService.signAsync({ jwt_user }, { expiresIn });
  }

  // hash password (before savign DB record). User signup use case.
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // compare password. User login use case.
  async comparePassword(newPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(newPassword, hashedPassword);
  }

}
