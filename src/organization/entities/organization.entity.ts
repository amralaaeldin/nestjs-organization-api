
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './../../user/entities/user.entity';

export type OrganizationDocument = HydratedDocument<Organization>;


@Schema()
export class Organization {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop([
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      access_level: { type: String, enum: ['owner', 'guest'], required: true },
    },
  ])
  organization_members: {
    user: mongoose.Schema.Types.ObjectId;
    access_level: 'owner' | 'guest';
  }[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
