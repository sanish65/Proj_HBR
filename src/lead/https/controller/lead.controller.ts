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
import { FindAllLeadCommand } from 'lead/commands/find-all-lead.command';
import { FindLeadCommand } from 'lead/commands/find-lead.command ';
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto) {
    return this.commandBus.execute(new UpdateLeadCommand(id, updateLeadDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.leadService.remove(+id);
  }
}
