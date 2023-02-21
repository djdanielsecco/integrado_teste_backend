import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './entities/UsersSchema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    public userModel: Model<UsersDocument>,
  ) { }
  async encrypt(key: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(key, saltRounds);
    return hash;
  }
  async compare(key: string, hash: string) {
    const ans = await bcrypt.compare(key, hash);
    return ans;
  }
  async signUp(user: Users) {
    // let lastSize = await Clients.count({})
    const keyCrypt = await this.encrypt(user.password);
    const newUser = {
      name: user.name,
      email: user.email,
      password: keyCrypt,
    };
    try {
      const response = await this.userModel.insertMany(newUser);
      const { name, _id, email } = response?.[0];
      return { name, _id, email };
    } catch {
      throw new HttpException(
        { message: "User exists", status: HttpStatus.NOT_ACCEPTABLE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  async verifyLogin(email: string, password: string) {
    try {
      const user: UsersDocument = await this.userModel.findOne({
        email: `${email}`,
      });
      
      const Email: string = user?.email;
      const Password: string = user?.password;
      const Name: string = user?.name;
      const ID: string = user?._id.valueOf() as string;
      const verify = await this.compare(password, Password);
      
      if (!!verify) {
        return {
          Name,
          Email,
          ID,
        };
      } else {
        throw new Error("Login fail");
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, status: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  async changePassword(email: string, password: string, new_password: string) {
    try {
      const user: UsersDocument = await this.userModel.findOne({
        email: `${email}`,
      });
      const Password: string = user?.password;
      const verify = await this.compare(password, Password);
      if (verify) {
        
        const keyCrypt = await this.encrypt(new_password);
        const doc = await this.userModel.findOneAndUpdate(
          { email: email },
          { password: keyCrypt },
          { new: true },
        );
        
        if (!!doc) {
          return { message: 'New password updated' };
        } else {
          throw new Error('Error to update');
        }
      } else {
        throw new Error('Wrong password');
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, status: HttpStatus.NOT_ACCEPTABLE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  async findById(id: string) {
    try {
      const doc = await this.userModel.findById(id);
      if (!!doc) {
        return true;
      } else {
        return false;
      }
    } catch {
      throw new Error('Not permited');
    }
  }
}
