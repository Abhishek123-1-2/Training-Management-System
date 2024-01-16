// status-update.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusUpdateService {
  // private statusSubject = new BehaviorSubject<string>(''); // Initial value can be empty or 'Registered'
  // status$ = this.statusSubject.asObservable();

  // updateStatus(newStatus: string) {
  //   this.statusSubject.next(newStatus);
  // }

  private statusSource = new BehaviorSubject<string>('');
status$ = this.statusSource.asObservable();

updateStatus(newStatus: string): void {
  this.statusSource.next(newStatus);
}
}
