import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '@nx-boiler-plate/entities';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports:[
    forwardRef(()=> AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserResolver,UserService],
  exports:[UserService]
})
export class UserModule {}
