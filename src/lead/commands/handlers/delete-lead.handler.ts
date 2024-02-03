import { Lead } from '../../entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteLeadCommand } from '../delete-lead.command ';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
@CommandHandler(DeleteLeadCommand)
export class DeleteLeadHandler implements ICommandHandler<DeleteLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: DeleteLeadCommand): Promise<DeleteResult> {
    try {
      return this.leadRepository.delete({
        lead_id: command.lead_d,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
