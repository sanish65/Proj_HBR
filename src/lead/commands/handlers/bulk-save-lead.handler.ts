import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { readFileSync, unlink } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLeadCommand } from '../bulk-save-interaction.command ';
import { Lead } from '../../entities/lead.entity';

@Injectable()
@CommandHandler(CreateLeadCommand)
export class CreateLeadHandler implements ICommandHandler<CreateLeadCommand> {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: CreateLeadCommand): Promise<void> {
    try {
      
    } catch() {
    
  }
}
}

 