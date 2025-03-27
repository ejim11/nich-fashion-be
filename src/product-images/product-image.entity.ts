import { ProductVariant } from 'src/product-variants/product-variants.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imagePath: string;

  @Column('int', { default: 0 })
  displayOrder: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  productVariant: ProductVariant;
}
