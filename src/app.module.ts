import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import typeormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BulkDataModule } from 'bulk-data/bulk-data.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LeadModule } from './lead/lead.module';
import { InteractionModule } from './interaction/interaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('ormConfig'),
    }),
    BulkDataModule,
    LeadModule,
    InteractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
