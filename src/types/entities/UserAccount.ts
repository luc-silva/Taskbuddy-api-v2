interface UserAccount {
  id: number;
  name: string;
  email: string;
  password: string;
  projects: Project[];
  todos: Todo[];
}
