import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectTaskRepository } from "../repositories/ProjectTask.repository";

@Injectable()
export class ProjectTaskService {
  constructor(private projectTaskRepository: ProjectTaskRepository) {}

  public async getProjectTask(id: number) {
    const projectTask = await this.projectTaskRepository.findById(id);
    if (!projectTask) {
      throw new NotFoundException("Project Task not found.");
    }
    return projectTask;
  }

  public async updateProjectTask(data: ProjectTask, id: number) {
    const projectTask = await this.projectTaskRepository.findById(id);
    if (!projectTask) {
      throw new NotFoundException("Project Task not found.");
    }

    await this.projectTaskRepository.updateProjectTask(data, id);
  }
}
