import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { AllExceptionsFilter } from '@/filter/exception.filter'
import { HttpAdapterHost } from '@nestjs/core'

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Dashboard Macchines API')
    .setDescription('Documentação das rotas do sistema')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: "Please enter token in following format: Bearer <JWT>",
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
      },
      "access-token",
    )
    .addSecurityRequirements("access-token")
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('doc', app, document)
}

export function setGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix('api')
}


export function useGlobalFilters(app: INestApplication) {
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
}