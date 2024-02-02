import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Interaction } from 'interaction/entities/interaction.entity';
import { FindInteractionCommand } from '../find-interaction.command ';
import { FindInteractionByLeadIdCommand } from '../find-interaction-by-leadId.command ';

@Injectable()
@CommandHandler(FindInteractionByLeadIdCommand)
export class FindInteractionByLeadIdHandler
  implements ICommandHandler<FindInteractionByLeadIdCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(
    command: FindInteractionByLeadIdCommand,
  ): Promise<Interaction[]> {
    try {
      const a = await this.interactionRepository.findBy({
        lead_id: command.id,
      });

      console.log(a);
      return a;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
