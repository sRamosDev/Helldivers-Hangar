import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Loadout } from '../loadouts/loadout.entity';
import { Passive } from '../passive/passive.entity';

@Entity()
export class Cape {
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

  @ManyToMany(() => Passive)
  @JoinTable({
    name: 'cape_has_passives',
    joinColumn: { name: 'cape_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'passive_id', referencedColumnName: 'id' },
  })
  passive: Passive[];

  @OneToMany(() => Loadout, (loadout) => loadout.cape)
  loadouts: Loadout[];
}
