import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private empIdSource = new BehaviorSubject<string>('');
  currentEmpId = this.empIdSource.asObservable();

  private scheduleIdSource = new BehaviorSubject<string>('');
  currentScheduleId = this.scheduleIdSource.asObservable();

  constructor(
    private employeeService:EmployeeService
  ) { }

  changeEmpId(empId: string) {
    this.empIdSource.next(empId);
  }

  changeScheduleId(scheduleId: string) {
    this.scheduleIdSource.next(scheduleId);
  }
}
