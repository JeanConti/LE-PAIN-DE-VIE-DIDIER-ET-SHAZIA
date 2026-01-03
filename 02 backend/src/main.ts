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
    origin: 'http://localhost:3800',
    credentials: true,
  }) 

  // Lancer le serveur sur le port 3800
  await app.listen(process.env.PORT ?? 3800);
}
bootstrap();


