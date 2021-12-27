import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    Index,
} from "typeorm";
import { Vision } from "./Vision";
import { Goal } from './Goal';

@Entity({ name: "User" })
@Index(["email", "phone_number"], { unique: true })
export class User{
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    join_date: string;
    @Column()
    birthday_year: number;
    @Column()
    birthday_month: number;
    @Column()
    birthday_day: number;
    @Column()
    gender: number;
    @Column()
    age: number;
    @Column()
    name: string;
    @Column()
    phone_number: string;

    @OneToMany(() => Vision, (vision) => vision.user, {
        onDelete: "CASCADE",
    })
    vision: Vision[];

    @OneToMany(() => Goal, (goal) => goal.user, {
        onDelete: "CASCADE",
    })
    goal: Goal[];

    
}