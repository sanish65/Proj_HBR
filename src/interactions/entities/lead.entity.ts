import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeadStatus, Source } from '../types';
import { Interaction } from './interaction.entity';

@Entity()
export class Lead {
  constructor(props?: Partial<Lead>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryGeneratedColumn({ type: 'int' })
  @OneToMany(() => Interaction, (interaction) => interaction.lead_id)
  readonly lead_id: number;

  @Column({ type: 'text', nullable: false })
  readonly lead_name: string;

  @Column({ type: 'text', nullable: false })
  readonly email: string;

  @Column({ type: 'varchar', default: LeadStatus.NEW })
  readonly lead_status: LeadStatus;

  @Column({ type: 'varchar', default: null })
  readonly source: Source;

  @CreateDateColumn()
  readonly added_date: Date;

  @UpdateDateColumn()
  readonly updated_date: Date;

  @DeleteDateColumn()
  readonly deleted: Date;
}
