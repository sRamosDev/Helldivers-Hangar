import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trait } from '../trait/trait.entity';
import { Loadout } from '../loadouts/loadout.entity';

@Entity()
export class Throwable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  damage: number;

  @Column('int')
  penetration: number;

  @Column('int')
  outer_radius: number;

  @Column('float')
  fuse_time: number;

  @Column({ nullable: true })
  image_url: string;

  @ManyToMany(() => Trait)
  @JoinTable({
    name: 'throwable_has_traits',
    joinColumn: { name: 'throwable_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'trait_id', referencedColumnName: 'id' },
  })
  traits: Trait[];

  @OneToMany(() => Loadout, (loadout) => loadout.throwable)
  loadouts_throwable: Loadout[];
}
