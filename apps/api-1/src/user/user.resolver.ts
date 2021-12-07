import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from '@nx-boiler-plate/entities';
import { LoginInput, LoginResponse, SignupInput } from '@nx-boiler-plate/dto'
import { UseGuards } from "@nestjs/common";
import { GraphqlJwtAuthGuard } from '@nx-boiler-plate/guards';
import { IRequestWithUser } from "@nx-boiler-plate/interfaces";
@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    @Mutation(() => User, { name: 'signup' })
    async signup(
        @Args('signupInput') signupInput: SignupInput
    ): Promise<User> {
        return await this.userService.signup(signupInput);
    }

    @Query(() => LoginResponse, { name: 'login'})
    async login(
        @Args('loginInput') loginInput: LoginInput
    ): Promise<LoginResponse> {
        return await this.userService.login(loginInput);
    }

    @Query(() => [User], { name: 'users'})
    @UseGuards(GraphqlJwtAuthGuard)
    async users(
        @Context() context: { req: IRequestWithUser }
    ): Promise<User[]> {
        return await this.userService.users();
    }

    @Query(() => User, { name: 'user'})
    @UseGuards(GraphqlJwtAuthGuard)
    user(
        @Args('id') id: string, 
        @Context() context: { req: IRequestWithUser }
    ): Promise<User> {
        return this.userService.user(id);
    }
}
