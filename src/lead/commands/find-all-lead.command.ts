export class FindAllLeadCommand {}

export interface ILead {
  readonly lead_id: number;
  readonly lead_name: string;
  readonly email: string;
  readonly lead_status: string;
  readonly source: string;
  readonly added_date: Date;
  readonly updated_date: Date;
  readonly interaction_count: string;
}
