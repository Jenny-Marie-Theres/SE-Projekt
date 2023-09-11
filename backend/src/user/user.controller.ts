import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../auth/user.entity';
import { Sushi } from '../sushi/sushi.entity';
import { AdminAuthGuard } from '../auth/guard/admin-auth.guard';
import { UserAuthGuard } from '../auth/guard/user-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Vorhandene Daten abrufen

  @Get('/email/:eMail')
  getUserByEmail(@Param('eMail') eMail: string): Promise<User> {
    return this.userService.getUserByEMail(eMail);
  }

  @Get('/users')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // NutzerDaten aendern
  @Put('/update/:eMail')
  async updateUser(
    @Param('eMail') eMail: string,
    @Body() newUser: User,
  ){
    const user = await this.userService.getUserByEMail(eMail);
    return this.userService.updateUser(eMail, newUser);
  }

  // NutzerDaten löschen
  @Delete('/delete/:eMail')
  deleteUser(@Param('eMail') eMail: string): Promise<void> {
    return this.userService.deleteUser(eMail);
  }

  // Favoriten Sushi erstellen
  @Post('/sushi/:eMail')
  createSushi(
    @Param('eMail') eMail: string,
    @Body() sushi: Sushi,
  ): Promise<Sushi> {
    return this.userService.createSushi(eMail, sushi);
  }

  // favoriten Sushi bekommen
  @Get('sushi/:eMail')
  async getFavoriteSushis(@Param('eMail') eMail: string): Promise<Sushi[]> {
    return await this.userService.getFavoriteSushis(eMail);
  }

  @Put('/sushi/change/:name/:eMail')
  async updateFavoriteSushi(
    @Param('name') name: string,
    @Param('eMail') eMail: string,
    @Body() updatedSushi: Sushi,
  ): Promise<Sushi> {
    return this.userService.updateFavoriteSushi(name, updatedSushi, eMail);
  }

  @Delete('/sushi/delete/:id/:eMail')
  async deleteFavoriteSushi(
    @Param('id') id: string,
    @Param('eMail') eMail: string,
  ): Promise<void> {
    await this.userService.deleteFavoriteSushi(id, eMail);
  }

  // Namen Prüfen
  @Get('/uniqueEMail/:name')
  getUniqueEMail(@Param('eMail') eMail: string): Promise<boolean> {
    return this.userService.uniqueEMail(eMail);
  }
}
