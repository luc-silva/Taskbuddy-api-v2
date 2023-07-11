import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/database/PrismaService";

@Injectable()
export class TodoRepository {
  constructor(private prismaClient: PrismaService) {}

  public async findById(id: number) {
    return await this.prismaClient.todo.findUnique({ where: { id } });
  }

  public async countTodos(id: number) {
    return await this.prismaClient.todo.count({ where: { user_id: id } });
  }
  public async countConcludedTodos(id: number) {
    return await this.prismaClient.todo.count({
      where: { user_id: id, AND: { concluded: true } },
    });
  }

  public async listUserTodos(userId: number) {
    return await this.prismaClient.todo.findMany({
      where: { user_id: userId },
    });
  }
  public async getUserImportantTodos(userId: number) {
    return await this.prismaClient.todo.findMany({
      where: { priority: { gt: 1 }, AND: { user_id: userId } },
    });
  }

  public async createTodo(data: Todo) {
    await this.prismaClient.todo.create({
      data: {
        concluded: false,
        deadline: data.deadline,
        priority: data.priority,
        text: data.text,
        user_id: data.user_id,
      },
    });
  }

  public async updateTodoById(data: Todo) {
    await this.prismaClient.todo.update({
      data: {
        concluded: false,
        deadline: data.deadline,
        priority: data.priority,
        text: data.text,
        user_id: data.user_id,
      },
      where: {
        id: data.id,
      },
    });
  }

  public async deleteTodo(id: number) {
    await this.prismaClient.todo.delete({ where: { id } });
  }
}
