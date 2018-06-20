import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Task} from "app/interface/task";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {
  @Output() refreshTable = new EventEmitter();

  task: Task = { title: '', description: ''};

  public displayAddMenu = false;
  public displayEditMenu = false;
  public title: string;
  public saveSuccess = false;

  constructor(public taskService: TaskService) {}
  ngOnInit() {
  }

  onDisplayAddMenu() {
    this.displayAddMenu = true;
    this.title="Add Task"
  }

  onAddCancel() {
    this.displayAddMenu = false;
    this.displayEditMenu = false;
  }

  onEditEvent($event: Task) {
    console.log("editEvent");
    this.displayEditMenu = true;
    this.title="Edit Task";
    this.task = $event;
  }

  onSubmit() {
    console.log('submit');
    if (this.task.title !== '' && this.task.description !== '') {
      console.log(this.task.title);
      if (this.displayAddMenu){
        this.taskService.addTask(this.task).subscribe(
          (response:Response) => {
            this.task.title = '';
            this.task.description = '';

            this.saveSuccess = true;
            this.refreshTable.emit();
          },
          (error) => {
            this.saveSuccess = false;
            console.log(error);
          }
        );
      }

      if (this.displayEditMenu){
        this.taskService.updateTask(this.task).subscribe(
          (response:Response) => {
            this.task.title = '';
            this.task.description = '';

            this.saveSuccess = true;
            this.refreshTable.emit();
          },
          (error) => {
            this.saveSuccess = false;
            console.log(error);
          }
        );
      }

      
    }
  }
}
