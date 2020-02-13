import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Task } from 'src/app/core/models/task/task';
import { TaskService } from 'src/app/core/services/task/task.service';
import { skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PendingTaskDataSource {
  private tasksSubject = new BehaviorSubject<Task[]>(null);

  constructor(private taskService: TaskService) { }

  connect(): Observable<Task[]> {
    if (!this.tasksSubject.value) {
      this.getTasks();
    }

    return this.tasksSubject.asObservable().pipe(
      skipWhile((tasks) => {
        return tasks ? false : true;
      })
    );
  }

  disconnect(): void {
    this.tasksSubject.complete();

    this.tasksSubject = new BehaviorSubject<Task[]>(null);
  }

  updateTasks(Tasks: Task[]): void {
    this.tasksSubject.next(Tasks);
  }

  addTask(task: Task): void {
    const Tasks = this.tasksSubject.value;
    Tasks.push(task);
    this.updateTasks(Tasks);
  }

  updateTask(task: Task): void {
    const tasks = this.tasksSubject.value.filter(u => u.id !== task.id);
    tasks.push(task);
    this.updateTasks(tasks);
  }

  removeTask(task: Task): void {
    const tasks = this.tasksSubject.value.filter(u => u.id !== task.id);
    this.updateTasks(tasks);
  }

  removeAllTasks(): void {
    this.updateTasks([]);
  }

  getTasks(): void {
    this.taskService.getPendingTasks().subscribe(
      (tasks) => {
        this.updateTasks(tasks);
      },
      (error) => {
        this.tasksSubject.error(error);
      }
    );
  }
}

