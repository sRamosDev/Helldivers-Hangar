import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gear } from '../gear/gear.entity';

@Entity()
export class Passive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Gear, (gear) => gear.passive)
  gear: Gear[];
}
