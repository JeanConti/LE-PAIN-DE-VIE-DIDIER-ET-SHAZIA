import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateContactDto } from "./dto/create-contact.dto";


@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        name: dto.nom,
        email: dto.email,
        message: dto.message,
      },
    });
  }
}