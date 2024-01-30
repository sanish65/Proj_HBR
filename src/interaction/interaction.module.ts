import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from 'lead/entities/lead.entity';
import { CommandHandlers } from './commands/handlers';
import { Interaction } from './entities/interaction.entity';
import { InteractionController } from './https/controller/interaction.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Interaction, Lead])],
  controllers: [InteractionController],
  providers: [...CommandHandlers],
})
export class InteractionModule {}
