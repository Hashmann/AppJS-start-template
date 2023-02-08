import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

class MailService{
  constructor() {
    dotenv.config()
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {rejectUnauthorized:false}
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Activation account' + process.env.API_URL,
      text: '',
      html:
          `
          <div>
            <h1>Для активации аккаунта перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
          `
    })
  }
}

export const mailService = new MailService()