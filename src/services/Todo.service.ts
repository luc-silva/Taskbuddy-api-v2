import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoRepository } from "../repositories/Todo.repository";
import { UserAccountRepository } from "../repositories/UserAccount.repository";
import { ProjectRepository } from "../repositories/Project.repository";

@Injectable()
export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private userRepository: UserAccountRepository,
    private projectRepository: ProjectRepository,
  ) {}

  public async createTodo(data: Todo) {
    const user = await this.userRepository.getUserDetailsById(data.user.id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    data.user_id = user.id;

    await this.todoRepository.createTodo(data);
  }

  public async deleteTodoById(id: number) {
    await this.todoRepository.deleteTodo(id);
  }

  public async updateTodoById(data: Todo) {
    await this.todoRepository.updateTodoById(data);
  }

  public async getTodoById(id: number) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException("Todo not found.");
    }

    return todo;
  }

  public async listUserTodos(userId: number) {
    const user = await this.userRepository.getUserDetailsById(userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    const todo = await this.todoRepository.listUserTodos(userId);

    return todo;
  }

  public async listUserProjects(userId: number) {
    const user = await this.userRepository.getUserDetailsById(userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    const projects = await this.projectRepository.listUserProjects(userId);

    return projects;
  }

  public async getImportantTodos(userId: number) {
    const user = await this.userRepository.getUserDetailsById(userId);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    const todo = await this.todoRepository.getUserImportantTodos(userId);

    return todo;
  }
}
