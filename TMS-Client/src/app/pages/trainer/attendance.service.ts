// attendance.service.ts

import { Injectable } from '@angular/core';

interface TableData {
    headerRow: string[];
    dataRows: {
      sr_no: string;
      emp_code: string;
      emp_name: string;
      attendance: string;
      attendanceStatus: { [day: string]: string };
    }[];
  }
  
@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly STORAGE_KEY = 'attendanceData';

  getAttendanceData(): TableData | null {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  saveAttendanceData(data: TableData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  clearAttendanceData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
