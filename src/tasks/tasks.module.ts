import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AshlandModule } from '../ashland/ashland.module';

@Module({
  imports: [AshlandModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
