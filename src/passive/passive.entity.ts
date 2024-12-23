import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Helmet } from '../helmet/helmet.entity';
import { Cape } from '../cape/cape.entity';
import { Armor } from '../armor/armor.entity';

@Entity()
export class Passive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Helmet, (helmet) => helmet.passive)
  helmet: Helmet[];

  @ManyToMany(() => Cape, (cape) => cape.passive)
  cape: Cape[];

  @ManyToMany(() => Armor, (armor) => armor.passive)
  armor: Armor[];
}
