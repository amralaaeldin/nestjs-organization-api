import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InviteDto } from './dto/invite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './entities/organization.entity';
import { JWTPayloadDto } from './../auth/dto/auth.dto';
import { UserService } from './../user/user.service';


@Injectable()
export class OrganizationService {
  constructor(
    private userService: UserService,
    @InjectModel(Organization.name) private organizationModel: Model<Organization>,
  ) { }

  private async getOwnedOrganization(id: string, userId: string) {
    const organization = await this.organizationModel.findOne({
      _id: id,
      'organization_members.user': userId,
      'organization_members.access_level': 'owner'
    });

    return organization;
  }


  async create(createOrganizationDto: CreateOrganizationDto, user: JWTPayloadDto) {
    const organization = {
      ...createOrganizationDto,
      organization_members: [{
        user: user.id,
        access_level: "owner"
      }]
    }
    return await this.organizationModel.create(organization);
  }

  async findAll(user: JWTPayloadDto) {
    return await this.organizationModel.find({ 'organization_members.user': user.id })
      .populate('organization_members.user', ['name', 'email']);
  }

  async findOne(id: string, user: JWTPayloadDto) {
    return await this.organizationModel.findOne({
      _id: id,
      'organization_members.user': user.id
    }).populate('organization_members.user', ['name', 'email']);
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto, user: JWTPayloadDto) {
    const organization = await this.getOwnedOrganization(id, user.id);
    if (!organization) {
      throw new NotFoundException()
    }
    await this.organizationModel.updateOne({ _id: id }, updateOrganizationDto);
    return await this.organizationModel.findOne({ _id: id });
  }

  async remove(id: string, user: JWTPayloadDto) {
    const organization = await this.getOwnedOrganization(id, user.id);
    if (!organization) {
      throw new NotFoundException()
    }
    await this.organizationModel.deleteOne({ _id: id });

    return {
      message: 'Organization deleted successfully',
    }
  }

  async invite(id: string, inviteDto: InviteDto) {
    const user = await this.userService.findOneByEmail(inviteDto.user_email);

    if (!user) {
      throw new NotFoundException(`User with email ${inviteDto.user_email} not found`);
    }

    const organization = await this.organizationModel.findOne({
      _id: id,
      'organization_members.user': user._id
    });

    if (organization) {
      throw new BadRequestException(`User with email ${inviteDto.user_email} is already a member of this organization`);
    }

    await this.organizationModel.updateOne({ _id: id }, {
      $push: {
        organization_members: {
          user: user._id,
          access_level: 'guest'
        }
      }
    });
    return await this.organizationModel.findOne({ _id: id });
  }
}
