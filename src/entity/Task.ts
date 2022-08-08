import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true })
  task?: string;

  @ManyToMany(() => User, (user) => user.email, { cascade: true })
  @JoinTable()
  email?: User[];
}
