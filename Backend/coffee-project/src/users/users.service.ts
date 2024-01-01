import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, user,userDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './UserDTO/CreateUser.dto';
import { User } from './Model/user.model';
import { updateUserDTO } from './UserDTO/UpdateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectModel(user.name) private userModel : Model<userDocument>){}

    async CreateUser(UserData : CreateUserDTO) : Promise<any>{
        const currentUser = await this.userModel.findOne({Email : UserData.Email});
        const phoneUser = await this.userModel.findOne({PhoneNumber : UserData.PhoneNumber});
        if(currentUser) throw new BadRequestException("Email Exist try with another One");
        if(phoneUser) throw new BadRequestException("Phone number Exist try with another One");
        const hashedPassword = await bcrypt.hash(UserData.Password,10);
        UserData.Password = hashedPassword;
        const user : User = new User(UserData);
        const created = await this.userModel.create(user);
        if(!created) throw new BadRequestException("user does not created");
        return {"message" : "Account Created successfully"};
    }

    async GetAdmins(req : any) : Promise<User[]>{
        if(req.user.role !== Role.ADMIN) throw new UnauthorizedException();
        const AdminsList : User[] = [];
        const AllAdmins = await this.userModel.find({Role : Role.ADMIN});
        AllAdmins.forEach((Admin)=>{
            AdminsList.push(new User(Admin));
        })
        
        return AdminsList;
    }

    async GetCustomers(req : any) : Promise<User[]>{
        if(req.user.role !== Role.ADMIN) throw new UnauthorizedException();
        const CustomersList : User[] = [];
        const AllCustomers = await this.userModel.find({Role : Role.CUSTOMER});
        AllCustomers.forEach((Customer)=>{
            CustomersList.push(new User(Customer));
        })
        return CustomersList;
    }
    async GetUser(Email : string, req : any) : Promise<any | null>{
        if(req.user.role !== Role.ADMIN) throw new UnauthorizedException();
        const CurrentUser = await this.userModel.findOne({Email : Email});
        if(!CurrentUser) throw new NotFoundException("User does not exist");
        const user : User = new User(CurrentUser);

        return user;
    
    }

    async FindUserByEmailAndPassword(Email : string, Password : string) : Promise<User | null>
    {
        const user = await this.userModel.findOne({Email : Email});
        if (!user) throw new NotFoundException("User not found");
        const passwordMatch = await bcrypt.compare(Password,user.Password);
        if (!passwordMatch) throw new BadRequestException("Invalid email or password");
        return user;
    }

    async UpdateUser(UserName : string, userData : updateUserDTO) : Promise<Boolean>{
        const CurrentUser = await this.userModel.findOne({UserName : UserName});
        if(!CurrentUser) throw new NotFoundException("User does not exist");
        if(userData.Email)
        {   
            const verifUserName = await this.userModel.findOne({UserName : userData.Email});
            if(verifUserName && (verifUserName._id.toString()!== CurrentUser._id.toString())) throw new BadRequestException("UserName used by another user");    
        }

        if(userData.Password)
        {
          let hashedPassword = await bcrypt.hash(userData.Password,10);
          userData.Password = hashedPassword;
        } else
        userData.Password = CurrentUser.Password;
        
        const user : User = new User(userData);
        const updated = await this.userModel.findByIdAndUpdate(
            {_id : CurrentUser._id},
            {$set : user},
            {new : true},
        );

        return !!updated;
    }

    async DeleteUser(UserName : string) : Promise<Boolean>{
        const CurrentUser = await this.userModel.findOne({UserName : UserName});
        if(!CurrentUser) throw new NotFoundException("User does not exist");

        const deletedUser = await this.userModel.findByIdAndDelete({_id : CurrentUser._id});
        return !!deletedUser;
    }

    async PersonalInformation (req : any) : Promise<any>{
        const currrentUser = await this.userModel.findOne({_id: req.user.sub}).exec();
         if(!currrentUser) throw new NotFoundException("Profile doesn't exist");
           let user : User = new User(currrentUser);
           console.log("data retrieved")
           return user;
      }
}
