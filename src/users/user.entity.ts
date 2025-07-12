import { Role } from 'src/auth/enums/role-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * user entity for user table in the database
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  firstName?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  country?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  state?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  city?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  streetAddress?: string;

  @Column({
    nullable: true,
  })
  zipCode?: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  otp?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  otpExpire?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
