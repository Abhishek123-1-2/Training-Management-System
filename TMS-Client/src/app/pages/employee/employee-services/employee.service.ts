import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface PerformanceData {
  courseName: string;
  progress: number;
  achievements: number;
  certifications: number;
  skillDevelopment: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  
  private empId: string | null = null;

  setEmpId(empId: string): void {
    this.empId = empId;
  }

  getEmpId(): string | null {
    return this.empId;
  }
  private apiUrl = 'http://localhost:8083/api/training-views/schedule-list';

  // getPerformanceData(): Observable<PerformanceData[]> {
  //   // Mock backend endpoint or generate dummy data
  //   const dummyData: PerformanceData[] = [
  //     { courseName: 'Core Java', progress: 80, achievements: 5, certifications: 2, skillDevelopment: 70 },
  //     { courseName: 'Spring Boot', progress: 70, achievements: 4, certifications: 1, skillDevelopment: 60 },
  //     { courseName: 'Angular', progress: 60, achievements: 3, certifications: 3, skillDevelopment: 90 },
  //     { courseName: 'PLSQL', progress: 90, achievements: 1, certifications: 2, skillDevelopment: 40 },
  //     { courseName: 'Javascript', progress: 80, achievements: 5, certifications: 2, skillDevelopment: 80 },

  //     // Add more dummy data as needed
  //   ];

  //   // For demonstration purposes, returning dummy data as an Observable
  //   return of(dummyData);
  // }

  getTrainingSchedule(): Observable<any[]> {
    // Implement your logic to fetch training schedule data
    // For example, using HttpClient to make an HTTP request
    return this.http.get<any[]>(this.apiUrl);
  }

  // enrollTraining(): Observable<any> {
  //   // const url = 'http://localhost:8083/api/registrations';
  //   // const enrollmentData = {
  //   //   schedule_id: scheduleId,
  //   //   training_id: trainingId,
  //   //   emp_id: empId,
  //   //   // Add other properties as needed
  //   // };
    
  //   // return this.http.post(url, enrollmentData);
  // }

    enrollTraining(registrationData: any): Observable<number> {
      const enrollUrl = 'http://localhost:8083/api/registrations/enroll';
      const headers = {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      };

      return this.http.post<number>(enrollUrl, registrationData, { headers });

      
  }

  getFeedback(empId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/completed-courses/${empId}`);
  }

  // isEnrolled(empId: string, scheduleId: string, trainingId: string): Observable<boolean> {
  //   const checkEnrollmentUrl = `http://localhost:8083/api/registrations/is-enrolled`;
  //   const params = {
  //     empId: empId,
  //     scheduleId: scheduleId,
  //     trainingId: trainingId
  //   };

  //   return this.http.post<boolean>(checkEnrollmentUrl, { params });
  // }
  

}
