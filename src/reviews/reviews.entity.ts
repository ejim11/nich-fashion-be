import { Product } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reviewer: string;

  @Column('text')
  comment: string;

  @Column()
  stars: number;

  @CreateDateColumn()
  dateCreated: Date;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;
}
