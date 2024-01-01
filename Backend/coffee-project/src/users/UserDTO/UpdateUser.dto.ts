import { IsEmail, IsNotEmpty,IsString,MinLength, MaxLength,IsEnum,IsOptional,Length,IsPhoneNumber} from 'class-validator';
import { Role } from 'src/schemas/user.schema';
import { Exclude } from 'class-transformer';
export class updateUserDTO {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    FirstName : string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    LastName : string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    Email : string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(25)
    Password : string;

    @IsOptional()
    @IsNotEmpty()
    @Length(20, 50)
    FullAddress : string;

    @IsOptional()
    @IsNotEmpty()
    @IsPhoneNumber('TN')
    PhoneNumber : string;

    @Exclude()
    _id : string;
    
    @Exclude()
    Role : Role;
}