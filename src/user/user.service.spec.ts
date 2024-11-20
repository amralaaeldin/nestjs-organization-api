import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mockUserModel } from './../mocks/user.model.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: 'UserModel',
        useValue: mockUserModel,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});