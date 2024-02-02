import { CreateLeadHandler } from './create-lead.handler';
import { DeleteLeadHandler } from './delete-lead.handler';
import { FindAllLeadHandler } from './find-all-lead.handler';
import { FindLeadsPerSourceHandler } from './find-lead-per-source.handler';
import { FindLeadsPerStatusHandler } from './find-lead-per-status.handler';
import { FindLeadHandler } from './find-lead.handler';
import { UpdateLeadHandler } from './update-lead.handler';

export const CommandHandlers = [
  CreateLeadHandler,
  UpdateLeadHandler,
  FindLeadHandler,
  FindAllLeadHandler,
  FindLeadsPerSourceHandler,
  FindLeadsPerStatusHandler,
  DeleteLeadHandler,
];
