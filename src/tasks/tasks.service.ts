import { Injectable } from '@nestjs/common';
import { Task, Prisma } from '@prisma/client';
import { AshlandService } from '../ashland/ashland.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly ashlandService: AshlandService,
    private readonly databaseService: DatabaseService,
  ) {}

  async task(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.databaseService.task.findUnique({
      where: taskWhereUniqueInput,
    });
  }

  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<(Task & { children: Task[] })[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.databaseService.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        children: true,
      },
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    const newTask = await this.databaseService.task.create({
      data,
    });
    this.ashlandService.log({
      message: 'new Task has been created: ' + JSON.stringify(newTask),
      createdAt: new Date(),
    });

    return newTask;
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUncheckedUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    const updated = await this.databaseService.task.update({
      data,
      where,
    });
    this.ashlandService.log({
      message: 'task has been updated: ' + JSON.stringify(updated),
      createdAt: new Date(),
    });
    return updated;
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    const deleted = await this.databaseService.task.delete({
      where,
    });
    this.ashlandService.log({
      message: 'task has been deleted: ' + JSON.stringify(deleted),
      createdAt: new Date(),
    });
    return deleted;
  }
}
