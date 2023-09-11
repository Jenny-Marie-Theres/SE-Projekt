import { Injectable, NotFoundException } from '@nestjs/common';
import { Sushi } from '../sushi/sushi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../auth/admin.entity';
import { SushiService } from '../sushi/sushi.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private readonly sushiService: SushiService,
  ) {}
  // Vorhandene Daten abrufen
  async getAdminByEMail(eMail: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { eMail: eMail },
    });
    if (!admin) {
      throw new NotFoundException('User not found');
    }
    return admin;
  }
  async createSushi(eMail: string, sushi: Sushi): Promise<Sushi> {
    const admin = await this.getAdminByEMail(eMail);
    if (!admin.favoriteSushi) {
      admin.favoriteSushi = [];
    }
    const savedSushi = this.sushiService.addSushi(sushi);
    admin.favoriteSushi.push(await savedSushi);
    this.adminRepository.save(admin);

    return savedSushi;
  }
  // Sushi bekommen

  async getSushis(email: string): Promise<Sushi[]> {
    const admin = await this.getAdminByEMail(email);
    return admin.favoriteSushi;
  }

  // update Sushi
  async updateSushi(
    name: string,
    updatedSushi: Sushi,
    eMail: string,
  ): Promise<Sushi> {
    const admin = await this.getAdminByEMail(eMail);
    // Finde das gewünschte Sushi im  Sushi-Array des users
    const favoriteSushiIndex = admin.favoriteSushi.findIndex(
      (sushi) => sushi.name === name,
    );

    if (favoriteSushiIndex === -1) {
      throw new NotFoundException(
        `Das Sushi "${name}" wurde nicht in den Favoriten des Benutzers gefunden`,
      );
    }

    // Aktualisiere das Sushi im Array
    admin.favoriteSushi[favoriteSushiIndex] = updatedSushi;

    // Speichere den aktualisierten Benutzer zurück in der Datenbank

    // Aktualisiere das Sushi im sushiRepository
    await this.sushiService.updateSushi(name, updatedSushi);

    await this.adminRepository.save(admin);

    // Aktualisiertes Sushi zurückgeben
    return updatedSushi;
  }

  // Delete sushi
  async deleteSushi(sushiName: string, eMail: string) {
    const admin = await this.getAdminByEMail(eMail);
    // Finde das Index des zu löschenden Sushi anhand der ID
    const favoriteSushiIndex = admin.favoriteSushi.findIndex(
      (sushi) => sushi.name === sushiName,
    );

    if (favoriteSushiIndex === -1) {
      throw new NotFoundException(
        `Das Sushi mit der ID "${sushiName}" wurde nicht in den Favoriten des Benutzers gefunden.`,
      );
    }

    // Entferne das Sushi aus dem Favoriten-Array
    admin.favoriteSushi.splice(favoriteSushiIndex, 1);

    // Speichere den aktualisierten Benutzer zurück in der Datenbank
    await this.adminRepository.save(admin);
    // Lösche das Sushi auch aus dem sushiRepository
    await this.sushiService.deleteSushi(sushiName);
  }
}
