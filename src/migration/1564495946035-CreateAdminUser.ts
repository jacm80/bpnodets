import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { User } from "../entity/User";
import { Group } from "../entity/Group";


export class CreateAdminUser1564495946035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await getConnection().transaction(async  transactionalEntityManager => {
            // const groupRepository = getRepository(Group);
            // const userRepository = getRepository(User);
            const groupAdmin = new Group();
            groupAdmin.description = 'admin';
            await transactionalEntityManager.save(groupAdmin);
    
            const groupUser = new Group();
            groupAdmin.description = 'user';
            await transactionalEntityManager.save(groupUser);
    
            const userAdmin = new User();
            userAdmin.firstName = 'Juan';
            userAdmin.lastName = 'Canepa';
            userAdmin.password = 'admin';
            userAdmin.email = 'jacanepa@gmail.com';
            userAdmin.group = groupAdmin;
            userAdmin.hashPassword();        
            await transactionalEntityManager.save(userAdmin);
    
            const userUser = new User();
            userUser.firstName = 'Luis';
            userUser.lastName = 'Gonzales';
            userUser.password = '123456';
            userAdmin.email = 'gluis@gmail.com';
            userUser.group = groupUser;
            userUser.hashPassword();        
            await transactionalEntityManager.save(userUser);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        
    }

}
