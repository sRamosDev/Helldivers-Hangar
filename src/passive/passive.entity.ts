import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gear } from '../gear/gear.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Passive {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the passive ability',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The name of the passive ability',
    example: 'Stealth Mode',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'The description of the passive ability',
    example: 'Grants temporary invisibility to the user',
  })
  description: string;

  @ManyToMany(() => Gear, (gear) => gear.passive)
  @ApiProperty({
    description: 'The list of gear items that support this passive ability',
    type: () => [Gear],
  })
  gear: Gear[];
}
