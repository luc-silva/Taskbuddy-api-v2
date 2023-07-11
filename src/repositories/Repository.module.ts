import { Module } from "@nestjs/common";
import { ProjectRepository } from "./Project.repository";
import { ProjectTaskRepository } from "./ProjectTask.repository";
import { UserAccountRepository } from "./UserAccount.repository";
import { TodoRepository } from "./Todo.repository";
import { PrismaService } from "../utils/database/PrismaService";

@Module({
  providers: [
    ProjectRepository,
    ProjectTaskRepository,
    UserAccountRepository,
    TodoRepository,
    PrismaService,
  ],
  exports: [
    ProjectRepository,
    ProjectTaskRepository,
    UserAccountRepository,
    TodoRepository,
  ],
})
export class RepositoryModule {}
