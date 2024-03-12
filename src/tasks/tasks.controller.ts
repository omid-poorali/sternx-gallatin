import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetAllTasksRequest,
  GetAllTasksResponse,
  Task,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from 'src/proto/interfaces';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TasksService', 'CreateTask')
  async CreateTask(data: CreateTaskRequest): Promise<CreateTaskResponse> {
    const result = await this.tasksService.createTask(data);

    return <CreateTaskResponse>{
      task: <Task>{
        id: result.id,
        title: result.title,
        description: result.description,
        parentId: result.parentId,
        createdAt: result.createdAt.toISOString(),
      },
    };
  }

  @GrpcMethod('TasksService', 'UpdateTask')
  async UpdateTask(data: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const result = await this.tasksService.updateTask({
      where: {
        id: data.id,
      },
      data: {
        parentId: data.parentId,
        title: data.title,
        description: data.description,
      },
    });

    return <UpdateTaskResponse>{
      task: <Task>{
        id: result.id,
        title: result.title,
        description: result.description,
        parentId: result.parentId,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
      },
    };
  }

  @GrpcMethod('TasksService', 'DeleteTask')
  async DeleteTask(data: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    const result = await this.tasksService.deleteTask({ id: data.id });

    return <DeleteTaskResponse>{
      task: <Task>{
        id: result.id,
        title: result.title,
        description: result.description,
        parentId: result.parentId,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
      },
    };
  }

  @GrpcMethod('TasksService', 'GetAllTasks')
  async GetAllTasks(data: GetAllTasksRequest): Promise<GetAllTasksResponse> {
    const result = await this.tasksService.tasks({
      take: 10,
      skip: (data.page - 1) * 10,
    });

    return <GetAllTasksResponse>{
      tasks: result.map((task) => {
        return <Task>{
          id: task.id,
          title: task.title,
          description: task.description,
          parentId: task.parentId,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          children: task.children.map((child) => {
            return <Task>{
              id: child.id,
              title: child.title,
              description: child.description,
              parentId: child.parentId,
              createdAt: child.createdAt.toISOString(),
              updatedAt: child.updatedAt.toISOString(),
            };
          }),
        };
      }),
    };
  }
}
