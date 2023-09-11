import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SushiDto } from './sushi.dto';
import { FillingOption, Outside, Sauce, Sushi } from './sushi.entity';

@Injectable()
export class SushiService {
  constructor(
    @InjectRepository(Sushi) private sushiRepository: Repository<Sushi>,
  ) {}

  // Preis vom Sushi berechnen
  calculatePriceOfOne(sushi: SushiDto): number {
    let totalPrice = 0;
    // for filling price
    const vegetable = [
      FillingOption.AVOCADO,
      FillingOption.CREAM_CHEESE,
      FillingOption.CUCUMBER,
      FillingOption.PEPPER,
    ];
    const seafood = [FillingOption.SALMON, FillingOption.TUNA];

    // Filling
    sushi.fillings.forEach((filling) => {
      if (vegetable.includes(filling)) {
        totalPrice += 0.25;
      } else if (seafood.includes(filling)) {
        totalPrice += 0.5;
      }
    });

    //Outside
    switch (sushi.outside) {
      case Outside.SESAME:
        totalPrice += 0.05;
        break;
      case Outside.NORI:
        totalPrice += 0.1;
        break;
      default:
        break;
    }

    //Sossen
    if (sushi.sauce !== Sauce.NONE) {
      totalPrice += 0.5;
    }
    //fried
    if (sushi.fried) {
      totalPrice += 0.5;
    }

    return totalPrice;
  }
  // Alle zurück geben
  async getAllSushi(): Promise<Sushi[]> {
    return this.sushiRepository.find();
  }

  async getSushiByName(name: string): Promise<Sushi> {
    const sushi = await this.sushiRepository.findOne({ where: { name: name } });
    if (!sushi) {
      throw new NotFoundException('Sushi not found');
    }
    return sushi;
  }

  async addSushi(sushi: Sushi): Promise<Sushi> {
    if (await this.uniqueName(sushi.name)) {
      return this.sushiRepository.save(sushi);
    } else {
      throw new ConflictException(
        `der Name "${sushi.name}" ist bereits vergeben.`,
      );
    }
  }

  async updateSushi(name: string, updatedSushi: Sushi): Promise<Sushi> {
    const existingSushi = await this.getSushiByName(name);
    // wenn name geaendert wird
    if (updatedSushi.name !== existingSushi.name) {
      // schauen das name einzigartig bleibt
      if (await this.uniqueName(updatedSushi.name)) {
        // kopiert update in exist
        Object.assign(existingSushi, updatedSushi);
        return this.sushiRepository.save(existingSushi);
      } else {
        throw new ConflictException(
          `der Name "${updatedSushi.name}" ist bereits vergeben.`,
        );
      }
    } else {
      Object.assign(existingSushi, updatedSushi);
      return this.sushiRepository.save(existingSushi);
    }
  }

  async deleteSushi(sushiName: string): Promise<void> {
    // Methode gibt ein Objekt zurück in de steht wie viele Daten betroffen sind
    const result = await this.sushiRepository.delete({ name: sushiName });
    // wenn diese 0 sind dann hat es nicht gelöscht
    if (result.affected === 0) {
      throw new NotFoundException('Sushi not found');
    }
  }
  async uniqueName(name: string): Promise<boolean> {
    const sushi = await this.sushiRepository.findOne({ where: { name: name } });
    return sushi === null;
  }
}
