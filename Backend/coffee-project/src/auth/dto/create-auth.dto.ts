import {IsNotEmpty,IsEmail,IsOptional,IsNumber,IsDate,IsString,ArrayMinSize,IsPhoneNumber, isEmail} from 'class-validator'

export class CreateAuthDto {

    @IsEmail()
    Email : string;

    @IsString()
    Password : string;
}
