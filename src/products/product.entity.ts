import { ProductVariant } from 'src/product-variants/product-variants.entity';
import { Review } from 'src/reviews/reviews.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column()
  category: string;

  @Column()
  dressStyle: string;

  @Column()
  clothType: string;

  @Column()
  material: string;

  @Column()
  brand: string;

  @Column()
  shortDescription: string;

  @Column('text', { array: true })
  longDescription: string;

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants?: ProductVariant[];

  @OneToMany(() => Review, (review) => review.product)
  reviews?: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
