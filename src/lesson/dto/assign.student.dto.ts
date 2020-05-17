import { IsNotEmpty, IsUUID } from 'class-validator'
import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class AssignStudentDto {
  @Field(type => ID)
  @IsUUID()
  @IsNotEmpty()
  lessonId: string;

  @Field(type => [ID])
  @IsUUID("4", { each: true })
  @IsNotEmpty()
  studentsIds: string[];
}
