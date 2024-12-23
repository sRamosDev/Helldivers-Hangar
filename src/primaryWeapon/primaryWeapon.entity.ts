import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trait } from '../trait/trait.entity';
import { FiringMode } from '../firingMode/firingMode.entity';
import { Loadout } from '../loadouts/loadout.entity';

enum ArmorPenetration {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
}

@Entity()
export class PrimaryWeapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column('int')
  damage: number;

  @Column('int')
  capacity: number;

  @Column('int')
  recoil: number;

  @Column('int')
  fire_rate: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: ArmorPenetration,
    default: ArmorPenetration.Light,
  })
  max_penetration: ArmorPenetration;

  @ManyToMany(() => Trait)
  @JoinTable({
    name: 'primary_weapon_has_traits',
    joinColumn: { name: 'primary_weapon_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'trait_id', referencedColumnName: 'id' },
  })
  traits: Trait[];

  @ManyToMany(() => FiringMode)
  @JoinTable({
    name: 'primary_weapon_has_firing_modes',
    joinColumn: { name: 'primary_weapon_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'firing_mode_id', referencedColumnName: 'id' },
  })
  firing_modes: FiringMode[];

  @OneToMany(() => Loadout, (loadout) => loadout.primary_weapon)
  loadouts_primary: Loadout[];
}
