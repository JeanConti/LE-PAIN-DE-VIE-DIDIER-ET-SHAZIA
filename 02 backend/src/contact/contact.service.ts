import { Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async create(dto: CreateContactDto) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Boulangerie Didier <didier.genetier7@gmail.com>', // Par défaut avec Resend si domaine non configuré
        to: ['didier.genetier7@gmail.com'],
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

      if (error) {
        console.error("Erreur Resend:", error);
        throw new Error("L'envoi de l'email a échoué.");
      }

      return { success: true, message: "Email envoyé avec succès", data };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      throw error;
    }
  }
}