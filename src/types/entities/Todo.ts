interface Todo {
  id: number;
  user_id: number;
  user: {
    id: number;
  };
  text: string;
  concluded: boolean;
  deadline: string;
  priority: number;
}
