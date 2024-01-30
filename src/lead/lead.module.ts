import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';

@Module({
  controllers: [LeadController],
  providers: [],
})
export class LeadModule {}
