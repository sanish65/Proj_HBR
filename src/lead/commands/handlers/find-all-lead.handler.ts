import { Lead } from '../../entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllLeadCommand, ILead } from '../find-all-lead.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Interaction } from 'interaction/entities/interaction.entity';

@Injectable()
@CommandHandler(FindAllLeadCommand)
export class FindAllLeadHandler implements ICommandHandler<FindAllLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: FindAllLeadCommand): Promise<ILead[]> {
    try {
      const aggregatedLeadsData = await this.leadRepository
        .createQueryBuilder('lead')
        .leftJoin(
          Interaction,
          'interaction',
          'interaction.lead_id = lead.lead_id',
        )
        .select([
          'lead.lead_id',
          'lead.lead_name',
          'lead.lead_status',
          'lead.email',
          'lead.source',
          'lead.added_date',
          'lead.updated_date',
          'COUNT(interaction.lead_id) AS interaction_count',
        ])
        .groupBy('lead.lead_id')
        .getRawMany();

      const structuredLeadsData = aggregatedLeadsData.map((data) => {
        return {
          lead_id: data.lead_lead_id,
          lead_name: data.lead_lead_name,
          email: data.lead_email,
          lead_status: data.lead_lead_status,
          source: data.lead_source,
          added_date: data.lead_added_date,
          updated_date: data.lead_updated_date,
          interaction_count: data.interaction_count,
        };
      });

      return structuredLeadsData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
