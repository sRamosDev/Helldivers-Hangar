import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrimaryWeapon } from '../primaryWeapon/primaryWeapon.entity';
import { SecondaryWeapon } from '../secondaryWeapon/secondaryWeapon.entity';

@Entity()
export class FiringMode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PrimaryWeapon, (weapon) => weapon.firing_modes)
  primary_weapons: PrimaryWeapon[];

  @ManyToMany(() => SecondaryWeapon, (weapon) => weapon.firing_modes)
  secondary_weapons: SecondaryWeapon[];
}
