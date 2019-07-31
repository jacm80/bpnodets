import {MigrationInterface, QueryRunner} from "typeorm";
// import { User } from "../entity/User";
// import { Group } from "../entity/Group";


export class CreateAdminUser1564495946035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await getConnection().transaction(async  transactionalEntityManager => {
        //     const groupRepository = getRepository(Group);
        //     const userRepository = getRepository(User); 
        //     await queryRunner.query(`TRUNCATE TABLE "group";`);
        //     await queryRunner.query(`TRUNCATE TABLE "user";`);
            
        //     const groupAdmin = new Group();
        //     groupAdmin.description = 'admin';
        //     await transactionalEntityManager.save(groupAdmin);
    
        //     const groupUser = new Group();
        //     groupAdmin.description = 'user';
        //     await transactionalEntityManager.save(groupUser);
    
        //     const userAdmin = new User();
        //     userAdmin.firstName = 'Juan';
        //     userAdmin.lastName = 'Canepa';
        //     userAdmin.password = 'admin';
        //     userAdmin.email = 'jacanepa@gmail.com';
        //     userAdmin.group = groupAdmin;
        //     userAdmin.hashPassword();        
        //     await transactionalEntityManager.save(userAdmin);
    
        //     const userUser = new User();
        //     userUser.firstName = 'Luis';
        //     userUser.lastName = 'Gonzales';
        //     userUser.password = '123456';
        //     userAdmin.email = 'gluis@gmail.com';
        //     userUser.group = groupUser;
        //     userUser.hashPassword();        
        //     await transactionalEntityManager.save(userUser);
        // });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.dropTable("user");
        // await queryRunner.dropTable("group");
        // await queryRunner.createTable(new Table({
        //     name: "group",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true
        //         },
        //         {
        //             name: "description",
        //             type: "varchar",
        //         },
        //         {
        //             name: "createdAtDate",
        //             type: "datetime",
        //         },
        //         {
        //             name: "updatedAtDate",
        //             type: "datetime",
        //         }
        //     ]
        // }), true);
        // await queryRunner.createTable(new Table({
        //     name: "user",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true
        //         },
        //         {
        //             name: "firstName",
        //             type: "varchar",
        //         },
        //         {
        //             name: "lastName",
        //             type: "varchar",
        //         },
        //         {
        //             name: "birth",
        //             type: "date",
        //         },
        //         {
        //             name: "password",
        //             type: "varchar",
        //         },
        //         {
        //             name: "email",
        //             type: "varchar",
        //         },
        //         {
        //             name: "groupId",
        //             type: "int",
        //         },
        //         {
        //             name: "createdAtDate",
        //             type: "datetime",
        //         },
        //         {
        //             name: "updatedAtDate",
        //             type: "datetime",
        //         }
        //     ]
        // }), true);
        // await queryRunner.query(`
        // INSERT INTO "group" ("id", "description", "createdAtDate", "updatedAtDate")
        // VALUES
        //     (1, 'admin', '2019-07-30 00:00:00.000000', '2019-07-30 00:00:00.000000'),
        //     (2, 'user', '2019-07-30 00:00:00.000000', '2019-07-30 00:00:00.000000');
        // `);
        // await queryRunner.query(`
        //     INSERT INTO "user" ("id", "firstName", "lastName", "birth", "password", "email", "createdAtDate", "updatedAtDate", "groupId")
        //     VALUES
        //         (1, 'Gerson', 'Montenegro', '1980-01-01', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'montenegrogerson@gmail.com', 1, '2019-07-27 16:32:45.786062', '2019-07-27 17:41:06.000000'),
        //         (2, 'Juan', 'Canepa', '1980-10-17', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'jacanepa@gmail.com', 2, '2019-07-30 17:34:46.721695', '2019-07-30 17:34:46.000000');
        // `);
    }
}
