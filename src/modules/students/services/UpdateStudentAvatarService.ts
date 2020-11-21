import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IStudentRepository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  student_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateStudentAvatarService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ student_id, avatarFilename }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Only authenticated students change avatar', 401);
    }

    if (student.avatar) {
      await this.storageProvider.deleteFile(student.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    student.avatar = filename;

    await this.studentsRepository.save(student);

    return student;
  }
}

export default UpdateStudentAvatarService;
