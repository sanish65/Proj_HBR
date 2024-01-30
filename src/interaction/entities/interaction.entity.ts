import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InteractionType } from '../../bulk-data/types';
import { Lead } from '../../lead/entities/lead.entity';

import { IsString, IsDate, IsOptional } from 'class-validator';

export class Details {
  @IsOptional()
  @IsDate()
  follow_up_date: Date;

  @IsOptional()
  @IsString()
  priority: string;
}

@Entity()
export class Interaction {
  constructor(props?: Partial<Interaction>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id: number;

  @ManyToOne(() => Lead, (lead) => lead.lead_id)
  @JoinColumn({ name: 'lead_id' })
  readonly lead_id: number;

  @Column({ type: 'varchar', default: null })
  readonly interaction_type: InteractionType;

  @Column({ type: Date, default: null })
  readonly interaction_date: Date;

  @Column({ type: 'jsonb', nullable: true })
  readonly details: Details;

  @UpdateDateColumn()
  readonly updated_date: Date;
}
