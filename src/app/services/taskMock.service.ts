import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Task} from "app/interface/task";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { TaskService } from './task.service'

@Injectable()
export class TaskMockService extends TaskService{
  
  constructor(http: Http){
    super(http);
  }

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = [];
    
    return this.http.get('app/services/mock.tasks.json').map(
            (response: Response) => <Task[]> response.json());
        

  }
}
