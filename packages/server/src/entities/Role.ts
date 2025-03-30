import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column('jsonb')
  permissions!: Record<string, any>;

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];

  @CreateDateColumn()
  createdAt!: Date;
}
