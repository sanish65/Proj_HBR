import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Details, Interaction } from '../../entities/interaction.entity';
import { CreateInteractionCommand } from '../create-interaction.command ';

@Injectable()
@CommandHandler(CreateInteractionCommand)
export class CreateInteractionHandler
  implements ICommandHandler<CreateInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(command: CreateInteractionCommand): Promise<Interaction> {
    try {
      return this.interactionRepository.save({
        lead_id: command.interactionData.lead_id,
        interaction_type: command.interactionData.interaction_type,
        interaction_date: command.interactionData.interaction_date,
        details: command.interactionData.details as unknown as Details,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
