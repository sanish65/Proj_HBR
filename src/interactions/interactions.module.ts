import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { Interaction } from './entities/interaction.entity';
import { Lead } from './entities/lead.entity';
import { InteractionsController } from './https/controller/interactions.controller';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Lead, Interaction]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [InteractionsController],
  providers: [...CommandHandlers],
})
export class InteractionsModule {}
