import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  firstname!: string;

  @Column('text')
  paternalLastName!: string;

  @Column('text')
  maternalLastName!: string;

  @Column('date')
  dateOfBirth!: Date;

  @Column('text', { unique: true })
  email!: string;

  @Column('char', { length: 2 })
  countryCode!: string;

  @Column('text', { unique: true })
  phoneNumber!: string;

  @Column('text', { select: false })
  password!: string;

  @Column('boolean', { default: true })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
