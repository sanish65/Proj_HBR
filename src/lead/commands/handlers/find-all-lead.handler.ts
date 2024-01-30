import { Lead } from '../../entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllLeadCommand } from '../find-all-lead.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
@CommandHandler(FindAllLeadCommand)
export class FindAllLeadHandler implements ICommandHandler<FindAllLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: FindAllLeadCommand): Promise<Lead[]> {
    try {
      return this.leadRepository.find({
        order: {
          lead_id: 'ASC',
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
