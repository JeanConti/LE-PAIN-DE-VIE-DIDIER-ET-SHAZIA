@Injectable()
export class ContactService {
  async create(dto: CreateContactDto) {
    return this.prisma.contact.create({data: dto});
  }
}