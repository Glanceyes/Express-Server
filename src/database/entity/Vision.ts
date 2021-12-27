import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "Visions" })
export class Vision {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ name: "user_id"})
    user_id: number;

    @ManyToOne(() => User, 
    (user) => user.vision, { 
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user: User;

}