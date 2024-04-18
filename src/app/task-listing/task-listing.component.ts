import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskDetails } from '../Models/task-details';
import { TasksService } from '../Services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-listing.component.html',
  styleUrl: './task-listing.component.scss',
})
export class TaskTrackerComponent implements OnInit {
  newTask: TaskDetails = { taskTitle: '', description: '' };
  taskDetailsArray: TaskDetails[] = [];
  isReadOnly: boolean = true;
  selectedIndex: number | null = null;

  constructor(private tasksOperations: TasksService) {}

  ngOnInit(): void {
    this.taskDetailsArray = this.tasksOperations?.getTasks();
    console.log(this.taskDetailsArray);
  }

  onSubmit() {
    if (!this.newTask.taskTitle || !this.newTask.description) {
      Swal.fire({
        icon: 'error',
        title: 'Task not added',
        text: 'Please Enter Title and Description',
        confirmButtonColor: '#1f39ff',
      });
    } else {
      const newTask: TaskDetails = {
        taskTitle: this.newTask.taskTitle,
        description: this.newTask.description,
      };
      this.tasksOperations?.addTask(newTask);
      this.newTask.taskTitle = '';
      this.newTask.description = '';
      Swal.fire({
        title: 'New task added',
        confirmButtonColor: '#1f39ff',
      });
    }
  }

  deleteTask(index: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      confirmButtonColor: '#1f39ff',
      cancelButtonColor: '#ff0000',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksOperations?.deleteTask(index);
        Swal.fire({
          title: 'Deleted!',
          text: 'Task has been deleted succesfully',
          icon: 'success',
          confirmButtonColor: '#1f39ff',
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your Task is not deleted',
          icon: 'error',
          confirmButtonColor: '#1f39ff',
        });
      }
    });
  }

  toggleEdit(index: number): void {
    if (this.isReadOnly) {
      this.selectedIndex = index;
    } else {
      this.selectedIndex = null;
    }
    this.isReadOnly = !this.isReadOnly;
  }
}
