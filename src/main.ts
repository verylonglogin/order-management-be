import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {pgConfig} from "./config/db.config";
import {DataSource} from "typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allows all origins (change this to your frontend URL in production)
    methods: 'GET,POST', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  let maxRetries = 5;
  while (maxRetries) {
    try {
      const dataSource = new DataSource(pgConfig());
      await dataSource.initialize();
      console.log("Database connection established");
      break;
    } catch (err) {
      console.error(`Database connection failed. Retrying in 5 seconds ${maxRetries} attempts left`);
      maxRetries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  const dataSource = new DataSource(pgConfig());
  dataSource.initialize()
      .then(() => console.log("Database connection established tables:",dataSource.entityMetadatas.map(e=> e.tableName) ))
      .catch((error) => console.error("Database connection failed", error));

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
