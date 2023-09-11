import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { SignInDto } from './signIn.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { UserDTO } from './register_User.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Admin regestrieren
  async registerAdmin(signInDTO: SignInDto): Promise<Admin> {
    const { eMail, password } = signInDTO;

    // passwort hashen
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin();

    // Validieren das einzigartig
    if (this.uniqueEMail(eMail)) {
      newAdmin.eMail = eMail;
    } else {
      throw new ConflictException(
        `die E-Mail-Adresse "${eMail}" ist bereits vergeben.`,
      );
    }
    newAdmin.password = hashedPassword;
    newAdmin.favoriteSushi = [];
    return await this.adminRepository.save(newAdmin);
  }

  // user regestrieren
  async registerUser(userDTO: UserDTO) {
    const { lastName, firstName, eMail, password, address } = userDTO;

    // passwort hashen
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User();

    // Validieren das einzigartig
    if (this.uniqueEMail(eMail)) {
      newUser.eMail = eMail;
    } else {
      throw new ConflictException(
        `die E-Mail-Adresse "${eMail}" ist bereits vergeben.`,
      );
    }
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hashedPassword;
    newUser.address = address;
    newUser.favoriteSushi = [];

    const payload = { eMail: newUser.eMail, role: 'user' };
    const token = this.jwtService.sign(payload);
    await this.userRepository.save(newUser);
    return token;
  }

  // signing in
  async signIn(signInDTO: SignInDto) {
    const { eMail, password } = signInDTO;
    const userOrAdmin = await Promise.any([
      this.userRepository.findOne({ where: { eMail } }),
      this.adminRepository.findOne({ where: { eMail } }),
    ]);

    if (userOrAdmin && (await bcrypt.compare(password, userOrAdmin.password))) {
      const payload: JwtPayload = { eMail, role: userOrAdmin.role };
      const token: string = await this.jwtService.sign(payload);
      return token;
    } else {
      throw new UnauthorizedException('Ihre Logindaten sind ungültig');
    }
  }

  async newToken(eMail: string) {
    const payload: JwtPayload = { eMail, role: 'user' };
    const token: string = await this.jwtService.sign(payload);
    return token;
  }

  async uniqueEMail(eMail: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { eMail: eMail },
    });
    return user === null;
  }
}
