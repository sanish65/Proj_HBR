import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Lead } from '../lead/entities/lead.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { MulterModule } from '@nestjs/platform-express';
import { Interaction } from '../interaction/entities/interaction.entity';
import { UploadCSVController } from './https/controller/upload-csv.controller';
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Lead, Interaction]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UploadCSVController],
  providers: [...CommandHandlers],
})
export class BulkDataModule {}
