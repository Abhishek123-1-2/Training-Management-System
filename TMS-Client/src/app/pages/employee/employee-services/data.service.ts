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
export class DataService {
  constructor(private http: HttpClient) {}

  getPerformanceData(): Observable<PerformanceData[]> {
    // Mock backend endpoint or generate dummy data
    const dummyData: PerformanceData[] = [
      { courseName: 'Core Java', progress: 80, achievements: 5, certifications: 2, skillDevelopment: 70 },
      { courseName: 'Spring Boot', progress: 70, achievements: 4, certifications: 1, skillDevelopment: 60 },
      { courseName: 'Angular', progress: 60, achievements: 3, certifications: 3, skillDevelopment: 90 },
      { courseName: 'PLSQL', progress: 90, achievements: 1, certifications: 2, skillDevelopment: 40 },
      { courseName: 'Javascript', progress: 80, achievements: 5, certifications: 2, skillDevelopment: 80 },

      // Add more dummy data as needed
    ];

    // For demonstration purposes, returning dummy data as an Observable
    return of(dummyData);
  }
}
