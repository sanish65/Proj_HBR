import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { DeleteInteractionCommand } from '../delete-interaction.command ';
import { Interaction } from '../../entities/interaction.entity';

@Injectable()
@CommandHandler(DeleteInteractionCommand)
export class DeleteInteractionHandler
  implements ICommandHandler<DeleteInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(command: DeleteInteractionCommand): Promise<DeleteResult> {
    try {
      return this.interactionRepository.delete({
        id: command.interaction_id,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
