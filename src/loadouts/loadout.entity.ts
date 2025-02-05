import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Weapon } from '../weapon/weapon.entity';
import { Throwable } from '../throwable/throwable.entity';
import { Gear } from '../gear/gear.entity';
import { User } from '../users/users.entity';

@Entity()
export class Loadout {
  @ApiProperty({ description: 'Unique identifier for the loadout' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'A unique string identifier for the loadout' })
  @Column({ unique: true })
  uniqueId: string;

  @ApiProperty({ description: 'Name of the loadout' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Helmet gear', type: () => Gear })
  @ManyToOne(() => Gear, (gear) => gear.loadouts_helmet)
  helmet: Gear;

  @ApiProperty({ description: 'Armor gear', type: () => Gear })
  @ManyToOne(() => Gear, (gear) => gear.loadouts_armor)
  armor: Gear;

  @ApiProperty({ description: 'Cape gear', type: () => Gear })
  @ManyToOne(() => Gear, (gear) => gear.loadouts_cape)
  cape: Gear;

  @ApiProperty({ description: 'Primary weapon', type: () => Weapon })
  @ManyToOne(() => Weapon, (weapon) => weapon.loadouts_primary)
  primary_weapon: Weapon;

  @ApiProperty({ description: 'Secondary weapon', type: () => Weapon })
  @ManyToOne(() => Weapon, (weapon) => weapon.loadouts_secondary)
  secondary_weapon: Weapon;

  @ApiProperty({ description: 'Throwable item', type: () => Throwable })
  @ManyToOne(() => Throwable, (throwable) => throwable.loadouts_throwable)
  throwable: Throwable;

  @ApiProperty({ description: 'Timestamp when the loadout was created', type: Date })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiPropertyOptional({ description: 'User who created the loadout', type: () => User })
  @ManyToOne(() => User, { nullable: true })
  createdBy: User;
}
