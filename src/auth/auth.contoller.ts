import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IReadableUser } from "src/user/user.interface";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }

  // @Post('/verifySms')
  // async verifySms(@Body(ValidationPipe) signInDto: SignInDto) {
  //   return await this.authService.verifySms(signInDto);
  // }
}