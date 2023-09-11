import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SushiService } from './sushi.service';
import { Sushi } from './sushi.entity';
import { SushiDto } from './sushi.dto';
import { AdminAuthGuard } from '../auth/guard/admin-auth.guard';
import { UserAuthGuard } from '../auth/guard/user-auth.guard';

@Controller('sushi')
export class SushiController {
  constructor(private sushiService: SushiService) {}
  //Getall sushis
  @Get('/all')
  getAllSushi(): Promise<Sushi[]> {
    return this.sushiService.getAllSushi();
  }
  // /obere ersetzen
  //@UseGuards(UserAuthGuard)
  //   @Get('sushi/:eMail')
  //   async getFavoriteSushis(@Param('eMail') eMail: string): Promise<Sushi[]> {
  //     return await this.userService.getFavoriteSushis(eMail);
  //   }

  //ein bestimmes Sushi finden
  @Get('/name/:name')
  getSushiById(@Param('name') name: string): Promise<Sushi> {
    return this.sushiService.getSushiByName(name);
  }

  //Sushi erstellen
  @Post('/create')
  addSushi(@Body() sushi: Sushi): Promise<Sushi> {
    return this.sushiService.addSushi(sushi);
  }

  // Sushi ändern
  @Put('/change/:name')
  updateSushi(
    @Param('name') name: string,
    @Body() updatedSushi: Sushi,
  ): Promise<Sushi> {
    return this.sushiService.updateSushi(name, updatedSushi);
  }

  // Sushi löschen
  @Delete('/delete/:sushiName')
  @UseGuards(AdminAuthGuard || UserAuthGuard)
  deleteSushi(@Param('sushiName') sushiName: string): Promise<void> {
    return this.sushiService.deleteSushi(sushiName);
  }

  // GetPrice
  @Post('/price')
  calculatePriceOfOne(@Body() sushi: SushiDto) {
    return this.sushiService.calculatePriceOfOne(sushi);
  }

  // Namen Prüfen
  @Get('/uniqueName/:name')
  getUniqueName(@Param('name') name: string): Promise<boolean> {
    return this.sushiService.uniqueName(name);
  }
}
