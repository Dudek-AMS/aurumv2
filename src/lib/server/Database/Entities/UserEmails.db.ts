import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm"
import User from "$lib/server/Database/Entities/User.db";

@Entity()
export default class UserEmails extends BaseEntity {
    @ManyToOne(() => User, user => user.emails)
    user: User;

    @PrimaryColumn("varchar")
    value: string;

    @Column("varchar")
    type: string;

    @Column("boolean")
    primary: boolean;

    @Column("varchar")
    display: string;

}