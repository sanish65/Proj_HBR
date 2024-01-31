import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Details, Interaction } from '../../entities/interaction.entity';
import { CreateInteractionCommand } from '../create-interaction.command ';
import { Lead } from 'lead/entities/lead.entity';
import { LeadStatus } from 'bulk-data/types';

@Injectable()
@CommandHandler(CreateInteractionCommand)
export class CreateInteractionHandler
  implements ICommandHandler<CreateInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: CreateInteractionCommand): Promise<Interaction> {
    try {
      const newInteraction = await this.interactionRepository.save({
        lead_id: command.interactionData.lead_id,
        interaction_type: command.interactionData.interaction_type,
        interaction_date: command.interactionData.interaction_date,
        details: command.interactionData.details as unknown as Details,
      });

      const lead = await this.leadRepository.findOneByOrFail({
        lead_id: command.interactionData.lead_id,
      });

      if (newInteraction && lead.lead_status === LeadStatus.NEW) {
        await this.leadRepository.update(
          {
            lead_id: command.interactionData.lead_id,
          },
          {
            lead_status: LeadStatus.CONTACTED,
          },
        );
      }
      return newInteraction;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
