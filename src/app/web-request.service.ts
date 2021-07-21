import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  ListServices: any = [];

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(uri: string, data?: any) {
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`, {
      params: { city: data.city, specialization: data.specialization, timeStart: data.timeStart, timeEnd: data.timeEnd, dateStart: data.dateStart, dateEnd: data.dateEnd },
    });
  }

  post(uri: string, payload: Object) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string, payload?: Object) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`, { body: payload });
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users/login`,
      {
        email,
        password,
      },
      {
        observe: 'response',
      }
    );
  }

  signup(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users`,
      {
        email,
        password,
      },
      {
        observe: 'response',
      }
    );
  }

  // get(uri: string) {
  //   this.ListServices.length = 0;
  //   this.http.get<any>(`${this.ROOT_URL}/${uri}`).subscribe((data) => {
  //     data.forEach((task: any) => {
  //       this.ListServices.push({
  //         title: task.title,
  //         completed: task.completed,
  //         id: task._id,
  //       });
  //     });
  //   });
  // }

  // post(payload: any) {
  //   this.http
  //     .post<any>('http://localhost:3000/tasks', payload)
  //     .subscribe((result) => {
  //       this.get();
  //     });
  // }

  // patch(task: Task) {
  //   this.http
  //     .patch<any>(`http://localhost:3000/tasks?id=${task.id}`, {
  //       title: task.title,
  //       completed: task.completed
  //     })
  //     .subscribe((data) => {
  //       this.get();
  //     });
  // }

  // delete(id: ObjectID) {
  //   this.http
  //     .delete<any>(`http://localhost:3000/tasks?id=${id}`)
  //     .subscribe((data) => {
  //       this.get();
  //     });
  // }
}
