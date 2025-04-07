import { Payment } from 'src/payments/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BankTransfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  imageProof: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  amount: number;

  @OneToOne(() => Payment, { eager: true })
  @JoinColumn()
  payment: Payment;

  @Column({ nullable: false, default: false })
  isConfirmed: boolean;
}
