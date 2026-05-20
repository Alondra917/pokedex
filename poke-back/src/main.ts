import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
  }); //no se para que es esto, es para abrirle la puerta a cualquier navegador o algo asi 
  await app.listen(process.env.PORT ?? 3000);
  console.log("hola proxy")
}
bootstrap();
