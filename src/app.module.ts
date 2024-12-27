import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
import { ActivityLog } from './activity-log/activity-log.entity';

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
            ActivityLog,
          ],
          synchronize: false,
        };

        return dbConfig;
      },
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
    TypeOrmModule.forFeature([ActivityLog]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
