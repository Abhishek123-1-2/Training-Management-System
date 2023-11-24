// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083/api/login'; // Adjust the URL to your Spring Boot server

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(`${this.baseUrl}/authenticate`, user);
  }
}
