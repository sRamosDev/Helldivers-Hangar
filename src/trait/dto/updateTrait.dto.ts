import { PartialType } from '@nestjs/mapped-types';
import { CreateTraitDto } from './createTrait.dto';

export class UpdateTraitDto extends PartialType(CreateTraitDto) {}
