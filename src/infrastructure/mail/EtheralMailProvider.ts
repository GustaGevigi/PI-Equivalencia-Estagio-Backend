import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider, MailDTO } from '../../domain/providers/IMailProvider';

export class EtheralMailProvider implements IMailProvider {
  private client: Transporter | null = null;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async sendMail({ to, subject, body }: MailDTO): Promise<void> {
    if (!this.client) return;

    const message = await this.client.sendMail({
      from: 'Equipe Suporte <suporte@fatecatibaia.com>',
      to,
      subject,
      html: body,
    });

    console.log('E-mail enviado: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
