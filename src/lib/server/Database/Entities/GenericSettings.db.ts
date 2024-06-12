import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm"


export enum GenericSettingsTypes {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    JSON="json"
}

@Entity()
export default class GenericSettings extends BaseEntity {
    @PrimaryColumn("varchar")
    key: string;

    @PrimaryColumn("enum", {enum: GenericSettingsTypes})
    type: GenericSettingsTypes

    @Column("varchar", {nullable: true})
    jsonValue: string;

    @Column("int", {nullable: true})
    intValue: number;

    @Column("varchar", {nullable: true})
    stringValue: string;

    @Column("boolean", {nullable: true})
    booleanValue: boolean;
}