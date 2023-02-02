import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListTasksService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json');
  }

  addTask(newTask) {
    return this.http.post(
      'https://ng-tasks-c6b03.firebaseio.com/Tasks.json',
      newTask
    );
  }

  updateTask(task) {
    return this.http.patch(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${task.id}.json`,
      {
        checked: task.checked,
      }
    );
  }

  deleteTask(id) {
    return this.http.delete(
      `https://ng-tasks-c6b03.firebaseio.com/Tasks/${id}.json`
    );
  }
}
