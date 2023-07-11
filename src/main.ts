import cors from "cors";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./App.module";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(8080);
}

main();
