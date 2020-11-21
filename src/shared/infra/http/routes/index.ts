import { Router } from 'express';

import studentsRouter from '@modules/students/infra/http/routes/student.routes';
import sessionsRouter from '@modules/students/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/students/infra/http/routes/password.routes';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
