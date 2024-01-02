import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface TableData {
  headerRow: string[];
  dataRows: {
    registrationId: number;
    reg_id: string;
    emp_code: string;
    emp_name: string;
    reg_date: string;
    c_name: string;
    comments: string;
    status: string;
    response: string;
    actions: string;
  }[];
}

interface TableRow {
  registrationId: number;
  reg_id: string;
  emp_code: string;
  emp_name: string;
  reg_date: string;
  c_name: string;
  comments: string;
  status: string;
  response: string;
  actions: string;
}

interface RegistrationDetailsDTO {
  registrationId: number;
  empCode: string;
  empName: string;
  registrationDate: Date;
  courseName: string;
  registrationComments: string;
  status: string;
  registrationResponse: string | null;
}

@Component({
  selector: 'registration-cmp',
  moduleId: module.id,
  templateUrl: 'admin_registration.component.html',
})
export class AdminRegistrationComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public isEditMode: boolean = false;
  public rowIndexBeingEdited: number | null = null;
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<RegistrationDetailsDTO[]>('http://localhost:8083/api/registrations/details').subscribe(
      (data) => {
        this.tableData1 = {
          headerRow: [
            'Sr No.',
            'Employee Code',
            'Employee Name',
            'Registration Date',
            'Course Name',
            'Status',
            'Reason',
            'Actions',
          ],
          dataRows: data.map((item, index) => ({
            registrationId: item.registrationId,
            reg_id: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            reg_date: new Date(item.registrationDate).toLocaleDateString(),
            c_name: item.courseName,
            comments: item.registrationComments,
            status: item.status,
            response: item.registrationResponse || '',
            actions: 'Edit',
          })),
        };
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  applyFilter() {
    const searchTerm = this.searchValue.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredData = [...this.tableData1.dataRows.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)];
      return;
    }

    this.filteredData = this.tableData1.dataRows
      .filter((row) =>
        Object.values(row).some(
          (value) =>
            value !== null &&
            value !== undefined &&
            value.toString().toLowerCase().includes(searchTerm)
        )
      )
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  toggleEditMode(rowIndex: number): void {
    this.isEditMode = !this.isEditMode;
    this.rowIndexBeingEdited = this.isEditMode ? rowIndex : null;
  }

  saveChanges(rowIndex: number): void {
    const updatedRegistration = { ...this.filteredData[rowIndex] };
    const updatePayload = {
      registration_id: +updatedRegistration.registrationId,
      registration_status: updatedRegistration.status,
      registration_response: updatedRegistration.response,
    };

    this.http
      .put(`http://localhost:8083/api/registrations/${updatedRegistration.registrationId}`, updatePayload)
      .subscribe(
        () => {
          this.isEditMode = false;
          this.rowIndexBeingEdited = null;
          this.fetchData(); // Fetch data again after saving changes
        },
        (error) => {
          console.error('Error updating registration', error);
        }
      );
  }

  cancelEdit() {
    this.isEditMode = false;
    this.rowIndexBeingEdited = null;
  }

  navigateToAddParticipants() {
    this.router.navigate(['/add-participants']);
  }

  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilter();
  }
}
