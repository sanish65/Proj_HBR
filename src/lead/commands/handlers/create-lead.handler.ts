import { Repository } from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeadCommand } from '../create-lead.command ';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateLeadCommand)
export class CreateLeadHandler implements ICommandHandler<CreateLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: CreateLeadCommand): Promise<Lead> {
    try {
      return this.leadRepository.save({
        lead_name: command.leadData.lead_name,
        email: command.leadData.email,
        lead_status: command.leadData.lead_status,
        source: command.leadData.source,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
