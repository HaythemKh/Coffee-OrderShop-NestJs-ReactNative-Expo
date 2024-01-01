import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeItemDto } from './create-coffee-item.dto';

export class UpdateCoffeeItemDto extends PartialType(CreateCoffeeItemDto) {}
