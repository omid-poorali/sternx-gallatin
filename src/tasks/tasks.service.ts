import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task, Prisma } from '@prisma/client';
import { AshlandService } from '../ashland/ashland.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private readonly ashlandService: AshlandService,
  ) {}

  async task(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
    });
  }

  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    const newTask = await this.prisma.task.create({
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
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    const updated = await this.prisma.task.update({
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
    const deleted = await this.prisma.task.delete({
      where,
    });
    this.ashlandService.log({
      message: 'task has been deleted: ' + JSON.stringify(deleted),
      createdAt: new Date(),
    });
    return deleted;
  }
}
