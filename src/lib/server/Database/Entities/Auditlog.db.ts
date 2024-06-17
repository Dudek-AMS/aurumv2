import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn, RelationId,
    Unique
} from "typeorm"
import User from "$lib/server/Database/Entities/User.db";


export enum AuditlogTypes {
    SETTINGS = "settings",
    UNKNOWN = "unknown",
    SYSADMINLOGIN = "sysadminlogin",
}
export interface AuditlogPayload {
    oldValue?: any;
    newValue: any;
    key?: string;
}
@Entity()
export default class Auditlog extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.logs)
    user: User;

    @RelationId((log: Auditlog) => log.user)
    userId: string;

    @Column("enum", {enum: AuditlogTypes, default: AuditlogTypes.UNKNOWN, nullable: true})
    type: AuditlogTypes;

    @Column("jsonb")
    payload: AuditlogPayload;

    @CreateDateColumn()
    createdDate: Date
}