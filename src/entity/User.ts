import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne
} from "typeorm";
import * as crypto from 'crypto';
import { IsEmail, Length, IsDate } from 'class-validator';

import { Group } from "./Group";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 50)
    firstName: string;

    @Column()
    @Length(3, 50)
    lastName: string;

    @Column({ type: "date" })
    @IsDate()
    birth: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAtDate: string;

    @UpdateDateColumn()
    updatedAtDate: string;

    @ManyToOne(type => Group, group => group.description)
    group: Group;

    hashPassword() {
        const shasum = crypto.createHash('sha1');
        shasum.update(this.password);
        this.password = shasum.digest('hex');
    }
}
