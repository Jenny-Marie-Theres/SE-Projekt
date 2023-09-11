import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Sushi } from '../sushi/sushi.entity';
import { SushiService } from '../sushi/sushi.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly sushiService: SushiService,
  ) {}
  // Vorhandene Daten abrufen
  async getUserByEMail(eMail: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { eMail: eMail } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // NutzerDaten aendern
  async updateUser(eMail: string, updatedUser: User) {
    const existingUser: User = await this.userRepository.findOne({
      where: { eMail: eMail },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    // wenn eMail geaendert wird
    if (updatedUser.eMail !== existingUser.eMail) {
      // schauen das name einzigartig bleibt
      if (await this.uniqueEMail(updatedUser.eMail)) {
        if (updatedUser._id) {
          delete updatedUser._id;
        }
        if (updatedUser.password) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(updatedUser.password, salt);
          updatedUser.password = hashedPassword;
        }
        // kopiert update in exist
        Object.assign(existingUser, updatedUser);
        return this.userRepository.save(existingUser);
      } else {
        throw new ConflictException(
          'die E-Mail-Adresse "${eMail}" ist bereits vergeben.',
        );
      }
    } else {
      if (updatedUser._id) {
        delete updatedUser._id;
      }
      if (updatedUser.password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(updatedUser.password, salt);
        updatedUser.password = hashedPassword;
      }
      Object.assign(existingUser, updatedUser);
      return this.userRepository.save(existingUser);
    }
  }
  // NutzerDaten löschen
  async deleteUser(eMail: string): Promise<void> {
    const user = await this.getUserByEMail(eMail);

    // die ganzen Sushis löschen
    if (user.favoriteSushi) {
      for (const sushi of user.favoriteSushi) {
        await this.sushiService.deleteSushi(sushi._id);
      }
    }
    //User löschen
    await this.userRepository.remove(user);
  }

  // Favoriten Sushi erstellen

  async createSushi(eMail: string, sushi: Sushi): Promise<Sushi> {
    const user = await this.getUserByEMail(eMail);
    if (!user.favoriteSushi) {
      user.favoriteSushi = [];
    }
    const savedSushi = this.sushiService.addSushi(sushi);
    user.favoriteSushi.push(await savedSushi);
    this.userRepository.save(user);

    return savedSushi;
  }
  // favoriten Sushi bekommen

  async getFavoriteSushis(email: string): Promise<Sushi[]> {
    const user = await this.getUserByEMail(email);
    return user.favoriteSushi;
  }

  // update favoritSushi
  async updateFavoriteSushi(
    name: string,
    updatedSushi: Sushi,
    eMail: string,
  ): Promise<Sushi> {
    const user = await this.getUserByEMail(eMail);
    // Finde das gewünschte Sushi im  Sushi-Array des users
    const favoriteSushiIndex = user.favoriteSushi.findIndex(
      (sushi) => sushi.name === name,
    );

    if (favoriteSushiIndex === -1) {
      throw new NotFoundException(
        `Das Sushi "${name}" wurde nicht in den Favoriten des Benutzers gefunden`,
      );
    }

    // Aktualisiere das Sushi im Array
    user.favoriteSushi[favoriteSushiIndex] = updatedSushi;

    // Speichere den aktualisierten Benutzer zurück in der Datenbank

    // Aktualisiere das Sushi im sushiRepository
    await this.sushiService.updateSushi(name, updatedSushi);

    await this.userRepository.save(user);

    // Aktualisiertes Sushi zurückgeben
    return updatedSushi;
  }

  // Delete Favorit sushi
  async deleteFavoriteSushi(sushiName: string, eMail: string) {
    const user = await this.getUserByEMail(eMail);
    // Finde das Index des zu löschenden Sushi anhand der ID
    const favoriteSushiIndex = user.favoriteSushi.findIndex(
      (sushi) => sushi.name === sushiName,
    );

    if (favoriteSushiIndex === -1) {
      throw new NotFoundException(
        `Das Sushi mit der ID "${sushiName}" wurde nicht in den Favoriten des Benutzers gefunden.`,
      );
    }

    // Entferne das Sushi aus dem Favoriten-Array
    user.favoriteSushi.splice(favoriteSushiIndex, 1);

    // Speichere den aktualisierten Benutzer zurück in der Datenbank
    await this.userRepository.save(user);
    // Lösche das Sushi auch aus dem sushiRepository
    await this.sushiService.deleteSushi(sushiName);
  }

  async uniqueEMail(eMail: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { eMail: eMail } });
    return user === null;
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
