import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartnerUserDto } from '../users/dto/create-partner-user.dto';
import { UserPresenter } from '../users/user.presenter';
import { UsersService } from './../users/users.service';

@Controller('partners/users')
export class PartnerUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreatePartnerUserDto) {
    const user = await this.usersService.createPartnerUser(data);
    return new UserPresenter(user);
  }
}
