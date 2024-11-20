import { IsMongoId, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { JWTPayloadDto } from './../../auth/dto/auth.dto';


export enum AccessLevel {
  OWNER = 'owner',
  GUEST = 'guest',
}

export class OrganizationMemberDto {
  @IsMongoId()
  user: string;

  @IsEnum(AccessLevel)
  access_level: AccessLevel;
}


export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  organization_members: OrganizationMemberDto[];

  user: JWTPayloadDto;
}

