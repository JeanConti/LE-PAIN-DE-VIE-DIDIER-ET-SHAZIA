import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Inclure Helmet pour la sécurité
  app.use(helmet())
 

  // Utiliser les pipes pour la validation des données
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

// CORS => Permettre les requêtes
  app.enableCors({
    origin: [
      'https://shazia.fr',
      'https://www.shazia.fr',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  // Lancer le serveur sur le port 3800
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


