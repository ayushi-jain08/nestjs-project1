import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMqserviceService } from './rabbit-mqservice.service';

describe('RabbitMqserviceService', () => {
  let service: RabbitMqserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMqserviceService],
    }).compile();

    service = module.get<RabbitMqserviceService>(RabbitMqserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
