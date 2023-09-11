import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';

class AdminService {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<User | Admin> {
    const { eMail, role } = payload;

    if (role === 'user') {
      const user = await this.userRepository.findOne({ where: { eMail } });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } else if (role === 'admin') {
      const admin = await this.adminRepository.findOne({ where: { eMail } });
      if (!admin) {
        throw new UnauthorizedException();
      }
      return admin;
    }

    throw new UnauthorizedException();
  }
}
