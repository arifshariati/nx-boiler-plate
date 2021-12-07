import { Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";

@Resolver()
export class userResolver {

    constructor(private readonly userService: UserService){}

    users():Promise<string>{
        return  this.userService.users();
    }
}
