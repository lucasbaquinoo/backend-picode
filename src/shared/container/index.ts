import { container } from 'tsyringe';

import '@modules/students/providers';
import './providers';

// import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IStudentTokenRepository from '@modules/students/repositories/IStudentTokenRepository';
import StudentTokensRepository from '@modules/students/infra/typeorm/repositories/StudentTokensRepository';

// import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
// import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

// container.registerSingleton<IAppointmentsRepository>(
//   'AppointmentsRepository',
//   AppointmentsRepository,
// );

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IStudentTokenRepository>(
  'StudentTokensRepository',
  StudentTokensRepository,
);

// container.registerSingleton<INotificationsRepository>(
//   'NotificationsRepository',
//   NotificationsRepository,
// );
