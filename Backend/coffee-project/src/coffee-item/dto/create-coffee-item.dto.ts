import { Exclude } from "class-transformer";
import { IsNotEmpty,IsDecimal,IsNumber,IsString,MinLength,IsEnum, IsObject, IsNotEmptyObject,ValidateNested  } from "class-validator";
import { Type } from 'class-transformer';
export class CreateCoffeeItemDto {

    @Exclude()
    _id : string;

    @IsNotEmpty()
    @IsString()
    Name: string;
  
    @IsString()
    @IsNotEmpty()
    Description: string;

    @IsString()
    @IsNotEmpty()
    SmallSizeVolume : string;

    @IsNumber()
    @IsNotEmpty()
    SmallSizePrice : number;

    @IsString()
    @IsNotEmpty()
    MediumSizeVolume : string;

    @IsNumber()
    @IsNotEmpty()
    MediumSizePrice : number;

    @IsString()
    @IsNotEmpty()
    LargeSizeVolume : string;

    @IsNumber()
    @IsNotEmpty()
    LargeSizePrice : number;

    @IsString()
    @IsNotEmpty()
    Stars : string;

    @IsString()
    @IsNotEmpty()
    Image : string;

}
