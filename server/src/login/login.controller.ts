import { ConfigService } from '@nestjs/config';
import { ENV_VAR } from '../constants';

import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private configService: ConfigService) {}

  /**
   * GET /login
   * @param passcode Passcode must match the one stored in ENV variables,
   * otherwise a 401 response will be sent back.
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body('passcode') passcode: string): Promise<any> {
    const passcodeValue = this.configService.get<string>(ENV_VAR.PASSCODE_KEY);

    if (!passcode || passcode !== passcodeValue) {
      throw new UnauthorizedException('Passcode is incorrect.');
    }
  }
}
