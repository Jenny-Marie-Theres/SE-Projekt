import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Sushi } from '../sushi/sushi.entity';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  // Sushi erstellen
  @Post('/sushi/:eMail')
  createSushi(
    @Param('eMail') eMail: string,
    @Body() sushi: Sushi,
  ): Promise<Sushi> {
    return this.adminService.createSushi(eMail, sushi);
  }

  //  Sushi bekommen
  @Get('sushi/:eMail')
  async getSushis(@Param('eMail') eMail: string): Promise<Sushi[]> {
    return await this.adminService.getSushis(eMail);
  }

  @Put('/sushi/change/:name/:eMail')
  // @UseGuards(AdminAuthGuard)
  async updateSushi(
    @Param('name') name: string,
    @Param('eMail') eMail: string,
    @Body() updatedSushi: Sushi,
  ): Promise<Sushi> {
    return this.adminService.updateSushi(name, updatedSushi, eMail);
  }

  @Delete('/sushi/delete/:name/:eMail')
  async deleteFavoriteSushi(
    @Param('name') name: string,
    @Param('eMail') eMail: string,
  ): Promise<void> {
    await this.adminService.deleteSushi(name, eMail);
  }
}
