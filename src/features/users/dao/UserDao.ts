import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { User } from '../../../entity/User';

export default class UserDao {
    createUser(user: User): Promise<User> {
        return getManager().getRepository(User).save(user);
    }
    async isUserValid(email: string, password: string) {
       const user = await getManager().getRepository(User).findOne({ email, password });
       return (user !== undefined);
    }
    getUsers({ itemsPerPage, page }): Promise<User[]> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('User')
            .select([
                'User.id',
                'User.firstName',
                'User.lastName',
                'User.birth',
                'User.email',
                'User.createdAtDate',
                'User.updatedAtDate'
                ])
            .take(itemsPerPage)
            .skip(page)
            .getMany()
    }
    getUser(idUser: number): Promise<User> {
        return getManager().getRepository(User).findOne({
            where: {
                id: idUser
            }
        })
    }
    updateUser(idUser: number, data: User): Promise<UpdateResult> {
        return getManager().getRepository(User).update({ id: idUser}, data);
    }
    deleteUser(idUser: number): Promise<DeleteResult> {
        return getManager().getRepository(User).delete({ id: idUser});
    }
}