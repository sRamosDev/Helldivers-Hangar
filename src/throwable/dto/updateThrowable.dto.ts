import { PartialType } from '@nestjs/mapped-types';
import { CreateThrowableDto } from './createThrowable.dto';

export class UpdateThrowableDto extends PartialType(CreateThrowableDto) {}
