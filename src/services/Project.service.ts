import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProjectRepository } from "../repositories/Project.repository";
import { UserAccountRepository } from "../repositories/UserAccount.repository";
import { ProjectTaskRepository } from "../repositories/ProjectTask.repository";

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private userRepository: UserAccountRepository,
    private projectTaskRepository: ProjectTaskRepository,
  ) {}

  public async getProjectById(id: number) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException("Project not found.");
    }

    let completedTasks = 0;
    for (const task of project.project_task) {
      if (task.completed) {
        completedTasks++;
      }
    }

    if (completedTasks === project.project_task.length) {
      project.concluded = true;
      await this.projectRepository.update(project);
    }

    return project;
  }

  public async listUserProjects() {
    return this.projectRepository;
  }

  public async createProject(data: Project) {
    if (data.projectTasks.length === 0) {
      throw new BadRequestException("Project must have at least one task.");
    }

    const user = await this.userRepository.getUserDetailsById(data.user.id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const project = await this.projectRepository.create(data);

    for (const task of data.projectTasks) {
      task.project_id = project.id;
      await this.projectTaskRepository.create(task);
    }
  }

  public async updateProject(data: Project) {
    await this.projectRepository.update(data);
  }

  public async deleteProjectById(id: number) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException("Project not found.");
    }

    for (const task of project.project_task) {
      await this.projectTaskRepository.findByIdAndDelete(task.id);
    }

    await this.projectRepository.findByIdAndDelete(id);
  }
}
