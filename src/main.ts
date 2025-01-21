import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { configureSwagger, setGlobalPrefix, useGlobalFilters } from "src/config/app.config";
import { BadRequestException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: true })

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setGlobalPrefix(app);
  useGlobalFilters(app);
  configureSwagger(app)

  const port = 10000

  await app.listen(port, () => {
    console.log('Server running on port ' + port)
  })
}
bootstrap()
