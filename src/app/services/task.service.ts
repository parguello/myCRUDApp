import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Task} from "app/interface/task";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  public http: Http;
  
  constructor(http: Http){this.http = http;}

//GET https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks
  getTasks(): Observable<Task[]> {
    const tasks: Task[] = [];
    
    return this.http.get('https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks').map(
            (response: Response) => {
              for(let i = 0; i<response.json().documents.length; i++) {
                let task: Task;
                const id = response.json().documents[i].name.substring(response.json().documents[i].name.lastIndexOf('/')+1);
                console.log(id);
                task = <Task> {
                  'id': id,
                  'title': response.json().documents[i].fields.title.stringValue,
                  'description': response.json().documents[i].fields.description.stringValue,
                };
                tasks.push(task);
              }
              return tasks;
            //<Task[]>response.json()
            });
  }

//POST: https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks
  addTask(task: Task) {
    const request = {
      'fields':{
        'title':{
          'stringValue':task.title,
          },
        'description':{
          'stringValue':task.description
          }
      }
    };

    return this.http.post('https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks', request).map(
      (response: Response) => response.json()
    );
  }

//DELETE: https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks/Cw36XeLhvf9widHiatQG
  deleteTask(taskId: string) {
    return this.http.delete('https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks/'+taskId).map(
      (response: Response) => response.json()
    );
  }

  updateTask(task: Task) {
    const request = {
      'fields':{
        'title':{
          'stringValue':task.title,
          },
        'description':{
          'stringValue':task.description
          }
      }
    };
    return this.http.post('https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks/'+task.id, request ).map(
      (response: Response) => response.json()
    );
  }
}





