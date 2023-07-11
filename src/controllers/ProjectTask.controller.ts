import { ProjectTaskService } from "../services/ProjectTask.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from "@nestjs/common";

@Controller("api/project-task")
export class ProjectTaskController {
  constructor(private projactTaskService: ProjectTaskService) {}

  @Get("/:id")
  public async getProjectTask(@Param("id", ParseIntPipe) id: number) {
    return this.projactTaskService.getProjectTask(id);
  }

  @Put("/:id")
  public async updateProjectTask(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: ProjectTask,
  ) {
    await this.projactTaskService.updateProjectTask(data, id);
    return { message: "Done." };
  }
}

//testa prisma
