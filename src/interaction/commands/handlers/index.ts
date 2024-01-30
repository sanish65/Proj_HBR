import { FindInteractionHandler } from './find-interaction.handler';
import { CreateInteractionHandler } from './create-interaction.handler';
import { UpdateInteractionHandler } from './update-interaction.handler';
import { FindAllInteractionHandler } from './find-all-interaction.handler';
import { FindAllLeadHandler } from 'lead/commands/handlers/find-all-lead.handler';

export const CommandHandlers = [
  CreateInteractionHandler,
  FindAllInteractionHandler,
  FindInteractionHandler,
  FindAllLeadHandler,
  UpdateInteractionHandler,
];
