import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Helmet } from '../helmet/helmet.entity';
import { Armor } from '../armor/armor.entity';
import { Cape } from '../cape/cape.entity';
import { Weapon } from '../weapon/weapon.entity';
import { Throwable } from '../throwable/throwable.entity';

@Entity()
export class Loadout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uniqueId: string;

  @Column()
  name: string;

  @ManyToOne(() => Helmet, (helmet) => helmet.loadouts)
  helmet: Helmet;

  @ManyToOne(() => Armor, (armor) => armor.loadouts)
  armor: Armor;

  @ManyToOne(() => Cape, (cape) => cape.loadouts)
  cape: Cape;

  @ManyToOne(() => Weapon, (weapon) => weapon.loadouts_primary)
  primary_weapon: Weapon;

  @ManyToOne(() => Weapon, (weapon) => weapon.loadouts_secondary)
  secondary_weapon: Weapon;

  @ManyToOne(() => Throwable, (throwable) => throwable.loadouts_throwable)
  throwable: Throwable;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
