import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Details, Interaction } from 'interaction/entities/interaction.entity';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UpdateInteractionCommand } from '../update-interaction.command ';

@Injectable()
@CommandHandler(UpdateInteractionCommand)
export class UpdateInteractionHandler
  implements ICommandHandler<UpdateInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(command: UpdateInteractionCommand): Promise<UpdateResult> {
    try {
      return this.interactionRepository.update(
        {
          id: command.id,
        },
        {
          lead_id: command.interactionData.lead_id,
          interaction_type: command.interactionData.interaction_type,
          interaction_date: command.interactionData.interaction_date,
          details: command.interactionData.details as unknown as Details,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
