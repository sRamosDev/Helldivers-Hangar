import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Weapon } from '../weapon/weapon.entity';

@Entity()
export class FiringMode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Weapon, (weapon) => weapon.firing_modes)
  primary_weapons: Weapon[];
}
