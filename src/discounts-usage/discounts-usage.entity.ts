import { Discount } from 'src/discounts/discounts.entity';
import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DiscountUsage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Discount)
  discount: Discount;

  @OneToOne(() => Order, (order) => order.discountUsage, { nullable: true })
  @JoinColumn()
  order: Order;

  @CreateDateColumn()
  usedAt: Date;
}
