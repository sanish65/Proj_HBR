import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Lead } from '../../entities/lead.entity';
import { UpdateLeadCommand } from '../update-lead.command ';

@Injectable()
@CommandHandler(UpdateLeadCommand)
export class UpdateLeadHandler implements ICommandHandler<UpdateLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: UpdateLeadCommand): Promise<UpdateResult> {
    try {
      return this.leadRepository.update(
        {
          lead_id: command.lead_d,
        },
        {
          lead_name: command.leadData.lead_name,
          email: command.leadData.email,
          lead_status: command.leadData.lead_status,
          source: command.leadData.source,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
