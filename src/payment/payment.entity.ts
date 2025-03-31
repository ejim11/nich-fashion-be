import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { paymentStatus } from './enums/paymentStatus.enum';
import { ProductVariant } from 'src/product-variants/product-variants.entity';

/**
 * payment entity
 */
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: paymentStatus,
    default: paymentStatus.PENDING,
  })
  status: paymentStatus;

  @Column()
  provider: string;

  @Column({ unique: true })
  providerReference: string;

  @Column({ nullable: true })
  authorizationUrl?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: false })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => ProductVariant)
  @JoinTable({
    name: 'payment_variants',
    joinColumn: { name: 'paymentId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'variantId', referencedColumnName: 'id' },
  })
  variants: ProductVariant[];
}
