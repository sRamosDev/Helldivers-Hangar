import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trait } from '../trait/trait.entity';
import { FiringMode } from '../firingMode/firingMode.entity';
import { Loadout } from '../loadouts/loadout.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ArmorPenetration {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
}

export enum WeaponCategory {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'PLAS-1 Scorcher', description: 'Weapon name' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Standard issue plasma rifle',
    description: 'Weapon description',
  })
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
    enum: WeaponCategory,
    default: WeaponCategory.PRIMARY,
  })
  category: WeaponCategory;

  @Column({
    type: 'enum',
    enum: ArmorPenetration,
    default: ArmorPenetration.Light,
  })
  max_penetration: ArmorPenetration;

  @ManyToMany(() => Trait)
  @JoinTable({
    name: 'weapon_has_traits',
    joinColumn: { name: 'weapon_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'trait_id', referencedColumnName: 'id' },
  })
  traits: Trait[];

  @ManyToMany(() => FiringMode)
  @JoinTable({
    name: 'weapon_has_firing_modes',
    joinColumn: { name: 'weapon_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'firing_mode_id', referencedColumnName: 'id' },
  })
  firing_modes: FiringMode[];

  @OneToMany(() => Loadout, (loadout) => loadout.primary_weapon)
  loadouts_primary: Loadout[];

  @OneToMany(() => Loadout, (loadout) => loadout.secondary_weapon)
  loadouts_secondary: Loadout[];
}
