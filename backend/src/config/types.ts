import { ApiProperty } from "@nestjs/swagger";
export class Login_Type  {
    @ApiProperty()
    name:  string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password:    string;
}
export class LoginRes_Type  {
    Name:  string;
    Email: string;
    ID:    string;
}
export interface SingUp_Type_i  {
    name:  string;
    email: string;
    password:    string;
}
export  class SingUp_Type {
    @ApiProperty()
    name:  string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password:    string;
}
export class SingUpRes_Type  {
    name:  string;
    _id:   string;
    email: string;
}
export class ChangePass_Type  {
    @ApiProperty()
    email:  string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    new_password:   string;
}
export class Create_Type  {
    @ApiProperty()
    _id?:              string;
    @ApiProperty()
    domains:          string[];
    @ApiProperty()
    country:          string;
    @ApiProperty()
    alpha_two_code:   string;
    @ApiProperty()
    web_pages:        string[];
    @ApiProperty()
    "state-province"?: string|null|undefined;
    @ApiProperty()
    name:             string;
}
export class Update_Type  {
    @ApiProperty()
    domains?:          string[];
    @ApiProperty()
    web_pages?:        string[];
    @ApiProperty()
    name?:             string;
}
export class SearchQuery_Type  {
 
    @ApiProperty({required:false})
    country:    string;
    @ApiProperty()
    page:  number;

}
