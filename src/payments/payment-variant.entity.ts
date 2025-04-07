import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { ProductVariant } from 'src/product-variants/product-variants.entity';

@Entity('payment_variants')
export class PaymentVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paymentId: string;

  @Column()
  variantId: string;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Payment, (payment) => payment.paymentVariants)
  payment: Payment;

  @ManyToOne(() => ProductVariant, (variant) => variant.paymentVariants)
  variant: ProductVariant;
}
