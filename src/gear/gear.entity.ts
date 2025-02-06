import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Loadout } from '../loadouts/loadout.entity';
import { Passive } from '../passive/passive.entity';

export enum GearCategory {
  ARMOR = 'armor',
  CAPE = 'cape',
  HELMET = 'helmet',
}

@Entity()
export class Gear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  armor_rating: number;

  @Column()
  speed: number;

  @Column()
  stamina_regen: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: GearCategory,
    default: GearCategory.ARMOR,
  })
  category: GearCategory;

  @ManyToMany(() => Passive)
  @JoinTable({
    name: 'gear_has_passives',
    joinColumn: { name: 'gear_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'passive_id', referencedColumnName: 'id' },
  })
  passive: Passive[];

  @OneToMany(() => Loadout, (loadout) => loadout.helmet)
  loadouts_helmet: Loadout[];

  @OneToMany(() => Loadout, (loadout) => loadout.armor)
  loadouts_armor: Loadout[];

  @OneToMany(() => Loadout, (loadout) => loadout.cape)
  loadouts_cape: Loadout[];
}
