import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm"

@Entity()
export default class Design extends BaseEntity {
    @PrimaryColumn("varchar")
    key: string;

    @Column("varchar")
    value: string;


    toJSON() {
        return {
            key: this.key,
            value: this.value
        }
    }
}