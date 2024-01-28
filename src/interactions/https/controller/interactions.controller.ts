import {
  Controller,
  Post,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { BulkSaveLeadCommand } from '../../commands/bulk-save-lead.command';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('csv_file'))
  @HttpCode(HttpStatus.OK)
  async uploadCSV(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'csv' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<void> {
    if (file) {
      await this.commandBus.execute(new BulkSaveLeadCommand(file));
    } else {
      console.log(`No file uploaded`);
    }
  }
}
