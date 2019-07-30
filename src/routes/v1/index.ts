import * as express from 'express';
import { checkUserGroup } from "../../middlewares/checkUserGroup";
// import multer from 'multer';

import { authenticate, users, createUser, updateUser, deleteUser } from '../../features/users/controllers/UsersController'

const router = express.Router();

router.post('/api/v1/authenticate', authenticate);

router.get('/api/v1/users', users)
      .post('/api/v1/users', [checkUserGroup(['admin'])], createUser)
      .put('/api/v1/users/:id([0-9]+)', [checkUserGroup(['admin'])], updateUser)
      .delete('/api/v1/users/:id([0-9]+)', [checkUserGroup(['admin'])], deleteUser);

export default router;