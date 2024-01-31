import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { FindLeadsPerStatusCommand } from '../find-leads-per-status.command';

@Injectable()
@CommandHandler(FindLeadsPerStatusCommand)
export class FindLeadsPerStatusHandler
  implements ICommandHandler<FindLeadsPerStatusCommand>
{
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: FindLeadsPerStatusCommand): Promise<Lead[]> {
    try {
      return this.leadRepository
        .createQueryBuilder('lead')
        .select([
          'lead_id',
          'lead_name',
          'email',
          'lead_status',
          'source',
          'added_date',
        ])
        .groupBy('lead_name , lead_id')
        .orderBy('lead_id', 'ASC')
        .where('lead.lead_status = :status', { status: command.status })
        .getRawMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
