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
import { ProjectService } from "../services/Project.service";

@Controller("api/project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get("/:id")
  public async getProject(@Param("id", ParseIntPipe) id: number) {
    return this.projectService.getProjectById(id);
  }

  @Post("/")
  public async createProject(@Body() data: Project) {
    await this.projectService.createProject(data);
    return { message: "Done." };
  }

  @Put("/")
  public async updateProject(@Body() data: Project) {
    await this.projectService.updateProject(data);
    return { message: "Done." };
  }

  @Delete("/:id")
  public async deleteProject(@Param("id", ParseIntPipe) id: number) {
    await this.projectService.deleteProjectById(id);
    return { message: "Done." };
  }
}
