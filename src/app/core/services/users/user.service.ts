import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}usuarios`);
  }

  // getUsersById(id: string | null): Observable<User[]> {
  getUsersById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}usuarios/${id}`);
  }

  getUsersByQuery(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}usuarios?q=${query}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}usuarios`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}usuarios/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}usuarios/${id}`);
  }

}
