import { PartialType } from '@nestjs/mapped-types';
import { LeadStatus, Source } from '../../bulk-data/types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateLeadDto } from './create-lead.dto';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {
  @IsOptional()
  @IsString()
  lead_name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(LeadStatus, { each: true })
  lead_status: LeadStatus;

  @IsOptional()
  @IsEnum(Source, { each: true })
  source: Source;
}
