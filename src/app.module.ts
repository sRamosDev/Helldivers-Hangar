import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { ActivityLog } from './activity-log/activity-log.entity';

import { LoadoutsModule } from './loadouts/loadouts.module';
import { FiringModeModule } from './firingMode/firingMode.module';
import { HelmetModule } from './helmet/helmet.module';
import { ArmorModule } from './armor/armor.module';
import { CapeModule } from './cape/cape.module';
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
      useFactory: async () => {
        const dbConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          synchronize: process.env.DB_SYNCHRONIZE === 'true',
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
    HelmetModule,
    ArmorModule,
    CapeModule,
    TypeOrmModule.forFeature([ActivityLog]),
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
