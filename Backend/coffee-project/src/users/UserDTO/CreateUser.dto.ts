import { IsEmail, IsNotEmpty,IsString,MinLength, MaxLength,IsEnum,IsPhoneNumber, IsOptional,Length} from 'class-validator';
import { Role } from 'src/schemas/user.schema';
import { Exclude } from "class-transformer";

export class CreateUserDTO {

    @Exclude()
    _id : string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    FirstName : string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    LastName : string;

    @IsString()
    @IsEmail()
    Email : string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    Password : string;

    @IsNotEmpty()
    @IsPhoneNumber('TN')
    PhoneNumber : string;

    @IsNotEmpty()
    @Length(20, 50)
    FullAddress : string;

    @IsOptional()
    @IsEnum(Role)
    Role : Role;
}