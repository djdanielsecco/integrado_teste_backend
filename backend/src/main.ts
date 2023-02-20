import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: false });
  useContainer(app.select(AppModule), { fallbackOnErrors: false });
  const config = new DocumentBuilder()
    .setTitle('Integrado Teste')
    .setDescription('The Integrado test API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
