import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class LoginResponse {
    @Field()
    jwt: string;
}

export default LoginResponse;