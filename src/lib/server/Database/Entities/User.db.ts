import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm"
import UserEmails from "$lib/server/Database/Entities/UserEmails.db";
import Auditlog from "$lib/server/Database/Entities/Auditlog.db";


@Entity()
@Unique('user_username', ["userName"])
@Unique('user_entraid', ["entraId"])
export default class User extends BaseEntity {
    @PrimaryColumn("varchar")
    id: string;

    @Column("varchar")
    userName: string;

    @Column("varchar")
    givenName: string;

    @Column("varchar")
    familyName: string;

    @Column("varchar")
    displayName: string;

    @Column("boolean")
    active: boolean;

    @Column("varchar")
    entraId: string;

    @OneToMany(() => UserEmails, email => email.user)
    emails: UserEmails[];


    @OneToMany(() => Auditlog, log => log.user)
    logs: Auditlog[];



    static async getSysadmin() : Promise<User> {
        return await User.findOneBy({
            id: '00000000-0000-0000-0000-000000000000'
        }) as User;
    }

}
