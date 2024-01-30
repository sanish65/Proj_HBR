import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { Lead } from './entities/lead.entity';
import { LeadController } from './https/controller/lead.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Lead])],
  controllers: [LeadController],
  providers: [...CommandHandlers],
})
export class LeadModule {}
