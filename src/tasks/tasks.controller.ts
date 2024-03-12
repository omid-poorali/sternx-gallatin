import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '@prisma/client';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('createTask')
  create(
    @Payload()
    createTaskDto: Pick<TaskModel, 'parentId' | 'title' | 'description'>,
  ) {
    return this.tasksService.createTask(createTaskDto);
  }

  @MessagePattern('findAllTasks')
  findAll() {
    return this.tasksService.tasks({
      take: 10,
    });
  }

  @MessagePattern('findOneTask')
  findOne(@Payload() id: string) {
    return this.tasksService.task({ id });
  }

  @MessagePattern('updateTask')
  update(
    @Payload() updateTaskDto: Pick<TaskModel, 'id' | 'title' | 'description'>,
  ) {
    return this.tasksService.updateTask({
      where: {
        id: updateTaskDto.id,
      },
      data: updateTaskDto,
    });
  }

  @MessagePattern('removeTask')
  remove(@Payload() id: string) {
    return this.tasksService.deleteTask({ id });
  }
}
