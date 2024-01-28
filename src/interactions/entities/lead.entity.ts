import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeadStatus, Source } from '../types';

@Entity()
export class Lead {
  constructor(props?: Partial<Lead>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

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
