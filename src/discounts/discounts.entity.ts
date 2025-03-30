import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  percentOff: number;

  @Column({ default: 1 })
  usageLimit: number;

  @Column({ type: 'timestamp', default: new Date() })
  validFrom: Date;

  @Column({ type: 'timestamp', nullable: true })
  validUntil: Date;
}
