import { Exclude } from "class-transformer";
import { IsNotEmpty,IsDecimal,IsNumber,IsString,MinLength,IsEnum, IsObject, IsNotEmptyObject,ValidateNested, IsOptional  } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateQuantityDto {

    @Exclude()
    _id : string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    Quantity : number;

    









}