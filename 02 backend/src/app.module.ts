import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    PrismaModule, 
    ContactModule,
    // Throttler (anti-spam) => Protection formulaire contact
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60, // 60 secondes
        limit: 10,  // 10 requêtes max
      }],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.MAIL_PORT || '587'),
        auth: {
          user: process.env.MAIL_USER || 'didier.genetier7@gmail.com',
          pass: process.env.MAIL_PASS || '',
        },
      },
      defaults: {
        from: `"Boulangerie Didier" <${process.env.MAIL_FROM || 'didier.genetier7@gmail.com'}>`,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
