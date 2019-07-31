import {
    Entity,
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm";
import { Length } from 'class-validator';

import { User } from "./User";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 50)
    description: string;

    @CreateDateColumn()
    createdAtDate: string;

    @UpdateDateColumn()
    updatedAtDate: string;

    @OneToMany(type => User, user => user.group)
    users: User[];
}
