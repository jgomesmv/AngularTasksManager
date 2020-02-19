import { Task } from '../task/task';

export class User {
  id: string;
  name: string;
  email: string;
  areas: string[];
  groups: string[];
  tasks: Task[];

  constructor(data) {
    data.tasks = data.tasks.map(task => new Task(task));

    Object.assign(this, data);
  }
}
