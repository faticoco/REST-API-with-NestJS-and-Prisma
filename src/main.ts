// src/main.ts
import { HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { NestFactory , Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

// NestJS has a built-in ClassSerializerInterceptor that can be used to transform objects. 
import { ClassSerializerInterceptor} from '@nestjs/common';



// The ValidationPipe provides a convenient approach to enforce validation rules for all incoming client payloads,
// where the validation rules are declared with decorators from the class-validator package.
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //making the validation pipe globally available in the app
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Fatima Bilal')
    .setDescription(' Software developer')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3001);
}
bootstrap();