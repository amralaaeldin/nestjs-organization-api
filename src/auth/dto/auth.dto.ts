import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}

export class SignInResponseDto {
  refresh_token: string;
  access_token: string;
}

export class JWTPayloadDto {
  id: string;
  email: string;
}