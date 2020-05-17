import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { LessonResolver } from './lesson/lesson.resolver'
import { LessonService } from './lesson/lesson.service'
import { StudentService } from './student/student.service'
import { StudentResolver } from './student/student.resolver'
import { StudentModule } from './student/student.module'
import { LessonModule } from './lesson/lesson.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LessonEntity } from './lesson/lesson.entity';
import { StudentEntity } from './student/student.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        LessonEntity,
        StudentEntity,
      ],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    StudentModule,
    LessonModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
