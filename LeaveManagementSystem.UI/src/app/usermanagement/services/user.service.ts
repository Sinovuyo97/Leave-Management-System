import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authenticate(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/login`, value);
  }

  getAllUsers(): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/user`);
  }

  getUserById(id: any): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/user/${id}`);
  }

  addUser(path: string, body: any): Observable<any>  {
    return this.http.post(`${environment.apiUrl}/user`, body);
  }

  updateUser(path: string, body: any) {
    return this.http.put(`${environment.apiUrl}/user`, body);
  }

  getPagedUsers(skip: number, take: number) {
    return this.http.get(`${environment.apiUrl}/user?skip=${skip}&take=${take}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${environment.apiUrl}/user?id=${id}`);
  }

}
