import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TurnstileGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.body.cfTurnstileToken;
    const ip = request.ip;

    const { data } = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      secret: this.configService.get<string>('TURNSTILE_SECRET'),
      response: token,
      remoteip: ip,
    });

    if (!data.success) {
      throw new UnauthorizedException(
        'Failed CAPTCHA verification. Error codes: ' + (data['error-codes']?.join(', ') || 'unknown'),
      );
    }

    return true;
  }
}
