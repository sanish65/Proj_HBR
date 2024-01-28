import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/orm.config';
import { AppController } from './app.controller';
import { InteractionsModule } from './interactions/interactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    InteractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
