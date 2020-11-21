import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import StudentAvatarController from '../controllers/StudentAvatarController';
import StudentsController from '../controllers/StudentsController';


const studentsRouter = Router();
const studentsController = new StudentsController();
const studentAvatarController = new StudentAvatarController();
const upload = multer(uploadConfig.multer);

studentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  studentsController.create,
);

studentsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  studentAvatarController.update,
);

export default studentsRouter;
