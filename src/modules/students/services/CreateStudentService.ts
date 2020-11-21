import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStudentsRepository from '../repositories/IStudentsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    // @inject('CacheProvider')
    // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Student> {
    const checkUserExists = await this.studentsRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.studentsRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
