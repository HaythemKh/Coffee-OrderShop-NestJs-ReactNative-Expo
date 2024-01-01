import { Exclude } from "class-transformer";
import { IsNotEmpty,IsDecimal,IsNumber,IsString,MinLength,IsEnum, IsObject, IsNotEmptyObject,ValidateNested, IsOptional  } from "class-validator";
import { Type } from 'class-transformer';

export class CreateCommandDto {

    @Exclude()
    _id : string;

    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsString()
    @IsNotEmpty()
    Size : string;

    @IsNumber()
    @IsNotEmpty()
    Price : number;

    @IsNumber()
    @IsNotEmpty()
    Quantity : number;

}
