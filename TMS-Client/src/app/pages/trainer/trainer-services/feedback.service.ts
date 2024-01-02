// feedback.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:8083/api'; 

  constructor(private http: HttpClient) {}

  saveFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/feedback`, feedbackData);
  }
}
