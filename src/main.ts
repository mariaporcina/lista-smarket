import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      enableImplicitConversion: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('[v1] API com Swagger')
    .setDescription('Documentação automática da API com Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Para habilitar autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      require('./shopping-list/v1/shopping-list.module').ShoppingListModule,
      require('./shopping-list-product/v1/shopping-list-product.module').ShoppingListProductModule,
      require('./user/v1/user.module').UserModule,
      require('./auth/v1/auth.module').AuthModule,
    ],
  });
  SwaggerModule.setup('api/v1', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
}

bootstrap();
