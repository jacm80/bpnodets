import { Request, Response, NextFunction } from "express";
import * as jwt from 'jwt-simple';

import UserDao from '../features/users/customRepository/UserRepository';
const userDao = new UserDao();

const getIdFromToken = (req: Request): number => {
  const { headers: { authorization } } = req;
  const token = authorization.replace('authorization ', '');
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  return payload.id;
}

export const checkUserGroup = (groups: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = getIdFromToken(req);
      const user = await userDao.getUser(id);
      if (groups.indexOf(user.group.description) > -1) next();
      else res.status(401).send();
    } catch (err) {
      res.status(401).send();
    }
  };
};