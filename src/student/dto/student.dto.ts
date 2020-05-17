import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class StudentDto {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;
}
