import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStudentsRepository from '../repositories/IStudentsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  student: Student;
  token: string;
}

@injectable()
class AuthenticateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      student.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: student.id,
      expiresIn,
    });

    return {
      student,
      token,
    };
  }
}

export default AuthenticateStudentService;
