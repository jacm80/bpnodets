import * as express from 'express';
// import multer from 'multer';

import { authenticate, users, createUser, updateUser, deleteUser } from '../../features/users/controllers/UsersController'

const router = express.Router();

router.post('/api/v1/authenticate', authenticate);

router.get('/api/v1/users', users)
      .post('/api/v1/users', createUser)
      .put('/api/v1/users/:id', updateUser)
      .delete('/api/v1/users/:id', deleteUser);

export default router;