import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from './User';

@Entity({ name: "Goal" })
export class Goal{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ name: "user_id" })
    user_id: number;

    @ManyToOne(() => User, (user) => user.goal, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    user: User[];
}