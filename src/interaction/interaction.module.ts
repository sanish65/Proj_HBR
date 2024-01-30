import { Module } from '@nestjs/common';
import { InteractionController } from './interaction.controller';

@Module({
  controllers: [InteractionController],
  providers: [],
})
export class InteractionModule {}
