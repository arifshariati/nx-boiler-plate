import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  
  users():Promise<string>{
    return Promise.resolve("I am returning users") ;
  }
}
