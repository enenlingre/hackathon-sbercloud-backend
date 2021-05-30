import { Injectable } from "@nestjs/common";
import { IReadableUser, IUser } from "src/user/user.interface";
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) {
    console.log('rtdewrwer');
  }

  async signIn({ tel }: SignInDto): Promise<IReadableUser> {
    // const smsCode = Number('000000');
    const user = await this.userService.findByTel(tel);

    if (user) return user.toObject();

    return (await this.creteUser({ tel })).toObject();
  }

  // async verifySms({ tel }: SignInDto) {
  //   const user = await this.userService.findByTel(tel);


  //   return signInDto.code === '000000';
  // }

  private async creteUser({ tel }: SignInDto): Promise<IUser> {
    return this.userService.create({ tel } as CreateUserDto);
  }
}