import { Discount } from 'src/discounts/discounts.entity';
import { User } from 'src/users/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  //   @ManyToOne(() => Order)
  //   order: Order;

  @CreateDateColumn()
  usedAt: Date;
}
