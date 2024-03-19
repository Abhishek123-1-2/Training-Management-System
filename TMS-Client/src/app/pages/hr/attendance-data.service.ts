import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceDataService {
  private expandedDates: string[] = [];
  private attendanceStatus: { [empCode: string]: { [date: string]: string } } = {}; // Initialize as an empty object

  constructor() { }

  getExpandedDates(): string[] {
    return this.expandedDates;
  }

  setExpandedDates(dates: string[]): void {
    this.expandedDates = dates;
  }

  getAttendanceStatus(empCode: string, date: string): string {
    return this.attendanceStatus[empCode]?.[date] || '';
  }

  setAttendanceStatus(empCode: string, date: string, status: string): void {
    if (!this.attendanceStatus[empCode]) {
      this.attendanceStatus[empCode] = {};
    }
    this.attendanceStatus[empCode][date] = status;
  }
}
