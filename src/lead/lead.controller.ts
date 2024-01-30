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
import { CreateLeadCommand } from './commands/bulk-save-interaction.command ';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    console.log('checking from here');
    return this.commandBus.execute(new CreateLeadCommand(createLeadDto));
  }

  @Get()
  findAll() {
    // return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.leadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    // return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.leadService.remove(+id);
  }
}
