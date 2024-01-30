import { Lead } from '../../entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLeadCommand } from '../find-lead.command ';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
@CommandHandler(FindLeadCommand)
export class FindLeadHandler implements ICommandHandler<FindLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: FindLeadCommand): Promise<Lead> {
    try {
      return this.leadRepository.findOneByOrFail({ lead_id: command.id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
