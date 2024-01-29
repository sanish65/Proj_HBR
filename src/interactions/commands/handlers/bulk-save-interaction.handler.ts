import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { readFileSync, unlink } from 'fs';
import { Lead } from '../../entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BulkSaveInteractionCommand } from '../bulk-save-interaction.command ';
import { Interaction } from '../../entities/interaction.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csv-parser');

@Injectable()
@CommandHandler(BulkSaveInteractionCommand)
export class BulkSaveInteractionHandler
  implements ICommandHandler<BulkSaveInteractionCommand>
{
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionRepository: Repository<Interaction>,
  ) {}

  async execute(command: BulkSaveInteractionCommand): Promise<void> {
    let rawCSVFile = '';
    let csvFileArray: string[] = [];
    let headersMatch = false;
    const csvJSONArray: Interaction[] = [];
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
              csvObject[key] = value;
            }
          }
          csvJSONArray.push(csvObject as Interaction);
        })
        .on('end', async () => {
          try {
            for (const data of csvJSONArray) {
              await this.interactionRepository.insert({
                lead_id: Number(data['lead_id']),
                interaction_type: data['interaction_type'],
                interaction_date: data['interaction_date'],
                details: data['details'],
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
  interaction_type: 'interaction_type',
  interaction_date: 'interaction_date',
  details: 'details',
};
