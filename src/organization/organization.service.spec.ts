import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { UserService } from '../user/user.service';
import { mockOrganizationModel } from './../mocks/organization.model.mock'

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationService, UserService, {
        provide: 'OrganizationModel',
        useValue: mockOrganizationModel
      }, {
        provide: 'UserModel',
        useValue: {}
      }],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
