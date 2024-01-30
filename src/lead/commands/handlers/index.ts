import { BulkSaveInteractionHandler } from './bulk-save-interaction.handler';
import { BulkSaveLeadHandler } from './bulk-save-lead.handler';

export const CommandHandlers = [
  BulkSaveLeadHandler,
  BulkSaveInteractionHandler,
];
