import { CreateWeaponDto } from './createWeapon.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWeaponDto extends PartialType(CreateWeaponDto) {}
