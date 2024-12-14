import { Body, Controller, Post } from '@nestjs/common';

import { ResponseService } from '../../common/services/response.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.request.dto';
import { SignUpDto } from './dto/sign-up.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService
  ) { }

  /**
   * Sign up a new user and return a token and user details in the response.
   */
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { user, token } = await this.authService.signUp(signUpDto);
    return this.responseService.success('User successfully registered', { user, token });
  }

  /**
   * Sign in an existing user and return a token and user details in the response.
   */
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const { token } = await this.authService.signIn(signInDto);
    return this.responseService.success('User successfully signed in', { token });
  }
}
