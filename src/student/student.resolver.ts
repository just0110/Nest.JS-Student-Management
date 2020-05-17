import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { StudentType } from './student.type'
import { StudentService } from './student.service'
import { StudentDto } from './dto/student.dto'
import { StudentEntity } from './student.entity'

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService
  ) {}

  @Query(returns => [StudentType])
  students() {
    return this.studentService.getAllStudents()
  }

  @Query(returns => StudentType)
  student(
    @Args('id') id: string,
  ) {
    return this.studentService.getStudent(id)
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('studentDto') studentDto: StudentDto
  ): Promise<StudentEntity> {
    return this.studentService.createStudent(studentDto)
  }
}
