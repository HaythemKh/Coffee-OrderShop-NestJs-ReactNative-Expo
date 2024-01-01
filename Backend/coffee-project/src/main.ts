import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,ValidationError } from '@nestjs/common';
import { ValidationException, ValidationFilter } from './util/filter.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe(
    {
      skipMissingProperties : false,
    exceptionFactory : (errors : ValidationError[]) => {
      const errMsg = {};
      errors.forEach((err) => {
        errMsg[err.property] = [...Object.values(err.constraints)];
      });
      return new ValidationException(errMsg);
    },
    }
  ))

  app.enableCors();
  const Port = process.env.PORT;
  await app.listen(Port);
}
bootstrap();
