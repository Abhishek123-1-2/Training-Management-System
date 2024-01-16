// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })


// export class EmployeeService {
//   private apiUrl = 'http://localhost:8083/api/employees';

//   constructor(private http: HttpClient) { }

//   getEmployeesByCourse(course:string): Observable<any[]> {
//     const url= `${this.apiUrl}?course=${course}`;
//     return this.http.get<any[]>(url);
// // .pipe(
// //       map(data => data.map((row, index) => ({
// //         s_no:(index+1).toString(),
// //         emp_code: row.empCode,
// //         emp_name: row.empName,
// //         startDate: row.plannedStartDate,
// //         endDate: row.plannedEndDate,
// //         tstatus: row.status,
// //         feedback:'Give'
// //       })))
// //     );
//   }

  
  
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8083/api/employees';

  constructor(private http: HttpClient) {}

  getEmployeesByCourseAndTrainer(course: string, trainerName: string): Observable<any[]> {
    const url = `${this.apiUrl}?course=${course}&trainerName=${trainerName}`;
    return this.http.get<any[]>(url);
  }
}
