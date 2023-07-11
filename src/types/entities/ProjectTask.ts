interface ProjectTask {
  id: number;
  title: string;
  priority: number;
  completed: boolean;
  project_id: number;
  project: {
    id: number;
  };
}
