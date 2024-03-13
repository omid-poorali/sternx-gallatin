import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { TASKS_PACKAGE_NAME } from './proto/interfaces';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.GRPC_URI}`,
      package: TASKS_PACKAGE_NAME,
      protoPath: 'src/proto/tasks.proto',
    },
  });

  await app.listen();
}
bootstrap();
