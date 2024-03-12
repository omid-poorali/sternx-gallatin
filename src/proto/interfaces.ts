/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "tasks";

export interface Task {
  id?: string | undefined;
  parentId?: string | undefined;
  title: string;
  description?: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface CreateTaskRequest {
  parentId?: string | undefined;
  title: string;
  description?: string | undefined;
}

export interface CreateTaskResponse {
  task: Task | undefined;
}

export interface UpdateTaskRequest {
  id: string;
  parentId?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
}

export interface UpdateTaskResponse {
  task: Task | undefined;
}

export interface DeleteTaskRequest {
  id: string;
}

export interface DeleteTaskResponse {
  task: Task | undefined;
}

export interface GetAllTasksRequest {
  page: number;
}

export interface GetAllTasksResponse {
  tasks: Task[];
}

export const TASKS_PACKAGE_NAME = "tasks";

export interface TasksServiceClient {
  createTask(request: CreateTaskRequest): Observable<CreateTaskResponse>;

  updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse>;

  deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse>;

  getAllTasks(request: GetAllTasksRequest): Observable<GetAllTasksResponse>;
}

export interface TasksServiceController {
  createTask(
    request: CreateTaskRequest,
  ): Promise<CreateTaskResponse> | Observable<CreateTaskResponse> | CreateTaskResponse;

  updateTask(
    request: UpdateTaskRequest,
  ): Promise<UpdateTaskResponse> | Observable<UpdateTaskResponse> | UpdateTaskResponse;

  deleteTask(
    request: DeleteTaskRequest,
  ): Promise<DeleteTaskResponse> | Observable<DeleteTaskResponse> | DeleteTaskResponse;

  getAllTasks(
    request: GetAllTasksRequest,
  ): Promise<GetAllTasksResponse> | Observable<GetAllTasksResponse> | GetAllTasksResponse;
}

export function TasksServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTask", "updateTask", "deleteTask", "getAllTasks"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TasksService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TasksService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASKS_SERVICE_NAME = "TasksService";
