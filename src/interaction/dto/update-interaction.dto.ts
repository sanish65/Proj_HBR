import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionDto } from './create-interaction.dto';
import {
  IsDate,
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { InteractionType } from 'bulk-data/types';

export class UpdateInteractionDto extends PartialType(CreateInteractionDto) {
  @IsOptional()
  @IsNumber()
  lead_id: number;

  @IsOptional()
  @IsEnum(InteractionType, { each: true })
  interaction_type: InteractionType;

  @IsOptional()
  @IsDate()
  interaction_date: Date;

  @IsOptional()
  @IsJSON()
  details: JSON;
}
