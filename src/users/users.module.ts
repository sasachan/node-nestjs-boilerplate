import { MailService } from './../../libs/core/src/modules/mail/mail.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { MailModule } from '@libs/core/modules/mail/ mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  providers: [UsersService, MailService],
  controllers: [UsersController],
})
export class UsersModule {}
