import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DeliveryState {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  state: string;

  @Column()
  fee: number;

  @CreateDateColumn()
  dateCreated: Date;

  @BeforeInsert()
  @BeforeUpdate()
  transformToLowercase() {
    if (this.state) {
      this.state = this.state.toLowerCase();
    }
  }
}
