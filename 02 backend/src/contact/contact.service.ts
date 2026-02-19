import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}
  async create(dto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: {
        name: dto.nom,
        email: dto.email,
        message: dto.message,
      },
    });

    try {
      await this.mailerService.sendMail({
        to: process.env.MAIL_USER, // L'email de destination (le boulanger)
        subject: `Nouveau message de ${dto.nom}`,
        text: `Vous avez reçu un nouveau message de ${dto.nom} (${dto.email}) :\n\n${dto.message}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom :</strong> ${dto.nom}</p>
          <p><strong>Email :</strong> ${dto.email}</p>
          <p><strong>Message :</strong></p>
          <p>${dto.message}</p>
        `,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      // On continue quand même car le contact est enregistré en base
    }

    return contact;
  }
}