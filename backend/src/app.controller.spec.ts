import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
     imports:[AppModule],
      controllers: [AppController],

  
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be Truthy', () => {
      expect(appController).toBeTruthy();
    });
  });
});
