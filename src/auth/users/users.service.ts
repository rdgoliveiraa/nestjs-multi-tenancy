import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommonUserDto } from './dto/create-common-user.dto';
import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { UserRoles } from './user-roles';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  createPartnerUser(data: CreatePartnerUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER],
      },
    });
  }

  createCommonUser(data: CreateCommonUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER],
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  findOne(idOrEmail: number | string) {
    return this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number'
          ? { id: idOrEmail }
          : { email: idOrEmail }),
      },
    });
  }
}
