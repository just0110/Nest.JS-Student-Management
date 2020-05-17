import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm'
import { StudentEntity } from './student.entity'
import { Repository } from 'typeorm'
import { StudentDto } from './dto/student.dto'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>
  ) {}

  async getStudent(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOne({ id })
  }

  async getAllStudents():Promise<StudentEntity[]> {
    return this.studentRepository.find()
  }

  async createStudent(studentDto: StudentDto): Promise<StudentEntity> {
    const { firstName, lastName } = studentDto

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    })

    return this.studentRepository.save(student)
  }

  async getStudentsByIds(studentsIds: string[]): Promise<StudentDto[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentsIds,
        }
      }
    })
  }
}
