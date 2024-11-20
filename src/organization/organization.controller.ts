import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InviteDto } from './dto/invite.dto';
import { AuthGuard } from './../auth/auth.guard';
import { JWTPayloadDto } from './../auth/dto/auth.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto, @Req() req: any) {
    return this.organizationService.create(createOrganizationDto, req.body.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.organizationService.findAll(req.body.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.organizationService.findOne(id, req.body.user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto, @Req() req: any) {
    return this.organizationService.update(id, updateOrganizationDto, req.body.user);
  }

  @UseGuards(AuthGuard)
  @Post(':id/invite')
  invite(@Param('id') id: string, @Body() inviteDto: InviteDto) {
    return this.organizationService.invite(id, inviteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.organizationService.remove(id, req.body.user);
  }
}
