import { FindInteractionHandler } from './find-interaction.handler';
import { CreateInteractionHandler } from './create-interaction.handler';
import { UpdateInteractionHandler } from './update-interaction.handler';
import { FindAllInteractionHandler } from './find-all-interaction.handler';
import { FindAllLeadHandler } from 'lead/commands/handlers/find-all-lead.handler';
import { FindInteractionByLeadIdHandler } from './find-interaction-by-leadId.handler';

export const CommandHandlers = [
  CreateInteractionHandler,
  FindAllInteractionHandler,
  FindInteractionHandler,
  FindAllLeadHandler,
  UpdateInteractionHandler,
  FindInteractionByLeadIdHandler,
];
