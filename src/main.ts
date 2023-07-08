import { NestFactory } from "@nestjs/core";
import cors from "cors";

async function main() {
  const app = await NestFactory.create({});
  app.use(cors());
}

main();
