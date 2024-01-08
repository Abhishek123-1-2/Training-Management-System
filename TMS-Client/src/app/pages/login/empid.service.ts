// empid.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpIdService {
  private _empId: string;

  get empId(): string {
    return this._empId;
  }

  set empId(value: string) {
    this._empId = value;
  }
}
