import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonDto } from './dto/lesson.dto';
import { LessonEntity } from './lesson.entity';
import { AssignStudentDto } from './dto/assign.student.dto'
import { StudentService } from '../student/student.service'

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) {
  }

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getAllLessons()
  }

  @Query(returns => LessonType)
  lesson(
    @Args('id') id: string,
  ) {
    return this.lessonService.getLesson(id)
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('lessonDto') lessonDto: LessonDto
  ): Promise<LessonEntity> {
    return this.lessonService.createLesson(lessonDto)
  }

  @Mutation(returns => LessonType)
  assignStudent(
    @Args('assignStudentDto') assignStudentDto: AssignStudentDto,
  ): Promise<LessonDto> {
    const { lessonId, studentsIds } = assignStudentDto
    return this.lessonService.assignStudentToLesson(lessonId, studentsIds)
  }

  @ResolveField()
  async students(@Parent() lesson: LessonDto) {
    return this.studentService.getStudentsByIds(lesson.students)
  }
}
