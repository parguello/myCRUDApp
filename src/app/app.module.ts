import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import {AddTasksComponent} from "./add-tasks/add-tasks.component";
import {TasksComponent} from "./tasks/tasks.component";

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {TaskService} from "./services/task.service";
import {TaskMockService} from "./services/taskMock.service";
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddTasksComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //AngularFireModule,
    //AngularFirestoreModule,
    //AngularFireModule.initializeApp(environment.firebase, 'angular-fs' )
  ],
  providers: [TaskService, TaskMockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
