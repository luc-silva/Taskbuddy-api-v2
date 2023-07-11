import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { TodoService } from "../services/Todo.service";

@Controller("api/todo")
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post("/")
  public async createTodo(@Body() data: Todo) {
    await this.todoService.createTodo(data);
    return { message: "Done." };
  }

  @Delete("/:id")
  public async deleteTodo(@Param("id", ParseIntPipe) id: number) {
    await this.todoService.deleteTodoById(id);
    return { message: "Done." };
  }

  @Put("/:id")
  public async updateTodo(@Body() data: Todo) {
    await this.todoService.updateTodoById(data);
    return { message: "Done." };
  }

  @Get("/:id")
  public async getTodo(@Param("id", ParseIntPipe) id: number) {
    return await this.todoService.getTodoById(id);
  }
}
