import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto, RefreshTokenDto } from './dto/auth.dto';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @HttpCode(201)
  signup(@Body() SignupDto: SignupDto) {
    return this.authService.signup(SignupDto);
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() SigninDto: SigninDto) {
    return this.authService.signin(SigninDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(RefreshTokenDto);
  }

  @Post('revoke-refresh-token')
  revokeRefreshToken(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.revokeRefreshToken(RefreshTokenDto);
  }

  @Post('revoke-all-refresh-tokens')
  revokeAllRefreshTokensForUser(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.revokeAllRefreshTokensForUser(RefreshTokenDto);
  }
}
