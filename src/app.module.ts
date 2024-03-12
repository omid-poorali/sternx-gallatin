import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AshlandModule } from './ashland/ashland.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    TasksModule,
    AshlandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
