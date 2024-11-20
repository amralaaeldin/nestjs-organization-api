import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteDto {
  @IsEmail()
  @IsNotEmpty()
  user_email: string;
}
