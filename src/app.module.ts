import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { ActivityLog } from './activity-log/activity-log.entity';

import { LoadoutsModule } from './loadouts/loadouts.module';
import { FiringModeModule } from './firingMode/firingMode.module';
import { GearModule } from './gear/gear.module';
import { WeaponModule } from './weapon/weapon.module';
import { ThrowableModule } from './throwable/throwable.module';
import { PassiveModule } from './passive/passive.module';
import { TraitModule } from './trait/trait.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: +configService.get<string>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        };
        return dbConfig;
      },
    }),
    LoadoutsModule,
    FiringModeModule,
    ThrowableModule,
    TraitModule,
    PassiveModule,
    WeaponModule,
    GearModule,
    TypeOrmModule.forFeature([ActivityLog]),
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
