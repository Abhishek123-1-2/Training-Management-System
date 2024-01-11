import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseUrl = 'http://localhost:8083/api/training-details';

  constructor(private http: HttpClient) { }

  // getTrainingDetails(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/training-details`);
  // }
  getCombinedTrainingDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/combined`);
  }

  getCompletedTrainingDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/completed`);
  }

}
