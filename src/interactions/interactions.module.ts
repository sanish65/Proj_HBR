import { Module } from '@nestjs/common';
import { InteractionsController } from './https/controller/interactions.controller';

@Module({
  imports: [],
  controllers: [InteractionsController],
  providers: [],
})
export class InteractionsModule {}
