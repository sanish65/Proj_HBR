import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateLeadCommand } from 'lead/commands/create-lead.command ';
import { DeleteLeadCommand } from 'lead/commands/delete-lead.command ';
import { FindAllLeadCommand } from 'lead/commands/find-all-lead.command';
import { FindLeadCommand } from 'lead/commands/find-lead.command ';
import { FindLeadsPerSourceCommand } from 'lead/commands/find-leads-per-source.command ';
import { FindLeadsPerStatusCommand } from 'lead/commands/find-leads-per-status.command';
import { UpdateLeadCommand } from 'lead/commands/update-lead.command ';
import { UpdateLeadDto } from 'lead/dto/update-lead.dto';
import { CreateLeadDto } from '../../dto/create-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.commandBus.execute(new CreateLeadCommand(createLeadDto));
  }

  @Get()
  findAll() {
    return this.commandBus.execute(new FindAllLeadCommand());
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commandBus.execute(new FindLeadCommand(id));
  }

  @Get('source/:source')
  findLeadsPerSource(@Param('source') source: string) {
    return this.commandBus.execute(new FindLeadsPerSourceCommand(source));
  }

  @Get('status/:status')
  findLeadsPerStatus(@Param('status') status: string) {
    return this.commandBus.execute(new FindLeadsPerStatusCommand(status));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto) {
    return this.commandBus.execute(new UpdateLeadCommand(id, updateLeadDto));
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteLeadCommand(id));
  }
}
