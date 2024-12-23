import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { Loadout } from './loadouts/loadout.entity';
import { Helmet } from './helmet/helmet.entity';
import { Armor } from './armor/armor.entity';
import { Cape } from './cape/cape.entity';
import { PrimaryWeapon } from './primaryWeapon/primaryWeapon.entity';
import { SecondaryWeapon } from './secondaryWeapon/secondaryWeapon.entity';
import { Throwable } from './throwable/throwable.entity';
import { Passive } from './passive/passive.entity';
import { Trait } from './trait/trait.entity';
import { FiringMode } from './firingMode/firingMode.entity';
import { User } from './users/users.entity';

import { LoadoutsModule } from './loadouts/loadouts.module';
import { FiringModeModule } from './firingMode/firingMode.module';
import { HelmetModule } from './helmet/helmet.module';
import { ArmorModule } from './armor/armor.module';
import { CapeModule } from './cape/cape.module';
import { PrimaryWeaponModule } from './primaryWeapon/primaryWeapon.module';
import { SecondaryWeaponModule } from './secondaryWeapon/secondaryWeapon.module';
import { ThrowableModule } from './throwable/throwable.module';
import { PassiveModule } from './passive/passive.module';
import { TraitModule } from './trait/trait.module';
import { AuthModule } from './auth/auth.module';

//import { AggregateController } from './aggregate.controller';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Loadout,
          Throwable,
          PrimaryWeapon,
          Passive,
          SecondaryWeapon,
          Cape,
          Armor,
          Helmet,
          Trait,
          FiringMode,
          User,
        ],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'), // Use environment variable
      }),
    }),
    LoadoutsModule,
    FiringModeModule,
    ThrowableModule,
    TraitModule,
    PassiveModule,
    PrimaryWeaponModule,
    SecondaryWeaponModule,
    HelmetModule,
    ArmorModule,
    CapeModule,
    AuthModule,
  ],
  //controllers: [AggregateController],
})
export class AppModule {}
