import { PartialType } from '@nestjs/mapped-types';
import { CreateTraitDto } from './CreateTrait.dto';

export class UpdateTraitDto extends PartialType(CreateTraitDto) {}
