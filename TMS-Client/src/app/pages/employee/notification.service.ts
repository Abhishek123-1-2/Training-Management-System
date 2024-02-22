import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private enrollmentSubject = new Subject<{ employeeName: string; courseName: string }>();

  enrollmentNotification$ = this.enrollmentSubject.asObservable();

  showEnrollmentNotification(employeeName: string, courseName: string): void {
    this.enrollmentSubject.next({ employeeName, courseName }); // Use the next() method to emit a value
  }
}
