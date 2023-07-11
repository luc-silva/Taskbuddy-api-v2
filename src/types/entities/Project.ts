interface Project {
  id: number;
  title: string;
  description: string;
  deadline: string;
  concluded: boolean;
  user: UserAccount;
  projectTasks: ProjectTask[];
  priority: number;
}
