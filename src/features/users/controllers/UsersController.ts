import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as jwt  from  'jwt-simple';
import * as crypto from 'crypto';

import { User } from "../../../entity/User";
import UserDao from '../dao/UserDao';

dotenv.config();

const userDao = new UserDao();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticate = async (req: any, res: any) => {
    const { email, password } = req.body;
    if (!email || !password){
		res.status(401)
		   .json({ success: false, error: 'missing credentials' });
    }
    try {
        if (await userDao.isUserValid(email, password)) {
            const payload = {
                user: email,
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

const users = async (req: any, res: any) => {
    const { itemsPerPage, page } = req.query;
    let paginate = { itemsPerPage: 10, page: 1};
    if (itemsPerPage) paginate = { ...paginate, itemsPerPage };
    if (page)  paginate = { ...paginate, page };
    const users = await userDao.getUsers(paginate);
    res.json({ success: true, data: users });
};

const createUser = async (req: any, res: any) => {
    const { firstName, lastName, birth, email, password } = req.body;
    try {
        const shasum = crypto.createHash('sha1');
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.birth = birth;
        newUser.email = email;
        shasum.update(password);
        newUser.password = shasum.digest('hex');
        await userDao.createUser(newUser);
        res.status(201)
           .json({ success: true, data: newUser });
    } catch(err) {
        res.status(406).json({ success: false, error: err.message });
    }
}

const updateUser = async (req: any, res: any) => {
    const { id } = req.params;
    const { firstName, lastName, birth, email, password } = req.body;
    try {
        const user = await userDao.getUser(id);
        let userUpdated = { };
        if (user) {
            if (firstName) userUpdated = { ...userUpdated, firstName };
            if (lastName) userUpdated = { ...userUpdated, lastName };
            if (birth) userUpdated = { ...userUpdated, birth }
            if (email) userUpdated = { ...userUpdated, email };
            if (password) { 
                const shasum = crypto.createHash('sha1');
                shasum.update(password);
                const newPassword = shasum.digest('hex');
                userUpdated = {
                    ...userUpdated,
                    ...{ password: newPassword }
                } 
            }
            if (Object.keys(userUpdated).length === 0){
                return res
                        .status(204)
                        .json({ success: false, data: 'No Content' });
            }
            await userDao.updateUser(id, userUpdated as User);
            return res.json({ success: true, data: userUpdated });
        }
        return res
                .status(404)
                .json({ success: false, error: 'User not found' });
    } catch(err) {
        res.json({ success: false, error: err.message });
    }
}

const deleteUser = async (req: any, res: any) => {
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