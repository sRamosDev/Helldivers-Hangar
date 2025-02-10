import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Permission } from '../auth/permission.entity';
import { RefreshToken } from '../auth/refresh-token.entity';

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

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];
}
