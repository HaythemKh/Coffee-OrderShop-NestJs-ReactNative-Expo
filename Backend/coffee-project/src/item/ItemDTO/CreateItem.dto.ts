import { Exclude } from "class-transformer";
import { IsNotEmpty,IsDecimal,IsNumber,IsString,MinLength,IsEnum } from "class-validator";
import { Category } from "src/schemas/item.schema";
export class CreateItemDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    Name : string;

    @IsNotEmpty()
    @IsNumber()
    Price : number;

    @IsEnum(Category)    
    Category : Category;

}