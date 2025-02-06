import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column()
  @ApiProperty({ example: 'John Helldiver', description: 'Display name' })
  displayName: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john@helldiver.com', description: 'User email' })
  email: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_helldiver', description: 'Unique username' })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;
}
