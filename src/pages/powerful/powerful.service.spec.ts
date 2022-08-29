import { Test, TestingModule } from '@nestjs/testing';
import { PowerfulService } from './powerful.service';

describe('PowerfulService', () => {
  let service: PowerfulService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowerfulService],
    }).compile();

    service = module.get<PowerfulService>(PowerfulService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
