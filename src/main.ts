import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import setupJSON from './middleware/json.middleware';
import setupPipe from './middleware/pipe.middleware';
import setupFilter from './middleware/filter.middleware';
import { setupSwagger } from './middleware/swagger.middleware';

async function bootstrap() {
  const PORT = process.env.APP__PORT || 3000;
  const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || '/api';
  const app = await NestFactory.create(AppModule);
  setupJSON(app);
  setupPipe(app);
  setupFilter(app);
  setupSwagger(app, GLOBAL_PREFIX);
  await app.listen(PORT, () => {
    console.log(
      '' +
        // + `http://localhost:${PORT}${GLOBAL_PREFIX}              - server\n`
        `http://localhost:${PORT}${GLOBAL_PREFIX}/swagger      - Swagger UI\n` +
        `http://localhost:${PORT}${GLOBAL_PREFIX}/swagger.json - Swagger JSON\n`,
      // + `http://localhost:${PORT}${GLOBAL_PREFIX}/redoc        - Redoc\n`
    );
  });
}
bootstrap();
