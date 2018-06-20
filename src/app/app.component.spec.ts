
import { AppComponent } from './app.component';
import {AddTasksComponent} from "./add-tasks/add-tasks.component";
import {TasksComponent} from "./tasks/tasks.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TaskMockService } from './services/taskMock.service';
import { TaskService } from './services/task.service';
import { AppModule } from './app.module';
import { TestBed } from '@angular/core/testing';


describe('Component: Tasks', ()=>{
    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
                    BrowserModule,
                    FormsModule,
                    HttpModule],
          declarations: [
              AppComponent,    
              TasksComponent,
              AddTasksComponent],
          providers: [TaskMockService, TaskService]
        }).compileComponents();
    })

    it ('shoud declare the app', () => {
        let fixture = TestBed.createComponent(AppComponent);
        let app =  fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
})