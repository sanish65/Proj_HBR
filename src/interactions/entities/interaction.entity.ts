import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InteractionType } from '../types';
import { Lead } from './lead.entity';

import { IsString, IsDate } from 'class-validator';

class Details {
  @IsDate()
  follow_up_date: Date;

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
  readonly interaction_id: number;

  @ManyToOne(() => Lead, (lead) => lead.lead_id)
  lead_id: Lead;

  @Column({ type: 'text', nullable: false })
  readonly email: string;

  @Column({ type: 'varchar', default: null })
  readonly interaction_type: InteractionType;

  @CreateDateColumn()
  readonly interaction_date: Date;

  @Column({ type: 'jsonb', nullable: true })
  readonly details: Details;

  @UpdateDateColumn()
  readonly updated_date: Date;
}
