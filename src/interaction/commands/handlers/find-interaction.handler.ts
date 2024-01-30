import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Interaction } from 'interaction/entities/interaction.entity';
import { FindInteractionCommand } from '../find-interaction.command ';

@Injectable()
@CommandHandler(FindInteractionCommand)
export class FindInteractionHandler
  implements ICommandHandler<FindInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(command: FindInteractionCommand): Promise<Interaction> {
    try {
      return this.interactionRepository.findOneByOrFail({
        id: command.id,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
