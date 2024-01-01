import { Exclude } from "class-transformer";
import { IsNotEmpty,IsDecimal,IsNumber,IsString,MinLength,IsEnum, IsOptional } from "class-validator";
import { Category } from "src/schemas/item.schema";

export class UpdateItemDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    Name : string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsDecimal({ decimal_digits : '1.2'})
    Price : number;

    @IsOptional()
    @IsEnum(Category)    
    Category : Category;
}