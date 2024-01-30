import { InteractionType } from 'bulk-data/types';
import { IsDate, IsEnum, IsJSON, IsNumber, IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsNumber()
  lead_id: number;

  @IsEnum(InteractionType, { each: true })
  interaction_type: InteractionType;

  @IsDate()
  interaction_date: Date;

  @IsJSON()
  details: JSON;
}
