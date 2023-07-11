import { Module } from "@nestjs/common";
import { ProjectController } from "./Project.controller";
import { UserAccountController } from "./UserAccount.controller";
import { TodoController } from "./Todo.controller";
import { ProjectTaskController } from "./ProjectTask.controller";
import { ServiceModule } from "../services/Service.module";

@Module({
  imports: [ServiceModule],
  controllers: [
    ProjectController,
    UserAccountController,
    TodoController,
    ProjectTaskController,
  ],
})
export class ControllerModule {}
