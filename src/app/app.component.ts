import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import Swal from "sweetalert2"
import { TaskTrackerComponent } from './task-listing/task-listing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'promise-testcase';
 

}
