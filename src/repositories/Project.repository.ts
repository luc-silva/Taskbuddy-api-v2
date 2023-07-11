import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/database/PrismaService";

@Injectable()
export class ProjectRepository {
  constructor(private prismaClient: PrismaService) {}

  public async findById(id: number) {
    return await this.prismaClient.project.findUnique({
      where: {
        id,
      },
      include: {
        project_task: true,
      },
    });
  }

  public async listUserProjects(id: number) {
    return this.prismaClient.project.findMany({
      where: { user_id: id },
      include: { project_task: true },
    });
  }

  public async update(data: { concluded: boolean; id: number }) {
    await this.prismaClient.project.update({
      data: {
        concluded: data.concluded,
      },
      where: { id: data.id },
    });
  }

  public async findByIdAndDelete(id: number) {
    await this.prismaClient.project.delete({ where: { id } });
  }

  public async create(data: Project) {
    return await this.prismaClient.project.create({
      data: {
        concluded: data.concluded,
        deadline: data.deadline,
        description: data.description,
        title: data.title,
        user_id: data.user.id,
        priority: data.priority,
      },
    });
  }

  public async countProjects(id: number) {
    return await this.prismaClient.project.count({ where: { user_id: id } });
  }
  public async countConcludedProjects(id: number) {
    return await this.prismaClient.project.count({
      where: {
        user_id: id,
        AND: {
          concluded: true,
        },
      },
    });
  }
}
