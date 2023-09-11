import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UserDTO } from './register_User.dto';
import { User } from './user.entity';
import { SignInDto } from './signIn.dto';
import { AuthService } from './auth.service';
import { Admin } from './admin.entity';

@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register/admin')
  registerAdmin(@Body() signInDto: SignInDto): Promise<Admin> {
    return this.authService.registerAdmin(signInDto);
  }
  @Post('/register/user')
  registerUser(@Body() userDTO: UserDTO) {
    return this.authService.registerUser(userDTO);
  }
  @Post('/signIn')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('/newToken/:eMail')
  async newToken(@Param('eMail') eMail: string) {
    return await this.authService.newToken(eMail);
  }
}
