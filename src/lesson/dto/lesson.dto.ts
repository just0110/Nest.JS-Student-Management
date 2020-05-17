import { IsNotEmpty, MinLength, IsDateString, IsUUID } from 'class-validator'
import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class LessonDto {
  @Field()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsUUID("4", { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
