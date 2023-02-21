import { ApiProperty } from "@nestjs/swagger";
export class Login_Type {
    @ApiProperty({required:true})
    email: string;
    @ApiProperty({required:true})
    password: string;
}
export class LoginRes_Type {
    Name: string;
    Email: string;
    ID: string;
}
export interface SingUp_Type_i {
    name: string;
    email: string;
    password: string;
}
export class SingUp_Type {
    @ApiProperty({required:true})
    name: string;
    @ApiProperty({required:true})
    email: string;
    @ApiProperty({required:true})
    password: string;
}
export class SingUpRes_Type {
    name: string;
    _id: string;
    email: string;
}
export class ChangePass_Type {
    @ApiProperty({required:true})
    email: string;
    @ApiProperty({required:true})
    password: string;
    @ApiProperty({required:true})
    new_password: string;
}
export class Create_Type {
    @ApiProperty({required:false,readOnly:true})
    _id?: string;
    @ApiProperty({required:true})
    domains: string[];
    @ApiProperty({required:true})
    country: string;
    @ApiProperty({required:true})
    alpha_two_code: string;
    @ApiProperty({required:true})
    web_pages: string[];
    @ApiProperty({required:true})
    "state-province"?: string | null | undefined;
    @ApiProperty({required:true})
    name: string;
}
export class Update_Type {
    @ApiProperty({required:false})
    domains?: string[];
    @ApiProperty({required:false})
    web_pages?: string[];
    @ApiProperty({required:false})
    name?: string;
}
export class SearchQuery_Type {
    @ApiProperty({ required: false })
    country: string;
    @ApiProperty({required:true})
    page: number;
}
