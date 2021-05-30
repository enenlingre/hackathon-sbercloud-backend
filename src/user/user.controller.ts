import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/update')
  async update(@Body(new ValidationPipe()) user: CreateUserDto): Promise<void> {
    await this.userService.update(user.tel, user);
  }
}