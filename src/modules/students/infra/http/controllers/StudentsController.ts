import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStudentService from '@modules/students/services/CreateStudentService';


export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createStudent = container.resolve(CreateStudentService);

    const user = await createStudent.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
