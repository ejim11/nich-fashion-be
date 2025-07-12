import { PaymentVariant } from 'src/payments/payment-variant.entity';
import { ProductImage } from 'src/product-images/product-image.entity';
import { Product } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column('int')
  quantity: number;

  @Column({ default: false })
  soldOut: boolean;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @OneToMany(() => ProductImage, (image) => image.productVariant, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @OneToMany(() => PaymentVariant, (paymentVariant) => paymentVariant.variant)
  paymentVariants: PaymentVariant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
