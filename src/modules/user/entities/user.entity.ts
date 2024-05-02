/* eslint-disable indent */
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity({ name: "dbUsers" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "username" })
    username: string;

    @Column({ name: "email" })
    email: string;

    @Column({ name: "password" })
    password: string;

    @Column({ name: "role" })
    role: string;

    @Column({ name: "token", default: null })
    token: string;

    @Column({ name: "token_expire_date", default: null })
    tokenDate: Date;

    @BeforeInsert()
    async beforeInsert() {
        const hashpwd = await bcrypt.hash(this.password, 10);
        this.password = hashpwd;
    }

    @BeforeUpdate()
    async beforeUpdate() {
        if(this.token)  {
            const hashtoken = await bcrypt.hash(this.token, 10);
            this.token = hashtoken;
        }

        if(this.password)  {
            const hashpwd = await bcrypt.hash(this.password, 10);
            this.password = hashpwd;
        }
    }
}