// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083/api/login'; // Adjust the URL to your Spring Boot server
  private loggedInUserData: any;
  // Add a property to store the emp_id
  private empId: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const user = { username, password }; 
    // return this.http.post(`${this.baseUrl}/authenticate`, user);   
    return this.http.post(`${this.baseUrl}/authenticate`, user).pipe(
      tap((response: any) => {
        if (response.status === 'success') {
          // Store the logged-in user data, including empId
          this.loggedInUserData = response;
        }
      })
    );
  }

  // Add a method to set the emp_id
  setEmpId(empId: string | null): void {
    this.empId = empId;
  }

  // Add a method to get the emp_id
  getEmpId(): string | null {
    return this.empId;
  }

  getLoggedInUserData(): any {
    return this.loggedInUserData;
  }
}
