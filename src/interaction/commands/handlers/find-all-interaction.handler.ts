import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Interaction } from 'interaction/entities/interaction.entity';
import { FindAllInteractionCommand } from '../find-all-interaction.command';

@Injectable()
@CommandHandler(FindAllInteractionCommand)
export class FindAllInteractionHandler
  implements ICommandHandler<FindAllInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(command: FindAllInteractionCommand): Promise<Interaction[]> {
    try {
      return this.interactionRepository.find({
        order: {
          id: 'ASC',
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
