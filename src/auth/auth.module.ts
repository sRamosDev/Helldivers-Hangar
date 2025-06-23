import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../users/users.entity';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { Permission } from './permission.entity';
import { RefreshToken } from './refresh-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const privateKeyPath = configService.get<string>('JWT_PRIVATE_KEY_PATH');
        const publicKeyPath = configService.get<string>('JWT_PUBLIC_KEY_PATH');
        const privateKey = privateKeyPath ? fs.readFileSync(privateKeyPath, 'utf8') : undefined;
        const publicKey = publicKeyPath ? fs.readFileSync(publicKeyPath, 'utf8') : undefined;
        return {
          privateKey,
          publicKey,
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES') || '1h',
            algorithm: 'RS256',
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Permission, RefreshToken]),
    ActivityLogModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
