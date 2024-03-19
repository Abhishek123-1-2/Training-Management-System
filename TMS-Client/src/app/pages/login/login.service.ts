

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private baseUrl = 'http://localhost:8083/api/login';
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
//           // Store the entire logged-in user data in localStorage
//           localStorage.setItem('loggedInUserData', JSON.stringify(response));
//           localStorage.setItem('subordinateEmpIds', JSON.stringify(response.subordinateEmpIds));
//           localStorage.setItem('employeeName', response.employeeName);
//         }
//       })
//     );
//   }

//   getEmpName(): string | null {
//     return localStorage.getItem('employeeName') || null;
//   }

//   getEmpId(): string | null {
//     const storedData = localStorage.getItem('loggedInUserData');
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       return parsedData?.empId || null;
//     }
//     return null;
//   }

//   getSubordinateEmpIds(): number[] | null {
//     const subordinateEmpIds = localStorage.getItem('subordinateEmpIds');
//     return subordinateEmpIds ? JSON.parse(subordinateEmpIds) : null;
//   }

//   getLoggedInUserData(): any {
//     const storedData = localStorage.getItem('loggedInUserData');
//     return storedData ? JSON.parse(storedData) : null;
//   }

//   clearEmpId(): void {
//     localStorage.removeItem('loggedInUserData');
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083/api/login';
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
          localStorage.setItem('subordinateEmpIdsWithCodes', JSON.stringify(response.subordinateEmpIdsWithCodes));
          localStorage.setItem('subordinateEmpCodes', JSON.stringify(response.subordinateEmpCodes));
          localStorage.setItem('employeeName', response.employeeName);
          localStorage.setItem('joining_date', response.joining_date);
          localStorage.setItem('mobileno', response.mobileno);
          localStorage.setItem('email', response.email);
          localStorage.setItem('designation_name', response.designation_name);
          localStorage.setItem('reporting_manager_name', response.reporting_manager_name);
          localStorage.setItem('reportingManagerName', response.reportingManagerName);
          localStorage.setItem('reportingManagerEmail', response.reportingManagerEmail);
        }
      })
    );
  }

  getEmpName(): string | null {
    return localStorage.getItem('employeeName') || null;
  }

  getEmpId(): string | null {
    const storedData = localStorage.getItem('loggedInUserData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData?.empId || null;
    }
    return null;
  }
  getReportingManagerName(): string | null {
    return localStorage.getItem('reportingManagerName') || null;
  }
  getSubordinateEmpIds(): number[] | null {
    const subordinateEmpIds = localStorage.getItem('subordinateEmpIds');
    return subordinateEmpIds ? JSON.parse(subordinateEmpIds) : null;
  }

  getSubordinateEmpIdsWithCodes(): { [key: number]: string[] } | null {
    const subordinateEmpIdsWithCodes = localStorage.getItem('subordinateEmpIdsWithCodes');
    return subordinateEmpIdsWithCodes ? JSON.parse(subordinateEmpIdsWithCodes) : null;
  }

  getLoggedInUserData(): any {
    const storedData = localStorage.getItem('loggedInUserData');
    return storedData ? JSON.parse(storedData) : null;
  }

  clearEmpId(): void {
    localStorage.removeItem('loggedInUserData');
  }
}






