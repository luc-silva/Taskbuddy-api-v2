import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserAccountRepository } from "../repositories/UserAccount.repository";
import { TodoRepository } from "../repositories/Todo.repository";
import { ProjectRepository } from "../repositories/Project.repository";

@Injectable()
export class UserAccountService {
  constructor(
    private userAccountRepository: UserAccountRepository,
    private todoRepository: TodoRepository,
    private projectRepository: ProjectRepository,
  ) {}

  public async createUser(data: UserAccount) {
    await this.userAccountRepository.createAccount(data);
  }

  public async getAccountByEmailAndValdiate(data: UserAccount) {
    const user = await this.userAccountRepository.getUserAccountByEmail(
      data.email,
    );
    if (!user) {
      throw new NotFoundException("User not found with given email.");
    }

    if (data.password !== user.password) {
      throw new UnauthorizedException("Wrong password.");
    }

    return user;
  }

  public async getUserById(id: number) {
    const user = await this.userAccountRepository.getUserDetailsById(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  public async getUserStatus(id: number) {
    const user = await this.userAccountRepository.getUserDetailsById(id);
    if (!user) {
      throw new NotFoundException("User not found with given email.");
    }

    const project_total = await this.projectRepository.countProjects(id);
    const project_concluded =
      await this.projectRepository.countConcludedProjects(id);

    const todo_total = await this.todoRepository.countTodos(id);
    const todo_concluded = await this.todoRepository.countConcludedTodos(id);

    const project_conclusion_rate =
      project_concluded > 0 ? (project_concluded * 100) / project_total : 0;

    const todo_conclusion_rate =
      todo_concluded > 0 ? (todo_concluded * 100) / todo_total : 0;

    return {
      project_concluded,
      project_total,
      todo_total,
      todo_concluded,
      project_conclusion_rate,
      todo_conclusion_rate,
      project_tasks_average: 0,
    };
  }
}
