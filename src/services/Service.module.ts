import { Module } from "@nestjs/common";
import { ProjectService } from "./Project.service";
import { ProjectTaskService } from "./ProjectTask.service";
import { UserAccountService } from "./UserAccount.service";
import { TodoService } from "./Todo.service";
import { RepositoryModule } from "../repositories/Repository.module";

@Module({
  imports: [RepositoryModule],
  providers: [
    ProjectService,
    ProjectTaskService,
    UserAccountService,
    TodoService,
  ],

  exports: [
    ProjectService,
    ProjectTaskService,
    UserAccountService,
    TodoService,
  ],
})
export class ServiceModule {}
