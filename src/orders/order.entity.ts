import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';
import { Product } from 'src/products/product.entity';
import { DiscountUsage } from 'src/discounts-usage/discounts-usage.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PLACED,
    nullable: false,
  })
  orderStatus: OrderStatus;

  @Column({ nullable: true })
  carrier?: string;

  @Column({ nullable: true })
  carrierPhoneNumber?: string;

  @Column()
  deliveryAddress: string;

  @Column()
  deliveryPicker: string;

  @Column({ nullable: true })
  estimatedDeliveryDate?: Date;

  @Column()
  userId: string;

  @Column('decimal', { nullable: true })
  discountApplied?: number;

  @OneToOne(() => DiscountUsage, (discountUsage) => discountUsage.order)
  discountUsage: DiscountUsage;

  @Column()
  totalAmount: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];
}
