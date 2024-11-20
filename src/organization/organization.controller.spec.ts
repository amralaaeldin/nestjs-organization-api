import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { UserService } from '../user/user.service';
import { mockOrganizationModel } from './../mocks/organization.model.mock';
import { JwtService } from '@nestjs/jwt';

describe('OrganizationController', () => {
  let controller: OrganizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [OrganizationService, UserService, JwtService, {
        provide: 'OrganizationModel',
        useValue: mockOrganizationModel
      }, {
          provide: 'UserModel',
          useValue: {}
        },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
