import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
class LoginInput {
    @IsEmail()
    @Field()
    email: string;

    @Field()
    password: string;
}

export default LoginInput;
