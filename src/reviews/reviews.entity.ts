import { Product } from 'src/products/product.entity';
import {
  Check,
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
  review: string;

  @Column({ type: 'int' })
  @Check('"stars" BETWEEN 1 AND 5') // This ad
  stars: number;

  @CreateDateColumn()
  dateCreated: Date;

  @ManyToOne(() => Product, (product) => product.reviews, {
    cascade: true,
    eager: true,
  })
  product: Product;
}
