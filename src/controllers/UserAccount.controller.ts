import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { UserAccountService } from "../services/UserAccount.service";
import { TodoService } from "../services/Todo.service";
import { ProjectService } from "../services/Project.service";

@Controller("api/user")
export class UserAccountController {
  constructor(
    private userAccountService: UserAccountService,
    private todoService: TodoService,
    private projectService: ProjectService,
  ) {}

  @Post("/create")
  public async createUser(@Body() data: UserAccount) {
    await this.userAccountService.createUser(data);
    return { message: "Done." };
  }

  @Post("/login")
  public async login(@Body() data: UserAccount) {
    return await this.userAccountService.getAccountByEmailAndValdiate(data);
  }

  @Get("/:id")
  public async getUserDetails(@Param("id", ParseIntPipe) id: number) {
    return await this.userAccountService.getUserById(id);
  }
  @Get("/:id/projects")
  public async getUserProjects(@Param("id", ParseIntPipe) id: number) {
    return await this.todoService.listUserProjects(id);
  }

  @Get("/:id/todos")
  public async getUserTodos(@Param("id", ParseIntPipe) id: number) {
    return await this.todoService.listUserTodos(id);
  }

  @Get("/:id/todos/important")
  public async getUserImportantTodos(@Param("id", ParseIntPipe) id: number) {
    return await this.todoService.getImportantTodos(id);
  }

  @Get("/:id/status")
  public async getUserStatus(@Param("id", ParseIntPipe) id: number) {
    return await this.userAccountService.getUserStatus(id);
  }
}
