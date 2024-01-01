import { Role } from "src/schemas/user.schema";

export class User {

    readonly _id? : string;
    readonly FirstName? : string;
    readonly LastName? : string;
    readonly Email? : string;
    readonly Password? : string;
    readonly PhoneNumber : string;
    readonly FullAddress : string;
    readonly Role? : Role;

    constructor(data : any)
    {
        this._id = data._id;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Email = data.Email;
        this.Password = data.Password;
        this.PhoneNumber = data.PhoneNumber;
        this.FullAddress = data.FullAddress;
        this.Role = data.Role;
    }
}