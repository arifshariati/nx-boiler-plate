import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput, LoginInput, LoginResponse } from '@nx-boiler-plate/dto';
import { User } from '@nx-boiler-plate/entities';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository:Repository<User>,
    private authService: AuthService,
  ){}

  async signup(signupInput: SignupInput): Promise<User> {
    const existingUser = await this.getUserByEmail(signupInput.email);
    if (existingUser) {
      throw new HttpException('User Already exists.', HttpStatus.BAD_REQUEST);

    } else {
      const newUser = this.userRepository.create(signupInput);
      newUser.password = await this.authService.hashPassword(signupInput.password);
      newUser.createdAt = new Date();
      return this.userRepository.save(newUser);
    }
  }

  async login(loginInput: LoginInput): Promise<LoginResponse> {

    const userRecord = await this.getUserByEmail(loginInput.email);
    if (!userRecord) throw new HttpException('Provided Email Address and Password does not match', HttpStatus.NOT_FOUND);
    const authResponse = await this.matchPassword(loginInput.password, userRecord.password);
    if (!authResponse) throw new HttpException('Provided Email Address and Password does not match', HttpStatus.NOT_FOUND);
    return {
      jwt: await this.authService.generateJWT(userRecord)
    }
  }
  
  async users(): Promise<User[]> {
    try{
      return await this.userRepository.find({});
    }catch(err){
      throw new Error(err);
    }
    
  }

  async user(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async getUserByEmail(email: string): Promise<User> {

    return await this.userRepository.findOne({ email });
  };

  async matchPassword(providedPassword: string, toMatchPassword: string): Promise<boolean> {

    return await this.authService.comparePassword(providedPassword, toMatchPassword);
  };
  
}
