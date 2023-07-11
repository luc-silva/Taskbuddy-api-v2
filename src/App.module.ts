import { Module } from "@nestjs/common";
import { ServiceModule } from "./services/Service.module";
import { ControllerModule } from "./controllers/Controller.module";
import { RepositoryModule } from "./repositories/Repository.module";

@Module({
  imports: [ControllerModule, ServiceModule, RepositoryModule],
})
export class AppModule {}
