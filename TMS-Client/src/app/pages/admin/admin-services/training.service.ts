import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = 'http://localhost:8083/api/training-views';
  constructor(private http:HttpClient) { }
  addTraining(trainingData: any): Observable<any> {
    console.log('Request to server:', trainingData);
    return this.http.post(`${this.baseUrl}`, trainingData)
      .pipe(
        tap(response => console.log('Response from server:', response))
      );
  }
 
  getTrainingData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getTrainerNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/trainer-names`);
  }
  getTrainerIdByName(trainerName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/trainer-id?name=${trainerName}`);
    // Replace 'trainer-id' with the actual endpoint you create in Spring Boot
    // and adjust the query parameter accordingly
  }

  // Add the following method to fetch trainer ID from the existing endpoint
  getTrainerIdByNameFromBackend(trainerName: string): Observable<number | null> {
    return this.http.get<number>(`${this.baseUrl}/trainer-id?name=${trainerName}`).pipe(
      catchError(() => of(null)) // Handle error and return null
    );
  }
   // Add the following method to schedule training
   scheduleTraining(trainerId: number, trainingScheduleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/schedule?trainerId=${trainerId}`, trainingScheduleData)
      .pipe(
        tap(response => console.log('Response from server:', response)),
        catchError(error => {
          console.error('Error scheduling training:', error);
          // Handle error as needed
          return of(null);
        })
      );
  }
  
  
  

}
