import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateStudentAvatarService from '@modules/students/services/UpdateStudentAvatarService';


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateStudentAvatar = container.resolve(UpdateStudentAvatarService);

    const student = await updateStudentAvatar.execute({
      student_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(student));
  }
}
