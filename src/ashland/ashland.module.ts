import { Global, Module } from '@nestjs/common';
import { AshlandService } from './ashland.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'ASHLAND_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>(`RMQ_URI`)],
            queue: configService.get<string>(`RMQ_GALLATIN_LOGGER_QUEUE`),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [AshlandService],
  exports: [AshlandService],
})
export class AshlandModule {}
