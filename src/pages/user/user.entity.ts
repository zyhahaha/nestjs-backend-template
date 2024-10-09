import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("shop_user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成

    @Column({ length:50 })
    username: string;

    @Column({ length: 50})
    password: string;

    @Column({ length: 50 })
    password_salt:string;

    @Column({default:''})
    password_origin: string;

    @Column('tinyint')
    role:number

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    create_time: Date

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    update_time: Date
}
