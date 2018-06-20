import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {TaskService} from "../services/task.service";
import {Task} from "app/interface/task";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit{

  @Output() editTaskEvent = new EventEmitter<Task>();

  tasks: Task[];
  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(
      response => this.tasks = response
    );
  }

  deleteTask(event, task) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      console.log(task.id);
      this.taskService.deleteTask(task.id).subscribe(
        response => this.getTasks()
    );
      
    }
    return;
  }

  editTask(event, task) {
    console.log("emit task", task);
    this.editTaskEvent.emit(task);
  }
}
