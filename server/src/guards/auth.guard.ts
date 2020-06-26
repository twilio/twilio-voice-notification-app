import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AUTH_HEADDER, ENV_VAR } from '../constants';

/**
 * AuthGuard acts as an authorization middleware. All the Controllers / Endpoints
 * decorated with this Guard expect to receive a 'x-twilio-notification-key'
 * in the headers object to match the one stored in ENV variables.
 * Otherwise, a 403 response will be sent.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { headers } = request;
    const header = headers[AUTH_HEADDER];
    const passcode = this.configService.get<string>(ENV_VAR.PASSCODE_KEY);
    return header && header === passcode;
  }
}
