// date-selection.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateSelectionService {
  private selectedDates: string[] = [];

  getSelectedDates(): string[] {
    return this.selectedDates;
  }

  setDates(start: string, end: string): void {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date(startDate);

    // Clear existing dates
    this.selectedDates = [];

    // Add dates between start and end to the array
    while (currentDate <= endDate) {
      this.selectedDates.push(this.formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
