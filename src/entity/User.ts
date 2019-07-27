import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "date" })
    birth: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAtDate: string;

    @UpdateDateColumn()
    updatedAtDate: string;

}
