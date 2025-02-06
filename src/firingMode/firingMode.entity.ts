import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Weapon } from '../weapon/weapon.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FiringMode {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'The unique identifier of the firing mode',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The name of the firing mode',
    example: 'Single Shot',
  })
  name: string;

  @ManyToMany(() => Weapon, (weapon) => weapon.firing_modes)
  @ApiProperty({
    description: 'The list of primary weapons that support this firing mode',
    type: () => [Weapon],
  })
  primary_weapons: Weapon[];
}