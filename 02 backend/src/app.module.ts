import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ProduitsModule } from './produits/produits.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ContactModule,
    ProduitsModule,
    // Throttler (anti-spam) => Protection formulaire contact
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60, // 60 secondes
        limit: 10,  // 10 requêtes max
      }],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
