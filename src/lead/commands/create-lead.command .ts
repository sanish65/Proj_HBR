import { CreateLeadDto } from 'lead/dto/create-lead.dto';

export class CreateLeadCommand {
  constructor(readonly leadData: CreateLeadDto) {}
}
