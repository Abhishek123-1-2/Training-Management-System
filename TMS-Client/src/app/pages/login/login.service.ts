
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private baseUrl = 'http://localhost:8083/api/login'; // Adjust the URL to your Spring Boot server
//   private loggedInUserData: any;

//   constructor(private http: HttpClient) {}

//   login(username: string, password: string): Observable<any> {
//     const user = { username, password }; 
//     // return this.http.post(`${this.baseUrl}/authenticate`, user);   
//     return this.http.post(`${this.baseUrl}/authenticate`, user).pipe(
//       tap((response: any) => {
//         if (response.status === 'success') {
//           // Store the logged-in user data, including empId
//           this.loggedInUserData = response;
//         }
//       })
//     );
//   }

//   // Add a method to set the emp_id
//   setEmpId(empId: string | null): void {
//     this.loggedInUserData.empId = empId;
//   }

//   getEmpId(): string | null {
//     return this.loggedInUserData?.empId || null;
//   }

//   getLoggedInUserData(): any {
//     return this.loggedInUserData;
//   }
// }

// login.service.ts
// login.service.ts
// login.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private baseUrl = 'http://localhost:8083/api/login'; // Adjust the URL to your Spring Boot server
//   private loggedInUserData: any;

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   login(username: string, password: string): Observable<any> {
//     const user = { username, password }; 
//     return this.http.post(`${this.baseUrl}/authenticate`, user).pipe(
//       tap((response: any) => {
//         if (response.status === 'success') {
//           // Store the logged-in user data, including empId, in localStorage
//           this.loggedInUserData = response;
//           localStorage.setItem('empId', response.empId);
//         }
//       })
//     );
//   }

//   getEmpId(): string | null {
//     return this.loggedInUserData?.empId || localStorage.getItem('empId') || null;
//   }

//   getLoggedInUserData(): any {
//     return this.loggedInUserData;
//   }

//   clearEmpId(): void {
//     localStorage.removeItem('empId');
//   }
// }
// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083/api/login'; // Adjust the URL to your Spring Boot server
  private loggedInUserData: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    const user = { username, password }; 
    return this.http.post(`${this.baseUrl}/authenticate`, user).pipe(
      tap((response: any) => {
        if (response.status === 'success') {
          // Store the entire logged-in user data in localStorage
          localStorage.setItem('loggedInUserData', JSON.stringify(response));
          localStorage.setItem('subordinateEmpIds', JSON.stringify(response.subordinateEmpIds));
        }
      })
    );
  }

  getEmpId(): string | null {
    const storedData = localStorage.getItem('loggedInUserData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData?.empId || null;
    }
    return null;
  }

  getLoggedInUserData(): any {
    const storedData = localStorage.getItem('loggedInUserData');
    return storedData ? JSON.parse(storedData) : null;
  }

  clearEmpId(): void {
    localStorage.removeItem('loggedInUserData');
  }
}




