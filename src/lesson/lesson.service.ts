import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './lesson.entity';
import { Repository } from 'typeorm';
import { LessonDto } from './dto/lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>
  ) {}

  async getLesson(id: string): Promise<LessonEntity> {
    return this.lessonRepository.findOne({ id })
  }

  async getAllLessons():Promise<LessonEntity[]> {
    return this.lessonRepository.find()
  }

  async createLesson(lessonDto: LessonDto): Promise<LessonEntity> {
    const { name, startDate, endDate, students } = lessonDto
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students
    })

    return this.lessonRepository.save(lesson)
  }

  async assignStudentToLesson(lessonId: string, studentsIds: string[]): Promise<LessonDto> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId })
    lesson.students = [...lesson.students, ...studentsIds ]
    return this.lessonRepository.save(lesson)
  }
}
