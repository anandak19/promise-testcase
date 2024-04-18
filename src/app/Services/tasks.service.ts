import { Injectable } from '@angular/core';
import { TaskDetails } from '../Models/task-details';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: TaskDetails[] = [  ];
  constructor() { }

  getTasks(): TaskDetails[] {
    return this.tasks;
  }

  addTask(task: TaskDetails): void {
    this.tasks.push(task);
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

}
