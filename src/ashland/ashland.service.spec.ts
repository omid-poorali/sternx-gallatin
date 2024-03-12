import { Test, TestingModule } from '@nestjs/testing';
import { AshlandService } from './ashland.service';

describe('AshlandService', () => {
  let service: AshlandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AshlandService],
    }).compile();

    service = module.get<AshlandService>(AshlandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
