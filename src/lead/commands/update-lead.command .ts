import { UpdateLeadDto } from '../dto/update-lead.dto';

export class UpdateLeadCommand {
  constructor(
    readonly lead_d: number,
    readonly leadData: UpdateLeadDto,
  ) {}
}
