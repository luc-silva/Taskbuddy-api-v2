import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/database/PrismaService";

@Injectable()
export class ProjectTaskRepository {
  constructor(private prismaClient: PrismaService) {}

  public async findById(id: number) {
    return await this.prismaClient.project_task.findUnique({ where: { id } });
  }

  public async findTasksByProject(projectId: number) {
    return await this.prismaClient.project_task.findMany({
      where: {
        project_id: projectId,
      },
    });
  }

  public async create(data: ProjectTask) {
    await this.prismaClient.project_task.create({
      data: {
        completed: false,
        priority: data.priority,
        title: data.title,
        project_id: data.project_id,
      },
    });
  }

  public async updateProjectTask(data: ProjectTask, id: number) {
    await this.prismaClient.project_task.update({
      data: {
        completed: data.completed,
      },
      where: { id },
    });
  }

  public async findByIdAndDelete(id: number) {
    await this.prismaClient.project_task.delete({
      where: {
        id,
      },
    });
  }
}
