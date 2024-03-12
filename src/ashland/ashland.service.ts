import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AshlandService {
  constructor(@Inject('ASHLAND_SERVICE') private serviceClient: ClientProxy) {}

  async log(log: { message: string; createdAt: Date }) {
    this.serviceClient.emit('print-out', log);
  }
}
