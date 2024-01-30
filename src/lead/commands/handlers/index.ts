import { CreateLeadHandler } from './create-lead.handler';
import { FindAllLeadHandler } from './find-all-lead.handler';
import { FindLeadHandler } from './find-lead.handler';
import { UpdateLeadHandler } from './update-lead.handler';

export const CommandHandlers = [
  CreateLeadHandler,
  UpdateLeadHandler,
  FindLeadHandler,
  FindAllLeadHandler,
];
