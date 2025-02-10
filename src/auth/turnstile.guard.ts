import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TurnstileGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.body.cfTurnstileToken;
    const ip = request.ip;

    const { data } = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      secret: process.env.TURNSTILE_SECRET,
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
