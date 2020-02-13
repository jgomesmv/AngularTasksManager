import { Injectable } from '@angular/core';
import PendingTasks from 'src/assets/unassigned_tasks.json';
import { Task } from '../../models/task/task';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public pendingTasks = PendingTasks.map(task => new Task(task));

  constructor() { }

  getPendingTasks() {
    return of(this.pendingTasks);
  }
}
