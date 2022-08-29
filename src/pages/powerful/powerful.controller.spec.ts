import { Test, TestingModule } from '@nestjs/testing';
import { PowerfulController } from './powerful.controller';
import { PowerfulService } from './powerful.service';

describe('PowerfulController', () => {
  let controller: PowerfulController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PowerfulController],
      providers: [PowerfulService],
    }).compile();

    controller = module.get<PowerfulController>(PowerfulController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
