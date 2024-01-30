import { UpdateInteractionDto } from '../dto/update-interaction.dto';

export class UpdateInteractionCommand {
  constructor(
    readonly id: number,
    readonly interactionData: UpdateInteractionDto,
  ) {}
}
