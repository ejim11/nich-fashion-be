import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Event } from 'src/events/event.entity';
// import { accountType } from './enums/account-type.enum';
// import { Role } from 'src/auth/enums/role-type.enum';

/**
 * user entity for user table in the database
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
    select: false,
  })
  @Exclude()
  password?: string;

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
  resetOtp?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  resetOtpExpire?: Date;

  // @OneToMany(() => Event, (event) => event.owner)
  // events: Event[];
}
