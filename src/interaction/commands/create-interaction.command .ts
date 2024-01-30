import { CreateInteractionDto } from 'interaction/dto/create-interaction.dto';

export class CreateInteractionCommand {
  constructor(readonly interactionData: CreateInteractionDto) {}
}
