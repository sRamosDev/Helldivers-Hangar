import { PartialType } from '@nestjs/mapped-types';
import { CreatePassiveDto } from './createPassive.dto';

export class UpdatePassiveDto extends PartialType(CreatePassiveDto) {}
