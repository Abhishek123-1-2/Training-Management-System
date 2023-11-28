import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

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

  
  
  

}
