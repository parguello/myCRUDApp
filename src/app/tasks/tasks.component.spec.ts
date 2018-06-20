import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TasksComponent } from './tasks.component';
import { AppModule } from '../app.module';
import { TaskService } from '../services/task.service';
import { TaskMockService } from '../services/taskMock.service';
import { TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';


describe('Component: Tasks', ()=>{
    beforeEach(() => {
        TestBed.configureTestingModule({

          imports: [
                    BrowserModule,
                    FormsModule,
                    HttpModule],
          declarations: [   
              TasksComponent],
          providers: [//TaskService, TaskMockService]
              { provide:TaskService, useClass: TaskMockService}]
        }).compileComponents();
    })

    it ('shoud declare the app', () => {
        let fixture = TestBed.createComponent(TasksComponent);
        let app =  fixture.debugElement.componentInstance;
        let taskService =  fixture.debugElement.injector.get(TaskService);
        fixture.detectChanges();
        expect(app).toBeTruthy();
    });


    /*it ('shoud return task1', async( () => {
        let fixture = TestBed.createComponent(TasksComponent);
        let app =  fixture.debugElement.componentInstance;
        let taskService =  fixture.debugElement.injector.get(TaskMockService);
        let spy = spyOn(taskService, 'getTasks').and.returnValue();
        fixture.detectChanges();
        fixture.whenStable().then( ()=> {
            expect(app.tasks).toBe(undefined);
        });
        
    }));*/

    it ('shoud return the tasks returned by service', fakeAsync( () => {
        let fixture = TestBed.createComponent(TasksComponent);
        let app =  fixture.debugElement.componentInstance;
        let taskService =  fixture.debugElement.injector.get(TaskService);
        const data: any = require('../services/mock/tasks.json');
        let spy = spyOn(taskService, 'getTasks').and.returnValue(Observable.of(data));
        fixture.detectChanges();
        tick();
        expect(app.tasks).toBe(data);
    }));

    
    it ('shoud display the tasks returned by service', fakeAsync( () => {
        let fixture = TestBed.createComponent(TasksComponent);
        let app =  fixture.debugElement.componentInstance;
        let template = fixture.nativeElement;
        let taskService =  fixture.debugElement.injector.get(TaskService);
        const data: any = require('../services/mock/tasks.json');
        let spy = spyOn(taskService, 'getTasks').and.returnValue(Observable.of(data));
        fixture.detectChanges();
        tick();
        var searchResCount = template.all(by.css('#resultsRepeaterGrid > tr:not(.tableheader)'))
        expect(searchResCount.count()).toEqual(3);
        //expect(template.querySelector('h1').innerText).toBe('Hello World!');
    }));
})