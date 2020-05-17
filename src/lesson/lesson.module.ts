import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LessonEntity } from './lesson.entity'
import { LessonService } from './lesson.service'
import { LessonResolver } from './lesson.resolver'
import { StudentModule } from '../student/student.module'

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forFeature([ LessonEntity ]),
  ],
  providers: [
    LessonResolver,
    LessonService,
  ]
})
export class LessonModule {}
