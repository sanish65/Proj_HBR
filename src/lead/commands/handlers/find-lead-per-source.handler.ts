import { Lead } from '../../entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { FindLeadsPerSourceCommand } from '../find-leads-per-source.command ';

@Injectable()
@CommandHandler(FindLeadsPerSourceCommand)
export class FindLeadsPerSourceHandler
  implements ICommandHandler<FindLeadsPerSourceCommand>
{
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: FindLeadsPerSourceCommand): Promise<Lead[]> {
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
        .where('lead.source = :source', { source: command.source })
        .getRawMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
