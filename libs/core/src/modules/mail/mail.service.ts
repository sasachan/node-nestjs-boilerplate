import { Injectable } from '@nestjs/common';

import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(data: ISendMailOptions) {
    return this.mailerService.sendMail(data);
  }
}
