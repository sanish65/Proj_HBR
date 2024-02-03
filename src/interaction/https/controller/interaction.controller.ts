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
import { CreateInteractionDto } from '../../dto/create-interaction.dto';
import { UpdateInteractionDto } from '../../dto/update-interaction.dto';
import { FindInteractionCommand } from 'interaction/commands/find-interaction.command ';
import { CreateInteractionCommand } from 'interaction/commands/create-interaction.command ';
import { UpdateInteractionCommand } from 'interaction/commands/update-interaction.command ';
import { FindAllInteractionCommand } from 'interaction/commands/find-all-interaction.command';
import { FindInteractionByLeadIdCommand } from 'interaction/commands/find-interaction-by-leadId.command ';
import { DeleteInteractionCommand } from 'interaction/commands/delete-interaction.command ';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createLeadDto: CreateInteractionDto) {
    return this.commandBus.execute(new CreateInteractionCommand(createLeadDto));
  }

  @Get()
  findAll() {
    return this.commandBus.execute(new FindAllInteractionCommand());
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commandBus.execute(new FindInteractionCommand(id));
  }

  @Get('/lead/:id')
  findByLeadId(@Param('id') id: number) {
    return this.commandBus.execute(new FindInteractionByLeadIdCommand(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLeadDto: UpdateInteractionDto) {
    return this.commandBus.execute(
      new UpdateInteractionCommand(id, updateLeadDto),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteInteractionCommand(id));
  }
}
