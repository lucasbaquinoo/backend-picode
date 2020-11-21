import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IStudentsRepository from '../repositories/IStudentsRepository';
import IStudentTokenRepository from '../repositories/IStudentTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('StudentTokensRepository')
    private studentTokensRepository: IStudentTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.studentTokensRepository.generate(student.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: student.name,
        email: student.email,
      },
      subject: '[PiCode] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: student.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
