import { getRepository, Repository } from 'typeorm';

import IStudentTokensRepository from '@modules/students/repositories/IStudentTokenRepository';

import StudentToken from '../entities/StudentToken';

class StudentTokensRepository implements IStudentTokensRepository {
  private ormRepository: Repository<StudentToken>;

  constructor() {
    this.ormRepository = getRepository(StudentToken);
  }

  public async findByToken(token: string): Promise<StudentToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(student_id: string): Promise<StudentToken> {
    const studentToken = this.ormRepository.create({
      student_id,
    });

    await this.ormRepository.save(studentToken);

    return studentToken;
  }
}

export default StudentTokensRepository;
