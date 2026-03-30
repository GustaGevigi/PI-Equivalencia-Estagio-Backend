export interface MailDTO {
  to: string;
  from?: string;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(email: MailDTO): Promise<void>;
}
