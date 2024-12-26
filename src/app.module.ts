import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as net from 'net';

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
          ],
          synchronize: false,
        };
        const checkConnection = (host: string, port: number) => {
          return new Promise((resolve, reject) => {
            const socket = new net.Socket();
            socket.setTimeout(3000);
            socket.on('connect', () => {
              console.log(`Connection to ${host}:${port} successful`);
              socket.destroy();
              resolve(true);
            });
            socket.on('error', (err) => {
              console.error(
                `Connection to ${host}:${port} failed: ${err.message}`,
              );
              reject(false);
            });
            socket.on('timeout', () => {
              console.error(`Connection to ${host}:${port} timed out`);
              reject(false);
            });
            socket.connect(port, host);
          });
        };

        try {
          await checkConnection(dbConfig.host, dbConfig.port);
        } catch (error) {
          console.error('Database connection check failed:', error);
        }

        console.log(`DB Host: ${dbConfig.host}`);
        console.log(`DB Port: ${dbConfig.port}`);
        console.log(`DB Name: ${dbConfig.database}`);
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
    AuthModule,
  ],
})
export class AppModule {}
