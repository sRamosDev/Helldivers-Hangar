import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Weapon } from '../weapon/weapon.entity';
import { Throwable } from '../throwable/throwable.entity';
import { Gear } from '../gear/gear.entity';
import { User } from '../users/users.entity';

@Entity()
export class Loadout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uniqueId: string;

  @Column()
  name: string;

  @ManyToOne(() => Gear, (gear) => gear.loadouts_helmet)
  helmet: Gear;

  @ManyToOne(() => Gear, (gear) => gear.loadouts_armor)
  armor: Gear;

  @ManyToOne(() => Gear, (gear) => gear.loadouts_cape)
  cape: Gear;

  @ManyToOne(() => Weapon, (weapon) => weapon.loadouts_primary)
  primary_weapon: Weapon;

  @ManyToOne(() => Weapon, (weapon) => weapon.loadouts_secondary)
  secondary_weapon: Weapon;

  @ManyToOne(() => Throwable, (throwable) => throwable.loadouts_throwable)
  throwable: Throwable;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, { nullable: true })
  createdBy: User;
}
