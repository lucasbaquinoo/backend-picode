import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/students/services/AuthenticateStudentService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { student, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(student), token });
  }
}
