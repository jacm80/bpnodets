import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as jwt  from  'jwt-simple';
// import * as crypto from 'crypto';
import {Request, Response} from "express";

import { User } from "../../../entity/User";
import UserDao from '../customRepository/UserRepository';

dotenv.config();

const userDao: UserDao = new UserDao();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET;

const authenticate = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password){
		res.status(401)
		   .json({ success: false, error: 'missing credentials' });
    }
    try {
        const user:User = await userDao.isUserValid(email, password);
        if (user) {
            const payload = {
                id: user.id,
                user: email,
                group: user.group,
                iat: moment().unix(),
                exp: moment().add(14, "days").unix(),
            };
            return res.json({ success: true, token: jwt.encode(payload,TOKEN_SECRET) });
        } 
        return res.json({ success: false, message: 'invalid user!' });
    } catch (err){
		console.log('error authenticate: ',err);
		res.status(401)
		   .json({ success: false, error: err });
	}
};

const users = async (req: Request, res: Response) => {
    const { itemsPerPage, page } = req.query;
    let paginate = { itemsPerPage: 10, page: 0};
    if (itemsPerPage) paginate = { ...paginate, itemsPerPage };
    if (page)  paginate = { ...paginate, page };
    const users = await userDao.getUsers(paginate);
    res.json({ success: true, data: users });
};

const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, birth, email, password } = req.body;
    try {
        // const shasum = crypto.createHash('sha1');
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.birth = birth;
        newUser.email = email;
        // shasum.update(password);
        // newUser.password = shasum.digest('hex');
        newUser.hashPassword();
        await userDao.createUser(newUser);
        res.status(201)
           .json({ success: true, data: newUser });
    } catch(err) {
        res.status(406).json({ success: false, error: err.message });
    }
}

const updateUser = async (req: Request, res: Response)  => {
    const { id } = req.params;
    const { firstName, lastName, birth, email, password } = req.body;
    try {
        const user = await userDao.getUser(id);
        if (user){
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (birth) user.birth = birth;
            if (email) user.email = email;
            if (password) {
                user.password;
                user.hashPassword();
            }
            if (Object.keys(req.body).length === 0){
                return res
                        .status(204)
                        .json({ success: false, data: 'No Content' });
            }
            await userDao.updateUser(id, user);
            return res.json({ success: true, data: user });
        } else res.status(404).json({ success: false, error: 'User not found' });
    } catch(err) {
        res.json({ success: false, error: err.message });
    }
}


const deleteUser = async (req: Request, res: Response)  => {
    const { id } = req.params;
    try {
        const user = await userDao.getUser(id);
        if (user) {
            await userDao.deleteUser(id);
            return res.json({ success: true, data: user });
        }
        return res.status(404).json({ success: false, error: 'User not found' });
    } catch(err) {
        res.json({ success: false, error: err.message });
    }
}

export { authenticate, users, createUser, updateUser, deleteUser };