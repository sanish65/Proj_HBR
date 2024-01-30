import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { readFileSync, unlink } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Lead } from '../../../lead/entities/lead.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BulkSaveLeadCommand } from '../bulk-save-lead.command';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csv-parser');

@Injectable()
@CommandHandler(BulkSaveLeadCommand)
export class BulkSaveLeadHandler
  implements ICommandHandler<BulkSaveLeadCommand>
{
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async execute(command: BulkSaveLeadCommand): Promise<void> {
    let rawCSVFile = '';
    let csvFileArray: string[] = [];
    let headersMatch = false;
    const csvJSONArray: Lead[] = [];
    try {
      const csvFile = readFileSync(command.file.path);
      rawCSVFile = csvFile.toString();
      csvFileArray = rawCSVFile.split('\n');
      const header = csvFileArray[0]
        .split(',')
        .filter((column) => column.trim() !== '');
      headersMatch = await header.some((columnName) =>
        requiredHeaders.hasOwnProperty(columnName),
      );
    } catch (err) {
      await this.removeCSVFile(command.file);
      console.log(`Something went wrong while reading CSV file`);
    }

    if (csvFileArray.length < 2 || !headersMatch) {
      await this.removeCSVFile(command.file);
      throw new BadRequestException('Incorrect CSV format');
    } else {
      const stream = Readable.from(rawCSVFile);
      stream
        .pipe(csv())
        .on('data', (data) => {
          const csvObject = {};
          for (const [key, value] of Object.entries(data)) {
            const conformedHeader = requiredHeaders[key];
            if (!!conformedHeader) {
              csvObject[conformedHeader] = value === '' ? '-' : value;
            }
          }
          csvJSONArray.push(csvObject as Lead);
        })
        .on('end', async () => {
          try {
            for (const data of csvJSONArray) {
              await this.leadRepository.insert({
                lead_name: data['lead_name'],
                lead_status: data['lead_status'],
                source: data['source'],
                email: data['email'],
              });
              console.log(`upload csv data into lead table`);
            }
            await this.removeCSVFile(command.file);
          } catch (err) {
            await this.removeCSVFile(command.file);
            throw new BadRequestException(err);
          }
        });
    }
  }

  /*
    Remove csv file after processing it
  */
  async removeCSVFile(file) {
    await unlink(file.path, (err) => {
      if (err) {
        console.log(`Failed to remove file: ${file.path}`);
      } else {
        console.log(
          `successfully removed uploaded csv file after processing it: ${file.path}`,
        );
      }
    });
  }
}

const requiredHeaders: Record<string, string> = {
  lead_id: 'lead_id',
  lead_name: 'lead_name',
  lead_status: 'lead_status',
  source: 'source',
  email: 'email',
};
