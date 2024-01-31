import { LeadStatus, Source } from '../../bulk-data/types';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  lead_name: string;

  @IsEmail()
  email: string;

  @IsEnum(LeadStatus, { each: true })
  lead_status: LeadStatus;

  @IsEnum(Source, { each: true })
  source: Source;
}
